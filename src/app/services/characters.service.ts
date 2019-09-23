import { Injectable } from '@angular/core';
import { Fn } from 'src/app/utils/fn';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Character } from 'src/app/interfaces/character';
import { ServerResponse } from 'src/app/interfaces/server-response';

@Injectable({
    providedIn: 'root'
})
export class CharactersService {
    constructor(
        private http: HttpClient
    ){}
    private path: string = Fn.getPath('characters');
    private _characters: ServerResponse<Character> = null;
    private paginationStore = {
        limit: 0,
        offset: 0,
        orderBy: 'name'
    }

    public getCharacters(limit: number, offset: number, ascending: boolean): Observable<ServerResponse<Character>> {
        if(this._characters != null && this.paginationStore.limit == limit && this.paginationStore.offset == offset && this.valueOfOrderBy == ascending) return of(this._characters);
        this.paginationStore.limit = limit;
        this.paginationStore.offset = offset;
        this.paginationStore.orderBy = ascending ? 'name' : '-name';
        return this.http.get<ServerResponse<Character>>(`${this.path}&limit=${limit}&offset=${offset}&orderBy=${this.paginationStore.orderBy}`).pipe(map(l => l), tap(l => this._characters = l));
    }
    private get valueOfOrderBy(): boolean {
        return this.paginationStore.orderBy === 'name';
    }
}
