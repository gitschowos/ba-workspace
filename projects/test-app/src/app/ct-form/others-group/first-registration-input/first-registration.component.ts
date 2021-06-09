import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { element } from 'protractor';



@Component({
    selector: 'ct-first-registration',
    templateUrl: './first-registration.component.html'
})
export class FirstRegistrationComponent implements OnInit {
    @Input() fControl!: FormControl;
    
    constructor(
        
    ) { }

    ngOnInit(): void {
    
    }

    
}
