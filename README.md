# ANE Magento + React GraphQL Storefront

You're right: this implementation now uses **React JS (react-scripts)** + **GraphQL** + **Magento** only (no Vite tooling).

## What is included

- Magento 2 module: `ANE_ReactGraphQl`
- React JS storefront with pages for:
  - Homepage
  - PLP
  - PDP
  - Cart
  - Checkout
  - Place order success
  - Login
  - Register
  - My Account
- Apollo GraphQL integration against Magento GraphQL

## Magento backend setup

Copy `magento/app/code/ANE/ReactGraphQl` into your Magento project and run:

```bash
bin/magento module:enable ANE_ReactGraphQl
bin/magento setup:upgrade
bin/magento cache:flush
```

## React frontend setup (no Vite)

```bash
cd frontend
cp .env.example .env
```

Set Magento GraphQL URL:

```bash
REACT_APP_MAGENTO_GRAPHQL_URL=http://magento.local/graphql
```

Install and start:

```bash
npm install
npm start
```

Frontend runs on `http://localhost:3000`.

## GraphQL coverage

The frontend uses Magento GraphQL for:

- Product browse/details (`products`)
- Cart (`createEmptyCart`, `addProductsToCart`, `cart`)
- Customer auth and profile (`generateCustomerToken`, `createCustomerV2`, `customer`)
- Order placement (`placeOrder`)

> Note: Magento checkout in real projects usually also requires shipping, billing, and payment method mutations before `placeOrder`. This starter focuses on the full page flow and GraphQL wiring against local Magento.
