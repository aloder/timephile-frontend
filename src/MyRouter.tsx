import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AuthRequired from "./AuthRequired";
import SliderPage from "./Components/CircleSlider/SliderPage";
import Home from "./Components/Dashboards/TimeEntry";
import Login from "./Login/Login";
import NavBar from "./NavBar";
import Confirm from "./Other/Confirm";
import ResetPassword from "./Other/ResetPassword";
import LandingPage from "./Page/LandingPage/LandingPage";
import Signup from "./Signup/Signup";

class MyRouter extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route exact={true} path="/">
              <React.Fragment>
                <NavBar landingPage={true} />
                <Route component={LandingPage} />
              </React.Fragment>
            </Route>
            <Route>
              <React.Fragment>
                <NavBar />
                <Switch>
                  <Route exact={true} path="/circle" component={SliderPage} />
                  <Route exact={true} path="/login" component={Login} />
                  <Route exact={true} path="/signup" component={Signup} />
                  <Route
                    exact={true}
                    path="/confirm/:link"
                    component={Confirm}
                  />
                  <Route
                    exact={true}
                    path="/resetpassword/:link"
                    component={ResetPassword}
                  />
                  <Route
                    exact={true}
                    path="/home"
                    render={props => (
                      <AuthRequired>
                        <Home />
                      </AuthRequired>
                    )}
                  />
                </Switch>
              </React.Fragment>
            </Route>
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default MyRouter;
