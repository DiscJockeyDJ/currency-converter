# Currency Converter

A simple web application to convert amounts between different currencies using real-time exchange rates. Built with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6 and Material Design for a responsive UI.

## Features

- Convert amounts between multiple currencies
- Real-time exchange rates
- Error handling for network or API issues
- Responsive design for desktop and mobile

## Demo

This project can be run locally. See the Installation section below.

## Installation

### Prerequisites
- Angular 18.2.13
- Node.js >= 18.15.0
- npm >= 9.5.0
- TypeScript ~5.4.2

### Setup
1. Clone the repository
```bash
git clone https://github.com/DiscJockeyDJ/currency-converter.git
```
2. Navigate to the project directory
3. Install dependencies `npm install`
4. Run the application through `npm run start` or `ng serve`
5. Open your browser at `http://localhost:4200/currency-converter`

### Usage
1. Enter an amount in the "Amount" field.
2. Select source and target currencies.
3. To quickly swap the source and target currencies, click the **Swap** icon.

### Libraries used
- Angular Material ^18.2.14
- RxJS ~7.8.0
- REST API for currency rates from `https://api.currencybeacon.com/v1`
- Angular i18n with `@angular/localize` for multi-language support.

Official Angular docs: [https://v18.angular.dev/overview](https://v18.angular.dev/overview)

### Accessibility Testing
- Tested using **Chrome Lighthouse** and **Silktide plugin** for WCAG compliance.
