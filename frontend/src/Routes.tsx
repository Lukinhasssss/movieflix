import { Redirect, Route, Router, Switch } from "react-router-dom";
import Navbar from "./core/components/Navbar";
import history from "./core/utils/history";
import Home from "./pages/Home";
import CreateAccount from "./pages/Home/CreateAccount";
import Movies from "./pages/Movies";
import PrivateRoute from "./core/components/Routes/PrivateRoute";
import { isAuthenticated } from "./core/utils/auth";
import MovieDetails from "./pages/Movies/components/MovieDetails";

const Routes = () => (
  <Router history={ history }>
    <Navbar />

    <Switch>
      <Redirect from="/" to="/login" exact />
      <Route
        path="/login"
        render={() => {
          return (isAuthenticated() ?
            <Redirect to='/movies' /> :
            <Home />
          )
        }}
      />

      <Route
        path="/criar-conta"
        render={() => {
          return (isAuthenticated() ?
            <Redirect to='/movies' /> :
            <CreateAccount />
          )
        }}
      />

      <PrivateRoute path="/movies" exact>
        <Movies />
      </PrivateRoute>

      <PrivateRoute path="/movies/:movieId">
        <MovieDetails />
      </PrivateRoute>
    </Switch>
  </Router>
)

export default Routes