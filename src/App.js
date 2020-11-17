import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./utils/history";
import TokenService from "./utils/token";

import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Error from "./pages/error/Error";

function App() {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <PrivateRoute path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route component={Error} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

const isTokenExist = TokenService.getToken();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isTokenExist && isTokenExist !== null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export const History = history;
