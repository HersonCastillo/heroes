import { Component, OnInit } from '@angular/core';
import { StoriesService } from 'src/app/services/stories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from 'src/app/interfaces/character';
import { Storie } from 'src/app/interfaces/storie';
import { Comic } from 'src/app/interfaces/comic';
import { Fn } from 'src/app/utils/fn';

@Component({
    selector: 'app-storie-details',
    templateUrl: './storie-details.component.html',
    styleUrls: ['./storie-details.component.scss']
})
export class StorieDetailsComponent implements OnInit {

    constructor(
        private storieProvider: StoriesService,
        private route: ActivatedRoute,
        private router: Router
    ){}
    public characters: Character[] = [];
    public storie: Storie;
    public comics: Comic[] = [];
    ngOnInit(){
        this.route.params.subscribe(param => {
            if (Fn.propertyExist(param, 'id')) {
                let id = param['id'];
                this.storieProvider.getStorie(id).subscribe(storie => {
                    this.storie = storie.data.results[0];
                    this.storieProvider.getStoriesCharacters(this.storie).subscribe(characters => {
                        this.characters = characters.data.results;
                    });
                    this.storieProvider.getStoriesComics(this.storie).subscribe(comics => {
                        this.comics = comics.data.results;
                    });
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
}
