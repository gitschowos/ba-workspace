import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { element } from 'protractor';
<% if(element.options.required || element.options.validatorRegex !== undefined) { %> import { DefaultErrorStateMatcher } from '<%= pathToRoot %>error-state-matcher'; <% } %>
<% if(element.options.autocomplete !== undefined && !element.options.autocomplete.isHardcoded()) { %> 
import { ApiService } from '<%= pathToRoot %>api.service';
<% } if(element.options.autocomplete !== undefined) { %> 
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
<% } %>


@Component({
    selector: '<%=prefix%>-<%= dasherize(element.id) %>',
    templateUrl: './<%= dasherize(element.id) %>.component.html'
})
export class <%= classify(element.id) %>Component implements OnInit {
    @Input() fControl!: FormControl;
    
    <% if(element.options.required || element.options.validatorRegex !== undefined) { %> matcher!: DefaultErrorStateMatcher; <% } %>

    constructor(
        <% if(element.options.autocomplete !== undefined && !element.options.autocomplete.isHardcoded()) { %> private api: ApiService <% } %>
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
    <% if(element.options.required || element.options.validatorRegex !== undefined) { %> 
        this.matcher = new DefaultErrorStateMatcher(); <% } %>
    }

    <% if(element.options.autocomplete !== undefined) { %> 
    
        autoCompleteOptions: string[] = [];
        filteredOptions!: Observable<string[]>;

        private _filter(value: string): string[] {
            if (typeof(value) === 'string') {
                const filterValue = value.toLowerCase();
    
                return this.autoCompleteOptions.filter(option => option.toLowerCase().includes(filterValue));
            }
            else {
                return this.autoCompleteOptions;
            }
        }

    <% } %>
}
