import { CurrencyConverterMetaInfo } from './currency-converter-meta-info.model';
import { Currency } from './currency.model';

/** Response object returned when fetching the list of currencies. */
export interface CurrenciesResponse {
  /** Metadata about the API response */
  meta: CurrencyConverterMetaInfo;
  /** Array of currencies. */
  response: Currency[];
}
