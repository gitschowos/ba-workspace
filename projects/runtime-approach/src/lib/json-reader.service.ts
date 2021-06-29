import { Injectable } from '@angular/core';
import { Specification } from './model/base-model';
import data from '../../../../json/test-all.json';

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
        try {
            return new Specification(source);
        } catch (error) {
            console.error(error);
            return new Specification({
                title: "- Error in json specification -",
                content: []
            })
        }
    }
}
