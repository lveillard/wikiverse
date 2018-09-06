import React from "react";
import ReactDOM from "react-dom";
import fakeAuth from "./fakeAuth";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              from: props.location
            }
          }}
        />
      )
    }
  />
);
export default PrivateRoute;
