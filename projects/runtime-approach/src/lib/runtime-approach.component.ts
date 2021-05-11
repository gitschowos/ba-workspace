import { Component, OnInit } from '@angular/core';
import { JsonReaderService } from './json-reader.service';
import { Specification } from './model/base-model';

@Component({
    selector: 'lib-runtime-approach',
    template: `
    <lib-dynamic-form [formSpecification]="spec"></lib-dynamic-form>
  `,
    styles: [
    ]
})
export class RuntimeApproachComponent implements OnInit {
    spec!: Specification;

    constructor(
        private reader: JsonReaderService
    ) { }

    ngOnInit(): void {
        this.spec = this.reader.getModelFromJson();
        console.log(this.spec);
    }

}
