import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { AuthGuard } from './_helpers/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: 'movies',
    canActivate: [AuthGuard],
    children: [
      { path: 'pt-BR-trending', component: MoviePageComponent },
      { path: 'most-liked', component: MoviePageComponent },
    ],
  },
  {
    path: '',
    component: HomePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
