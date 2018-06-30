import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/table/lib/css/table.css';
import 'normalize.css/normalize.css';

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
