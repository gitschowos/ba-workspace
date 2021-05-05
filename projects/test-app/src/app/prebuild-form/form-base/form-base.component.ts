import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'prebuild-form-base',
    templateUrl: './form-base.component.html',
    styleUrls: ['./form-base.component.css']
})
export class FormBaseComponent implements OnInit {
    rootGroup: FormGroup = this.fb.group({
        lastname: [''],
        gender: [''],
        accept: [''],
    });

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
    }

    onSubmit(): void {
        console.log(this.rootGroup.value);
    }
}
