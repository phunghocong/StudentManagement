import { Route, Redirect } from "react-router-dom";
import keys from "../constants/keys";
import paths from "../constants/paths";
import { currentUserIsStudent,getCurrentUser } from "../api/accounts";
export const AuthRoute = ({ component: Component, ...remainingProps }) => {
  const isAuth = !!getCurrentUser();

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
  const isAuth = !!getCurrentUser();

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
  const isConsultant = !currentUserIsStudent();

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
  const isStudent = currentUserIsStudent();

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
