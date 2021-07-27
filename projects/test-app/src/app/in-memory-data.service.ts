import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import mobile from '../../../../json/mobile-de.json';
import specification from '../../../../json/specification.json';
import testAll from '../../../../json/test-all.json';

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
        return { cities, engines, mobile, specification, testAll };
    }
}
