import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from './api.service';

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
        private fb: FormBuilder,
        private httpClient: ApiService
    ) { }

    ngOnInit() {
        this.setupDisableConditions();
    }

    setupDisableConditions() {
        let res: AbstractControl | null;
        <%= helpers.setupDisableConditions(specification.content, '') %>
    }


    onSubmit(): void {
        this.formValue = this.fGroup.value;
    }

    hasLegalValue(fControlId: string): boolean {
        const control = this.fGroup.get(fControlId);
        if (control === null) {
            console.warn(fControlId + " was not found as control");
            return true;
        }
        else {
            if((control as any).isRequired) {
                return control.valid;
            }
            else {
                return control.value !== '' && control.value !== undefined && control.value !== false;
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
}