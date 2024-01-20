# Sakuku Web
Sakuku adalah uang elektronik yang dapat digunakan untuk pembayaran belanja, isi pulsa / paket data, beli voucher game, dan transaksi perbankan lainnya.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
You need to install NodeJS and NPM to run this app.

### Installing
```
npm install
```

## Running the Test
```
npm run test
```
To check the coverage
```
npm run test:coverage
```

## Development
```
npm start
```

## Deployment for SIT
```
npm run build:sit
npm run deploy:sit
```

### Dependencies
* [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
* [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) - Declarative routing for React.
* [bootstrap](https://getbootstrap.com/) - Bootstrap is an open source toolkit for developing with HTML, CSS, and JS.
* [react-bootstrap](https://react-bootstrap.github.io) - The most popular front-end framework. Rebuilt for React.
* [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
* [react-number-format](https://github.com/s-yadav/react-number-format) - React component to format numbers in an input or as a text.
* [js-cookie](https://github.com/js-cookie/js-cookie) - A simple, lightweight JavaScript API for handling browser cookies.
* [react-hook-form](https://react-hook-form.com) - Performant, flexible and extensible forms with easy-to-use validation.
* [text-security](https://www.npmjs.com/package/text-security) - Cross-browser alternative to -webkit-text-security
* [dayjs](https://www.npmjs.com/package/dayjs) - Fast 2kB alternative to Moment.js with the same modern API

### Dev Dependencies
* [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment from code is based on The Twelve-Factor App methodology.
* [env-cmd](https://www.npmjs.com/package/env-cmd) - A simple node program for executing commands using an environment from an env file.
* [node-sass](https://sass-lang.com/install) - Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.

### Testing Dependencies
* [@testing-library/react]() - React Testing Library builds on top of DOM Testing Library by adding APIs for working with React components.
* [@testing-library/react-hooks](https://github.com/testing-library/react-hooks-testing-library) - Simple and complete React hooks testing utilities that encourage good testing practices.
* [react-test-renderer] - As peer dependences of @testing-library/react-hooks
* [mutationobserver-shim] - A polyfill for the MutationObserver API (can I use?).
