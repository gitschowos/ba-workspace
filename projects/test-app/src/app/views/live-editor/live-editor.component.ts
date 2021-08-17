import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

    submittedValue: any = null;

    constructor(
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.data = new Subject();
    }

    showSubmission(submission: any) {
        this.submittedValue = submission;
    }

    onCodeChanged(value: string) {
        this.code = value;
    }

    onCreate(): void {
        try {
            const parsed = JSON.parse(this.code);
            this.data.next(parsed);
            this.submittedValue = null;
        }
        catch (error) {
            this.snackBar.open(error, "OK");
        }
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