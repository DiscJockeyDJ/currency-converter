import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CurrenciesResponse } from '../models/currencies-response.model';
import { Currency } from '../models/currency.model';
import { CurrencyConverterInfo } from '../models/currency-converter-info.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  /** BehaviorSubject holding the list of available currencies. */
  private currenciesSubject = new BehaviorSubject<Currency[]>([]);

  /** Observable stream of available currencies for components to subscribe to. */
  currencies$ = this.currenciesSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Fetches the list of available currencies from the API.
   *
   * Updates the `currencies$` observable with the fetched data.
   * If an error occurs, logs it to the console and emits an empty array.
   */
  fetchCurrencies() {
    this.http
      .get<CurrenciesResponse>(
        `${environment.settings.currencyApiUrl}/currencies?api_key=${environment.settings.currencyApiKey}`
      )
      .pipe(
        catchError((err) => {
          console.error('Error fetching currencies:', err);
          return throwError(() => new Error('Currencies cannot be loaded'));
        })
      )
      .subscribe({
        next: (data: CurrenciesResponse) =>
          this.currenciesSubject.next(data.response),
        error: () => this.currenciesSubject.next([]), // optional fallback
      });
  }

  /**
   * Converts a given amount from one currency to another using the API.
   * @param from The source currency code (e.g., 'GBP').
   * @param to The target currency code (e.g., 'EUR').
   * @param amount The numeric amount to convert.
   * @returns An Observable emitting the converted amount as a number. Throws an error if the conversion fails.
   */
  convertCurrency(
    from: string,
    to: string,
    amount: number
  ): Observable<number> {
    return this.http
      .get<any>(
        `${environment.settings.currencyApiUrl}/convert?api_key=${environment.settings.currencyApiKey}&from=${from}&to=${to}&amount=${amount}`
      )
      .pipe(
        map((response: CurrencyConverterInfo) => response.value),
        catchError((err) => {
          console.error('Conversion error:', err);
          return throwError(() => new Error('Conversion not available'));
        })
      );
  }
}
