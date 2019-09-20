import { Injectable } from '@angular/core';
import { Fn } from 'src/app/utils/fn';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Comic } from 'src/app/interfaces/comic';
import { ServerResponse } from 'src/app/interfaces/server-response';

@Injectable({
    providedIn: 'root'
})
export class ComicsService {
    constructor(
        private http: HttpClient
    ){}
    private path: string = Fn.getPath('comics');
    private _comics: ServerResponse<Comic> = null;
    private paginationStore = {
        limit: 0,
        offset: 0
    }

    public getComics(limit: number, offset: number): Observable<ServerResponse<Comic>> {
        if(this._comics != null && this.paginationStore.limit == limit && this.paginationStore.offset == offset) return of(this._comics);
        this.paginationStore.limit = limit;
        this.paginationStore.offset = offset;
        return this.http.get<ServerResponse<Comic>>(this.path).pipe(map(l => l), tap(l => this._comics = l));
    }
}
