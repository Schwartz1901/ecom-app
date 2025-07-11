import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Week10Component } from './week10.component';

describe('Week10Component', () => {
  let component: Week10Component;
  let fixture: ComponentFixture<Week10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Week10Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Week10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
