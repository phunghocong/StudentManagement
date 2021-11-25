import { Layout } from "antd";
import { Header, Sider, Content } from "../layouts";
import { Switch, Route, Redirect } from "react-router-dom";
import paths from "../constants/paths";
import {
  AccessDenied,
  AccountList,
  Chat,
  ClassList,
  Dashboard,
  Forum,
  NotiList,
  StudentList,
  StudyResult,
  UserProfile,
  DiscussionDetail,
} from "../screens";
import { ConsultantRoute, StudentRoute } from "./RouteTypes";

export default function MainRoutes() {
  return (
    <Layout>
      <Header />

      <Layout>
        <Sider />

        <Content>
          <Switch>
            <Route exact path={paths.BANG_DIEU_KHIEN} component={Dashboard} />

            <ConsultantRoute
              exact
              path={paths.DANH_SACH_SINH_VIEN}
              component={StudentList}
            />

            <ConsultantRoute
              exact
              path={paths.DANH_SACH_LOP_HOC}
              component={ClassList}
            />

            <ConsultantRoute
              exact
              path={paths.DANH_SACH_TAI_KHOAN}
              component={AccountList}
            />

            <Route exact path={paths.CHAT} component={Chat} />

            <Route exact path={paths.FORUM} component={Forum} />

            <Route
              path={paths.CHI_TIET_FORUM_wId}
              component={DiscussionDetail}
            />

            <Route exact path={paths.THONG_BAO} component={NotiList} />

            <StudentRoute
              exact
              path={paths.KET_QUA_HOC_TAP}
              component={StudyResult}
            />

            <Route exact path={paths.HO_SO} component={UserProfile} />

            <Route exact path={paths.ACCESS_DENIED} component={AccessDenied} />

            <Redirect exact from={paths.MAIN} to={paths.BANG_DIEU_KHIEN} />
            <Redirect to={paths.NOT_FOUND} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
