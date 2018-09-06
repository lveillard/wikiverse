import React from "react";
import ReactDOM from "react-dom";
import fakeAuth from "./Aux/fakeAuth";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import PrivateRoute from "./Aux/PrivateRoute";

import "./styles.css";

// Public route component
const Public = () => <h3>Public</h3>;

// Protected route component
const Protected = () => <h3>Protected</h3>;

// Login logic that prevents or gives access to the protected page
class Login extends React.Component {
  state = {
    redirectToReferrer: false
  };
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({
        redirectToReferrer: true
      });
    });
  };
  render() {
    const { redirectToReferrer } = this.state;
    const { from } = this.props.location.state || { from: { pathname: "/" } };

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        <p>You must login to view this at {from.pathname}</p>
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated === true ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signOut(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in</p>
    )
);

const App = () => (
  <Router>
    <div>
      <AuthButton />
      <ul>
        <li>
          <Link to="/public">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>
      <Route path="/public" component={Public} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/protected" component={Protected} />
    </div>
  </Router>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
