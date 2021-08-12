import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonReaderService } from './json-reader.service';
import { Specification } from './model/base-model';

@Component({
  selector: 'lib-model-driven-form',
  template: `
  <lib-dynamic-form [formSpecification]="spec" (submission)="propagateSubmission($event)"></lib-dynamic-form>
  `,
  styles: [
  ]
})
export class ModelDrivenFormComponent implements OnInit {
    @Input() inputSpec$!: Observable<any>;
    @Output() submission = new EventEmitter<any>();

    spec!: Specification;

    constructor(
        private reader: JsonReaderService
    ) { }

    ngOnInit(): void {
        this.spec = this.reader.getLoadingDummy();  //show loading... while specification is fetched
        //this.reader.getModelFromJson().subscribe(spec => this.spec = spec);
        this.inputSpec$.subscribe(input => this.spec = this.reader.parseSpecification(input));
    }

    propagateSubmission(submission: any) {
        this.submission.emit(submission);
    }
}
