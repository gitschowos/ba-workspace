import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './input-field/input-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CheckboxComponent } from './checkbox/checkbox.component';


@NgModule({
    declarations: [
        InputFieldComponent,
        CheckboxComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatAutocompleteModule
    ],
    exports: [
        InputFieldComponent,
        CheckboxComponent
    ]
})
export class FormElementsModule { }
