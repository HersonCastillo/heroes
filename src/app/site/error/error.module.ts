import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { E404Component } from './e404/e404.component';
import { E500Component } from './e500/e500.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'not-found', component: E404Component },
    { path: 'internal-error', component: E500Component },
    { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
    declarations: [E404Component, E500Component],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class ErrorModule { }
