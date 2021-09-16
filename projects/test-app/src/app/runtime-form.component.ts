import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
//import hardcodedJson from '../../../../json/test-all.json';

@Component({
  selector: 'app-runtime-form',
  templateUrl: './runtime-form.component.html',
})
export class RuntimeFormComponent implements OnInit {
    data!: Observable<any>;

    submittedValue: any = null;

    constructor(
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.data = this.http.get("api/testAll");
        //this.data = of(hardcodedJson);
    }

    showSubmission(submittedValue: any) {
        this.submittedValue = submittedValue;
    }
}
