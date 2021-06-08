import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { FormComponent } from './form.component';
import { InMemoryDataService } from './in-memory-data.service';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


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
        HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService, { dataEncapsulation: false }
            ),
            
            
        MatAutocompleteModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    exports: [ FormComponent ]
})
export class CtFormModule { }
