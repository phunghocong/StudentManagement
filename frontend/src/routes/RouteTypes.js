import { Route, Redirect } from "react-router-dom";
import keys from "../constants/keys";
import paths from "../constants/paths";

export const AuthRoute = ({ component: Component, ...remainingProps }) => {
  const isAuth = !!localStorage.getItem(keys.USER);

  return (
    <Route
      {...remainingProps}
      render={(props) => {
        return isAuth ? (
          <Redirect to={paths.BANG_DIEU_KHIEN} />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

export const PrivateRoute = ({ component: Component, ...remainingProps }) => {
  const isAuth = !!localStorage.getItem(keys.USER);

  return (
    <Route
      {...remainingProps}
      render={(props) => {
        return isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to={paths.DANG_NHAP} />
        );
      }}
    />
  );
};

export const ConsultantRoute = ({
  component: Component,
  ...remainingProps
}) => {
  const isConsultant = !JSON.parse(localStorage.getItem(keys.USER)).isStudent;

  return (
    <Route
      {...remainingProps}
      render={(props) => {
        return isConsultant ? (
          <Component {...props} />
        ) : (
          <Redirect to={paths.ACCESS_DENIED} />
        );
      }}
    />
  );
};

export const StudentRoute = ({ component: Component, ...remainingProps }) => {
  const isStudent = JSON.parse(localStorage.getItem(keys.USER)).isStudent;

  return (
    <Route
      {...remainingProps}
      render={(props) => {
        return isStudent ? (
          <Component {...props} />
        ) : (
          <Redirect to={paths.ACCESS_DENIED} />
        );
      }}
    />
  );
};
