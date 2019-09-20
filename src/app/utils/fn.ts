import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class Fn {
    public static getPath(path: string): string {
        return `${environment.baseurl}/${path}?apikey=${environment.user.key.public}&ts=${environment.ts}&hash=${environment.envhash}`;
    }
    public static elipsis(str: string, ln: number): string {
        if(str){
            if(str.length >= ln) return str.slice(0, ln - 1).concat("...");
        }
        return str;
    }
    public static compressImage(url: string, w: number, h: number): string {
        if(url){
            return `${environment.imagecompress}/${url.replace('http://', '')}`;
        }
        return url;
    }
}