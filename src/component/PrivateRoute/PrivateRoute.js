import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { userContext } from '../../App';

const PrivateRoute = ({children , ...rest}) => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    return (
        <Route>
            <Route
      {...rest}
      render={({ location }) =>
        loggedInUser.email && loggedInUser.name ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
        </Route>
    );
};

export default PrivateRoute;