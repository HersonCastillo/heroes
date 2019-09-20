import { Component, OnInit } from '@angular/core';
import { Fn } from 'src/app/utils/fn';
import { animations } from 'src/app/utils/animations';
import { ComicsService } from 'src/app/services/comics.service';
import { CharactersService } from 'src/app/services/characters.service';

import { Character } from 'src/app/interfaces/character';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations
})
export class HomeComponent implements OnInit {
    constructor(
        private characterProvider: CharactersService,
        private comicProvider: ComicsService
    ){}
    public isLoaded: boolean = false;
    public characters: Character[] = [];

    ngOnInit(){
        window.onload = () => {
            this.characterProvider.getCharacters(6, 0).subscribe(r => {
                this.characters = r.data.results;
                this.isLoaded = true;
            });
        }
    }
    elipsis(str: string, ln: number): string {
        return Fn.elipsis(str, ln);
    }
    getImage(character: Character): string {
        return `${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`;
    }
}
