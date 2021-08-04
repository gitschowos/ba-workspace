import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormElementsModule } from './form-elements/form-elements.module';

import { ModelDrivenFormComponent } from './model-driven-form.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { FormFillerComponent } from './form-filler/form-filler.component';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    ModelDrivenFormComponent,
    DynamicFormComponent,
    FormRendererComponent,
    FormFillerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormElementsModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDividerModule
  ],
  exports: [
    ModelDrivenFormComponent
  ]
})
export class ModelDrivenFormModule { }
