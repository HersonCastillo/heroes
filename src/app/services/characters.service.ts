import { Injectable } from '@angular/core';
import { Fn } from 'src/app/utils/fn';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Character } from 'src/app/interfaces/character';
import { ServerResponse } from 'src/app/interfaces/server-response';
import { Storie } from '../interfaces/storie';
import { Comic } from '../interfaces/comic';

@Injectable({
    providedIn: 'root'
})
export class CharactersService {
    constructor(
        private http: HttpClient
    ) { }
    private path: string = Fn.getPath('characters');
    private _characters: ServerResponse<Character> = null;
    private _comics: ServerResponse<Comic> = null;
    private _stories: ServerResponse<Storie> = null;
    private paginationStore = {
        limit: 0,
        offset: 0,
        orderBy: 'name'
    }

    public getCharacters(limit: number, offset: number, ascending: boolean): Observable<ServerResponse<Character>> {
        if (
            this._characters != null &&
            this.paginationStore.limit == limit &&
            this.paginationStore.offset == offset &&
            this.valueOfOrderBy == ascending) return of(this._characters);
        this.paginationStore.limit = limit;
        this.paginationStore.offset = offset;
        this.paginationStore.orderBy = ascending ? 'name' : '-name';
        return this.http.get<ServerResponse<Character>>(`${this.path}&limit=${limit}&offset=${offset}&orderBy=${this.paginationStore.orderBy}`).pipe(map(l => l), tap(l => this._characters = l));
    }
    public getCharactersComics(character: Character): Observable<ServerResponse<Comic>> {
        if(this._comics != null) return of(this._comics);
        return this.http.get<ServerResponse<Comic>>(`${this.path}/${character.id}/comics`).pipe(map(l => l), tap(l => this._comics = l));
    }
    public getCharactersStories(character: Character): Observable<ServerResponse<Storie>>{
        if(this._stories != null) return of(this._stories);
        return this.http.get<ServerResponse<Storie>>(`${this.path}/${character.id}/stories`).pipe(map(l => l), tap(l => this._stories = l));
    }
    private get valueOfOrderBy(): boolean {
        return this.paginationStore.orderBy === 'name';
    }
}
