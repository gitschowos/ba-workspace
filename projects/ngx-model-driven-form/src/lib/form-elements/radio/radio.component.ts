import { Component, OnInit } from '@angular/core';
import { RadioOptions } from '../../model/base-model';
import { SuggestionsService } from '../../suggestions.service';
import { BaseElement } from '../base-element';

@Component({
    selector: 'lib-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.css']
})
export class RadioComponent extends BaseElement implements OnInit {

    options!: RadioOptions;

    values: string[] = [];

    constructor(
        private suggestions: SuggestionsService
    ) { super(); }

    ngOnInit(): void {
        this.options = this.element.options as RadioOptions;
        this.suggestions.getSuggestions(this.options.pickingOptions).subscribe(values => {
            this.values = values;
        });
        this.fControl.valueChanges.subscribe(value => {
            if(this.values.indexOf(value) !== -1) {
                this.fControl.markAsTouched();
            }
        });
    }

    requiredError(): boolean {
        return this.matcher.isErrorState(this.fControl, null) && this.fControl.hasError('required');
    }
}
