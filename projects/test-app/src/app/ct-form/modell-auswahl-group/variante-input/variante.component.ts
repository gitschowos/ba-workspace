import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { element } from 'protractor';



@Component({
    selector: 'ct-variante',
    templateUrl: './variante.component.html'
})
export class VarianteComponent implements OnInit {
    @Input() fControl!: FormControl;
    
    constructor(
        
    ) { }

    ngOnInit(): void {
    
    }

    
}
