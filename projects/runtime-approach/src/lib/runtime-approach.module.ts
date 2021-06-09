import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RuntimeApproachComponent } from './runtime-approach.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { FormElementsModule } from './form-elements/form-elements.module';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    RuntimeApproachComponent,
    DynamicFormComponent,
    FormRendererComponent
  ],
  imports: [
      CommonModule,
      ReactiveFormsModule,
      FormElementsModule,
      BrowserAnimationsModule,
      HttpClientModule,
      HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { dataEncapsulation: false }
      ),

      MatButtonModule,
      MatExpansionModule
  ],
  exports: [
    RuntimeApproachComponent
  ]
})
export class RuntimeApproachModule { }
