import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import mobile from '../../../../json/mobile-de.json';
import specification from '../../../../json/specification.json';
import testAll from '../../../../json/test-all.json';
import empty from '../../../../json/empty.json';
import performanceAll from '../../../../json/performance-all.json';
import performanceCheckboxes from '../../../../json/performance-checkboxes.json';
import performanceInputsHardcoded from '../../../../json/performance-inputs-hardcoded.json';
import performanceInputsApi from '../../../../json/performance-inputs-api.json';

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
        const colors = [
            "rot", "grün", "blau", "gelb", "pink", "grau", "schwarz", "weiß", "braun", "magenta", "lila"
        ];
        return { cities, engines, colors, 
            mobile, specification, testAll, empty,
            performanceAll, performanceCheckboxes, performanceInputsHardcoded, performanceInputsApi
        };
    }
}
