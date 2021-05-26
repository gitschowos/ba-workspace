import { strings } from '@angular-devkit/core';
import { FormElement, FormElementOptions, FormElementType, GroupOptions } from "./base-model";

export const createFormControlString = (element: FormElement): string => {
    const value = element.value === undefined ? "''" : `'${element.value}'`;
    let validator = '';
    if ((element.options as FormElementOptions).required) {
        validator = ', Validators.required';
    }
    return `${strings.camelize(element.id)}: [${value}${validator}],`
};

export const createFormGroupString = (elements: FormElement[]): string => {
    let result = '';
    for (const element of elements) {
        if (element.type === FormElementType.group) {
            result += strings.camelize(element.id) + ': this.fb.group({\n';
            result += createFormGroupString((element.options as GroupOptions).childs);
            result += '}),\n';
        }
        else {
            result += createFormControlString(element) + '\n';
        }
    }
    return result;
};

export const setupDisableConditions = (elements: FormElement[], prefix: string): string => {
    let result = '';
    for (const element of elements) {
        const elementId = strings.camelize(element.id);
        const conditionId = strings.camelize(element.options.acticateCond);
        if (conditionId !== '') {
            result += `
            res = this.fGroup.get('${prefix + elementId}');
            if(res !== null) {
                const control = res;
                const activateControl = this.getAbstractControl('${prefix + conditionId}', this.fGroup);
                activateControl.statusChanges.subscribe(() => {
                    if (this.hasLegalValue('${prefix + conditionId}')) {
                        control.enable();
                    } else {
                        control.disable();
                    }
                });
                if(!this.hasLegalValue('${prefix + conditionId}')) {
                    control.disable();
                }
            }
            `;
        }
        if (element.type === FormElementType.group) {
            const newPrefix = prefix + elementId + '.';
            result += setupDisableConditions((element.options as GroupOptions).childs, newPrefix);
        }
    }
    return result;
}