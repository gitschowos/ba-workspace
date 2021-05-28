import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Suggestions } from './model/base-model';

@Injectable({
    providedIn: 'root'
})
export class SuggestionsService {

    constructor(
        private http: HttpClient
    ) { }

    getSuggestions(suggestions: Suggestions): Observable<string[]> {
        if (suggestions.isHardcoded()) {
            return of(suggestions.content as string[]);
        }
        else {
            return this.getSuggestionsFromApi(suggestions.content as string);
        }
    }

    private getSuggestionsFromApi(url: string): Observable<string[]> {
        return this.http.get<string[]>(url);
    }
}
