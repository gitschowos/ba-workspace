import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormElement, FormElementOptions, FormElementType, GroupOptions, Specification } from './model/base-model';

@Injectable({
    providedIn: 'root'
})
export class CreateFormControlService {

    constructor() { }

    createFormControls(spec: Specification): FormGroup {
        let group: any = {};
        group = this.buildFormControlsR(spec.content, group);

        const formGroup = new FormGroup(group);
        this.setupDisableConditions(spec.content, formGroup);

        return formGroup;
    }

    private buildFormControlsR(elements: FormElement[], group: any): any {
        for (let element of elements) {
            if (element.type === FormElementType.group) {
                group[element.id] =
                    new FormGroup(this.buildFormControlsR((element.options as GroupOptions).childs, {}));
            }
            else {
                if (element.value === undefined) {
                    element.value = '';
                }
    
                if((element.options as FormElementOptions).required) {
                    group[element.id] = new FormControl(element.value, Validators.required);
                    group[element.id].isRequired = true;
                }
                else {
                    group[element.id] = new FormControl(element.value);
                }
            }
        }

        return group;
    }

    private setupDisableConditions(elements: FormElement[], currGroup: FormGroup): void {
        for (let element of elements) {
            const activateControl = this.getActivateControl(element, currGroup);
            if (activateControl === null) {
                continue;
            }
            let formControl = this.getAbstractControl(element.id, currGroup);
            activateControl.statusChanges.subscribe(() => {
                if (activateControl.valid) {
                    formControl.enable();
                } else {
                    formControl.disable();
                }
            });
            if (!activateControl.valid) {
                formControl.disable();
            }

            if (element.type === FormElementType.group) {
                const childGroup = this.getAbstractControl(element.id, currGroup) as FormGroup;
                this.setupDisableConditions((element.options as GroupOptions).childs, childGroup);
            }
        }
    }

    private getActivateControl(element: FormElement, currGroup: FormGroup): AbstractControl | null {

        const cond = element.options.acticateCond;
        if (cond === '') {
            return null;
        }
        const control = currGroup.get(cond);
        if (control === null) {
            console.warn(cond + " was not found as control");
            return null;
        }
        else {
            return control;
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
