import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

import _ from 'lodash'

interface ElementToFill {
    control: FormControl,
    possibleValues: any[] | string,
    exampleValue?: any
}

@Component({
    selector: 'ct-form-filler',
    templateUrl: './form-filler.component.html'
})
export class FormFillerComponent implements OnInit {
    @Input() fGroup!: FormGroup;

    useExamples!: FormControl;

    elementsToFill: ElementToFill[] = [];
    apiData: Map<string, any[]> = new Map();

    constructor(
        private api: ApiService
    ) { }

    ngOnInit(): void {
        this.useExamples = new FormControl(false);

        const apiUrls: string[] = [<% for (const url of apiUrls) { %>
            '<%= url %>', <% } %>
        ];
        for (const url of apiUrls) {
            this.api.getSuggestions(url).subscribe(values => {
                this.apiData.set(url, values);
                let arrayCollection = [];
                for (let i = 0; i <= values.length; i++) {
                    arrayCollection.push(_.sampleSize(values, i));
                }
                this.apiData.set(url + '[]', arrayCollection);
            });
        }

        this.elementsToFill = [
            <%= helpers.createElementsToFill(specification.content, '') %>];
    }

    fillForm(): void {
        for (const element of this.elementsToFill) {
            if (this.useExamples.value && element.exampleValue !== undefined) {
                element.control.setValue(element.exampleValue);
            } else { //dont use the examples
                if (typeof element.possibleValues === 'string') {
                    const results = this.apiData.get(element.possibleValues);
                    const value = _.sample(results);
                    element.control.setValue(value);
                }
                else {
                    if (element.possibleValues.length > 0) {
                        const value = _.sample(element.possibleValues);
                        element.control.setValue(value);
                    }
                }
            }
        }
    }

    getFormControl(id: string): FormControl {
        const control = this.fGroup.get(id) as FormControl;
        if (control === null || control === undefined) {
            throw new Error("No FormControl found for id " + id);
        }
        return control;
    }
}