import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DropdownOptions, FormElement, FormElementOptions, FormElementType, GroupOptions, InputFieldOptions, RadioOptions, Specification } from '../model/base-model';
import { SuggestionsService } from '../suggestions.service';

import _ from 'lodash'

interface ElementToFill {
    control: FormControl,
    possibleValues: any[],
    exampleValue?: any
}

@Component({
    selector: 'lib-form-filler',
    templateUrl: './form-filler.component.html',
    styleUrls: ['./form-filler.component.css']
})
export class FormFillerComponent implements OnInit {
    @Input() fGroup!: FormGroup;
    @Input() specification!: Specification;

    useExamples!: FormControl;

    elementsToFill: ElementToFill[] = [];

    constructor(
        private suggestions: SuggestionsService
    ) { }

    ngOnInit(): void {
        this.useExamples = new FormControl(false);
        this.setupFillingElements(this.specification.content, this.fGroup);
    }

    fillForm(): void {
        for (const element of this.elementsToFill) {
            if (this.useExamples.value && element.exampleValue !== undefined) {
                element.control.setValue(element.exampleValue);
            } else { //dont use the examples
                if (element.possibleValues.length > 0) {
                    const value = _.sample(element.possibleValues);
                    element.control.setValue(value);
                }
            }
        }
    }

    setupFillingElements(elements: FormElement[], fGroup: FormGroup) {
        for (const element of elements) {
            const control = fGroup.get(element.id);
            if (control === null) {
                console.warn('No control was found for id ' + element.id);
                continue;
            }
            if (control instanceof FormGroup) {
                const childs = (element.options as GroupOptions).childs;
                this.setupFillingElements(childs, control as FormGroup);
            }
            else {  // control is FormControl
                let possibleValues: any[] = [];
                const options = element.options as FormElementOptions;
                switch (element.type) {

                    case FormElementType.checkbox:
                        possibleValues = [true, false];
                        let elementToFill: ElementToFill = { control: control as FormControl, possibleValues: possibleValues };
                        if (options.exampleValue !== undefined) {
                            elementToFill.exampleValue = options.exampleValue;
                        }
                        this.elementsToFill.push(elementToFill);
                        break;

                    case FormElementType.radio:
                        this.suggestions.getSuggestions((element.options as RadioOptions).pickingOptions).subscribe(values => {
                            possibleValues = Object.assign([], values);
                            possibleValues.push('');
                            let elementToFill: ElementToFill = { control: control as FormControl, possibleValues: possibleValues };
                            if (options.exampleValue !== undefined) {
                                elementToFill.exampleValue = options.exampleValue;
                            }
                            this.elementsToFill.push(elementToFill);
                        });
                        break;

                    case FormElementType.dropdown:
                        this.suggestions.getSuggestions((element.options as DropdownOptions).values).subscribe(values => {
                            if (!(element.options as DropdownOptions).multiple) {
                                possibleValues = Object.assign([], values);
                                possibleValues.push('');
                            }
                            else {  //multiple values to select
                                for (let i = 0; i <= values.length; i++) {
                                    possibleValues.push(_.sampleSize(values, i));
                                }
                            }
                            let elementToFill: ElementToFill = { control: control as FormControl, possibleValues: possibleValues };
                            if (options.exampleValue !== undefined) {
                                elementToFill.exampleValue = options.exampleValue;
                            }
                            this.elementsToFill.push(elementToFill);
                        });
                        break;

                    case FormElementType.input:
                        possibleValues.push(Math.random().toString(36).substr(2));
                        possibleValues.push('');
                        const autocomplete = (element.options as InputFieldOptions).autocomplete;
                        if (autocomplete !== undefined) {
                            this.suggestions.getSuggestions(autocomplete).subscribe(values => {
                                values.forEach(value => possibleValues.push(value));
                                let elementToFill: ElementToFill = { control: control as FormControl, possibleValues: possibleValues };
                                if (options.exampleValue !== undefined) {
                                    elementToFill.exampleValue = options.exampleValue;
                                }
                                this.elementsToFill.push(elementToFill);
                            });
                        } else {
                            let elementToFill: ElementToFill = { control: control as FormControl, possibleValues: possibleValues };
                            if (options.exampleValue !== undefined) {
                                elementToFill.exampleValue = options.exampleValue;
                            }
                            this.elementsToFill.push(elementToFill);
                        }
                        break;

                    default:
                        console.warn('No example form filling supported for type ' + element.type);
                        break;
                }
            }
        }
    }
}