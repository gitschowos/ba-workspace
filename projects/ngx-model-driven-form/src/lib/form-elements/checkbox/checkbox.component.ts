import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefaultErrorStateMatcher } from '../../error-state-matcher';
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

    matcher!: DefaultErrorStateMatcher;

    constructor() { }

    ngOnInit(): void {
        this.options = this.element.options as CheckboxOptions;

        this.matcher = new DefaultErrorStateMatcher();
    }

    requiredError(): boolean {
        return this.matcher.isErrorState(this.fControl, null) && this.fControl.hasError('required');
    }
}
