import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const graphqlUrl = process.env.REACT_APP_MAGENTO_GRAPHQL_URL || 'http://localhost/graphql';

const httpLink = new HttpLink({ uri: graphqlUrl });

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('customerToken');

  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
