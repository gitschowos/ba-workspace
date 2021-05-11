import { NgModule } from '@angular/core';
import { RuntimeApproachComponent } from './runtime-approach.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    RuntimeApproachComponent,
    DynamicFormComponent,
    FormRendererComponent
  ],
  imports: [
      CommonModule,
      ReactiveFormsModule
  ],
  exports: [
    RuntimeApproachComponent
  ]
})
export class RuntimeApproachModule { }
