import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


class MyRouter extends React.Component {
  public render() {
    return (
        <BrowserRouter>
          <Route exact={true} path="/"  />
        </BrowserRouter>
    );
  }
}

export default MyRouter;
