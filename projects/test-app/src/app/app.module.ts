import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RuntimeApproachModule } from 'runtime-approach';

import { AppComponent } from './app.component';
import { CtFormModule } from './ct-form/form.module';
import { InMemoryDataService } from './in-memory-data.service';
import { PrebuildFormModule } from './prebuild-form/prebuild-form.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService, { dataEncapsulation: false }
        ),

        PrebuildFormModule,
        RuntimeApproachModule,
        CtFormModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
