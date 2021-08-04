import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-runtime-form',
  templateUrl: './runtime-form.component.html',
})
export class RuntimeFormComponent implements OnInit {
    data!: Observable<any>;

    constructor(
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.data = this.http.get("api/testAll");
    }
}
