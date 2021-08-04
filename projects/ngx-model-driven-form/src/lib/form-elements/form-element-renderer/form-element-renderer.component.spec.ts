import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormElementRendererComponent } from './form-element-renderer.component';

describe('FormElementRendererComponent', () => {
  let component: FormElementRendererComponent;
  let fixture: ComponentFixture<FormElementRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormElementRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormElementRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
