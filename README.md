# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

- Install dependencies:

bash

npm install
cd client
npm install
cd ..

Configuration:
Create a .env file in the root directory of the project and add the following variables:

bash

PORT=3000
DB_URL=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
Run the project:

bash

npm run dev
Usage
Landing Page:

Product search, filter, and pagination options.
Category section.
Product list in card format with image, title, price, rating, and "Add to Cart" button.
Products Page:

Dedicated page with product pagination, filtering, and searching.
Product Details Page:

Detailed information about a specific product.
Checkout/Cart Page:

Displays products added to the cart and allows users to proceed to checkout.
Payment Page:

Handles payments through Stripe.js.
Product and Category Management Page:

Interface for managing products and categories.
State Management
Redux: Manages the state for products, categories, cart, and other actions.
Actions and Reducers: Create actions and reducers for managing state changes.
Thank you for using the Online Nursery Shop! We hope you enjoy your shopping experience. 🌱
