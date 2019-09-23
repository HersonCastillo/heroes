import { Component, OnInit } from '@angular/core';
import { ComicsService } from 'src/app/services/comics.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from 'src/app/interfaces/character';
import { Storie } from 'src/app/interfaces/storie';
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
        private router: Router
    ){}

    public characters: Character[] = [];
    public stories: Storie[] = [];
    public comic: Comic;

    ngOnInit() {
        this.route.params.subscribe(param => {
            if (Fn.propertyExist(param, 'id')) {
                let id = param['id'];
                this.comicProvider.getComic(id).subscribe(comic => {
                    this.comic = comic.data.results[0];
                    this.comicProvider.getComicsCharacters(this.comic).subscribe(characters => {
                        this.characters = characters.data.results;
                    });
                    this.comicProvider.getComicsStories(this.comic).subscribe(stories => {
                        this.stories = stories.data.results;
                    });
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
}
