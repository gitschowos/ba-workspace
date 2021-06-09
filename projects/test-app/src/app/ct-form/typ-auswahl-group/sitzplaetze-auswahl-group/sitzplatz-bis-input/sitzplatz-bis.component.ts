import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { element } from 'protractor';
 
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';



@Component({
    selector: 'ct-sitzplatz-bis',
    templateUrl: './sitzplatz-bis.component.html'
})
export class SitzplatzBisComponent implements OnInit {
    @Input() fControl!: FormControl;
    
    constructor(
        
    ) { }

    ngOnInit(): void {
     
     
        
        this.autoCompleteOptions.push('4'); 
        this.autoCompleteOptions.push('5'); 
        this.autoCompleteOptions.push('6'); 
        this.autoCompleteOptions.push('7'); 
        this.autoCompleteOptions.push('8'); 
        this.autoCompleteOptions.push('9'); 
    
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
