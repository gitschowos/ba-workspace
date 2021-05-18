import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiletimeApproachComponent } from './compiletime-approach.component';

describe('CompiletimeApproachComponent', () => {
  let component: CompiletimeApproachComponent;
  let fixture: ComponentFixture<CompiletimeApproachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiletimeApproachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompiletimeApproachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
