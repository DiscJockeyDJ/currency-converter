import { Routes } from '@angular/router';
import { CurrencyConverterMainComponent } from './components/currency-converter-main/currency-converter-main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'currency-converter',
    pathMatch: 'full',
  },
  {
    path: 'currency-converter',
    component: CurrencyConverterMainComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
