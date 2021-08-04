import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './ct-form/form.component';
import { RuntimeFormComponent } from './runtime-form.component';
import { BothComponent } from './views/both/both.component';
import { LiveEditorComponent } from './views/live-editor/live-editor.component';

const routes: Routes = [
    { path: 'runtime', component: RuntimeFormComponent },
    { path: 'generated', component: FormComponent },
    { path: 'both', component: BothComponent },
    { path: 'editor', component: LiveEditorComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
