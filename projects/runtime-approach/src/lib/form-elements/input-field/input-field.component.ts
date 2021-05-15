import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FormElement, InputFieldOptions } from '../../model/base-model';

@Component({
    selector: 'lib-input-field',
    templateUrl: './input-field.component.html',
    styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {
    @Input() fControl!: FormControl;
    @Input() element!: FormElement;

    options!: InputFieldOptions;

    constructor() { }

    ngOnInit(): void {
        this.options = this.element.options as InputFieldOptions;
    }

}
