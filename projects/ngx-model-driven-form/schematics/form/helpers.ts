import { strings } from '@angular-devkit/core';
import _ from 'lodash';
import { ChipListOptions, DropdownOptions, FormElement, FormElementOptions, FormElementType, GroupOptions, InputFieldOptions, RadioOptions, Suggestions, TableOptions } from "./base-model";

export const createFormControlString = (element: FormElement, camelize: boolean = true): string => {
    const value = (element.options as FormElementOptions).value === undefined ? getInitialValueString(element) : getValueString((element.options as FormElementOptions).value);
    let validator = ', [';
    if ((element.options as FormElementOptions).required) {
        validator += 'Validators.required, ';
    }
    if (element.type === FormElementType.input) {
        const regex = (element.options as InputFieldOptions).validatorRegex;
        if (regex !== undefined) {
            validator += String.raw`Validators.pattern(${JSON.stringify(regex)})`; //JSON.stringify to keep the backslashs instead of escaping
        }
    }
    validator += ']';
    return `'${camelize ? strings.camelize(element.id) : element.id}': [${value}${validator}],`
};

const getValueString = (value: any): string => {
    let res = '';
    if (Array.isArray(value)) {
        res = '[';
        value.forEach((element) => {
            res += getValueString(element) + ',';
        });
        res += ']';
    }
    else if (typeof (value) === 'object') {
        res = '{';
        Object.keys(value).forEach((key) => {
            res += "'" + key + "': " + getValueString(value[key]) + ',';
        })
        res += '}';
    }
    else {
        res = "'" + value + "'";
    }
    return res;
}

const getInitialValueString = (element: FormElement): string => {
    switch (element.type) {
        case FormElementType.checkbox:
            return "false";
        case FormElementType.dropdown:
            if ((element.options as DropdownOptions).multiple) {
                return "[]";
            }
            return "''";
        case FormElementType.chiplist:
            return "[]";
        case FormElementType.table:
            return "[]";
        default:
            return "''";
    }
}

export const createFormGroupString = (elements: FormElement[], camelize: boolean = true): string => {
    let result = '';
    for (const element of elements) {
        if (element.type === FormElementType.group) {
            result += camelize ? strings.camelize(element.id) : element.id;
            result += ': this.fb.group({\n';
            result += createFormGroupString((element.options as GroupOptions).childs);
            result += '}),\n';
        }
        else {
            result += createFormControlString(element, camelize) + '\n';
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
        else if (element.type === FormElementType.table) {
            const options = element.options as TableOptions;

            let possibleValues = '{';
            for (const column of options.columns) {
                const possibleValuesAndExampleStrings = getPossibleAndExampleValues(column);
                possibleValues += `'${column.id}':{possibleValues: ${possibleValuesAndExampleStrings.possibleValues},`;
                possibleValues += `exampleValue: ${possibleValuesAndExampleStrings.exampleString}},`;
            }
            possibleValues += '}';

            const jsonExample = (element.options as FormElementOptions).exampleValue;
            const exampleString = jsonExample === undefined ? 'undefined' : getValueString(jsonExample);

            const formControlString = prefix + strings.camelize(element.id);
            result += `{ control: this.getFormControl('${formControlString}'), possibleValues: ${possibleValues}, exampleValue: ${exampleString}},\n\t\t\t`;
        }
        else {
            const resultStrings = getPossibleAndExampleValues(element);
            const formControlString = prefix + strings.camelize(element.id);
            result += `{ control: this.getFormControl('${formControlString}'), possibleValues: ${resultStrings.possibleValues}, exampleValue: ${resultStrings.exampleString}},\n\t\t\t`;
        }
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

export const setupTableDisableConditions = (elements: FormElement[]): string => {
    let result = 'let res: AbstractControl | null;';
    for (const element of elements) {
        const elementId = element.id;
        const conditionId = element.options.activateCond;
        if (conditionId !== '') {
            result += `
            res = this.inputRowFormGroup.get('${elementId}');
            if(res !== null) {
                const control = res;
                const activateControl = this.getFormControl('${conditionId}');
                activateControl.statusChanges.subscribe(() => {
                    if (this.hasLegalValue('${conditionId}')) {
                        control.enable();
                    } else {
                        control.disable();
                    }
                });
                if(!this.hasLegalValue('${conditionId}')) {
                    control.disable();
                }
            }
            `;
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

function getPossibleAndExampleValues(element: FormElement) {
    let exampleString = 'undefined';
    let possibleValueString: string = "[]";

    const required = (element.options as FormElementOptions).required;

    let jsonExample = undefined;
    if ((element.options as FormElementOptions).exampleValue !== undefined) {
        jsonExample = (element.options as FormElementOptions).exampleValue;
    }
    let options: Suggestions;
    switch (element.type) {
        case FormElementType.checkbox:
            possibleValueString = required ? '[true]' : '[true, false]';
            if (jsonExample !== undefined) {
                exampleString = jsonExample;
            }
            break;

        case FormElementType.radio:
            options = (element.options as RadioOptions).pickingOptions;
            if (options.isHardcoded()) {
                const exampleValues = _.cloneDeep(options.content as string[]);
                if (!required) {
                    exampleValues.push('');
                }
                possibleValueString = getValueString(exampleValues);
            }
            else {
                possibleValueString = `'${options.content}'`;
            }
            if (jsonExample !== undefined) {
                exampleString = `'${jsonExample}'`;
            }
            break;

        case FormElementType.dropdown:
            options = (element.options as DropdownOptions).values;
            if (options.isHardcoded()) {
                possibleValueString = "[";
                for (let i = 0; i < options.content.length; i++) {
                    if (!(element.options as DropdownOptions).multiple) {
                        possibleValueString += `'${options.content[i]}',`;
                    } else {
                        const n = required ? i + 1 : i;
                        const example = _.sampleSize(options.content, n);
                        possibleValueString += getValueString(example) + ',';
                    }
                }
                possibleValueString += ']';
            }
            else {
                let resString = options.content;
                if ((element.options as DropdownOptions).multiple) {
                    resString += '[]';
                }
                possibleValueString = `'${resString}'`;
            }
            if (jsonExample !== undefined) {
                exampleString = `'${jsonExample}'`;
            }
            break;

        case FormElementType.input:
            const autocomplete = (element.options as InputFieldOptions).autocomplete;
            if (autocomplete === undefined) {
                const possibleValues = [];
                if ((element.options as InputFieldOptions).validatorRegex === undefined) {
                    possibleValues.push(generateRandomString());
                }
                if (!required) {
                    possibleValues.push('');
                }
                possibleValueString = getValueString(possibleValues);
            }
            else {
                options = autocomplete;
                if (options.isHardcoded()) {
                    const exampleValues = _.cloneDeep(options.content as string[]);
                    if (!required) {
                        exampleValues.push('');
                    }
                    possibleValueString = getValueString(exampleValues);
                }
                else {
                    possibleValueString = `'${options.content}'`;
                }
            }
            if (jsonExample !== undefined) {
                exampleString = `'${jsonExample}'`;
            }
            break;

        case FormElementType.chiplist:
            options = (element.options as ChipListOptions).suggestions;
            if (options.isHardcoded()) {
                possibleValueString = "[";
                for (let i = required ? 1 : 0; i < options.content.length; i++) {
                    const example = _.sampleSize(options.content, i);
                    possibleValueString += getValueString(example) + ',';
                }
                possibleValueString += ']';
            }
            else {
                let resString = options.content + '[]';
                possibleValueString = `'${resString}'`;
            }
            if (jsonExample !== undefined) {
                exampleString = getValueString(jsonExample);
            }
            break;

        default:
            break;
    }
    return { possibleValues: possibleValueString, exampleString };
}
