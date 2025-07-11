import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Week9Component } from './week9.component';

describe('Week9Component', () => {
  let component: Week9Component;
  let fixture: ComponentFixture<Week9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Week9Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Week9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
