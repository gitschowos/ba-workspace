import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
    selector: 'ct-tueren',
    templateUrl: './tueren.component.html'
})
export class TuerenComponent implements OnInit {
    @Input() fControl!: FormControl;
    
    values: string[] = [];

    constructor(
        
    ) { }

    ngOnInit(): void {
         
            
            this.values.push('2/3'); 
            this.values.push('4/5'); 
            this.values.push('6/7'); 
        
    }
}
