import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { FormComponent } from './form.component';
import { InMemoryDataService } from './in-memory-data.service';

@NgModule({
    declarations: [ FormComponent ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService, { dataEncapsulation: false }
        )
    ],
    exports: [ FormComponent ]
})
export class FormModule { }
