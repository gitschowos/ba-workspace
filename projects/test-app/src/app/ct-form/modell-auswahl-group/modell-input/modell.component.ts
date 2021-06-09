import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { element } from 'protractor';



@Component({
    selector: 'ct-modell',
    templateUrl: './modell.component.html'
})
export class ModellComponent implements OnInit {
    @Input() fControl!: FormControl;
    
    constructor(
        
    ) { }

    ngOnInit(): void {
    
    }

    
}
