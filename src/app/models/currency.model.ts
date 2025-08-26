/** Represents a currency with its details. */
export interface Currency {
  /** Currency code (e.g., 'GBP'). */
  code: string;
  /** Decimal mark used by the currency (e.g., '.'). */
  decimal_mark: string;
  /** Unique identifier for the currency. */
  id: number;
  /** Full name of the currency (e.g., 'British Pound'). */
  name: string;
  /** Number of decimal places used by the currency. */
  precision: number;
  /** Short currency code (e.g., 'GBP') */
  short_code: string;
  /** Smallest subunit of the currency. */
  subunit: number;
  /** Indicates if the currency symbol is placed before the amount. */
  symbol_first: boolean;
  /** Symbol of the currency (e.g., '£') */
  symbol: string;
  /** Thousands separator used by the currency (e.g., ',') */
  thousands_separator: string;
}
