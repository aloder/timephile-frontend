import '../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import '../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../node_modules/@blueprintjs/table/lib/css/table.css';
import '../node_modules/normalize.css/normalize.css';

import * as React from 'react';

import MyRouter from './MyRouter';

class App extends React.Component {
  public render() {
    return (
      <div>
        <MyRouter />
      </div>
    );
  }
}

export default App;
