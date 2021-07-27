import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChipListOptions, DropdownOptions, FormElement, FormElementOptions, FormElementType, GroupOptions, InputFieldOptions, RadioOptions, TableOptions, Specification } from '../model/base-model';
import { SuggestionsService } from '../suggestions.service';

import _ from 'lodash'
import { of, Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

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
export class FormFillerComponent implements OnChanges {
    @Input() fGroup!: FormGroup;
    @Input() specification!: Specification;

    useExamples!: FormControl;

    elementsToFill: ElementToFill[] = [];

    constructor(
        private suggestions: SuggestionsService
    ) { }

    ngOnChanges(): void {
        this.useExamples = new FormControl(false);
        this.setupFillingElements(this.specification.content, this.fGroup);
    }

    fillForm(): void {
        for (const element of this.elementsToFill) {
            if (this.useExamples.value && element.exampleValue !== undefined) {
                element.control.setValue(element.exampleValue);
            } else if (Array.isArray(element.possibleValues)) { //dont use the examples
                if (element.possibleValues.length > 0) {
                    const value = _.sample(element.possibleValues);
                    if((element.control as any).isTable) {
                        element.control.value.unshift(value);   //add row without resetting the whole table
                        element.control.updateValueAndValidity();
                    }
                    else {
                        element.control.setValue(value);
                    }
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
                const options = element.options as FormElementOptions;

                if (element.type === FormElementType.table) {
                    const columns = (options as TableOptions).columns;
                    const allPossibleValues = [];
                    for (const column of columns) {
                        allPossibleValues.push(this.getPossibleValues(column));
                    }

                    let possibleValues: any[] = [];

                    const join = forkJoin(allPossibleValues);
                    join.subscribe(allArrays => {
                        const exampleRows = 3;
                        let i = 0;
                        while (i < exampleRows) {
                            const row: any = {};
                            for (let j = 0; j < allArrays.length; j++) {
                                row[columns[j].id] = _.sample(allArrays[j]);
                            }
                            possibleValues.push(row);
                            i++;
                        }
                        let elementToFill: ElementToFill = { control: control as FormControl, possibleValues: possibleValues };
                        if (options.exampleValue !== undefined) {
                            elementToFill.exampleValue = options.exampleValue;
                        }
                        this.elementsToFill.push(elementToFill);
                    });
                } 
                else {  //normal form element, no table
                    this.getPossibleValues(element).subscribe(values => {
                        let elementToFill: ElementToFill = { control: control as FormControl, possibleValues: values };
                        if (options.exampleValue !== undefined) {
                            elementToFill.exampleValue = options.exampleValue;
                        }
                        this.elementsToFill.push(elementToFill);
                    });
                }
            }
        }
    }

    private getPossibleValues(element: FormElement): Observable<any> {
        const required = (element.options as FormElementOptions).required;
        switch (element.type) {
            case FormElementType.checkbox:
                return required ? of([true]) : of([true, false]);

            case FormElementType.radio:
                return this.suggestions.getSuggestions((element.options as RadioOptions).pickingOptions).pipe(map(values => {
                    const examples = _.cloneDeep(values);
                    if(!required) {
                        examples.push('');
                    }
                    return examples;
                }));

            case FormElementType.dropdown:
                return this.suggestions.getSuggestions((element.options as DropdownOptions).values).pipe(map(values => {
                    if (!(element.options as DropdownOptions).multiple) {
                        const examples = _.cloneDeep(values);
                        if(!required) {
                            examples.push('');
                        }
                        return examples;
                    }
                    else {
                        const examples = [];
                        for (let i = 1; i <= values.length; i++) {
                            examples.push(_.sampleSize(values, i));
                        }
                        return examples;
                    }
                }));


            case FormElementType.input:
                const autocomplete = (element.options as InputFieldOptions).autocomplete;
                if (autocomplete !== undefined) {
                    return this.suggestions.getSuggestions(autocomplete).pipe(map(values => {
                        const examples = _.cloneDeep(values);
                        examples.push(this.generateRandomString());
                        if(!required) {
                            examples.push('');
                        }
                        return examples;
                    }));
                } else {
                    return required ? of([this.generateRandomString()]) : of(['', this.generateRandomString()]);
                }

            case FormElementType.chiplist:
                const chipListOptions = element.options as ChipListOptions;
                const res = this.suggestions.getSuggestions(chipListOptions.suggestions).pipe(map(values => {
                    const pickedValues = [];
                    for (let i = 1; i <= values.length; i++) {
                        pickedValues.push(_.sampleSize(values, i));
                    }
                    return pickedValues;
                }));
                if (!chipListOptions.onlySuggestions) {
                    res.pipe(map(values => {
                        values.push([this.generateRandomString()]);
                    }));
                }
                return res;

            default:
                console.warn('No example form filling supported for type ' + element.type);
                return of([]);
        }
    }

    private generateRandomString(): string {
        return Math.random().toString(36).substr(2);
    }
}