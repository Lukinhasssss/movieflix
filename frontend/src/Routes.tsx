import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./core/components/Navbar";
import Home from "./pages/Home";

const Routes = () => (
  <BrowserRouter>
    <Navbar />

    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
    </Switch>
  </BrowserRouter>
)

export default Routes