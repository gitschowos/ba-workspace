import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    data!: Observable<any>;

    constructor(
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.data = this.http.get("api/testAll");
    }
}
