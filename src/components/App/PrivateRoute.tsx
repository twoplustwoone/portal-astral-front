import { Redirect, Route } from "react-router";
import * as React from "react";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      props =>
        sessionStorage.getItem('user')
          ?
          <Component {...props} />
          :
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
    }
  />
);