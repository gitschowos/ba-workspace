import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators, FormControl } from '@angular/forms';
import _ from 'lodash';
import { ApiService } from './api.service';

@Component({
    selector: '<%=prefix%>-form',
    templateUrl: 'form.component.html'
})
export class <%=classify(prefix)%>FormComponent implements OnInit {
    fGroup = this.fb.group({
        <%= helpers.createFormGroupString(specification.content) %>
    });

    formValue: any;
    initialValue: any;

    constructor(
        private fb: FormBuilder,
        private httpClient: ApiService
    ) { }

    ngOnInit() {
        this.initialValue = _.cloneDeep(this.fGroup.getRawValue());
        this.setupDisableConditions();
    }

    setupDisableConditions() {
        let res: AbstractControl | null;
        <%= helpers.setupDisableConditions(specification.content, '') %>
    }


    onSubmit(): void {
        if(this.fGroup.valid) {
            this.formValue = this.fGroup.value;
        }
        if((this.fGroup as any).submitted === undefined) {
            (this.fGroup as any).submitted = true;
            this.setSubmitted(this.fGroup);
        }
    }

    onReset(): void {
        this.fGroup.setValue(_.cloneDeep(this.initialValue));
    }

    hasLegalValue(fControlId: string): boolean {
        const control = this.fGroup.get(fControlId);
        if (control === null) {
            console.warn(fControlId + " was not found as control");
            return true;
        }
        else {
            if((control as any).isRequired || control instanceof FormGroup) {
                return control.valid;
            }
            else {
                return control.value !== '' && control.value !== undefined &&
                 control.value !== null && control.value !== false && control.value.length !== 0;
            }
        }
    }

    getFormControl(id: string): FormControl {
        const control = this.fGroup.get(id) as FormControl;
        if (control === null || control === undefined) {
            throw new Error("No FormControl found for id " + id);
        }
        return control;
    }

    getFormGroup(id: string): FormGroup {
        const group = this.fGroup.get(id) as FormGroup;
        if (group === null || group === undefined) {
            throw new Error("No FormGroup found for id " + id);
        }
        return group;
    }

    private getAbstractControl(id: string, currGroup: FormGroup): AbstractControl {
        const control = currGroup.get(id) as AbstractControl;
        if (control === null || control === undefined) {
            throw new Error("No AbstractControl found for id " + id);
        }
        return control;
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