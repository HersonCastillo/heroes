import { Injectable } from '@angular/core';
import { Fn } from 'src/app/utils/fn';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Comic } from 'src/app/interfaces/comic';
import { ServerResponse } from 'src/app/interfaces/server-response';
import { Character } from '../interfaces/character';
import { Story } from '../interfaces/story';

@Injectable({
    providedIn: 'root'
})
export class ComicsService {
    constructor(
        private http: HttpClient
    ){}
    private path: string = Fn.getPath('comics');
    private _comics: ServerResponse<Comic> = null;
    private _comic: ServerResponse<Comic> = null;
    private _characters: ServerResponse<Character> = null;
    private _stories: ServerResponse<Story> = null;

    private paginationStore = {
        limit: 0,
        offset: 0,
        orderBy: 'issueNumber'
    }

    private _id: string = null;

    public getComics(limit: number, offset: number, ascending: boolean): Observable<ServerResponse<Comic>> {
        if(
            this._comics != null && 
            this.paginationStore.limit == limit && 
            this.paginationStore.offset == offset &&
            this.valueOfOrderBy == ascending) return of(this._comics);
        this.paginationStore.limit = limit;
        this.paginationStore.offset = offset;
        this.paginationStore.orderBy = ascending ? 'issueNumber' : '-issueNumber';
        return this.http.get<ServerResponse<Comic>>(this.path).pipe(map(l => l), tap(l => this._comics = l));
    }
    public getComic(id: string): Observable<ServerResponse<Comic>>{
        if(this._comic != null && this._id == id) return of(this._comic);
        this._id = id;
        return this.http.get<ServerResponse<Comic>>(`${Fn.getPath(`comics/${id}`)}`).pipe(map(l => l), tap(l => this._comic = l));
    }
    public getComicsCharacters(comic: Comic): Observable<ServerResponse<Character>> {
        if(this._characters != null && this._id == comic.id.toString()) return of(this._characters);
        this._id = comic.id.toString();
        return this.http.get<ServerResponse<Character>>(`${Fn.getPath(`comics/${comic.id}/characters`)}`).pipe(map(l => l), tap(l => this._characters = l));
    }
    public getComicsStories(comic: Comic): Observable<ServerResponse<Story>>{
        if(this._stories != null && this._id == comic.id.toString()) return of(this._stories);
        this._id = comic.id.toString();
        return this.http.get<ServerResponse<Story>>(`${Fn.getPath(`comics/${comic.id}/stories`)}`).pipe(map(l => l), tap(l => this._stories = l));
    }
    private get valueOfOrderBy(): boolean {
        return this.paginationStore.orderBy === 'issueNumber';
    }
}
