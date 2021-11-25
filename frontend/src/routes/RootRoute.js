import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import paths from "../constants/paths";
import { Login, NotFound } from "../screens";
import MainRoutes from "./MainRoutes";
import { AuthRoute, PrivateRoute } from "./RouteTypes";

export default function RootRoute() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={paths.NOT_FOUND} component={NotFound} />

        <AuthRoute exact path={paths.DANG_NHAP} component={Login} />

        <PrivateRoute path={paths.MAIN} component={MainRoutes} />

        <Redirect to={paths.NOT_FOUND} />
      </Switch>
    </BrowserRouter>
  );
}
