import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';


const auth = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  operation.setContext({ headers: { authorization: token ? `Bearer ${token}` : "" }});
  if (forward) {
    return forward(operation);
  }
  return null;
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    auth,
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors){
        graphQLErrors.map(({ message, locations, path }) =>
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }
      if (networkError) {
        console.error(`[Network error]: ${networkError}`);
      }
    }),
    new HttpLink({
      credentials: 'same-origin',
      uri: 'http://localhost:4000',
    }),
  ])
});

export const logout = () => {
  localStorage.removeItem('token');
  client.resetStore();
}
export const login = (token: string) => {
  localStorage.setItem('token', token);
  // window.location.reload()
}

class Index extends React.Component {
  public render(){
    return( 
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
