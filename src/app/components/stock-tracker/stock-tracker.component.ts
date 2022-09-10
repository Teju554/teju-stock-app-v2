import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CompanyNames,
  Quote,
  StocksList,
  StockInfo,
  Stocks,
} from '../../models/stock';
import { StockTrackerService } from '../../services/stock-tracker.service';

@Component({
  selector: 'app-stock-tracker',
  templateUrl: './stock-tracker.component.html',
  styleUrls: ['./stock-tracker.component.css'],
})
export class StockTrackerComponent implements OnInit, OnDestroy {
  stockTrackerFormGroup: FormGroup;
  stock: StockInfo[] = [];
  stockList: Stocks[] = [];
  quoteData = [];
  companyNames: CompanyNames;
  quotes: Quote;
  loading: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(private readonly stockTrackerService: StockTrackerService) {}

  ngOnInit(): void {
    this.createForm();
    this.getInititalStocks();
  }

  createForm(): void {
    this.stockTrackerFormGroup = new FormGroup({
      symbol: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(5),
      ]),
    });
  }

  getInititalStocks(): void {
    const stocks = localStorage.getItem('stockData');
    this.stockList = stocks ? JSON.parse(stocks) : [];
    this.stock = this.stockList;
  }

  submit(): void {
    this.getStocks();
  }

  getStocks(): void {
    this.loading = true;
    const { symbol } = this.stockTrackerFormGroup.value;
    combineLatest({
      companyNames: this.stockTrackerService.getStckCompanyNames(symbol),
      quotes: this.stockTrackerService.getQuotesInfo(symbol),
    })
      .pipe(
        map((response: StocksList) => {
          this.companyNames = response?.companyNames;
          this.quotes = response?.quotes;
          const list = {
            description: this.companyNames.result[0].description,
            symbol: this.companyNames.result[0].symbol,
          };
          this.stock.push(list);
          this.quoteData.push(this.quotes);
          for (let i = 0; i < this.stock.length; i++) {
            this.stockList[i] = {
              description: this.stock[i].description,
              symbol: this.stock[i].symbol,
              d: this.quoteData[i]?.d,
              c: this.quoteData[i]?.c,
              o: this.quoteData[i]?.o,
              h: this.quoteData[i]?.h,
            };
          }
          localStorage.setItem('stockData', JSON.stringify(this.stockList));
          this.stockTrackerFormGroup.reset();
          this.loading = false;
        })
      )
      .subscribe();
  }

  removeStock(indx: number): void {
    this.stockList.splice(indx, 1);
    this.stock = this.stockList;
    localStorage.setItem('stockData', JSON.stringify(this.stockList));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
