import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ComicsComponent } from './comics.component';

const routes: Routes = [
    {
        path: '', component: ComicsComponent, children: [
            { path: 'characters' },
            { path: 'stories' }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    declarations: [ComicsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class ComicsModule { }
