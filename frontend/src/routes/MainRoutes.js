import { Layout } from "antd";
import { Header, Sider, Content } from "../layouts";
import { Switch, Route, Redirect } from "react-router-dom";
import paths from "../constants/paths";
import {
  Dashboard,
  Forum,
  StudentList,
  AccountList,
  ClassList,
  Login,
  Logout,
} from "../pages";

export default function MainRoutes() {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider />
        <Content>
          <Switch>
            <Route exact path={paths.BANG_DIEU_KHIEN} component={Dashboard} />
            <Route exact path={paths.DANH_SACH_SINH_VIEN} component={StudentList} />
            <Route exact path={paths.DANH_SACH_LOP_HOC} component={ClassList} />
            <Route exact path={paths.DANH_SACH_TAI_KHOAN} component={AccountList} />
            <Route exact path={paths.TAO_THONG_BAO} component={Forum} />
            <Route exact path={paths.DANG_NHAP} component={Login} />
            <Route exact path={paths.DANG_XUAT} component={Logout} />

            <Redirect exact from={paths.MAIN} to={paths.DANG_NHAP} />
            <Redirect to={paths.NOT_FOUND} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
