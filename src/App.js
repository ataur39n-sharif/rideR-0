import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './component/Home/Home';
import LogIn from './component/LogIn/LogIn';
import SignUp from './component/LogIn/SignUp';
import { createContext, useState } from 'react';
import Search from './component/Search/Search';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';

export const userContext = createContext()

function App() {

  const [loggedInUser, setLoggedInUser] = useState({})
  // console.log(loggedInUser)

  const handelSignOut = () => {
    const signOut = '' ;
    setLoggedInUser(signOut)
  }

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {/* <h1>email : {loggedInUser.email}</h1>
      <h1>name : {loggedInUser.name}</h1> */}
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/home">Rider</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                <Link className="nav-link active" aria-current="page" to={"/vehicleType/Car"}>Search</Link>
                {
                  loggedInUser.email && loggedInUser.name ?<Link className="nav-link" to="/"> <button onClick={handelSignOut} className="btn btn-dark"> {loggedInUser.name} </button></Link> : <Link className="nav-link" to="/login"> <button className="btn btn-warning">LogIn </button></Link>
                }
              </div>
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/login">
            <LogIn></LogIn>
          </Route>
          <Route path="/signUp">
            <SignUp></SignUp>
          </Route>
          <PrivateRoute path="/vehicleType/:vehicle">
            <Search></Search>
          </PrivateRoute>
          {/* <PrivateRoute path="/search">
            <Search></Search>
          </PrivateRoute> */}
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
