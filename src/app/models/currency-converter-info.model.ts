/** Conversion information for a single currency pair. */
export interface CurrencyConverterInfo {
  /** The original amount to convert. */
  amount: number;
  /** Conversion date in ISO format. */
  date: string;
  /** The source currency code (e.g., 'GBP'). */
  from: string;
  /** Timestamp of the conversion. */
  timestamp: number;
  /** The target currency code (e.g., 'EUR'). */
  to: string;
  /** The converted amount. */
  value: number;
}
