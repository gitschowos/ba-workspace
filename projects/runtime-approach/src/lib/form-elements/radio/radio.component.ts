import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefaultErrorStateMatcher } from '../../error-state-matcher';
import { FormElement, RadioOptions } from '../../model/base-model';
import { SuggestionsService } from '../../suggestions.service';

@Component({
    selector: 'lib-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {
    @Input() fControl!: FormControl;
    @Input() element!: FormElement;

    options!: RadioOptions;

    values: string[] = [];

    matcher!: DefaultErrorStateMatcher;

    constructor(
        private suggestions: SuggestionsService
    ) { }

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

        this.matcher = new DefaultErrorStateMatcher();
    }

    requiredError(): boolean {
        return this.matcher.isErrorState(this.fControl, null) && this.fControl.hasError('required');
    }
}
