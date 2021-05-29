import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'ct-checkbox1',
    templateUrl: './checkbox1.component.html'
})
export class Checkbox1Component implements OnInit {
    @Input() fControl!: FormControl;
    
    constructor() { }

    ngOnInit(): void {
    }
}
