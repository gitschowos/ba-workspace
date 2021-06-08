import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InputFieldComponent } from './input-field/input-field.component';
import { CheckboxComponent } from './checkbox/checkbox.component';


@NgModule({
    declarations: [
        InputFieldComponent,
        CheckboxComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [
        InputFieldComponent,
        CheckboxComponent
    ]
})
export class FormElementsModule { }
