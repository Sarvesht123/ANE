import { gql } from '@apollo/client';

export const GET_STORE_CONFIG = gql`
  query GetStoreConfig {
    aneStoreConfig {
      store_name
      base_url
      secure_base_url
      locale
      default_currency
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($search: String) {
    products(search: $search, pageSize: 12) {
      items {
        uid
        sku
        name
        url_key
        small_image {
          url
          label
        }
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_URL_KEY = gql`
  query GetProductByUrlKey($urlKey: String!) {
    products(filter: { url_key: { eq: $urlKey } }) {
      items {
        uid
        sku
        name
        description {
          html
        }
        small_image {
          url
          label
        }
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
          }
        }
      }
    }
  }
`;

export const CREATE_EMPTY_CART = gql`
  mutation CreateEmptyCart {
    createEmptyCart
  }
`;

export const GET_CART = gql`
  query GetCart($cartId: String!) {
    cart(cart_id: $cartId) {
      id
      total_quantity
      items {
        uid
        quantity
        product {
          sku
          name
          url_key
          small_image {
            url
          }
        }
        prices {
          row_total {
            value
            currency
          }
        }
      }
      prices {
        grand_total {
          value
          currency
        }
      }
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddProductsToCart($cartId: String!, $sku: String!, $qty: Float!) {
    addProductsToCart(
      cartId: $cartId
      cartItems: [{ sku: $sku, quantity: $qty }]
    ) {
      cart {
        id
      }
    }
  }
`;

export const GENERATE_CUSTOMER_TOKEN = gql`
  mutation GenerateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    createCustomerV2(
      input: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
      }
    ) {
      customer {
        firstname
        lastname
        email
      }
    }
  }
`;

export const GET_CUSTOMER = gql`
  query GetCustomer {
    customer {
      firstname
      lastname
      email
    }
  }
`;

export const PLACE_ORDER = gql`
  mutation PlaceOrder($cartId: String!) {
    placeOrder(input: { cart_id: $cartId }) {
      orderV2 {
        number
      }
    }
  }
`;
