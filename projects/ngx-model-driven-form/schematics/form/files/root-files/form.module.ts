import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { <%=classify(prefix)%>FormComponent } from './form.component';

import {┬áMatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

<% for (const i of componentImports) { %>
<%= i %> <% } %>

@NgModule({
    declarations: [ 
        <%=classify(prefix)%>FormComponent,
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
        MatRadioModule,
        MatDividerModule,
        MatChipsModule,
        MatIconModule,
        MatTableModule
    ],
    exports: [ <%=classify(prefix)%>FormComponent ]
})
export class <%=classify(prefix)%>FormModule { }
