import * as React from "react";

import SignUp from "../Components/Apollo/Mutation/SignUp";
import SignupForm from "./SignupForm";

class Signup extends React.Component {
  public render() {
    return <SignUp>{create => <SignupForm create={create} />}</SignUp>;
  }
}

export default Signup;
