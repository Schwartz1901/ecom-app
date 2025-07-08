import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptWidgetComponent } from './script-widget.component';

describe('ScriptWidgetComponent', () => {
  let component: ScriptWidgetComponent;
  let fixture: ComponentFixture<ScriptWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScriptWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScriptWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
