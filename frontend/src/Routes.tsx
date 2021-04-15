import { BrowserRouter, Route, Switch } from "react-router-dom";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        {/* <Home /> */}
      </Route>
    </Switch>
  </BrowserRouter>
)

export default Routes