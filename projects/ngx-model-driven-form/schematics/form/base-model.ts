export enum FormElementType {
    group = 'group',
    input = 'input',
    checkbox = 'checkbox',
    dropdown = 'dropdown',
    radio = 'radio',
    chiplist = 'chiplist',
    table = 'table'
}

export abstract class BaseOptions {
    readonly displayCond: string;   // id of the FormElement to be valid for displaying
    readonly activateCond: string;  // id of the FormElement to be valid for activating

    constructor(source: any) {
        this.displayCond = parseAttribute(source, 'displayCond', false, '');
        this.activateCond = parseAttribute(source, 'activateCond', false, '');
    }
}

export abstract class FormElementOptions extends BaseOptions {
    readonly value: any;
    readonly styling: string;
    readonly required: boolean;
    readonly requiredErrorMessage: string;
    readonly exampleValue?: any;

    constructor(source: any) {
        super(source);
        this.value = parseAttribute(source, 'value', false, undefined);
        this.styling = parseAttribute(source, 'styling', false, '');
        this.required = parseAttribute(source, 'required', false, false);
        this.requiredErrorMessage = parseAttribute(source, 'requiredErrorMessage', false, this.required ? 'Bitte ausfüllen' : '');
        this.exampleValue = parseAttribute(source, 'exampleValue', false, undefined);
    }
}

export class GroupOptions extends BaseOptions {
    readonly childs: FormElement[];

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
    readonly inputType: string;
    readonly placeholder: string;
    readonly autocomplete?: Suggestions;
    readonly validatorRegex?: string;
    readonly validatorErrorMessage: string;

    constructor(source: any) {
        super(source);
        this.inputType = parseAttribute(source, 'inputType', false, 'text');
        this.placeholder = parseAttribute(source, 'placeholder', false, '') as string;
        const autocomplete = parseAttribute(source, 'autocomplete', false, '');
        if (autocomplete !== '') {
            this.autocomplete = new Suggestions(autocomplete);
        }
        this.validatorRegex = parseAttribute(source, 'validatorRegex', false, undefined);
        this.validatorErrorMessage = parseAttribute(source, 'validatorErrorMessage', false, 'ungültig');
    }
}

export class DropdownOptions extends FormElementOptions {
    readonly values: Suggestions;
    readonly multiple: boolean

    constructor(source: any) {
        super(source);
        const values = parseAttribute(source, 'values', true);
        this.values = new Suggestions(values);
        this.multiple = parseAttribute(source, 'multiple', false, false) as boolean;
    }
}

export class RadioOptions extends FormElementOptions {
    readonly pickingOptions: Suggestions;

    constructor(source: any) {
        super(source);
        const values = parseAttribute(source, 'pickingOptions', true);
        this.pickingOptions = new Suggestions(values);
    }
}

export class CheckboxOptions extends FormElementOptions {
    readonly showAsSwitch: boolean;

    constructor(source: any) {
        super(source);
        this.showAsSwitch = parseAttribute(source, 'showAsSwitch', false, false) as boolean;
    }
}

export class ChipListOptions extends FormElementOptions {
    readonly suggestions: Suggestions;
    readonly placeholder: string;
    readonly removable: boolean;
    readonly onlySuggestions: boolean;

    constructor(source: any) {
        super(source);
        const suggestions = parseAttribute(source, 'suggestions', true);
        this.suggestions = new Suggestions(suggestions);
        this.placeholder = parseAttribute(source, 'placeholder', false, '');
        this.removable = parseAttribute(source, 'removable', false, true);
        this.onlySuggestions = parseAttribute(source, 'onlySuggestions', false, false);
    }
}

export class TableOptions extends FormElementOptions {
    readonly columns: FormElement[];
    readonly deletable: boolean;

    constructor(source: any) {
        super(source);
        this.deletable = parseAttribute(source, 'deletable', false, true) as boolean;
        const fields = parseAttribute(source, 'columns', true);
        if (!Array.isArray(fields)) {
            throw new Error("childs must be an array");
        }
        this.columns = [];
        for (let column of fields) {
            const element = new FormElement(column)
            if(element.type === FormElementType.group || element.type === FormElementType.table) {
                throw new Error(column + 'no group or table allowed in a table.');
            }
            this.columns.push(element);
        }
    }
}

export class Suggestions {
    readonly content: string[] | string;     //hardcoded array or string with api url

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
    readonly type: FormElementType;
    readonly id: string;
    readonly label: string;
    readonly options: BaseOptions;

    constructor(source: any) {
        const typeString = parseAttribute(source, 'type', true) as string;
        this.type = (<any>FormElementType)[typeString];

        this.id = parseAttribute(source, 'id', true);
        this.label = parseAttribute(source, 'label', false, this.id);

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
            case FormElementType.chiplist:
                this.options = new ChipListOptions(options);
                break;
            case FormElementType.table:
                this.options = new TableOptions(options);
                break;
            default:
                throw new Error("Element Type: " + typeString + " is not supported");
        }
    }
}

export class Specification {
    readonly title: string;
    readonly content: FormElement[];
    readonly showClearButton: boolean;
    readonly showResetButton: boolean;
    readonly showExampleFiller: boolean;

    constructor(source: any) {
        this.title = parseAttribute(source, 'title', false, '');

        this.showClearButton = parseAttribute(source, 'showClearButton', false, false);
        this.showResetButton = parseAttribute(source, 'showResetButton', false, false);
        this.showExampleFiller = parseAttribute(source, 'showExampleFiller', false, false);

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
            throw new Error("Missing json attribute: " + attribute);
        } else {
            return defaultValue;
        }
    }
}