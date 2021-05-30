import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
 
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
    selector: 'ct-text1',
    templateUrl: './text1.component.html'
})
export class Text1Component implements OnInit {
    @Input() fControl!: FormControl;
    
    constructor(
         private api: ApiService 
    ) { }

    ngOnInit(): void {
     
     
        
        this.autoCompleteOptions.push('Josef'); 
        this.autoCompleteOptions.push('Johannes'); 
        this.autoCompleteOptions.push('Lukas'); 
        this.autoCompleteOptions.push('Anna'); 
        this.autoCompleteOptions.push('Maria'); 
        this.autoCompleteOptions.push('Lena'); 
    
        this.filteredOptions = this.fControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    
    }

     
    
        autoCompleteOptions: string[] = [];
        filteredOptions!: Observable<string[]>;

        private _filter(value: string): string[] {
            const filterValue = value.toLowerCase();
    
            return this.autoCompleteOptions.filter(option => option.toLowerCase().includes(filterValue));
        }

    
}
