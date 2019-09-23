import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    { path: '', loadChildren: './site/web/home/home.module#HomeModule' },
    { path: 'characters', loadChildren: './site/web/characters/characters.module#CharactersModule' },
    { path: 'comics', loadChildren: './site/web/comics/comics.module#ComicsModule' },
    { path: 'stories', loadChildren: './site/web/stories/stories.module#StoriesModule' },
    { path: 'error', loadChildren: './site/error/error.module#ErrorModule' },
    { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
