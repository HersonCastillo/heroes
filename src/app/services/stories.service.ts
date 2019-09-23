import { Injectable } from '@angular/core';
import { Fn } from 'src/app/utils/fn';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Story } from 'src/app/interfaces/story';
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
    private _stories: ServerResponse<Story> = null;
    private _story: ServerResponse<Story> = null;
    private _characters: ServerResponse<Character> = null;
    private _comics: ServerResponse<Comic> = null;
    private paginationStore = {
        limit: 0,
        offset: 0
    }
    private _id: string = null;
    public getStories(limit: number, offset: number): Observable<ServerResponse<Story>> {
        if(this._stories != null && this.paginationStore.limit == limit && this.paginationStore.offset == offset) return of(this._stories);
        this.paginationStore.limit = limit;
        this.paginationStore.offset = offset;
        return this.http.get<ServerResponse<Story>>(this.path).pipe(map(l => l), tap(l => this._stories = l));
    }
    public getStorie(id: string): Observable<ServerResponse<Story>> {
        if(this._story != null && this._id == id) {
            return of(this._story);
        }
        return this.http.get<ServerResponse<Story>>(`${Fn.getPath(`stories/${id}`)}`).pipe(map(l => l), tap(l => this._story = l));
    }
    public getStoriesCharacters(story: Story): Observable<ServerResponse<Character>>{
        if(this._characters != null && this._id == story.id.toString()){
            return of(this._characters);
        }
        return this.http.get<ServerResponse<Character>>(`${Fn.getPath(`stories/${story.id}/characters`)}`).pipe(map(l => l), tap(l => this._characters = l));
    }
    public getStoriesComics(story: Story): Observable<ServerResponse<Comic>>{
        if(this._comics != null && this._id == story.id.toString()){
            return of(this._comics);
        }
        return this.http.get<ServerResponse<Comic>>(`${Fn.getPath(`stories/${story.id}/comics`)}`).pipe(map(l => l), tap(l => this._comics = l));
    }
}
