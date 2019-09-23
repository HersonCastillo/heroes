import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { Character } from 'src/app/interfaces/character';
import { CharactersService } from 'src/app/services/characters.service';
import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
import { filter } from 'rxjs/operators';
import { Fn } from 'src/app/utils/fn';

@Component({
    selector: 'app-characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit, AfterContentInit {

    constructor(
        private characterProvider: CharactersService,
        private scrollDispatcher: ScrollDispatcher,
        private fn: Fn
    ) { }

    @ViewChild('scroll', null) public scroll: CdkVirtualScrollViewport;
    public characters: Character[] = [];
    public charactersClone: Character[] = [];
    public isLoadScroll: boolean = false;
    public isLoaded: boolean = false;
    public filter: string = "";

    private filterTypeIndex: number = 0;

    public pagination = {
        limit: 12,
        offset: 0
    }
    public isUpp: boolean = true;

    ngOnInit() {
        this.withScroll(false, true);
    }
    withScroll(scroll: boolean, ascend: boolean): void {
        if (scroll) this.isLoadScroll = true;
        else this.isLoaded = false;
        this.characterProvider.getCharacters(this.pagination.limit, this.pagination.offset, ascend).subscribe(response => {
            this.characters = response.data.results;
            this.charactersClone = this.characters;
            if (scroll) {
                this.isLoadScroll = false;
                this.scroll.scrollToIndex(this.characters.length - 1, "smooth");
            } else {
                this.isLoaded = true;
            }
        });
    }
    ngAfterContentInit() {
        this.scrollDispatcher.scrolled().pipe(
            filter(() => this.scroll.measureScrollOffset('bottom') === 0)
        ).subscribe(() => {
            this.pagination.limit += 6;
            if ((this.pagination.limit - this.pagination.offset) > 100) {
                this.fn.makeSnack("You cannot make more than 100 requests");
            } else {
                this.withScroll(true, this.isUpp);
            }
        });
    }
    elipsis(str: string, ln: number): string {
        return Fn.elipsis(str, ln);
    }
    getImage(val: Character): string {
        if (Fn.propertyExist(val, 'thumbnail')) {
            return `${val.thumbnail.path}/portrait_xlarge.${val.thumbnail.extension}`;
        }
        return '/assets/img/marvel.png';
    }
    changeOrder(): void {
        this.isUpp = !this.isUpp;
        this.withScroll(false, this.isUpp);
    }
    filterBy(): void {
        let f: string = this.filter.toLowerCase();
        this.characters = this.charactersClone;
        switch (this.filterTypeIndex) {
            case 0: {
                this.characters = this.characters.filter(r => r.name.toLowerCase().includes(f));
                break;
            }
            case 1: {
                this.characters = this.characters.filter(r => r.comics.items.filter(d => d.name.toLowerCase().includes(f)).length > 0);
                break;
            }
            case 2: {
                this.characters = this.characters.filter(r => r.stories.items.filter(d => d.name.toLowerCase().includes(f)).length > 0);
                break;
            }
        }
    }
    changeFilterType(value: number): void {
        this.filterTypeIndex = value;
    }
}