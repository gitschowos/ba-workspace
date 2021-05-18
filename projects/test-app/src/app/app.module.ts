import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RuntimeApproachModule } from 'runtime-approach';

import { AppComponent } from './app.component';
import { PrebuildFormModule } from './prebuild-form/prebuild-form.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        PrebuildFormModule,
        RuntimeApproachModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
