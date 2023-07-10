import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrendingPageComponent } from './trending-page/trending-page.component';
import { AuthGuard } from './_helpers/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { LikesPageComponent } from './likes-page/likes-page.component';

const routes: Routes = [
  {
    path: 'movies',
    canActivate: [AuthGuard],
    children: [
      { path: 'pt-BR-trending', component: TrendingPageComponent },
      { path: 'most-liked', component: LikesPageComponent },
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
