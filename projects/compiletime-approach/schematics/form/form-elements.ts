import { strings } from '@angular-devkit/core';
import { FormElement, FormElementType, GroupOptions, InputFieldOptions } from "./base-model";

const groupHtmlTemplate = (element: FormElement): string => {
    const options = element.options as GroupOptions;

    let childStrings = '';
    for (const child of options.childs) {
        const template = htmlTemplates.get(child.type);
        if (template) {
            childStrings += template(child) + '\n';
        }
    }

    return `
        <div formGroupName='${strings.camelize(element.id)}'>
        (
        ${element.label}:
        ${childStrings}
        )
        </div>
        <p>
    `;
}

const inputFieldHtmlTemplate = (element: FormElement): string => {
    const options = element.options as InputFieldOptions;

    let autocomplete = '';
    if(options.autocomplete !== undefined) {
        autocomplete += `
            [matAutocomplete]="auto"
        >

        <mat-autocomplete #auto="matAutocomplete">
            <mat-option *ngFor="let option of ${strings.camelize(element.id)}FilteredOptions | async" [value]="option">
                {{option}}
            </mat-option>
        </mat-autocomplete
        `;
    }

    return `
    <p>
        ${element.label}
        <br>
        <input formControlName='${strings.camelize(element.id)}'
            type='${options.inputType}' placeholder='${options.placeholder}'
        ${autocomplete}>
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

const htmlTemplates: Map<FormElementType, (element: FormElement) => string> =
    new Map([
        [FormElementType.group, groupHtmlTemplate],
        [FormElementType.input, inputFieldHtmlTemplate],
        [FormElementType.checkbox, checkboxHtmlTemplate],
    ])

export const getHtmlTemplate = (element: FormElement) => {
    const htmlTemplate = htmlTemplates.get(element.type);
    let templateString = `Template for type ${element.type} not found.`;
    if (htmlTemplate !== undefined) {
        templateString = htmlTemplate(element);
    }

    if (element.options.displayCond === '') {
        return templateString;
    }
    else {
        const fControlId = strings.camelize(element.options.displayCond);
        return `
        <div *ngIf="hasLegalValue('${fControlId}')">
            ${templateString}
        </div>`;
    }
}