import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
    }
}
