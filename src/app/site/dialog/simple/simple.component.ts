import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-simple',
    templateUrl: './simple.component.html',
    styleUrls: ['./simple.component.scss']
})
export class SimpleComponent {

    constructor(
        private ref: MatDialogRef<SimpleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ){}
    close(): void {
        this.ref.close();
    }
}
