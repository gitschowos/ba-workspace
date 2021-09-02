import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SuggestionsService } from '../../suggestions.service';
import { InputFieldOptions } from '../../model/base-model';
import { BaseElement } from '../base-element';

@Component({
    selector: 'lib-input-field',
    templateUrl: './input-field.component.html',
    styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent extends BaseElement implements OnInit {

    options!: InputFieldOptions;

    hasAutoComplete!: boolean;
    autoCompleteOptions: string[] = [];
    filteredOptions!: Observable<string[]>;

    constructor(
        private suggestions: SuggestionsService
    ) { super(); }

    ngOnInit(): void {
        this.options = this.element.options as InputFieldOptions;

        const autocomplete = this.options.autocomplete;
        if (autocomplete !== undefined) {
            this.hasAutoComplete = true;

            this.suggestions.getSuggestions(autocomplete).subscribe(suggestions => {
                this.autoCompleteOptions = suggestions;
                this.fControl.setValue(this.fControl.value);
            });

            this.filteredOptions = this.fControl.valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value))
            );
        }
    }

    private _filter(value: string): string[] {
        if (typeof(value) === 'string') {
            const filterValue = value.toLowerCase();

            return this.autoCompleteOptions.filter(option => option.toLowerCase().includes(filterValue));
        }
        else {
            return this.autoCompleteOptions;
        }
    }

}
