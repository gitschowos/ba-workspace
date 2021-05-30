import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
    selector: 'ct-text3',
    templateUrl: './text3.component.html'
})
export class Text3Component implements OnInit {
    @Input() fControl!: FormControl;
    
    constructor(
        
    ) { }

    ngOnInit(): void {
    
    }

    
}
