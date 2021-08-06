import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: '<%=prefix%>-<%= dasherize(element.id) %>',
    templateUrl: './<%= dasherize(element.id) %>.component.html',
    styles: [".group-title { font-weight: bold; }"]
})
export class <%= classify(element.id) %>Component implements OnInit {
    @Input() fGroup!: FormGroup;
    
    constructor() { }

    ngOnInit(): void {
    }

    getFormControl(id: string): FormControl {
        const control = this.fGroup.get(id) as FormControl;
        if (control === null || control === undefined) {
            throw new Error("No FormControl found for id " + id);
        }
        return control;
    }

    getFormGroup(id: string): FormGroup {
        const group = this.fGroup.get(id) as FormGroup;
        if (group === null || group === undefined) {
            throw new Error("No FormGroup found for id " + id);
        }
        return group;
    }

    hasLegalValue(fControlId: string): boolean {
        const control = this.fGroup.get(fControlId);
        if (control === null) {
            console.warn(fControlId + " was not found as control");
            return true;
        }
        else {
            if((control as any).isRequired || control instanceof FormGroup) {
                return control.valid;
            }
            else {
                return control.value !== '' && control.value !== undefined &&
                 control.value !== null && control.value !== false && control.value.length !== 0;
            }
        }
    }
}
