import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class Fn {
    constructor(
        private snack: MatSnackBar
    ){}
    public makeSnack(text: string, duration?: number): void {
        this.snack.open(text, null, { duration: duration || 3500 });
    }
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
    public static propertyExist(propertyVariable: any, propertyChildName: string): boolean {
        if(propertyVariable != undefined && propertyVariable != null){
            let result: any = propertyVariable[propertyChildName];
            return result != undefined && result != null;
        }
        return false;
    }
}