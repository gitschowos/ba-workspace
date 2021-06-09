import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { FormComponent } from './form.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';



import { ZustandAuswahlComponent } from './zustand-auswahl-group/zustand-auswahl.component';

import { NeuComponent } from './zustand-auswahl-group/neu-checkbox/neu.component';

import { GebrauchtComponent } from './zustand-auswahl-group/gebraucht-checkbox/gebraucht.component';

import { ModellAuswahlComponent } from './modell-auswahl-group/modell-auswahl.component';

import { MarkeComponent } from './modell-auswahl-group/marke-input/marke.component';

import { ModellComponent } from './modell-auswahl-group/modell-input/modell.component';

import { VarianteComponent } from './modell-auswahl-group/variante-input/variante.component';

import { TypAuswahlComponent } from './typ-auswahl-group/typ-auswahl.component';

import { RoadsterComponent } from './typ-auswahl-group/roadster-checkbox/roadster.component';

import { KleinwagenComponent } from './typ-auswahl-group/kleinwagen-checkbox/kleinwagen.component';

import { KombiComponent } from './typ-auswahl-group/kombi-checkbox/kombi.component';

import { LimousineComponent } from './typ-auswahl-group/limousine-checkbox/limousine.component';

import { SportwagenComponent } from './typ-auswahl-group/sportwagen-checkbox/sportwagen.component';

import { SuvComponent } from './typ-auswahl-group/suv-checkbox/suv.component';

import { VanComponent } from './typ-auswahl-group/van-checkbox/van.component';

import { AndereComponent } from './typ-auswahl-group/andere-checkbox/andere.component';

import { SitzplaetzeAuswahlComponent } from './typ-auswahl-group/sitzplaetze-auswahl-group/sitzplaetze-auswahl.component';

import { SitzplatzVonComponent } from './typ-auswahl-group/sitzplaetze-auswahl-group/sitzplatz-von-input/sitzplatz-von.component';

import { SitzplatzBisComponent } from './typ-auswahl-group/sitzplaetze-auswahl-group/sitzplatz-bis-input/sitzplatz-bis.component';


@NgModule({
    declarations: [ 
        FormComponent,
        
        ZustandAuswahlComponent,  
        NeuComponent,  
        GebrauchtComponent,  
        ModellAuswahlComponent,  
        MarkeComponent,  
        ModellComponent,  
        VarianteComponent,  
        TypAuswahlComponent,  
        RoadsterComponent,  
        KleinwagenComponent,  
        KombiComponent,  
        LimousineComponent,  
        SportwagenComponent,  
        SuvComponent,  
        VanComponent,  
        AndereComponent,  
        SitzplaetzeAuswahlComponent,  
        SitzplatzVonComponent,  
        SitzplatzBisComponent,   
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
        MatButtonModule,
        MatExpansionModule
    ],
    exports: [ FormComponent ]
})
export class CtFormModule { }
