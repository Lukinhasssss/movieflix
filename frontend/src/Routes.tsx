import { Redirect, Route, Router, Switch } from "react-router-dom";
import Navbar from "./core/components/Navbar";
import history from "./core/utils/history";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import PrivateRoute from "./core/components/Routes/PrivateRoute";
import { isAuthenticated } from "./core/utils/auth";
import MovieDetails from "./pages/Movies/components/MovieDetails";

const Routes = () => (
  <Router history={ history }>
    <Navbar />

    <Switch>
      <Route
        path="/"
        exact
        render={() => {
          return (isAuthenticated() ?
            <Redirect to='/movies' /> :
            <Home />
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