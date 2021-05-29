import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'ct-checkbox2',
    templateUrl: './checkbox2.component.html'
})
export class Checkbox2Component implements OnInit {
    @Input() fControl!: FormControl;
    
    constructor() { }

    ngOnInit(): void {
    }
}
