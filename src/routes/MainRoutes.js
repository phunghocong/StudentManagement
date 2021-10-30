import { Layout } from "antd";
import { Header, Sider, Content } from "../layouts";
import { Switch, Route, Redirect } from "react-router-dom";
import paths from "../constants/paths";
import {
  Dashboard,
  Account,
  Forum,
  StudentList,
  Discipline,
  Grade,
} from "../pages";

export default function MainRoutes() {
  return (
    <Layout>
      <Sider />

      <Layout>
        <Header />

        <Content>
          <Switch>
            <Route exact path={paths.DASHBOARD} component={Dashboard} />
            <Route exact path={paths.STUDENT} component={StudentList} />
            <Route exact path={paths.GRADE} component={Grade} />
            <Route exact path={paths.DISCIPLINE} component={Discipline} />
            <Route exact path={paths.FORUM} component={Forum} />
            <Route exact path={paths.ACCOUNT} component={Account} />

            <Redirect exact from={paths.MAIN} to={paths.DASHBOARD} />
            <Redirect to={paths.NOT_FOUND} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
