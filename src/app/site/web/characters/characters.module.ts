import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent } from './characters.component';

const routes: Routes = [
    {
        path: '', component: CharactersComponent, children: [
            { path: 'stories' },
            { path: 'comics' }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    declarations: [CharactersComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class CharactersModule { }
