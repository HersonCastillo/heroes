import { Injectable } from '@angular/core';
import { Fn } from 'src/app/utils/fn';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Character } from 'src/app/interfaces/character';
import { ServerResponse } from 'src/app/interfaces/server-response';
import { Story } from '../interfaces/story';
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
    private _character: ServerResponse<Character> = null;
    private _comics: ServerResponse<Comic> = null;
    private _stories: ServerResponse<Story> = null;
    private paginationStore = {
        limit: 0,
        offset: 0,
        orderBy: 'name'
    }
    private _id: string = null;

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
        if(this._comics != null && this._id == character.id.toString()) return of(this._comics);
        this._id = character.id.toString();
        return this.http.get<ServerResponse<Comic>>(`${Fn.getPath(`characters/${character.id}/comics`)}`).pipe(map(l => l), tap(l => this._comics = l));
    }
    public getCharactersStories(character: Character): Observable<ServerResponse<Story>>{
        if(this._stories != null && this._id == character.id.toString()) return of(this._stories);
        this._id = character.id.toString();
        return this.http.get<ServerResponse<Story>>(`${Fn.getPath(`characters/${character.id}/stories`)}`).pipe(map(l => l), tap(l => this._stories = l));
    }
    public getCharacter(id: string): Observable<ServerResponse<Character>> {
        if(this._character != null && this._id == id) return of(this._character);
        this._id = id;
        return this.http.get<ServerResponse<Character>>(`${Fn.getPath(`characters/${id}`)}`).pipe(map(l => l), tap(l => this._character = l));
    }
    private get valueOfOrderBy(): boolean {
        return this.paginationStore.orderBy === 'name';
    }
}
