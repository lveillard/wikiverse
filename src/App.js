import React, { Component } from "react";
import ReactDOM from "react-dom";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";

import PrivateRoute from "./Aux/PrivateRoute";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  withRouter
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }
  componentWillMount() {
    //auth.onAuthStateChanged(user => this.setState({ user }));
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Router>
            <div>
              <Route path="/public" component={Login} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/protected" component={NotFound} />
              <Route path="*" component={NotFound} />
            </div>
          </Router>
        </Switch>
      </div>
    );
  }
}

export default App;
