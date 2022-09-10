export interface Stocks {
  description: string;
  symbol: string;
  d: number;
  c: number;
  o: number;
  h: number;
}

export interface StockInfo {
  description: string;
  symbol: string;
}

export interface CompanyNames {
  count: number;
  result: CompanyData[];
}

export interface CompanyData {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

export interface Quote {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}

export interface StckInfo {
  companyNames: CompanyNames;
  quotes: Quote;
}
