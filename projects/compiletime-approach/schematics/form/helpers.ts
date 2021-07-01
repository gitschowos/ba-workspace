import { strings } from '@angular-devkit/core';
import _ from 'lodash';
import { ChipListOptions, DropdownOptions, FormElement, FormElementOptions, FormElementType, GroupOptions, InputFieldOptions, RadioOptions, Suggestions } from "./base-model";

export const createFormControlString = (element: FormElement): string => {
    const value = element.value === undefined ? getInitialValueString(element) : getValueString(element.value);
    let validator = '';
    if ((element.options as FormElementOptions).required) {
        validator = ', Validators.required';
    }
    return `${strings.camelize(element.id)}: [${value}${validator}],`
};

const getValueString = (value: any): string => {
    let res = '';
    if (Array.isArray(value)) {
        res = '[';
        value.forEach((element) => {
            res += "'" + element + "',";
        });
        res += ']';
    }
    else {
        res = "'" + value + "'";
    }
    return res;
}

const getInitialValueString = (element: FormElement): string => {
    switch (element.type) {
        case FormElementType.dropdown:
            if ((element.options as DropdownOptions).multiple) {
                return "[]";
            }
            return "''";
        case FormElementType.chiplist:
            return "[]";
        default:
            return "''";
    }
}

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

export const createElementsToFill = (elements: FormElement[], prefix: string): string => {
    let result = '';
    for (const element of elements) {
        if (element.type === FormElementType.group) {
            result += createElementsToFill((element.options as GroupOptions).childs, prefix + strings.camelize(element.id) + '.');
            continue;
        }

        let jsonExample = undefined;
        if ((element.options as FormElementOptions).exampleValue !== undefined) {
            jsonExample = (element.options as FormElementOptions).exampleValue;
        }

        let exampleString = 'undefined';
        let possibleValues: string = "[]";
        let options: Suggestions;
        switch (element.type) {
            case FormElementType.checkbox:
                possibleValues = '[true, false]';
                if (jsonExample !== undefined) {
                    exampleString = jsonExample;
                }
                break;

            case FormElementType.radio:
                options = (element.options as RadioOptions).pickingOptions;
                if (options.isHardcoded()) {
                    possibleValues = "['',";
                    for (const value of options.content) {
                        possibleValues += `'${value}',`;
                    }
                    possibleValues += ']';
                }
                else {
                    possibleValues = `'${options.content}'`;
                }
                if (jsonExample !== undefined) {
                    exampleString = `'${jsonExample}'`;
                }
                break;

            case FormElementType.dropdown:
                options = (element.options as DropdownOptions).values;
                if (options.isHardcoded()) {
                    possibleValues = "[";
                    for (let i = 0; i < options.content.length; i++) {
                        if (!(element.options as DropdownOptions).multiple) {
                            possibleValues += `'${options.content[i]}',`;
                        } else {
                            const example = _.sampleSize(options.content, i);
                            possibleValues += '[';
                            example.forEach(exampleValue => { possibleValues += `'${exampleValue}',`; });
                            possibleValues += '],';
                        }
                    }
                    possibleValues += ']';
                }
                else {
                    let resString = options.content;
                    if ((element.options as DropdownOptions).multiple) {
                        resString += '[]';
                    }
                    possibleValues = `'${resString}'`;
                }
                if (jsonExample !== undefined) {
                    exampleString = `'${jsonExample}'`;
                }
                break;

            case FormElementType.input:
                const autocomplete = (element.options as InputFieldOptions).autocomplete;
                if (autocomplete === undefined) {
                    possibleValues = "['','" + generateRandomString() + "']"
                }
                else {
                    options = autocomplete;
                    if (options.isHardcoded()) {
                        possibleValues = "['',";
                        for (const value of options.content) {
                            possibleValues += `'${value}',`;
                        }
                        possibleValues += ']';
                    }
                    else {
                        possibleValues = `'${options.content}'`;
                    }
                }
                if (jsonExample !== undefined) {
                    exampleString = `'${jsonExample}'`;
                }
                break;

            case FormElementType.chiplist:
                options = (element.options as ChipListOptions).suggestions;
                if (options.isHardcoded()) {
                    possibleValues = "[";
                    for (let i = 0; i < options.content.length; i++) {
                        const example = _.sampleSize(options.content, i);
                        possibleValues += '[';
                        example.forEach(exampleValue => { possibleValues += `'${exampleValue}',`; });
                        possibleValues += '],';
                    }
                    possibleValues += ']';
                }
                else {
                    let resString = options.content + '[]';
                    possibleValues = `'${resString}'`;
                }
                if (jsonExample !== undefined) {
                    exampleString = getValueString(jsonExample);
                }
                break;

            default:
                break;
        }

        const formControlString = prefix + strings.camelize(element.id);
        result += `{ control: this.getFormControl('${formControlString}'), possibleValues: ${possibleValues}, exampleValue: ${exampleString}},\n\t\t\t`;

    }
    return result;
}

export const setupDisableConditions = (elements: FormElement[], prefix: string): string => {
    let result = '';
    for (const element of elements) {
        const elementId = strings.camelize(element.id);
        const conditionId = strings.camelize(element.options.activateCond);
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

const generateRandomString = (): string => {
    return Math.random().toString(36).substr(2);
}