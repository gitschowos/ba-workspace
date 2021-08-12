import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import _ from 'lodash';
import { CreateFormControlService } from '../create-form-control.service';
import { Specification } from '../model/base-model';

@Component({
    selector: 'lib-dynamic-form',
    templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnChanges {
    @Input() formSpecification!: Specification;
    @Output() submission = new EventEmitter<any>();

    fGroup!: FormGroup;

    initialValue: any;

    constructor(
        private createFormControl: CreateFormControlService,
    ) { }

    ngOnChanges(): void {
        this.fGroup = this.createFormControl.createFormControls(this.formSpecification);
        this.initialValue = _.cloneDeep(this.fGroup.getRawValue());
    }

    onSubmit(): void {
        if(this.fGroup.valid) {
            const value = _.cloneDeep(this.fGroup.value);
            this.submission.emit(value);
        }
        if((this.fGroup as any).submitted === undefined) {
            (this.fGroup as any).submitted = true;
            this.setSubmitted(this.fGroup);
        }
    }

    isSubmitted(): boolean {
        return (this.fGroup as any).submitted !== undefined;
    }

    onReset(): void {
        this.fGroup.setValue(_.cloneDeep(this.initialValue));
    }

    //for the activateControl param of the root renderer
    getDummyControl(): AbstractControl {
        return new FormControl();
    }

    private setSubmitted(group: FormGroup) {
        for (const control of Object.values(group.controls)) {
            (control as any).submitted = true;
            if(control instanceof FormGroup) {
                this.setSubmitted(control);
            }
        }
    }
}
