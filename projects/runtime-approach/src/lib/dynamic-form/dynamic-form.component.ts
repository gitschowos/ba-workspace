import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreateFormControlService } from '../create-form-control.service';
import { Specification } from '../model/base-model';

@Component({
    selector: 'lib-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
    @Input() formSpecification!: Specification;

    fGroup!: FormGroup;

    formValue: any;

    constructor(
        private createFormControl: CreateFormControlService
    ) { }

    ngOnInit(): void {
        this.fGroup = this.createFormControl.createFormControls(this.formSpecification);
        console.log(this.fGroup.value);
        this.formValue = "";
    }

    onSubmit(): void {
        this.formValue = this.fGroup.value;
    }
}
