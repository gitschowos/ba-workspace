import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER, TAB } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
<% if(element.options.required) { %> import { DefaultErrorStateMatcher } from '<%= pathToRoot %>error-state-matcher'; <% } %>
<% if(!element.options.suggestions.isHardcoded()) { %> 
import { ApiService } from '<%= pathToRoot %>api.service';
<% } %>

@Component({
    selector: 'ct-<%= dasherize(element.id) %>',
    templateUrl: './<%= dasherize(element.id) %>.component.html',
    styles: [`
    .chip-list {
        width: 100%;
    }`]
})
export class <%= classify(element.id) %>Component implements OnInit {
    @Input() fControl!: FormControl;
    
    textControl = new FormControl('');
    seperatorKeysCodes: number[] = [ENTER, COMMA, TAB];
    
    allSuggestions: string[] = [];
    filteredSuggestions!: Observable<string[]>;

    @ViewChild('chipInput') chipInput!: ElementRef<HTMLInputElement>;

    <% if(element.options.required) { %> matcher!: DefaultErrorStateMatcher; <% } %>

    constructor(
        <% if(!element.options.suggestions.isHardcoded()) { %> private api: ApiService <% } %>
    ) { }

    ngOnInit(): void {
        <% if(element.options.suggestions.isHardcoded()) { %> 
            <% for (let suggestion of element.options.suggestions.content) { %>
            this.allSuggestions.push('<%= suggestion %>'); <% } %>
        <% } else { %>
            this.api.getSuggestions('<%= element.options.suggestions.content %>').subscribe( suggestions => {
                this.allSuggestions = suggestions;
                this.textControl.setValue(this.textControl.value);
            });
        <% } %>

        this.filteredSuggestions = this.textControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
        
        this.fControl.valueChanges.subscribe(value => {
            if(value === null || value === '') {
                this.fControl.setValue([]);
            }
        });

        <% if(element.options.required) { %> this.matcher = new DefaultErrorStateMatcher(); <% } %>
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        <% if (element.options.onlySuggestions) { %>
        if (this.allSuggestions.indexOf(value) < 0) {
            console.warn(value + ' is not a valid option');
            return;
        }
        <% } %>
        if (value) {
            this.fControl.value.push(value);
            this.fControl.updateValueAndValidity();
        }
        this.textControl.setValue('');
        event.chipInput!.clear();
    }

    <% if(element.options.removable) { %>
    remove(chip: string) {
        const index = this.fControl.value.indexOf(chip);

        if (index >= 0) {
            this.fControl.value.splice(index, 1);
            this.fControl.updateValueAndValidity();
        }
    }
    <% } %>

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
