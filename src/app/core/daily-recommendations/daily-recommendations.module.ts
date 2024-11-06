import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DailyRecommendationsPageRoutingModule } from './daily-recommendations-routing.module';
import { DailyRecommendationsPage } from './daily-recommendations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyRecommendationsPageRoutingModule
  ],
  declarations: [DailyRecommendationsPage]
})
export class DailyRecommendationsPageModule {}
