import { Component, OnInit } from '@angular/core';
import { DropdownOptions } from '../../model/base-model';
import { SuggestionsService } from '../../suggestions.service';
import { BaseElement } from '../base-element';

@Component({
    selector: 'lib-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent extends BaseElement implements OnInit {

    options!: DropdownOptions;

    values: string[] = [];

    constructor(
        private suggestions: SuggestionsService
    ) { super(); }

    ngOnInit(): void {
        this.options = this.element.options as DropdownOptions;
        this.suggestions.getSuggestions(this.options.values).subscribe(values => {
            this.values = values;
        });
    }

}
