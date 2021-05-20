import { strings } from '@angular-devkit/core'; 
import { FormElement, FormElementType, GroupOptions, InputFieldOptions } from "./base-model";

const groupHtmlTemplate = (element: FormElement): string => {
    const options = element.options as GroupOptions;

    let childStrings = '';
    for (const child of options.childs) {
        const template = htmlTemplates.get(child.type);
        if(template) {
            childStrings += template(child) + '\n';
        }
    }

    return `
    <p>
        <div formGroupName='${strings.camelize(element.id)}'>
        (
        ${element.label}:
        ${childStrings}
        )
        </div>
    `;
}

const inputFieldHtmlTemplate = (element: FormElement): string => {
    const options = element.options as InputFieldOptions;

    return `
    <p>
        ${element.label}
        <br>
        <input formControlName='${strings.camelize(element.id)}'
            type='${options.inputType}' placeholder='${options.placeholder}'
        >
    </p>`;
}

const checkboxHtmlTemplate = (element: FormElement): string => {
    //const options = element.options as CheckboxOptions;

    return `
    <p>
        <input formControlName='${strings.camelize(element.id)}'
            type='checkbox'
        >
        ${element.label}
    </p>`;
}

export const htmlTemplates: Map<FormElementType, (element: FormElement) => string> = 
new Map([
    [FormElementType.group, groupHtmlTemplate],
    [FormElementType.input, inputFieldHtmlTemplate],
    [FormElementType.checkbox, checkboxHtmlTemplate],
])