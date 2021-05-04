import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RuntimeApproachModule } from 'runtime-approach';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RuntimeApproachModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
