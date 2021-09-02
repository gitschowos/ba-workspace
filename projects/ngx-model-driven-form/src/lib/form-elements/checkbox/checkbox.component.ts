import { Component, OnInit } from '@angular/core';
import { CheckboxOptions } from '../../model/base-model';
import { BaseElement } from '../base-element';

@Component({
    selector: 'lib-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent extends BaseElement implements OnInit {

    options!: CheckboxOptions;

    constructor() { super(); }

    ngOnInit(): void {
        this.options = this.element.options as CheckboxOptions;
    }

    requiredError(): boolean {
        return this.matcher.isErrorState(this.fControl, null) && this.fControl.hasError('required');
    }
}
