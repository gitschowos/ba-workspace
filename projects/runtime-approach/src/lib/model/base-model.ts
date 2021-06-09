export enum FormElementType {
    group = 'group',
    input = 'input',
    checkbox = 'checkbox',
    dropdown = 'dropdown',
    radio = 'radio'
}

export abstract class BaseOptions {
    displayCond: string;   // id of the FormElement to be valid for displaying
    activateCond: string;  // id of the FormElement to be valid for activating

    constructor(source: any) {
        this.displayCond = parseAttribute(source, 'displayCond', false, '');
        this.activateCond = parseAttribute(source, 'activateCond', false, '');
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
        if (!Array.isArray(source)) {
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
    autocomplete?: Suggestions;
    constructor(source: any) {
        super(source);
        this.inputType = parseAttribute(source, 'inputType', false, 'text');
        this.placeholder = parseAttribute(source, 'placeholder', false, '') as string;
        const autocomplete = parseAttribute(source, 'autocomplete', false, '');
        if (autocomplete !== '') {
            this.autocomplete = new Suggestions(autocomplete);
        }
    }
}

export class DropdownOptions extends FormElementOptions {
    values: Suggestions;
    multiple: boolean

    constructor(source: any) {
        super(source);
        const values = parseAttribute(source, 'values', true);
        this.values = new Suggestions(values);
        this.multiple = parseAttribute(source, 'multiple', false, false) as boolean;
    }
}

export class RadioOptions extends FormElementOptions {
    pickingOptions: Suggestions;

    constructor(source: any) {
        super(source);
        const values = parseAttribute(source, 'pickingOptions', true);
        this.pickingOptions = new Suggestions(values);
    }
}

export class CheckboxOptions extends FormElementOptions {

    constructor(source: any) {
        super(source);
    }
}

export class Suggestions {
    content: string[] | string;     //hardcoded array or string with api url

    constructor(source: any) {
        this.content = [];
        if (Array.isArray(source)) {
            source.forEach(value => {
                (this.content as string[]).push(value);
            });
        }
        else if (typeof source === 'string') {
            this.content = source as string;
        }
        else {
            throw new Error(source + " is not a valid value for suggestions.");
        }
    }

    isHardcoded(): boolean {
        return Array.isArray(this.content);
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

        switch (this.type) {
            case FormElementType.group:
                this.options = new GroupOptions(options);
                break;
            case FormElementType.input:
                this.options = new InputFieldOptions(options);
                break;
            case FormElementType.checkbox:
                this.options = new CheckboxOptions(options);
                break;
            case FormElementType.dropdown:
                this.options = new DropdownOptions(options);
                break;
            case FormElementType.radio:
                this.options = new RadioOptions(options);
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
        if (!Array.isArray(content)) {
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