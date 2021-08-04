import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-live-editor',
    templateUrl: './live-editor.component.html',
    styleUrls: ['./live-editor.component.css']
})
export class LiveEditorComponent implements OnInit {
    fGroup!: FormGroup;
    fControl!: FormControl;

    data!: Subject<any>;

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.fControl = new FormControl('{ "title":"Formular erstellen", "content":[] }');
        this.fGroup = new FormGroup( { fControl: this.fControl });

        this.data = new Subject();
    }

    onSubmit(): void {
        console.log(this.fControl.value);
        const data = JSON.parse(this.fControl.value);
        console.log(data);
        this.data.next(data);
    }
}
