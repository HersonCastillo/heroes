import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { Comic } from 'src/app/interfaces/comic';
import { ComicsService } from 'src/app/services/comics.service';
import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
import { filter } from 'rxjs/operators';
import { Fn } from 'src/app/utils/fn';

@Component({
    selector: 'app-comics',
    templateUrl: './comics.component.html',
    styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit, AfterContentInit {

    constructor(
        private comicProvider: ComicsService,
        private scrollDispatcher: ScrollDispatcher
    ){}

    @ViewChild('scroll', null) 
    public scroll: CdkVirtualScrollViewport;
    public comics: Comic[] = [];
    public comicsClone: Comic[] = [];
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
        this.pagination.limit = 12;
        this.pagination.offset = 0;
        this.withScroll(false, true);
    }
    withScroll(scroll: boolean, ascend: boolean): void {
        if ((this.pagination.limit - this.pagination.offset) > 100) {
            do {
                this.pagination.limit -= 6;
            } while ((this.pagination.limit - this.pagination.offset) > 100);
        } else {
            if (scroll) this.isLoadScroll = true;
            else this.isLoaded = false;
            this.comicProvider.getComics(this.pagination.limit, this.pagination.offset, ascend).subscribe(response => {
                this.comics = response.data.results;
                this.comicsClone = this.comics;
                if (scroll) {
                    this.isLoadScroll = false;
                    this.scroll.scrollToIndex(this.comics.length - 1, "smooth");
                } else {
                    this.isLoaded = true;
                }
            });
        }
    }
    ngAfterContentInit() {
        this.scrollDispatcher.scrolled().pipe(
            filter(() => this.scroll.measureScrollOffset('bottom') === 0)
        ).subscribe(() => {
            this.pagination.limit += 6;
            this.withScroll(true, this.isUpp);
        });
    }
    elipsis(str: string, ln: number): string {
        return Fn.elipsis(str, ln);
    }
    getImage(val: Comic): string {
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
        this.comics = this.comicsClone;
        switch (this.filterTypeIndex) {
            case 0: {
                this.comics = this.comics.filter(r => r.title.toLowerCase().includes(f));
                break;
            }
            case 1: {
                this.comics = this.comics.filter(r => r.title.toLowerCase().includes(f));
                break;
            }
            case 2: {
                this.comics = this.comics.filter(r => r.issueNumber.toString().toLowerCase().includes(f));
                break;
            }
        }
    }
    changeFilterType(value: number): void {
        this.filterTypeIndex = value;
    }
}
