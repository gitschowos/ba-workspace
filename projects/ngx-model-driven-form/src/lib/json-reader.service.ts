import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Specification } from './model/base-model';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

//import data from '../../../../json/test-all.json';

@Injectable({
    providedIn: 'root'
})
export class JsonReaderService {

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar
    ) { }

    getModelFromJson(): Observable<Specification> {
        // let json = data as unknown;
        // return of(this.parseSpecification(json));
        
        return this.http.get('api/testAll').pipe(map(res => this.parseSpecification(res)));  //fetch
    }

    getLoadingDummy(): Specification {
        return new Specification({
            title: "laden...",
            content: []
        });
    }

    parseSpecification(source: unknown): Specification {
        try {
            return new Specification(source);
        } catch (error) {
            console.error(error);
            this.snackBar.open(error, 'OK');
            return new Specification({
                title: "- Error in json specification -",
                content: []
            })
        }
    }
}
