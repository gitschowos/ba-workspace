import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER, TAB } from '@angular/cdk/keycodes';
import { ChipListOptions, FormElement } from '../../model/base-model';
import { SuggestionsService } from '../../suggestions.service';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
    selector: 'lib-chiplist',
    templateUrl: './chiplist.component.html',
    styleUrls: ['./chiplist.component.css']
})
export class ChiplistComponent implements OnInit {
    @Input() fControl!: FormControl;
    @Input() element!: FormElement;

    options!: ChipListOptions;

    textControl = new FormControl('');
    allSuggestions: string[] = [];
    filteredSuggestions!: Observable<string[]>;

    selectable = true;
    removable = true;
    seperatorKeysCodes: number[] = [ENTER, COMMA, TAB];

    @ViewChild('chipInput') chipInput!: ElementRef<HTMLInputElement>;

    constructor(
        private suggestions: SuggestionsService
    ) { }

    ngOnInit(): void {
        this.options = this.element.options as ChipListOptions;
        this.fControl.setValue([]);

        this.suggestions.getSuggestions(this.options.suggestions).subscribe(values => {
            this.allSuggestions = values;
            this.textControl.setValue(this.textControl.value);
        });

        this.filteredSuggestions = this.textControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
        
        this.fControl.valueChanges.subscribe(value => {
            if(value === null || value === '') {
                this.fControl.setValue([]);
            }
        });
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        if (this.options.onlySuggestions && this.allSuggestions.indexOf(value) < 0) {
            console.warn(value + ' is not a valid option');
            return;
        }

        if (value) {
            this.fControl.value.push(value);
            this.fControl.updateValueAndValidity();
        }
        this.textControl.setValue('');
        event.chipInput!.clear();
    }

    remove(chip: string) {
        const index = this.fControl.value.indexOf(chip);

        if (index >= 0) {
            this.fControl.value.splice(index, 1);
            this.fControl.updateValueAndValidity();
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.fControl.value.push(event.option.viewValue);
        this.fControl.updateValueAndValidity();
        this.chipInput.nativeElement.value = '';
    }

    private _filter(value: string): string[] {
        if (typeof (value) === 'string') {
            const filterValue = value.toLowerCase();
            return this.allSuggestions.filter(option => option.toLowerCase().includes(filterValue));
        }
        else {
            return this.allSuggestions;
        }
    }
}
