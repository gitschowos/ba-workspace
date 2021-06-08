import { NgModule } from '@angular/core';
import { RuntimeApproachComponent } from './runtime-approach.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { CommonModule } from '@angular/common';
import { FormElementsModule } from './form-elements/form-elements.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { MatButtonModule } from '@angular/material/button';



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
      HttpClientModule,
      HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { dataEncapsulation: false }
      ),

      MatButtonModule
  ],
  exports: [
    RuntimeApproachComponent
  ]
})
export class RuntimeApproachModule { }
