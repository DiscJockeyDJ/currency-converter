import { CurrencyConverterInfo } from './currency-converter-info.model';
import { CurrencyConverterMetaInfo } from './currency-converter-meta-info.model';

/** Full response object returned when performing a currency conversion. */
export interface CurrencyConverterResponse {
  /** The original amount to convert. */
  amount: number;
  /** Conversion date in ISO format. */
  date: string;
  /** The source currency code (e.g., 'GBP'). */
  from: string;
  /** Metadata about the API response */
  meta: CurrencyConverterMetaInfo;
  /** The currency converter info. */
  response: CurrencyConverterInfo;
  /** Timestamp of the conversion. */
  timestamp: number;
  /** The target currency code (e.g., 'EUR'). */
  to: string;
  /** The converted amount. */
  value: number;
}
