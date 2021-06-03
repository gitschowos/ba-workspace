import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
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
    initialValue: any;

    constructor(
        private createFormControl: CreateFormControlService
    ) { }

    ngOnInit(): void {
        this.fGroup = this.createFormControl.createFormControls(this.formSpecification);
        //console.log(this.fGroup.value);
        this.formValue = "";
        this.initialValue = this.fGroup.getRawValue();
    }

    onSubmit(): void {
        this.formValue = this.fGroup.value;
    }

    onReset(): void {
        this.fGroup.setValue(this.initialValue);
    }

    //for the activateControl param of the root renderer
    getDummyControl(): AbstractControl {
        return new FormControl();
    }
}
