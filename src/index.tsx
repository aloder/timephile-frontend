import ApolloClient from 'apollo-boost';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const auth = (operation: any) => {
  const token = localStorage.getItem('token');
  operation.setContext({ headers: { authorization: token ? token : "" }});
  return operation;
};

const client = new ApolloClient({
  request: auth,
  uri: 'http://localhost:4000'
});

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
