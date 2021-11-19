import { BrowserRouter, Switch, Route } from "react-router-dom";
import paths from "../constants/paths";
import { Login, NotFound } from "../pages";
import MainRoutes from "./MainRoutes";

export default function RootRoute() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={paths.NOT_FOUND} component={NotFound} />
        <Route exact path={paths.DANG_NHAP} component={Login} />
        <Route path={paths.MAIN} component={MainRoutes} />
      </Switch>
    </BrowserRouter>
  );
}
