import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { Storie } from 'src/app/interfaces/storie';
import { StoriesService } from 'src/app/services/stories.service';
import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
import { filter } from 'rxjs/operators';
import { Fn } from 'src/app/utils/fn';

@Component({
    selector: 'app-stories',
    templateUrl: './stories.component.html',
    styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit, AfterContentInit {
    constructor(
        private storieProvider: StoriesService,
        private scrollDispatcher: ScrollDispatcher,
        private fn: Fn
    ) { }
    @ViewChild('scroll', null)
    public scroll: CdkVirtualScrollViewport;
    public stories: Storie[] = [];
    public isLoadScroll: boolean = false;
    public isLoaded: boolean = false;
    public filter: string = "";
    public pagination = {
        limit: 12,
        offset: 0
    }
    ngOnInit() {
        this.pagination.limit = 12;
        this.pagination.offset = 0;
        this.withScroll(false);
    }
    withScroll(scroll: boolean): void {
        if ((this.pagination.limit - this.pagination.offset) > 100) {
            do {
                this.pagination.limit -= 6;
            } while ((this.pagination.limit - this.pagination.offset) > 100);
        } else {
            if (scroll) this.isLoadScroll = true;
            else this.isLoaded = false;
            this.storieProvider.getStories(this.pagination.limit, this.pagination.offset).subscribe(response => {
                this.stories = response.data.results;
                if (scroll) {
                    this.isLoadScroll = false;
                    this.scroll.scrollToIndex(this.stories.length - 1, "smooth");
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
            this.withScroll(true);
        });
    }
    elipsis(str: string, ln: number): string {
        return Fn.elipsis(str, ln);
    }
    getImage(val: Storie): string {
        if (Fn.propertyExist(val, 'thumbnail')) {
            return `${val.thumbnail.path}/portrait_xlarge.${val.thumbnail.extension}`;
        }
        return '/assets/img/marvel.png';
    }
    addFavoriteList(key: string, object: any): void {
        Fn.addFavoriteItem(key, {
            id: object.id,
            name: object.name,
            title: object.title,
            description: object.description
        });
    }
    removeFromFavoriteList(key: string, id: any): void {
        Fn.removeFavoriteItem(key, id);
    }
    isItemInFavorites(key: string, id: string): boolean {
        return Fn.isItemInFavoriteList(key, id);
    }
    checkFavoriteList(key: string, object: any): void {
        if (this.isItemInFavorites(key, object.id)) {
            this.removeFromFavoriteList(key, object.id);
            this.fn.makeSnack('Item removed from favorite list');
        } else {
            this.addFavoriteList(key, object);
            this.fn.makeSnack('Item added to favorite list');
        }
    }
}
