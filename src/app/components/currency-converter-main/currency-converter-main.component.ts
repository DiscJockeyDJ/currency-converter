import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { Currency } from '../../models/currency.model';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrencyConverterComponent } from '../currency-converter/currency-converter.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currency-converter-main',
  standalone: true,
  imports: [CommonModule, CurrencyConverterComponent, MatProgressSpinnerModule],
  templateUrl: './currency-converter-main.component.html',
  styleUrl: './currency-converter-main.component.scss',
})
export class CurrencyConverterMainComponent implements OnInit, OnDestroy {
  convertedAmount: number | string | null = null;
  /** Array of available currencies. */
  currencies: Currency[] = [];
  /** Indicates whether the currencies are currently being loaded. */
  loadError: boolean = false;
  /** Flag indicating if there was an error loading currencies. */
  loading: boolean = true;

  private subscriptions: Subscription = new Subscription();

  constructor(private currencyService: CurrencyService) {}

  ngOnDestroy(): void {
    // Unsubscribe all at once.
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    // Start fetching currencies.
    this.currencyService.fetchCurrencies();

    this.subscriptions.add(
      // Subscribe to the observable stream of currencies.
      this.currencyService.currencies$.subscribe({
        next: (currencies) => {
          this.currencies = currencies;
          this.loading = false;
          this.loadError = currencies.length === 0; // show error if no currencies returned
        },
        error: () => {
          this.loadError = true;
          this.loading = false;
        },
      })
    );
  }

  /**
   * Handles conversion requests from the child component.
   * @param event The conversion request event containing amount, from, and to currency codes.
   */
  onConvert(event: { amount: number; from: string; to: string } | any) {
    this.currencyService
      .convertCurrency(event.from, event.to, event.amount)
      .subscribe({
        next: (value) => (this.convertedAmount = value),
        error: () => (this.convertedAmount = 'Not available'),
      });
  }
}
