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
    for (let element of elements) {
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