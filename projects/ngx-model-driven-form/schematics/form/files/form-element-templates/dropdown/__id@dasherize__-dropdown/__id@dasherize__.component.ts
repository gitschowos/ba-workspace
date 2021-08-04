import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
<% if(element.options.required) { %> import { DefaultErrorStateMatcher } from '<%= pathToRoot %>error-state-matcher'; <% } %>
<% if(!element.options.values.isHardcoded()) { %> 
import { ApiService } from '<%= pathToRoot %>api.service';
<% } %>

@Component({
    selector: 'ct-<%= dasherize(element.id) %>',
    templateUrl: './<%= dasherize(element.id) %>.component.html'
})
export class <%= classify(element.id) %>Component implements OnInit {
    @Input() fControl!: FormControl;
    
    values: string[] = [];

    <% if(element.options.required) { %> matcher!: DefaultErrorStateMatcher; <% } %>

    constructor(
        <% if(!element.options.values.isHardcoded()) { %> private api: ApiService <% } %>
    ) { }

    ngOnInit(): void {
        <% if(element.options.values.isHardcoded()) { %> 
            <% for (let suggestion of element.options.values.content) { %>
            this.values.push('<%= suggestion %>'); <% } %>
        <% } else { %>
            this.api.getSuggestions('<%= element.options.values.content %>').subscribe( suggestions => {
                this.values = suggestions;
            });
        <% } %>
        <% if(element.options.required) { %>
        this.matcher = new DefaultErrorStateMatcher(); <% } %>
    }
}
