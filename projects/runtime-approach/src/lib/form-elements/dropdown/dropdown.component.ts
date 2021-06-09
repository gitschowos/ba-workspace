import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DropdownOptions, FormElement } from '../../model/base-model';
import { SuggestionsService } from '../../suggestions.service';

@Component({
    selector: 'lib-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
    @Input() fControl!: FormControl;
    @Input() element!: FormElement;

    options!: DropdownOptions;

    values: string[] = [];

    constructor(
        private suggestions: SuggestionsService
    ) { }

    ngOnInit(): void {
        this.options = this.element.options as DropdownOptions;
        this.suggestions.getSuggestions(this.options.values).subscribe(values => {
            this.values = values;
        });
    }

}
