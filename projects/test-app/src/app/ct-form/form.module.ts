import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { FormComponent } from './form.component';
import { InMemoryDataService } from './in-memory-data.service';


import { AGroupComponent } from './a-group-group/a-group.component';

import { Text1Component } from './a-group-group/text1-input/text1.component';

import { Text2Component } from './a-group-group/text2-input/text2.component';

import { Text3Component } from './text3-input/text3.component';

import { Checkbox1Component } from './checkbox1-checkbox/checkbox1.component';

import { Text4Component } from './text4-input/text4.component';

import { Checkbox2Component } from './checkbox2-checkbox/checkbox2.component';


@NgModule({
    declarations: [ 
        FormComponent,
        
        AGroupComponent,  
        Text1Component,  
        Text2Component,  
        Text3Component,  
        Checkbox1Component,  
        Text4Component,  
        Checkbox2Component,   
    ],
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
export class CtFormModule { }
