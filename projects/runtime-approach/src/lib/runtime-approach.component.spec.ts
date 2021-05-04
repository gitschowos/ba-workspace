import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuntimeApproachComponent } from './runtime-approach.component';

describe('RuntimeApproachComponent', () => {
  let component: RuntimeApproachComponent;
  let fixture: ComponentFixture<RuntimeApproachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuntimeApproachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuntimeApproachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
