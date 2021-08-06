import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
<% if(element.options.required) { %> import { DefaultErrorStateMatcher } from '<%= pathToRoot %>error-state-matcher'; <% } %>

@Component({
    selector: '<%=prefix%>-<%= dasherize(element.id) %>',
    templateUrl: './<%= dasherize(element.id) %>.component.html'
})
export class <%= classify(element.id) %>Component implements OnInit {
    @Input() fControl!: FormControl;
    
    <% if(element.options.required) { %> matcher!: DefaultErrorStateMatcher; <% } %>

    constructor() { }

    ngOnInit(): void {
        <% if(element.options.required) { %> this.matcher = new DefaultErrorStateMatcher(); <% } %>
    }

    <% if(element.options.required) { %> 
    requiredError(): boolean {
        return this.matcher.isErrorState(this.fControl, null) && this.fControl.hasError('required');
    }
    <% } %>
}
