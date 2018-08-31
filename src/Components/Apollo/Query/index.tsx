import { FetchPolicy } from 'apollo-client';
import * as React from 'react';
import { Query as Q } from 'react-apollo';

class Query<T, S = any> extends React.Component<IQueryProps<T, S>>{

  public render(){
    const { query, variables, children, policy} = this.props;
    return (
      <Q<T, S> query={query} variables={variables} fetchPolicy={policy}>
        {({ loading, error, data }) =>{
          if(loading) {
            return <p>Loading...</p>
          }
          if(error){
            console.error(error);
            return <p color={'red'}>ERROR! {error}</p>
          }
          if (!data) {
            return <p color={'orange'}> No Data</p>
          }
          return children(data)
        }}
      </Q>)
  }
}

interface IQueryProps<T, S>{
  query: any
  policy?: FetchPolicy
  variables?: S
  children(data: T): React.ReactNode
}

export default Query;