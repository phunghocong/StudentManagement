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
} from "../pages";

import Mainpage from "../pages/studentpages/mainpages/MainPage";

import ScoreBoard from "../pages/studentpages/scoreboard/ScoreBoard";

import Noftications from "../pages/studentpages/noftications/Noftications";

import Chatting from "../pages/studentpages/chatting/Chatting";

export default function MainRoutes() {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider />
        <Content>
          <Switch>
            <Route exact path={paths.BANG_DIEU_KHIEN} component={Dashboard} />
            <Route
              exact
              path={paths.DANH_SACH_SINH_VIEN}
              component={StudentList}
            />
            <Route exact path={paths.DANH_SACH_LOP_HOC} component={ClassList} />
            <Route
              exact
              path={paths.DANH_SACH_TAI_KHOAN}
              component={AccountList}
            />
            <Route exact path={paths.TAO_THONG_BAO} component={Forum} />
            <Route exact path="/TRANG_CHINH_SINH_VIEN" component={Mainpage} />

            <Route exact path="/score-board" component={ScoreBoard} />

            <Route exact path="/nofti" component={Noftications} />

            <Route exact path="/chatting" component={Chatting} />

            <Redirect exact from={paths.MAIN} to={paths.BANG_DIEU_KHIEN} />
            <Redirect to={paths.NOT_FOUND} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
