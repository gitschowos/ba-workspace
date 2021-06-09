import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

    constructor() { }
    
    createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
        const cities = [
            'Weiden', 'Regensburg', 'München'
        ];
        const engines = [
            'Diesel', 'Benzin', 'Gas', 'Wasserstoff', 'Elektro'
        ];
        return { cities, engines };
    }
}
