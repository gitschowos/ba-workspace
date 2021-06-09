import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { InputFieldComponent } from './input-field/input-field.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DropdownComponent } from './dropdown/dropdown.component';


@NgModule({
    declarations: [
        InputFieldComponent,
        CheckboxComponent,
        DropdownComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ],
    exports: [
        InputFieldComponent,
        CheckboxComponent,
        DropdownComponent
    ]
})
export class FormElementsModule { }
