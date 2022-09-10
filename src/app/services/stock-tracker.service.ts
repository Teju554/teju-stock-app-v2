import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stocks } from '../models/stock';

@Injectable()
export class StockTrackerService {
  _apiBaseUrl: string = 'https://finnhub.io/api/v1/';
  constructor(private http: HttpClient) {}

  setDataIntoStore(stockDisplayList: Stocks[]) {
    localStorage.setItem('stockData', JSON.stringify(stockDisplayList));
  }

  getStckCompanyNames(symbol: string) {
    return this.http.get(
      `${this._apiBaseUrl}search?q=${symbol}&token=bu4f8kn48v6uehqi3cqg`
    );
  }

  getQuotesInfo(symbol: string) {
    return this.http.get(
      `${this._apiBaseUrl}quote?symbol=${symbol}&token=bu4f8kn48v6uehqi3cqg`
    );
  }

  getSentimentInfo(symbol: string, from: string, to: string) {
    return this.http.get(
      `${this._apiBaseUrl}stock/insider-sentiment?symbol=${symbol}&from=${from}&to=${to}&token=bu4f8kn48v6uehqi3cqg`
    );
  }
}
