import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { InputFieldComponent } from './input-field/input-field.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { RadioComponent } from './radio/radio.component';
import { ChiplistComponent } from './chiplist/chiplist.component';
import { TableComponent } from './table/table.component';
import { FormElementRendererComponent } from './form-element-renderer/form-element-renderer.component';


@NgModule({
    declarations: [
        InputFieldComponent,
        CheckboxComponent,
        DropdownComponent,
        FormElementRendererComponent,
        RadioComponent,
        ChiplistComponent,
        TableComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatChipsModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule
    ],
    exports: [
        InputFieldComponent,
        CheckboxComponent,
        DropdownComponent,
        FormElementRendererComponent,
        RadioComponent,
        ChiplistComponent,
        TableComponent
    ]
})
export class FormElementsModule { }
