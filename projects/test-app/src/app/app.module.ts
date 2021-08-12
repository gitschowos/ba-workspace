import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ModelDrivenFormModule } from 'ngx-model-driven-form';

import { AppComponent } from './app.component';
import { GenFormModule } from './gen-form/form.module';
import { InMemoryDataService } from './in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';
import { BothComponent } from './views/both/both.component';
import { RuntimeFormComponent } from './runtime-form.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LiveEditorComponent } from './views/live-editor/live-editor.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { CodeEditorModule } from '@ngstack/code-editor';
import { GeneratedFormComponent } from './generated-form.component';


@NgModule({
    declarations: [
        AppComponent,
        BothComponent,
        RuntimeFormComponent,
        LiveEditorComponent,
        GeneratedFormComponent
    ],
    imports: [
        BrowserModule,
        HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService, { dataEncapsulation: false }
        ),
        ReactiveFormsModule,
        GenFormModule,
        ModelDrivenFormModule,
        AppRoutingModule,

        MatToolbarModule,
        MatButtonModule,
        MatInputModule,

        CodeEditorModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
