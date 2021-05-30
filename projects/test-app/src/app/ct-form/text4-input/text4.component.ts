import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
 
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
    selector: 'ct-text4',
    templateUrl: './text4.component.html'
})
export class Text4Component implements OnInit {
    @Input() fControl!: FormControl;
    
    constructor(
         private api: ApiService 
    ) { }

    ngOnInit(): void {
     
    
        this.api.getSuggestions('api/cities').subscribe( suggestions => {
            this.autoCompleteOptions = suggestions;
            this.fControl.setValue(this.fControl.value);
        });
    
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
