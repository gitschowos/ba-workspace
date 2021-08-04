import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-both',
    templateUrl: './both.component.html',
    styles: [`
    .row {
        display: flex;
    }
  
    .column {
        flex: 50%;
    }   
    `]
})
export class BothComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
