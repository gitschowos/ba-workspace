import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseOptions, FormElement, FormElementOptions, FormElementType, GroupOptions, Specification } from './model/base-model';

@Injectable({
    providedIn: 'root'
})
export class CreateFormControlService {

    constructor() { }

    createFormControls(spec: Specification): FormGroup {
        let group: any = {};

        group = this.buildFormControlsR(spec.content, group);

        return new FormGroup(group);
    }

    private buildFormControlsR(elements: FormElement[], group: any): any {
        for (let element of elements) {
            if(element.type === FormElementType.group) {
                group[element.id] = 
                new FormGroup(this.buildFormControlsR((element.options as GroupOptions).childs, {}));
            }
            else {
                if(element.value === undefined) {
                    element.value = '';
                }
                group[element.id] = (element.options as FormElementOptions).required
                    ? new FormControl(element.value, Validators.required)
                    : new FormControl(element.value);
            }
        }

        return group;
    }
}
