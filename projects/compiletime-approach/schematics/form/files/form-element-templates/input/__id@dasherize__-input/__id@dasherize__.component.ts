import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'ct-<%= dasherize(element.id) %>',
    templateUrl: './<%= dasherize(element.id) %>.component.html'
})
export class <%= classify(element.id) %>Component implements OnInit {
    @Input() fControl!: FormControl;
    
    constructor() { }

    ngOnInit(): void {
    }
}
