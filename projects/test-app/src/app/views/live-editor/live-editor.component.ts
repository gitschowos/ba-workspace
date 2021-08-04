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
    ) { }

    ngOnInit(): void {
        this.data = new Subject();
    }

    onCodeChanged(value: string) {
        this.code = value;
    }

    onCreate(): void {
        this.data.next(JSON.parse(this.code));
    }
    
    theme = "vs-dark";
    model = {
        language: "json",
        uri: "main.json",
        value: '{ "title":"Formular erstellen", "content":[] }'
    };

    options = {
        contextmenu: true
    };

    code: string = '{ "title":"Formular erstellen", "content":[] }';
}