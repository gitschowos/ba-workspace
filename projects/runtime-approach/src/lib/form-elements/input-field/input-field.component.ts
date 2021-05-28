import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SuggestionsService } from '../../suggestions.service';
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

    hasAutoComplete!: boolean;
    autoCompleteOptions: string[] = [];
    filteredOptions!: Observable<string[]>;

    constructor(
        private suggestions: SuggestionsService
    ) { }

    ngOnInit(): void {
        this.options = this.element.options as InputFieldOptions;
        const autocomplete = this.options.autocomplete;
        if(autocomplete !== undefined) {
            this.hasAutoComplete = true;

            this.suggestions.getSuggestions(autocomplete).subscribe( suggestions => {
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
        const filterValue = value.toLowerCase();

        return this.autoCompleteOptions.filter(option => option.toLowerCase().includes(filterValue));
    }

}
