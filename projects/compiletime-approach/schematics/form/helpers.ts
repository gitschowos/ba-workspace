import { strings } from '@angular-devkit/core';
import { FormElement, FormElementOptions, FormElementType, GroupOptions, InputFieldOptions } from "./base-model";

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

export const autoCompleteFields = (elements: FormElement[]): string => {
    let result = '';
    for (const element of elements) {
        if (element.type === FormElementType.group) {
            result += autoCompleteFields((element.options as GroupOptions).childs);
            continue;
        }
        switch (element.type) {
            case FormElementType.input:
                if ((element.options as InputFieldOptions).autocomplete === undefined) {
                    break;
                }
                result += `
                ${strings.camelize(element.id)}Options: string[] = [];
                ${strings.camelize(element.id)}FilteredOptions!: Observable<string[]>;
                `;
                break;
            default:
                break;
        }
    }
    return result;
}

export const autoCompleteSetup = (elements: FormElement[], prefix: string): string => {
    let result = '';
    for (const element of elements) {
        if (element.type === FormElementType.group) {
            result += autoCompleteSetup((element.options as GroupOptions).childs, prefix + element.id + '.');
            continue;
        }
        switch (element.type) {
            case FormElementType.input:
                const autocomplete = (element.options as InputFieldOptions).autocomplete;
                if (autocomplete === undefined) {
                    break;
                }
                const optionsName = `this.${strings.camelize(element.id)}Options`;
                const filteredOptionsName = `this.${strings.camelize(element.id)}FilteredOptions`;
                if (autocomplete.isHardcoded()) {
                    let arrayString = '';
                    let first = true;
                    for (const property of autocomplete.content as string[]) {
                        arrayString += first ? '' : ', ';
                        first = false;

                        arrayString += "'" + property + "'";
                    }
                    result += `
                    ${optionsName} = [ ${arrayString}];
                    `;
                }
                else {
                    result += `
                    this.httpClient.getSuggestions('${autocomplete.content}').subscribe(
                        suggestions => {
                            ${optionsName} = suggestions
                            //this.fControl.setValue(this.fControl.value);
                        }
                    );
                    `;
                }
                result += `
                const fControl = this.fGroup.get('${prefix + strings.camelize(element.id)}');
                if (fControl !== null) {
                    ${filteredOptionsName} = fControl.valueChanges.pipe(
                        startWith(''),
                        map(value => ${optionsName}.filter(option => option.toLowerCase().includes(value.toLowerCase())))
                    );
                }
                `;   
                break;
            default:
                break;
        }
    }
    return result;
}