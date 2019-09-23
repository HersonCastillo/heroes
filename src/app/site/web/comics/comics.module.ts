import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ComicsComponent } from './comics/comics.component';
import { ComicDetailsComponent } from './comic-details/comic-details.component';
import { MaterialModule } from 'src/app/material.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '', children: [
            { path: '', component: ComicsComponent },
            { path: 'details/:id', component: ComicDetailsComponent }
        ]
    }
];

@NgModule({
    declarations: [ComicsComponent, ComicDetailsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        ScrollingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ComicsModule { }
