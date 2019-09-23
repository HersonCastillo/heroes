import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Fn } from 'src/app/utils/fn';

@Component({
    selector: 'app-favorite-list',
    templateUrl: './favorite-list.component.html',
    styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit {
    constructor(
        private ref: MatDialogRef<FavoriteListComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
        private fn: Fn
    ){}
    
    public comics: Item[] = [];
    public characters: Item[] = [];
    public stories: Item[] = [];

    ngOnInit(){
        this.comics = JSON.parse(Fn.getValue('comics'));
        this.characters = JSON.parse(Fn.getValue('characters'));
        this.stories = JSON.parse(Fn.getValue('stories'));
    }
    getArray(arr: Item[]): Item[] {
        return arr != null ? arr : [];
    }
    goto(url: string[]): void {
        this.router.navigate(url);
        this.close();
    }
    removeFromFavoriteList(key: string, id: any): void {
        Fn.removeFavoriteItem(key, id);
        this.fn.makeSnack('Item removed from favorite list');
        this.ngOnInit();
    }
    close(){
        this.ref.close();
    }
}

interface Item {
    title?: string;
    name?: string;
    id: any;
    description?: string;
}
