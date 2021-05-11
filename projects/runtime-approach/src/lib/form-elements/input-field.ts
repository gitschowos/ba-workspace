import { BaseOptions, parseAttribute } from "../model/base-model";

// export enum InputFieldType {
//     text,
//     date,
//     time,
//     email,
//     password
// }

// export interface InputFieldOptions extends BaseOptions {
//     inputType: string;
//     placeholder?: string;
//     autocomplete?: string[];
// }

export class InputFieldOptions extends BaseOptions {
    inputType: string;
    placeholder?: string;
    autocomplete?: string[] | string;   //hardcoded array or string with api url

    constructor(source: any) {
        super(source);
        this.inputType = parseAttribute(source, 'inputType', false, 'text');
        this.placeholder = parseAttribute(source, 'placeholder', false, null);
        const autocomplete = parseAttribute(source, 'autocomplete', false, '');
        if(Array.isArray(autocomplete)) {
            const suggestions: string[] = [];
            autocomplete.forEach(suggestion => {
                suggestions.push(suggestion);
            });
            this.autocomplete = suggestions;
        }
        else {
            if(autocomplete !== '') {
                this.autocomplete = autocomplete;
            }
        }
    }
}