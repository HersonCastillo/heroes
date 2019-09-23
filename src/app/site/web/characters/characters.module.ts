import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { MaterialModule } from 'src/app/material.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CharacterDetailsComponent } from './character-details/character-details.component';

const routes: Routes = [
    { path: '', children: [
        { path: '', component: CharactersComponent },
        { path: 'details/:id', component: CharacterDetailsComponent }
    ] }
];

@NgModule({
    declarations: [CharactersComponent, CharacterDetailsComponent],
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
