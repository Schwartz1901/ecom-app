import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekBaseComponent } from './week-base.component';

describe('WeekBaseComponent', () => {
  let component: WeekBaseComponent;
  let fixture: ComponentFixture<WeekBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
