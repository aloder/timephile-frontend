import { H3 } from "@blueprintjs/core";
import * as React from "react";

const ConfirmEmail: React.SFC = () => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: 30
      }}
    >
      <H3>Thanks for signing up! Please confirm your email.</H3>
      <p>Might take a second, and please check your spam as well.</p>
    </div>
  </div>
);
export default ConfirmEmail;
