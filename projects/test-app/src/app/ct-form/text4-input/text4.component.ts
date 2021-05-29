import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'ct-text4',
    templateUrl: './text4.component.html'
})
export class Text4Component implements OnInit {
    @Input() fControl!: FormControl;
    
    constructor() { }

    ngOnInit(): void {
    }
}
