import { Directive, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DefaultErrorStateMatcher } from "../error-state-matcher";
import { FormElement } from "../model/base-model";

@Directive()
export abstract class BaseElement {
    @Input() element!: FormElement;
    @Input() fControl!: FormControl;

    matcher: DefaultErrorStateMatcher;

    constructor() {
        this.matcher = new DefaultErrorStateMatcher();
    }
}