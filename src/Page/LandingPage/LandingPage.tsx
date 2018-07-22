import { Button, H1, H3, Intent } from "@blueprintjs/core";
import * as React from "react";
import { Parallax } from "react-parallax";
import { RouteComponentProps } from "react-router";

import img from "./imgs/landing_image.jpg";

class LandingPage extends React.Component<RouteComponentProps<any>> {
  private redirectToSignup() {
    this.props.history.push("/signup");
  }

  public render() {
    return (
      <div style={containerStyle}>
        <div style={{ height: "100%" }}>
          <Parallax
            bgImage={img}
            blur={{ min: -1, max: 3 }}
            strength={500}
            bgStyle={{ top: "-400px" }}
          >
            <div style={{ height: window.innerHeight }}>
              <div style={{ ...insideStyles }}>
                <p>Start Caring About Your Time</p>
                <Button
                  minimal={true}
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    color: "white",
                    textShadow: "-1px 1px 10px #394b59",
                    border: "2px solid",
                    boxShadow: "-1px 1px 10px #394b59"
                  }}
                  onClick={() => this.redirectToSignup()}
                  large={true}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </Parallax>
        </div>
        <div style={{ ...contentStyle }}>
          <H1 style={headerStyle}>Time is Important</H1>
          <div style={lineDivStyle} />
          <H3 style={bodyStyle}>
            Time is one of the most valuable assets a person has. The more time
            we devote to a task the more valuable the outcome of that task
            becomes. This app is ultimately built around this idea, and its goal
            is to ensure that one is making the most of the limited time the
            user has.
          </H3>
          <H1 style={headerStyle}>Understand How You Spend Time</H1>
          <div style={lineDivStyle} />
          <H3 style={bodyStyle}>
            Use built in analytics tools to utilize your future time. We want
            our users to understand and continuously improve on their time
            management. This tool was built around very in-depth analytics to
            communicate to the user and empower them.
          </H3>

          <H1 style={headerStyle}>Flexible User Centered Design</H1>
          <div style={lineDivStyle} />
          <H3 style={bodyStyle}>
            Timephile allows for the user to take control and stay in control.
            We do not box the user into one workflow. Instead we allow the user
            to choose the workflow that suits them. We understand that some
            users refuse to log every second of their day. While we encourage
            and make it easy for them to log in depth, we vehemently support a
            more minimalist logging style.
          </H3>
          <H1 style={headerStyle}>Accessible Anywhere</H1>
          <div style={lineDivStyle} />
          <H3 style={bodyStyle}>
            Track your time on any device connected to the internet. Using
            responsive web design which supports every mobile device and
            platform.
          </H3>
          <Button
            onClick={() => this.redirectToSignup()}
            large={true}
            fill={true}
            intent={Intent.PRIMARY}
          >
            Get Started With Timephile
          </Button>
        </div>
      </div>
    );
  }
}
const insideStyles: React.CSSProperties = {
  padding: 10,
  fontWeight: "bold",
  fontSize: 62,
  // backgroundColor: '#394b59',
  // backgroundColor: 'white',
  borderRadius: "10px",
  position: "absolute",
  top: "50%",
  left: "50%",
  color: "white",
  transform: "translate(-50%,-50%)",
  textShadow: "-1px 1px 10px #394b59",
  textAlign: "center"
};
const lineDivStyle: React.CSSProperties = {
  margin: 20,
  width: 50,
  height: 5,
  backgroundColor: "black",
  marginLeft: 40
};
const contentStyle: React.CSSProperties = {
  margin: "20%",
  marginTop: 50,
  marginBottom: 50
};
const headerStyle: React.CSSProperties = {};
const bodyStyle: React.CSSProperties = {
  fontWeight: "normal",
  marginLeft: 20,
  textIndent: 20,
  marginBottom: 70
};
const containerStyle: React.CSSProperties = {};
export default LandingPage;
