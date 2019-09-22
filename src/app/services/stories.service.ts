import { Injectable } from '@angular/core';
import { Fn } from 'src/app/utils/fn';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Storie } from 'src/app/interfaces/storie';
import { ServerResponse } from 'src/app/interfaces/server-response';

@Injectable({
    providedIn: 'root'
})
export class StoriesService {
    constructor(
        private http: HttpClient
    ) { }
    private path: string = Fn.getPath('stories');
    private _stories: ServerResponse<Storie> = null;
    private paginationStore = {
        limit: 0,
        offset: 0
    }
    public getStories(limit: number, offset: number): Observable<ServerResponse<Storie>> {
        if(this._stories != null && this.paginationStore.limit == limit && this.paginationStore.offset == offset) return of(this._stories);
        this.paginationStore.limit = limit;
        this.paginationStore.offset = offset;
        return this.http.get<ServerResponse<Storie>>(this.path).pipe(map(l => l), tap(l => this._stories = l));
    }
}
