import { Router, Route, Switch } from "react-router-dom";

import Navbar from "./core/components/Navbar";
import history from "./core/utils/history";
import Home from "./pages/Home";
import Movies from "./pages/Movies";

const Routes = () => (
  <Router history={ history }>
    <Navbar />

    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/movies">
        <Movies />
      </Route>
    </Switch>
  </Router>
)

export default Routes