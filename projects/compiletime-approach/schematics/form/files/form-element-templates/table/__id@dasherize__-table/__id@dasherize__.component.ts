import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import _ from 'lodash';

@Component({
    selector: 'ct-<%= dasherize(element.id) %>',
    templateUrl: './<%= dasherize(element.id) %>.component.html',
    styles: [`
    table {
        width: 100%;
    }
    .table-container {
        max-height: 500px;
        overflow: auto;
    }`]
})
export class <%= classify(element.id) %>Component implements OnInit {
    @Input() fControl!: FormControl;

    inputRowFormGroup!: FormGroup;
    initialInputRowValue: any;

    @ViewChild(MatTable) table!: MatTable<any>;
    displayedColumns: string[] = ['control'];

    constructor( 
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.inputRowFormGroup = this.fb.group({
            <%= helpers.createFormGroupString(element.options.columns, false) %>
        });
        <% for (let column of element.options.columns) { %>
        this.displayedColumns.push('<%= column.id %>');<% } %>

        this.initialInputRowValue = _.cloneDeep(this.inputRowFormGroup.value);

        this.fControl.updateValueAndValidity();

        this.fControl.valueChanges.subscribe(value => {
            if(value === '' || value === null) {
                this.fControl.setValue([]);
            }
            this.table.renderRows();
        })
    }

    addRow() {
        this.fControl.value.push(this.inputRowFormGroup.value);
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

    getFormControl(id: string): FormControl {
        const control = this.inputRowFormGroup.get(id);
        if (control === null) {
            throw new Error('No FormControl found for id ' + id);
        }
        return control as FormControl;
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
