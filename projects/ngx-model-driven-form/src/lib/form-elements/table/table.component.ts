import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import _ from 'lodash';
import { CreateFormControlService } from '../../create-form-control.service';
import { FormElement, TableOptions } from '../../model/base-model';
import { BaseElement } from '../base-element';

@Component({
    selector: 'lib-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent extends BaseElement implements OnInit {

    options!: TableOptions;
    elements!: FormElement[];

    inputRowFormGroup!: FormGroup;
    initialInputRowValue: any;

    @ViewChild(MatTable) table!: MatTable<any>;
    displayedColumns: string[] = ['control'];

    constructor(
        private formControlService: CreateFormControlService
    ) { super(); }

    ngOnInit(): void {
        this.options = this.element.options as TableOptions;
        this.elements = this.options.columns;

        this.inputRowFormGroup = new FormGroup({});
        for (const element of this.elements) {
            this.inputRowFormGroup.addControl(element.id, this.formControlService.getFormControl(element));
            this.displayedColumns.push(element.id);
        }
        this.formControlService.setupDisableConditions(this.elements, this.inputRowFormGroup);

        this.initialInputRowValue = _.cloneDeep(this.inputRowFormGroup.value);

        this.fControl.updateValueAndValidity();

        this.fControl.valueChanges.subscribe(value => {
            if(value === '' || value === null) {
                this.fControl.setValue([]);
            }
            this.table.renderRows();
        })
    }

    getFormControl(id: string): FormControl {
        const control = this.inputRowFormGroup.get(id);
        if (control === null) {
            throw new Error('No control found for id ' + id);
        }
        return control as FormControl;
    }

    addRow() {
        this.fControl.value.unshift(this.inputRowFormGroup.value);
        this.fControl.updateValueAndValidity();

        this.inputRowFormGroup.reset(_.cloneDeep(this.initialInputRowValue));
    }

    addButtonDisabled(): boolean {
        if (this.inputRowFormGroup.untouched) {
            return true;
        }
        return !this.inputRowFormGroup.valid;
    }

    deleteRow(content: any) {
        const index = this.fControl.value.indexOf(content);
        if (index >= 0) {
            this.fControl.value.splice(index, 1);
            this.fControl.updateValueAndValidity();
        }
    }

    getCellValue(id: string, content: any): string {
        const value = content[id];
        if (value === undefined) {
            return 'ERROR';
        }
        if (Array.isArray(value)) {
            return value.join(', ');
        }
        return value;
    }
}
