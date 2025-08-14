import { Component, OnInit, OnDestroy, inject, computed, signal } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators,
  ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../shared/services/product.service';

type ProductFormModel = {
  name: FormControl<string>;
  catagory: FormControl<string>;       // server spelling as requested
  price: FormControl<number>;
  isDiscount: FormControl<boolean>;
  discountPrice: FormControl<number | null>;
  description: FormControl<string>;
};

@Component({
  selector: 'app-admin-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.scss'],
})
export class AdminEditProductComponent implements OnInit, OnDestroy {
  // DI
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  // route id
  productId!: string;

  // ----- validator FIRST (avoid circular refs) -----
  private discountLessThanPrice: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
    const g = c as FormGroup<ProductFormModel>;
    const on = g.controls.isDiscount.value;
    const price = Number(g.controls.price.value ?? 0);
    const dis = g.controls.discountPrice.value;
    if (!on) return null;
    if (dis == null) return { discountInvalid: true };
    return dis > 0 && dis < price ? null : { discountInvalid: true };
  };

  // ----- typed form
  productForm!: FormGroup<ProductFormModel>;
  get fc() { return this.productForm.controls; }

  // ----- image state (no immediate upload)
  private _serverImageUrl = signal<string | null>(null);   // existing SAS URL from API
  private _localPreviewUrl = signal<string | null>(null);  // Object URL for picked file
  private pickedFile: File | null = null;

  serverHasImage = computed(() => !!this._serverImageUrl());
  imageUrl       = computed(() => this._localPreviewUrl() ?? this._serverImageUrl());

  picking   = signal(false);
  pickError = signal<string | null>(null);
  removeImage = signal(false);

  // viewer
  viewerOpen = signal(false);
  openViewer()  { if (this.imageUrl()) this.viewerOpen.set(true); }
  closeViewer() { this.viewerOpen.set(false); }

  // UX state
  saving = signal(false);

  // ----- lifecycle -----
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.initForm();

    this.productService.getProductById(this.productId).subscribe({
      next: (p: any) => {
        this.productForm.patchValue({
          name: p.name ?? '',
          catagory: p.catagory ?? '',
          price: p.price ?? 0,
          isDiscount: p.isDiscount ?? false,
          discountPrice: p.discountPrice ?? null,
          description: p.description ?? '',
        });

        // keep server image for preview until user picks a new one
        this._serverImageUrl.set(p.imageUrl ?? null); // SAS URL from API
        this._localPreviewUrl.set(null);
        this.pickedFile = null;
        this.removeImage.set(false);
      },
      error: (err) => console.error('Failed to load product:', err),
    });
  }

  ngOnDestroy(): void {
    this.revokePreview();
  }

  private initForm() {
    this.productForm = this.fb.group<ProductFormModel>({
      name: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(120)] }),
      catagory: this.fb.control('', { nonNullable: true }),
      price: this.fb.control(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
      isDiscount: this.fb.control(false, { nonNullable: true }),
      discountPrice: this.fb.control<number | null>(null),
      description: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(1024)] }),
    }, { validators: this.discountLessThanPrice });
  }

  // ----- image picking (kept in memory) -----
  onFilePicked(evt: Event) {
    const input = evt.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    this.pickError.set(null);
    this.picking.set(false);
    this.clearPreviewOnly();
    this.pickedFile = null;

    if (!file) {
      // allow re-selecting same filename later
      queueMicrotask(() => input.value = '');
      return;
    }
    if (!file.type.startsWith('image/')) {
      this.pickError.set('Please select an image file.');
      queueMicrotask(() => input.value = '');
      return;
    }

    this.pickedFile = file;
    this._localPreviewUrl.set(URL.createObjectURL(file));
    this.picking.set(true);
    this.removeImage.set(false); // new pick cancels removal flag
    queueMicrotask(() => input.value = ''); // allow picking same file again
  }

  clearPickedImage() {
    this.pickedFile = null;
    this.clearPreviewOnly();
    this.picking.set(false);
  }

  toggleRemoveImage(ev: Event) {
    const checked = (ev.target as HTMLInputElement).checked;
    this.removeImage.set(checked);
    if (checked) this.clearPickedImage(); // removing server image -> discard local pick
  }

  private clearPreviewOnly() {
    const url = this._localPreviewUrl();
    if (url) URL.revokeObjectURL(url);
    this._localPreviewUrl.set(null);
  }

  private revokePreview() {
    const url = this._localPreviewUrl();
    if (url) URL.revokeObjectURL(url);
  }

  // ----- submit: send multipart/form-data (backend uploads Blob) -----
  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    this.saving.set(true);

    const fd = new FormData();
    fd.append('name', this.fc.name.value);
    fd.append('catagory', this.fc.catagory.value);
    fd.append('price', String(this.fc.price.value));
    fd.append('isDiscount', String(this.fc.isDiscount.value));
    if (this.fc.isDiscount.value && this.fc.discountPrice.value != null) {
      fd.append('discountPrice', String(this.fc.discountPrice.value));
    }
    fd.append('description', this.fc.description.value);

    if (this.removeImage()) fd.append('removeImage', 'true');
    if (this.pickedFile)   fd.append('image', this.pickedFile, this.pickedFile.name); // IFormFile image

    this.productService.updateProduct(this.productId, fd).subscribe({
      next: () => this.router.navigate(['/admin/admin-products']),
      error: (err) => {
        console.error('Update failed:', err);
        this.saving.set(false);
      }
    });
  }

  // optional convenience
  resetForm() {
    this.productForm.reset({
      name: '',
      catagory: '',
      price: 0,
      isDiscount: false,
      discountPrice: null,
      description: ''
    } as any);
    this.clearPickedImage();
    this._serverImageUrl.set(null);
    this.removeImage.set(false);
  }
}
