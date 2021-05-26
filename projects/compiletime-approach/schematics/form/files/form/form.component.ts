import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';

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

    ngOnInit() {
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

    private getAbstractControl(id: string, currGroup: FormGroup): AbstractControl {
        const control = currGroup.get(id) as AbstractControl;
        if (control === null || control === undefined) {
            throw new Error("No AbstractControl found for id " + id);
        }
        return control;
    }
}