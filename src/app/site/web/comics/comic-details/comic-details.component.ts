import { Component, OnInit } from '@angular/core';
import { ComicsService } from 'src/app/services/comics.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from 'src/app/interfaces/character';
import { Story } from 'src/app/interfaces/story';
import { Comic } from 'src/app/interfaces/comic';
import { Fn } from 'src/app/utils/fn';

@Component({
    selector: 'app-comic-details',
    templateUrl: './comic-details.component.html',
    styleUrls: ['./comic-details.component.scss']
})
export class ComicDetailsComponent implements OnInit {

    constructor(
        private comicProvider: ComicsService,
        private route: ActivatedRoute,
        private router: Router,
        private fn: Fn
    ) { }

    public characters: Character[] = [];
    public stories: Story[] = [];
    public comic: Comic;

    ngOnInit() {
        this.route.params.subscribe(param => {
            if (Fn.propertyExist(param, 'id')) {
                let id = param['id'];
                this.comicProvider.getComic(id).subscribe(comic => {
                    this.fn.handleErrorResponse(comic, () => {
                        this.comic = comic.data.results[0];
                        this.comicProvider.getComicsCharacters(this.comic).subscribe(characters => {
                            this.characters = characters.data.results;
                        }, err => {
                            Fn.errLog(err);
                            this.router.navigate(['/error', 'not-found']);
                            this.fn.simple('Ups!', 'An error occurred when tried get data [Characters]');
                        });
                        this.comicProvider.getComicsStories(this.comic).subscribe(stories => {
                            this.stories = stories.data.results;
                        }, err => {
                            Fn.errLog(err);
                            this.router.navigate(['/error', 'internal-error']);
                            this.fn.simple('Ups!', 'An error occurred when tried get data [Stories]');
                        });
                    }, null, null);
                }, err => {
                    Fn.errLog(err);
                    this.router.navigate(['/error', 'internal-error']);
                    this.fn.simple('Ups!', 'An error occurred when tried get data [Comics]');
                });
            } else {
                this.router.navigate(['/error', 'not-found']);
            }
        });
    }
    getImage(val: Comic): string {
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
            case 'characters': {
                this.fn.simple(char.name, char.description || 'No description yet');
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
    removeFromFavoriteList(key: string, object: any): void {
        if (Fn.propertyExist(object, 'id')) {
            Fn.removeFavoriteItem(key, object.id);
            this.fn.makeSnack('Item removed from favorite list');
        }
    }
    isItemInFavorites(key: string, object: any): boolean {
        if (Fn.propertyExist(object, 'id')) {
            return Fn.isItemInFavoriteList(key, object.id);
        }
        return false;
    }
}
