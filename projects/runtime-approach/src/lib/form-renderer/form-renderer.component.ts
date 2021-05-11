import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputFieldOptions } from '../form-elements/input-field';
import { FormElement, GroupOptions, FormElementType } from '../model/base-model';

@Component({
    selector: 'lib-form-renderer',
    templateUrl: './form-renderer.component.html',
    styleUrls: ['./form-renderer.component.css']
})
export class FormRendererComponent implements OnInit {
    @Input() elements!: FormElement[];
    @Input() fGroup!: FormGroup;

    constructor() { }

    ngOnInit(): void {

    }

    isGroup(element: FormElement) {
        return element.type === FormElementType.group;
    }

    getFormGroup(id: string): FormGroup {
        const group = this.fGroup.get(id) as FormGroup;
        if (group === null || group === undefined) {
            throw new Error("No FormGroup found for id " + id);
        }
        return group;
    }

    getFormControl(id: string): FormControl {
        const control = this.fGroup.get(id) as FormControl;
        if (control === null || control === undefined) {
            throw new Error("No FormControl found for id " + id);
        }
        return control;
    }

    inputFieldOptions(element: FormElement): InputFieldOptions {
        return (element.options as InputFieldOptions);
    }

    groupOptions(element: FormElement): GroupOptions {
        return (element.options as GroupOptions);
    }
}
