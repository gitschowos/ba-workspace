import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'ct-text1',
    templateUrl: './text1.component.html'
})
export class Text1Component implements OnInit {
    @Input() fControl!: FormControl;
    
    constructor() { }

    ngOnInit(): void {
    }
}
