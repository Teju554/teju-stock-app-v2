export interface Sentiment {
  change: number;
  month: number;
  mspr: number;
  symbol: string;
  year: number;
}

export interface SentimentInfo {
  data: Sentiment[];
  symbol: string;
}
