import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './form.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

<% for (const i of componentImports) { %>
<%= i %>
<% } %>

@NgModule({
    declarations: [ 
        FormComponent,
        <% for (const i of componentNames) { %>
        <%= i %>,  <% } %> 
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        
        MatExpansionModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule
    ],
    exports: [ FormComponent ]
})
export class CtFormModule { }
