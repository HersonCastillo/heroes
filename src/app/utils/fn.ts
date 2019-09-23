import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerResponse } from 'src/app/interfaces/server-response';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { SimpleComponent } from '../site/dialog/simple/simple.component';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class Fn {
    constructor(
        private snack: MatSnackBar,
        private dialog: MatDialog,
        private router: Router
    ){}
    public makeSnack(text: string, duration?: number): void {
        this.snack.open(text, null, { duration: duration || 3500 });
    }
    public openDialog(component: any, data: MatDialogConfig, afterClose?: Function): void {
        const dialog = this.dialog.open(component, data);
        if (afterClose) {
            dialog.afterClosed().subscribe(r => afterClose(r));
        }
    }
    public simple(title: string, message: string, config?: MatDialogConfig): void {
        this.openDialog(SimpleComponent, {
            data: {
                title, message
            },
            ...config
        });
    }
    public handleErrorResponse<T>(response: ServerResponse<T>, cb: Function, notFound?: Function, internalError?: Function): void {
        switch(response.code){
            case 200: {
                cb(response);
                break;
            }
            case 500: {
                internalError(response);
                this.router.navigate(['/error', 'internal-error']);
                break;
            }
            default: {
                notFound(response);
                this.router.navigate(['/error', 'not-found']);
                break;
            }
        }
    }
    public static setValue(key: string, value: string): void {
        localStorage.setItem(key, value);
    }
    public static getValue(key: string): string {
        return localStorage.getItem(key);
    }
    public static errLog(err: any): void {
        if(typeof err === 'object') err = JSON.stringify(err);
        else err = String(err);
        this.setValue('err', err);
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
    public static addFavoriteItem(key: string, object: any): void {
        let objects: string = this.getValue(key);
        if(objects){
            let objectsBlob = JSON.parse(objects) as Array<any>;
            objectsBlob.push(object);
            this.setValue(key, JSON.stringify(objectsBlob));
        } else {
            this.setValue(key, JSON.stringify([object]));
        }
    }
    public static isItemInFavoriteList(key: string, id: string): boolean {
        let objects: string = this.getValue(key);
        if(objects){
            let objectsBlob = JSON.parse(objects) as Array<any>;
            let result: boolean = false;
            for(let i of objectsBlob){
                result = id == i.id;
                if(result) break;
            }
            return result;
        }
        return false;
    }
    public static removeFavoriteItem(key: string, id: string): void {
        let objects: string = this.getValue(key);
        if(objects){
            let objectsBlob = JSON.parse(objects) as Array<any>;
            let nObjectsBlob = objectsBlob.filter(r => r.id != id);
            this.setValue(key, JSON.stringify(nObjectsBlob));
        }
    }
}