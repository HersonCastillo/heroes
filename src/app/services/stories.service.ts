import { Injectable } from '@angular/core';
import { Fn } from 'src/app/utils/fn';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Storie } from 'src/app/interfaces/storie';
import { ServerResponse } from 'src/app/interfaces/server-response';
import { Character } from '../interfaces/character';
import { Comic } from '../interfaces/comic';

@Injectable({
    providedIn: 'root'
})
export class StoriesService {
    constructor(
        private http: HttpClient
    ) { }
    private path: string = Fn.getPath('stories');
    private _stories: ServerResponse<Storie> = null;
    private _storie: ServerResponse<Storie> = null;
    private _characters: ServerResponse<Character> = null;
    private _comics: ServerResponse<Comic> = null;
    private paginationStore = {
        limit: 0,
        offset: 0
    }
    private _id: string = null;
    public getStories(limit: number, offset: number): Observable<ServerResponse<Storie>> {
        if(this._stories != null && this.paginationStore.limit == limit && this.paginationStore.offset == offset) return of(this._stories);
        this.paginationStore.limit = limit;
        this.paginationStore.offset = offset;
        return this.http.get<ServerResponse<Storie>>(this.path).pipe(map(l => l), tap(l => this._stories = l));
    }
    public getStorie(id: string): Observable<ServerResponse<Storie>> {
        if(this._storie != null && this._id == id) {
            return of(this._storie);
        }
        return this.http.get<ServerResponse<Storie>>(`${Fn.getPath(`stories/${id}`)}`).pipe(map(l => l), tap(l => this._storie = l));
    }
    public getStoriesCharacters(storie: Storie): Observable<ServerResponse<Character>>{
        if(this._characters != null && this._id == storie.id.toString()){
            return of(this._characters);
        }
        return this.http.get<ServerResponse<Character>>(`${Fn.getPath(`stories/${storie.id}/characters`)}`).pipe(map(l => l), tap(l => this._characters = l));
    }
    public getStoriesComics(storie: Storie): Observable<ServerResponse<Comic>>{
        if(this._comics != null && this._id == storie.id.toString()){
            return of(this._comics);
        }
        return this.http.get<ServerResponse<Comic>>(`${Fn.getPath(`stories/${storie.id}/comics`)}`).pipe(map(l => l), tap(l => this._comics = l));
    }
}
