import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormElement } from '../../model/base-model';

@Component({
    selector: 'lib-form-element-renderer',
    templateUrl: './form-element-renderer.component.html',
    styleUrls: ['./form-element-renderer.component.css']
})
export class FormElementRendererComponent implements OnInit {
    @Input() element!: FormElement;
    @Input() control!: FormControl; 

    constructor() { }

    ngOnInit(): void {
    }
}
