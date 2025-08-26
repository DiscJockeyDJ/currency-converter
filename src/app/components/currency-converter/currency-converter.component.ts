import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Currency } from '../../models/currency.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss',
})
export class CurrencyConverterComponent implements OnInit {
  /** Converted amount from the parent. */
  @Input() convertedAmount: number | string | null = null;
  /** Array of available currencies. */
  @Input() currencies: Currency[] = [];

  /** Emit to parent when user requests conversion */
  @Output() convert = new EventEmitter<{
    amount: number;
    from: string;
    to: string;
  }>();

  /** Reactive form for capturing user input. */
  form!: FormGroup;
  filteredFrom: Observable<Currency[]> | undefined;
  filteredTo: Observable<Currency[]> | undefined;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      amount: [1],
      fromCurrency: [`GBP`],
      toCurrency: [`EUR`],
    });

    // emit default conversion (1 GBP -> EUR).
    this.convert.emit({
      amount: 1,
      from: 'GBP',
      to: 'EUR',
    });

    // Emit when amount changes (if currencies are valid)
    this.form.controls['amount'].valueChanges.subscribe((amount) => {
      const { fromCurrency, toCurrency } = this.form.value;
      if (
        this.isValidCurrency(fromCurrency) &&
        this.isValidCurrency(toCurrency)
      ) {
        this.convert.emit({
          amount,
          from: fromCurrency,
          to: toCurrency,
        });
      }
    });

    // Filtering for From field.
    this.filteredFrom = this.setupFilter('fromCurrency');

    // Filtering for To field.
    this.filteredTo = this.setupFilter('toCurrency');
  }

  /**
   * Swaps the "fromCurrency" and "toCurrency" form controls and triggers a conversion event.
   * Useful when the user wants to quickly reverse the conversion direction.
   */
  swapCurrencies() {
    const { fromCurrency, toCurrency, amount } = this.form.value;
    this.form.patchValue({
      fromCurrency: toCurrency,
      toCurrency: fromCurrency,
    });

    if (
      this.isValidCurrency(toCurrency) &&
      this.isValidCurrency(fromCurrency)
    ) {
      this.convert.emit({ amount, from: toCurrency, to: fromCurrency });
    }
  }

  /**
   * Called when user selects currency from autocomplete
   * @param controlName The name of the form control ("fromCurrency" or "toCurrency")
   * @param value The selected currency short_code
   */
  onCurrencySelected(controlName: string, value: string): void {
    this.form.patchValue({ [controlName]: value });

    const { amount, fromCurrency, toCurrency } = this.form.value;
    if (
      this.isValidCurrency(fromCurrency) &&
      this.isValidCurrency(toCurrency)
    ) {
      this.convert.emit({
        amount,
        from: fromCurrency,
        to: toCurrency,
      });
    }
  }

  //#region Private methods.

  /**
   * Filters the list of currencies based on user input.
   * @param value The user input to filter currencies by (short_code or name).
   * @returns Filtered array of currencies matching the input.
   */
  private filterCurrency(value: string): Currency[] {
    const filterValue = value?.toLowerCase() ?? '';
    return this.currencies.filter(
      (c) =>
        c.short_code.toLowerCase().includes(filterValue) ||
        c.name.toLowerCase().includes(filterValue)
    );
  }

  /**
   * Helper to check if a currency code exists in the provided list.
   * @param code The currency short_code to validate (e.g., 'GBP').
   * @returns True if the currency exists, false otherwise.
   */
  private isValidCurrency(code: string): boolean {
    return this.currencies.some((c) => c.short_code === code);
  }

  /**
   * Validates and sets up filtering for a given form control.
   * @param controlName The name of the form control to set up filtering for ("fromCurrency" or "toCurrency").
   * @returns An Observable emitting the filtered list of currencies as the user types.
   */
  private setupFilter(controlName: string): Observable<Currency[]> {
    return this.form.get(controlName)!.valueChanges.pipe(
      startWith(this.form.get(controlName)!.value || ''),
      map((val) => this.filterCurrency(val))
    );
  }

  //#endregion Private methods.
}
