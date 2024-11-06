import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-matches',
    pathMatch: 'full'
  },
  {
    path: 'my-matches',
    loadChildren: () => import('./core/my-matches/my-matches.module').then(m => m.MyMatchesPageModule)
  },
  {
    path: 'daily-recommendations',
    loadChildren: () => import('./core/daily-recommendations/daily-recommendations.module').then(m => m.DailyRecommendationsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
