import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBaseComponent } from './form-base/form-base.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        FormBaseComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        FormBaseComponent
    ]
})
export class PrebuildFormModule { }
