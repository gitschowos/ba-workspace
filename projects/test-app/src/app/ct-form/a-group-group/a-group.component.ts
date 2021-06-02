import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'ct-a-group',
    templateUrl: './a-group.component.html'
})
export class AGroupComponent implements OnInit {
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
}