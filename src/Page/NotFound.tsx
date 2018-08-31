import { H1 } from "@blueprintjs/core";
import * as React from "react";

class NotFound extends React.PureComponent {
  public render() {
    return (
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "Center",
          padding: 20
        }}
      >
        <div>
          <H1>404 Error</H1>
          <p>The page that you are looking for does not exist.</p>
        </div>
      </div>
    );
  }
}
export default NotFound;
