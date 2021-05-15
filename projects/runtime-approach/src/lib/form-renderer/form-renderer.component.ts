import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormElement, GroupOptions } from '../model/base-model';

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

    getGroupChilds(element: FormElement): FormElement[] {
        return (element.options as GroupOptions).childs;
    }

    isDisplayed(element: FormElement): boolean {
        const cond = element.options.displayCond;
        if (cond === '') {
            return true;
        }

        const control = this.fGroup.get(cond);
        if (control === null) {
            console.warn(cond + " was not found as control");
            return true;
        }
        else {
            return control.valid;
        }
    }
}
