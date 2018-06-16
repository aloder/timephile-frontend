import '../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import '../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../node_modules/normalize.css/normalize.css';
import './App.css';

import * as React from 'react';

import MyRouter from './MyRouter';
import NavBar from './NavBar';

class App extends React.Component {
  public render() {
    return (
      <div>
        <NavBar />
        <MyRouter />
      </div>
    );
  }
}

export default App;
