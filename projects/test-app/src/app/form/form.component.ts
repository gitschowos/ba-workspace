import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'ct-form',
    templateUrl: 'form.component.html'
})
export class FormComponent implements OnInit {
    fGroup = this.fb.group({
        aGroup: this.fb.group({
text1: ['', Validators.required],
text2: ['meine@email.de'],
}),
text3: ['', Validators.required],
checkbox1: [''],
text4: [''],
checkbox2: ['', Validators.required],

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