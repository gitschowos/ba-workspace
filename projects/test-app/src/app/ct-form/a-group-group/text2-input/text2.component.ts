import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
    selector: 'ct-text2',
    templateUrl: './text2.component.html'
})
export class Text2Component implements OnInit {
    @Input() fControl!: FormControl;
    
    constructor(
        
    ) { }

    ngOnInit(): void {
    
    }

    
}
