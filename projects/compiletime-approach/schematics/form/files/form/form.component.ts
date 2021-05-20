import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'ct-form',
    templateUrl: 'form.component.html'
})
export class FormComponent implements OnInit {
    fGroup = this.fb.group({
        <%= helpers.createFormGroupString(specification.content) %>
    });

    formValue: any;

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit() { }

    onSubmit(): void {
        this.formValue = this.fGroup.value;
    }
}