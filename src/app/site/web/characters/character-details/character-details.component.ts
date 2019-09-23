import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/services/characters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Fn } from 'src/app/utils/fn';
import { Character } from 'src/app/interfaces/character';
import { Storie } from 'src/app/interfaces/storie';
import { Comic } from 'src/app/interfaces/comic';

@Component({
    selector: 'app-character-details',
    templateUrl: './character-details.component.html',
    styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

    constructor(
        private characterProvider: CharactersService,
        private route: ActivatedRoute,
        private router: Router,
        private fn: Fn
    ) { }

    public character: Character;
    public stories: Storie[] = [];
    public comics: Comic[] = [];

    ngOnInit() {
        this.route.params.subscribe(param => {
            if (Fn.propertyExist(param, 'id')) {
                let id = param['id'];
                this.characterProvider.getCharacter(id).subscribe(character => {
                    this.character = character.data.results[0];
                    this.characterProvider.getCharactersComics(this.character).subscribe(comics => {
                        this.comics = comics.data.results;
                    }, err => {
                        Fn.errLog(err);
                        this.fn.simple('Ups!', 'An error occurred when tried get data [Comics]');
                    });
                    this.characterProvider.getCharactersStories(this.character).subscribe(stories => {
                        this.stories = stories.data.results;
                    }, err => {
                        Fn.errLog(err);
                        this.fn.simple('Ups!', 'An error occurred when tried get data [Stories]');
                    });
                }, err => {
                    Fn.errLog(err);
                    this.fn.simple('Ups!', 'An error occurred when tried get data [Characters]');
                });
            } else {
                this.router.navigate(['/error', 'not-found']);
            }
        });
    }
    getImage(val: Character): string {
        if (Fn.propertyExist(val, 'thumbnail')) {
            return `${val.thumbnail.path}/portrait_xlarge.${val.thumbnail.extension}`;
        }
        return '/assets/img/marvel.png';
    }
    elipsis(str: string, ln: number): string {
        return Fn.elipsis(str, ln);
    }
    showDescription(char: any, type: string): void {
        switch (type) {
            case 'stories': {
                this.fn.simple(char.title, char.description || 'No description yet');
                break;
            }
            case 'comics': {
                this.fn.simple(char.title, char.description || 'No description yet');
                break;
            }
        }
    }
    addFavoriteList(key: string, object: any): void {
        Fn.addFavoriteItem(key, {
            id: object.id,
            name: object.name,
            title: object.title,
            description: object.description
        });
        this.fn.makeSnack('Item added to favorite list');
    }
    removeFromFavoriteList(key: string, id: any): void {
        Fn.removeFavoriteItem(key, id);
        this.fn.makeSnack('Item removed from favorite list');
    }
    isItemInFavorites(key: string, id: string): boolean {
        return Fn.isItemInFavoriteList(key, id);
    }
}
