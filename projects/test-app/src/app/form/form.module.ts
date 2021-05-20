import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { FormComponent } from './form.component';

@NgModule({
    declarations: [ FormComponent ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        // HttpClientInMemoryWebApiModule.forRoot(
        //     InMemoryDataService, { dataEncapsulation: false }
        // )
    ],
    exports: [ FormComponent ]
})
export class FormModule { }
