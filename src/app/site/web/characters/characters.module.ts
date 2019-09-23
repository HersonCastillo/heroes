import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { CharactersStoriesComponent } from './characters-stories/characters-stories.component';
import { CharactersComicsComponent } from './characters-comics/characters-comics.component';
import { MaterialModule } from 'src/app/material.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    { path: '', children: [
        { path: '', component: CharactersComponent },
        { path: 'stories', component: CharactersStoriesComponent },
        { path: 'comics', component: CharactersComicsComponent }
    ] }
];

@NgModule({
    declarations: [CharactersComponent, CharactersStoriesComponent, CharactersComicsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        ScrollingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class CharactersModule { }
