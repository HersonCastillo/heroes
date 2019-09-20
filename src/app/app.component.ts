import { Component } from '@angular/core';
import { animations } from 'src/app/utils/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations
})
export class AppComponent {
    public showMenu: boolean = false;
    public indexMenu: number = 0;
    showMenuForIndex(index: number): void {
        if(!this.showMenu || this.indexMenu != index){
            this.indexMenu = index;
            this.showMenu = true;
        } else {
            this.showMenu = false;
        }
    }
}
