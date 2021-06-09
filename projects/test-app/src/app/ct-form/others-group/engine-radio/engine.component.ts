import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
 
import { ApiService } from '../../api.service';

    

@Component({
    selector: 'ct-engine',
    templateUrl: './engine.component.html',
    styles: [`
    .radio-group {
        display: flex;
        flex-direction: column;
        margin: 10px 0;
    }
    
    .radio-button {
        margin: 5px;
    }`]
})
export class EngineComponent implements OnInit {
    @Input() fControl!: FormControl;
    
    values: string[] = [];

    constructor(
         private api: ApiService 
    ) { }

    ngOnInit(): void {
        
            this.api.getSuggestions('api/engines').subscribe( suggestions => {
                this.values = suggestions;
            });
        
    }
}
