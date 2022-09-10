import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { StockTrackerComponent } from './components/stock-tracker/stock-tracker.component';

const stockTrackerRoutes: Routes = [
  { path: '', component: StockTrackerComponent, pathMatch: 'full' },
  { path: 'sentiment/:symbol', component: SentimentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(stockTrackerRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
