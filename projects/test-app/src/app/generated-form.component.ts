import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-generated-form',
    templateUrl: './generated-form.component.html',
})
export class GeneratedFormComponent implements OnInit {
    submittedValue: any = null;

    constructor() { }

    ngOnInit(): void {
    }

    showSubmission(submission: any) {
        this.submittedValue = submission;
    }
}
