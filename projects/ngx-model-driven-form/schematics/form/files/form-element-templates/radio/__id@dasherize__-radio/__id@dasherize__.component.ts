import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
<% if(element.options.required) { %> import { DefaultErrorStateMatcher } from '<%= pathToRoot %>error-state-matcher'; <% } %>
<% if(!element.options.pickingOptions.isHardcoded()) { %> 
import { ApiService } from '<%= pathToRoot %>api.service';
<% } %>
    

@Component({
    selector: 'ct-<%= dasherize(element.id) %>',
    templateUrl: './<%= dasherize(element.id) %>.component.html',
    styles: [`
    .radio-group {
        display: flex;
        flex-direction: column;
        margin: 10px 0;
    }
    
    .radio-button {
        margin: 5px;
    }`]
})
export class <%= classify(element.id) %>Component implements OnInit {
    @Input() fControl!: FormControl;
    
    values: string[] = [];

    <% if(element.options.required) { %> matcher!: DefaultErrorStateMatcher; <% } %>

    constructor(
        <% if(!element.options.pickingOptions.isHardcoded()) { %> private api: ApiService <% } %>
    ) { }

    ngOnInit(): void {
        <% if(element.options.pickingOptions.isHardcoded()) { %> 
            <% for (let suggestion of element.options.pickingOptions.content) { %>
            this.values.push('<%= suggestion %>'); <% } %>
        <% } else { %>
            this.api.getSuggestions('<%= element.options.pickingOptions.content %>').subscribe( suggestions => {
                this.values = suggestions;
            });
        <% } %>
        <% if(element.options.required) { %> this.matcher = new DefaultErrorStateMatcher(); <% } %>
    }

    <% if(element.options.required) { %> 
    requiredError(): boolean {
        return this.matcher.isErrorState(this.fControl, null) && this.fControl.hasError('required');
    }
    <% } %>
}
