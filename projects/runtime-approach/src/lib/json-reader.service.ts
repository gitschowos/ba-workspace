import { Injectable } from '@angular/core';
import { FormElement, Specification } from './model/base-model';
import data from './model/specification.json';

@Injectable({
    providedIn: 'root'
})
export class JsonReaderService {

    constructor() { }

    getModelFromJson(): Specification {
        let json = data as unknown;

        return this.parseSpecification(json);
    }

    private parseSpecification(source: unknown): Specification {
        return new Specification(source);
    }
}
