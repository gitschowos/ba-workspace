export enum FormElementType {
    group = 'group',
    input = 'input'
}

export class BaseOptions {
    required: boolean;
    displayCond: string;   // id of the FormElement to be valid for displaying
    acticateCond: string;  // id of the FormElement to be valid for activating
    styling: string;

    constructor(source: any) {
        this.required = parseAttribute(source, 'required', false, false);
        this.displayCond = parseAttribute(source, 'displayCond', false, '');
        this.acticateCond = parseAttribute(source, 'acticateCond', false, '');
        this.styling = parseAttribute(source, 'styling', false, '');
    }
}

export class GroupOptions {
    childs: FormElement[];

    constructor(source: any) {
        if(!Array.isArray(source)) {
            throw new Error("childs must be a group");
        }
        this.childs = [];
        for (let child of source) {
            this.childs.push(new FormElement(child));
        }
    }
}

export class FormElement {
    type: FormElementType;
    id: string;
    label: string;
    value: any;
    options: BaseOptions | GroupOptions;

    constructor(source: any) {
        const typeString = parseAttribute(source, 'type', true) as string;
        this.type = (<any>FormElementType)[typeString];

        this.id = parseAttribute(source, 'id', true);
        this.label = parseAttribute(source, 'label', false, this.id);
        this.value = parseAttribute(source, 'value', false, '');

        const options = parseAttribute(source, 'options', true);
        if(options.childs !== undefined) {  // group
            this.options = new GroupOptions(options.childs);
        } else {
            this.options = new BaseOptions(options);
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