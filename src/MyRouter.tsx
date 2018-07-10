import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import AuthRequired from "./AuthRequired";
import SliderPage from "./Components/CircleSlider/SliderPage";
import Home from "./Components/Dashboards/TimeEntry/index";
import Login from "./Login/Login";
import NavBar from "./NavBar";
import Confirm from "./Other/Confirm";
import ResetPassword from "./Other/ResetPassword";
import Signup from "./Signup/Signup";

class MyRouter extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <NavBar />
          <Route exact={true} path="/circle" component={SliderPage} />
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/signup" component={Signup} />
          <Route exact={true} path="/confirm/:link" component={Confirm} />
          <Route
            exact={true}
            path="/resetpassword/:link"
            component={ResetPassword}
          />
          <Route
            exact={true}
            path="/"
            render={props => (
              <AuthRequired>
                <Home />
              </AuthRequired>
            )}
          />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default MyRouter;
