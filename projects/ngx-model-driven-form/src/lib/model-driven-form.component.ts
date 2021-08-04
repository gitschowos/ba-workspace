import { Component, OnInit } from '@angular/core';
import { JsonReaderService } from './json-reader.service';
import { Specification } from './model/base-model';

@Component({
  selector: 'lib-model-driven-form',
  template: `
  <lib-dynamic-form [formSpecification]="spec"></lib-dynamic-form>
  `,
  styles: [
  ]
})
export class ModelDrivenFormComponent implements OnInit {
    spec!: Specification;

    constructor(
        private reader: JsonReaderService
    ) { }

    ngOnInit(): void {
        this.spec = this.reader.getLoadingDummy();  //show loading... while specification is fetched
        this.reader.getModelFromJson().subscribe(spec => this.spec = spec);
    }
}
