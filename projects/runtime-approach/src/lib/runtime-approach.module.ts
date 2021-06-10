import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RuntimeApproachComponent } from './runtime-approach.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { FormElementsModule } from './form-elements/form-elements.module';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormFillerComponent } from './form-filler/form-filler.component';

@NgModule({
    declarations: [
        RuntimeApproachComponent,
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
        MatExpansionModule
    ],
    exports: [
        RuntimeApproachComponent
    ]
})
export class RuntimeApproachModule { }
