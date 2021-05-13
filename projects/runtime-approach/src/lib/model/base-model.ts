export enum FormElementType {
    group = 'group',
    input = 'input'
}

export abstract class BaseOptions {
    displayCond: string;   // id of the FormElement to be valid for displaying
    acticateCond: string;  // id of the FormElement to be valid for activating

    constructor(source: any) {
        this.displayCond = parseAttribute(source, 'displayCond', false, '');
        this.acticateCond = parseAttribute(source, 'acticateCond', false, '');
    }
}

export abstract class FormElementOptions extends BaseOptions {
    styling: string;
    required: boolean;

    constructor(source: any) {
        super(source);
        this.required = parseAttribute(source, 'required', false, false);
        this.styling = parseAttribute(source, 'styling', false, '');
    }
}

export class GroupOptions extends BaseOptions {
    childs: FormElement[];

    constructor(source: any) {
        super(source);
        source = parseAttribute(source, 'childs', true);
        if(!Array.isArray(source)) {
            throw new Error("childs must be an array");
        }
        this.childs = [];
        for (let child of source) {
            this.childs.push(new FormElement(child));
        }
    }
}

export class InputFieldOptions extends FormElementOptions {
    inputType: string;
    placeholder: string;
    autocomplete?: string[] | string;   //hardcoded array or string with api url

    constructor(source: any) {
        super(source);
        this.inputType = parseAttribute(source, 'inputType', false, 'text');
        this.placeholder = parseAttribute(source, 'placeholder', false, '') as string;
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

export class FormElement {
    type: FormElementType;
    id: string;
    label: string;
    value: any;
    options: BaseOptions;

    constructor(source: any) {
        const typeString = parseAttribute(source, 'type', true) as string;
        this.type = (<any>FormElementType)[typeString];

        this.id = parseAttribute(source, 'id', true);
        this.label = parseAttribute(source, 'label', false, this.id);
        this.value = parseAttribute(source, 'value', false, '');

        const options = parseAttribute(source, 'options', true);

        switch(this.type) {
            case FormElementType.group:
                this.options = new GroupOptions(options);
                break;
            case FormElementType.input:
                this.options = new InputFieldOptions(options);
                break;
            default:
                throw new Error(typeString + " is not supported");
        }
    }
}

export class Specification {
    title: string;
    content: FormElement[];
    showClearButton: boolean;
    showResetButton: boolean;

    constructor(source: any) {
        this.title = parseAttribute(source, 'title', false, '');
        
        this.showClearButton = parseAttribute(source, 'showClearButton', false, false);
        this.showResetButton = parseAttribute(source, 'showResetButton', false, false);

        const content = parseAttribute(source, 'content', true);
        let elements: FormElement[] = [];
        if(!Array.isArray(content)) {
            throw new Error("content attribute must be an array of FormElements.");
        }
        content.forEach(element => {
            elements.push(new FormElement(element));
        });
        this.content = elements;
    }
}

export const parseAttribute = (source: any, attribute: string, critical: boolean, defaultValue: any = undefined): any => {
    if (source[attribute] !== undefined) {
        return source[attribute];
    }
    else {
        if (critical) {
            throw new Error("Invalid json attribute: " + attribute);
        } else {
            return defaultValue;
        }
    }
}