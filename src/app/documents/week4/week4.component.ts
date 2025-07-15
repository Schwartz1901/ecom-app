import { Component, inject, signal } from '@angular/core';
import { ChecklistComponent } from '../components/checklist/checklist.component';
import { ScriptWidgetComponent } from "../components/script-widget/script-widget.component";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-week4',
  imports: [ChecklistComponent, ScriptWidgetComponent],
  templateUrl: './week4.component.html',
  styleUrl: './week4.component.scss'
})
export class Week4Component {
  
  private http = inject(HttpClient)
  
  hello = signal<string>("Press the button");

  callHello() {
    this.http.get('https://localhost:7035/api/Product/hello', { responseType: 'text' }).subscribe({
      next: (res) => this.hello.set(res),
      error: (err) => this.hello.set("Error: " + (err?.message || 'Something went wrong'))
    });
  }

  appConfigTsHtml=`import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()]
});`;
  serviceInjectHtml=` private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7030/api/Product';`;

  sayHElloHtml=` sayHello(): Observable<string> {
    return this.http.get('https://localhost:7030/api/Product/hello', { responseType: 'text' });
  }`;
  callHeloHtml=`callHello() {
  this.productService.sayHello().subscribe({
    next: (res) => this.message = res,
    error: (err) => this.message = 'Error: ' + err.message
  });
}`;
  corsPolicyHtml=`builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost4200", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Angular app
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
var app = builder.Build();
app.UseCors("AllowLocalhost4200"); // Must come before app.UseAuthorization()`;

  subscribeHtml=`this.http.get('https://localhost:7035/api/Product/').subscribe({
      next: (data) => {
        // You do something with the data
      },
      error: (err: HttpErrorResponse) => {
        // You do something with the error
      }
    });`;

}
