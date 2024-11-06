import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyRecommendationsPage } from './daily-recommendations.page';

const routes: Routes = [
  {
    path: '',
    component: DailyRecommendationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyRecommendationsPageRoutingModule {}
