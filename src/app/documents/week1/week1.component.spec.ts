import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Week1Component } from './week1.component';

describe('Week1Component', () => {
  let component: Week1Component;
  let fixture: ComponentFixture<Week1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Week1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Week1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
