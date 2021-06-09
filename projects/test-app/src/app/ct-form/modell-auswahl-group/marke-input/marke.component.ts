import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { element } from 'protractor';
 
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';



@Component({
    selector: 'ct-marke',
    templateUrl: './marke.component.html'
})
export class MarkeComponent implements OnInit {
    @Input() fControl!: FormControl;
    
    constructor(
        
    ) { }

    ngOnInit(): void {
     
     
        
        this.autoCompleteOptions.push('beliebig'); 
        this.autoCompleteOptions.push('BMW'); 
        this.autoCompleteOptions.push('Mercedes-Benz'); 
        this.autoCompleteOptions.push('Audi'); 
        this.autoCompleteOptions.push('Volkswagen'); 
        this.autoCompleteOptions.push('Ford'); 
        this.autoCompleteOptions.push('Tesla'); 
        this.autoCompleteOptions.push('Toyota'); 
        this.autoCompleteOptions.push('Porsche'); 
    
        this.filteredOptions = this.fControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    
    }

     
    
        autoCompleteOptions: string[] = [];
        filteredOptions!: Observable<string[]>;

        private _filter(value: string): string[] {
            if (typeof(value) === 'string') {
                const filterValue = value.toLowerCase();
    
                return this.autoCompleteOptions.filter(option => option.toLowerCase().includes(filterValue));
            }
            else {
                return this.autoCompleteOptions;
            }
        }

    
}
