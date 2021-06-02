import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
 
import { ApiService } from '../../../api.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
    selector: 'ct-sitzplatz-von',
    templateUrl: './sitzplatz-von.component.html'
})
export class SitzplatzVonComponent implements OnInit {
    @Input() fControl!: FormControl;
    
    constructor(
         private api: ApiService 
    ) { }

    ngOnInit(): void {
     
     
        
        this.autoCompleteOptions.push('1'); 
        this.autoCompleteOptions.push('2'); 
        this.autoCompleteOptions.push('3'); 
    
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
