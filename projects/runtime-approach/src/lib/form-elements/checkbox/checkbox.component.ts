import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CheckboxOptions, FormElement } from '../../model/base-model';

@Component({
    selector: 'lib-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
    @Input() fControl!: FormControl;
    @Input() element!: FormElement;
    
    options!: CheckboxOptions;

    constructor() { }

    ngOnInit(): void {
        this.options = this.element.options as CheckboxOptions;
    }
}
