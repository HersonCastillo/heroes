import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoriesComponent } from './stories/stories.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MaterialModule } from 'src/app/material.module';
import { Routes, RouterModule } from '@angular/router';
import { StorieDetailsComponent } from './storie-details/storie-details.component';

const routes: Routes = [
    { path: '', children: [
        { path: '', component: StoriesComponent },
        { path: 'details/:id', component: StorieDetailsComponent }
    ] }
];

@NgModule({
    declarations: [StoriesComponent, StorieDetailsComponent],
    imports: [
        CommonModule,
        ScrollingModule,
        MaterialModule,
        RouterModule.forChild(routes)
    ]
})
export class StoriesModule {}
