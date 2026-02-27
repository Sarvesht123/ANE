import { gql } from '@apollo/client';

export const GET_ANE_STORE_CONFIG = gql`
  query GetAneStoreConfig {
    aneStoreConfig {
      base_url
      secure_base_url
      store_name
      locale
      default_currency
    }
  }
`;
