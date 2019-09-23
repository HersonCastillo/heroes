import { Component, OnInit } from '@angular/core';
import { StoriesService } from 'src/app/services/stories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from 'src/app/interfaces/character';
import { Story } from 'src/app/interfaces/story';
import { Comic } from 'src/app/interfaces/comic';
import { Fn } from 'src/app/utils/fn';

@Component({
    selector: 'app-storie-details',
    templateUrl: './story-details.component.html',
    styleUrls: ['./story-details.component.scss']
})
export class StoryDetailsComponent implements OnInit {

    constructor(
        private storieProvider: StoriesService,
        private route: ActivatedRoute,
        private router: Router,
        private fn: Fn
    ){}
    public characters: Character[] = [];
    public story: Story;
    public comics: Comic[] = [];
    ngOnInit(){
        this.route.params.subscribe(param => {
            if (Fn.propertyExist(param, 'id')) {
                let id = param['id'];
                this.storieProvider.getStorie(id).subscribe(story => {
                    this.fn.handleErrorResponse(story, () => {
                        this.story = story.data.results[0];
                        this.storieProvider.getStoriesCharacters(this.story).subscribe(characters => {
                            this.characters = characters.data.results;
                        }, err => {
                            Fn.errLog(err);
                            this.router.navigate(['/error', 'not-found']);
                            this.fn.simple('Ups!', 'An error occurred when tried get data [Characters]');
                        });
                        this.storieProvider.getStoriesComics(this.story).subscribe(comics => {
                            this.comics = comics.data.results;
                        }, err => {
                            Fn.errLog(err);
                            this.router.navigate(['/error', 'internal-error']);
                            this.fn.simple('Ups!', 'An error occurred when tried get data [Comics]');
                        });
                    }, null, null)
                }, err => {
                    Fn.errLog(err);
                    this.router.navigate(['/error', 'internal-error']);
                    this.fn.simple('Ups!', 'An error occurred when tried get data [Stories]');
                });
            } else {
                this.router.navigate(['/error', 'not-found']);
            }
        });
    }
    getImage(val: Story): string {
        if (Fn.propertyExist(val, 'thumbnail')) {
            return `${val.thumbnail.path}/portrait_xlarge.${val.thumbnail.extension}`;
        }
        return '/assets/img/marvel.png';
    }
    elipsis(str: string, ln: number): string {
        return Fn.elipsis(str, ln);
    }
    showDescription(char: any, type: string): void {
        switch(type){
            case 'characters': {
                this.fn.simple(char.name, char.description || 'No description yet');
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
    removeFromFavoriteList(key: string, object: any): void {
        if(Fn.propertyExist(object, 'id')){
            Fn.removeFavoriteItem(key, object.id);
            this.fn.makeSnack('Item removed from favorite list');
        }
    }
    isItemInFavorites(key: string, object: any): boolean {
        if(Fn.propertyExist(object, 'id')){
            return Fn.isItemInFavoriteList(key, object.id);
        }
        return false;
    }
}
