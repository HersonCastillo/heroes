import { Component, AfterContentInit } from '@angular/core';
import { Fn } from 'src/app/utils/fn';
import { Comic } from 'src/app/interfaces/comic';
import { Storie } from 'src/app/interfaces/storie';
import { animations } from 'src/app/utils/animations';
import { Character } from 'src/app/interfaces/character';
import { ComicsService } from 'src/app/services/comics.service';
import { StoriesService } from 'src/app/services/stories.service';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations
})
export class HomeComponent implements AfterContentInit {
    constructor(
        private characterProvider: CharactersService,
        private comicProvider: ComicsService,
        private storieProvider: StoriesService
    ){}
    public isLoadedModules = {
        characters: false,
        stories: false,
        comics: false
    }

    public characters: Character[] = [];
    public stories: Storie[] = [];
    public comics: Comic[] = [];

    get isLoaded(): boolean {
        return this.isLoadedModules.characters && this.isLoadedModules.comics && this.isLoadedModules.stories;
    }
    ngAfterContentInit(){
        this.characterProvider.getCharacters(12, 0, true).subscribe(response => {
            this.characters = response.data.results.slice(0, 6);
            this.isLoadedModules.characters = true;
        });
        this.comicProvider.getComics(12, 0, true).subscribe(response => {
            this.comics = response.data.results.slice(0, 6);
            this.isLoadedModules.comics = true;
        });
        this.storieProvider.getStories(12, 0).subscribe(response => {
            this.stories = response.data.results.slice(0, 6);
            this.isLoadedModules.stories = true;
        });
    }
    elipsis(str: string, ln: number): string {
        return Fn.elipsis(str, ln);
    }
    getImage(val: Character | Comic | Storie): string {
        if(Fn.propertyExist(val, 'thumbnail')){
            return `${val.thumbnail.path}/portrait_xlarge.${val.thumbnail.extension}`;
        }
        return '/assets/img/marvel.png';
    }
}
