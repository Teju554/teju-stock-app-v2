import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { StockTrackerComponent } from './components/stock-tracker/stock-tracker.component';
import { StockTrackerService } from './services/stock-tracker.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, StockTrackerComponent, SentimentComponent],
  providers: [StockTrackerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
