import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
<% if(element.options.autocomplete !== undefined) { %> 
import { ApiService } from '<%= pathToRoot %>api.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
<% } %>

@Component({
    selector: 'ct-<%= dasherize(element.id) %>',
    templateUrl: './<%= dasherize(element.id) %>.component.html'
})
export class <%= classify(element.id) %>Component implements OnInit {
    @Input() fControl!: FormControl;
    
    constructor(
        <% if(element.options.autocomplete !== undefined) { %> private api: ApiService <% } %>
    ) { }

    ngOnInit(): void {
    <% if(element.options.autocomplete !== undefined) { %> 
    <% if(element.options.autocomplete.isHardcoded()) { %> 
        <% for (let suggestion of element.options.autocomplete.content) { %>
        this.autoCompleteOptions.push('<%= suggestion %>'); <% } %>
    <% } else { %>
        this.api.getSuggestions('<%= element.options.autocomplete.content %>').subscribe( suggestions => {
            this.autoCompleteOptions = suggestions;
            this.fControl.setValue(this.fControl.value);
        });
    <% } %>
        this.filteredOptions = this.fControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    <% } %>
    }

    <% if(element.options.autocomplete !== undefined) { %> 
    
        autoCompleteOptions: string[] = [];
        filteredOptions!: Observable<string[]>;

        private _filter(value: string): string[] {
            const filterValue = value.toLowerCase();
    
            return this.autoCompleteOptions.filter(option => option.toLowerCase().includes(filterValue));
        }

    <% } %>
}
