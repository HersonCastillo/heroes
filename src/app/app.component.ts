import { Component } from '@angular/core';
import { animations } from 'src/app/utils/animations';
import { Fn } from './utils/fn';
import { FavoriteListComponent } from './site/dialog/favorite-list/favorite-list.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations
})
export class AppComponent {
    constructor(
        private fn: Fn
    ){}
    showFavoriteListModal(): void {
        this.fn.openDialog(FavoriteListComponent, null);      
    }
}
