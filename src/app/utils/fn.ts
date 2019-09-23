import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { SimpleComponent } from '../site/dialog/simple/simple.component';

@Injectable({
    providedIn: 'root'
})
export class Fn {
    constructor(
        private snack: MatSnackBar,
        private dialog: MatDialog
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
}