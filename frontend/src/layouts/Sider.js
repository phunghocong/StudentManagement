import { Layout, Menu } from "antd";
import { useEffect, useMemo, useState } from "react";
import {
  DashboardOutlined,
  NotificationFilled,
  UserOutlined,
  MessageFilled,
  BellFilled,
  FlagFilled,
  InsertRowAboveOutlined,
  SolutionOutlined,
  ProfileOutlined,
  FormOutlined, 
} from "@ant-design/icons";
import randomString from "crypto-random-string";
import paths from "../constants/paths";
import { useHistory, withRouter } from "react-router-dom";
import layouts from "./layouts.module.scss";
import keys from "../constants/keys";
import { currentUserIsStudent } from "../api/accounts";
const rid = () => randomString({ length: 5 });

const SIDER_WIDTH = 220;

const Sider = ({ location }) => {
  const { pathname } = location;
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState();

  const isStudent = !!currentUserIsStudent();

  const items = useMemo(() => {
    let arr = [
      {
        //Chung
        key: rid(),
        title: "Bảng điều khiển",
        icon: <DashboardOutlined />,
        path: paths.BANG_DIEU_KHIEN,
        subs: [],
      },
      {
        //Chung
        key: rid(),
        title: "Thông báo",
        icon: <BellFilled />,
        path: paths.THONG_BAO,
        subs: [],
      },
      {
        //Chung
        key: rid(),
        title: "Nhắn tin",
        icon: <MessageFilled />,
        path: paths.CHAT,
        subs: [],
      },
      {
        //Chung
        key: rid(),
        title: "Diễn đàn",
        icon: <NotificationFilled />,
        path: paths.FORUM,
        subs: [],
      },
      {
        //Chung
        key: rid(),
        title: "Hồ sơ",
        icon: <UserOutlined />,
        path: paths.HO_SO,
        subs: [],
      },
    ];

    if (isStudent) {
      arr.splice(1, 0, {
        //SV
        key: rid(),
        title: "Kết quả học tập",
        icon: <FlagFilled />,
        path: paths.KET_QUA_HOC_TAP,
        subs: [],
      },
        {
          //SV
          key: rid(),
          title: "Hồ sơ sinh viên",
          icon: <FormOutlined />,
          path: paths.HO_SO_SINH_VIEN,
          subs: [],
        });
      arr.join();
    } else {
      arr.splice(
        1,
        0,
        {
          //CVHT
          key: rid(),
          title: "Danh sách sinh viên",
          icon: <ProfileOutlined />,
          path: paths.DANH_SACH_SINH_VIEN,
          subs: [],
        },
        {
          //CVHT
          key: rid(),
          title: "Danh sách tài khoản",
          icon: <SolutionOutlined />,
          path: paths.DANH_SACH_TAI_KHOAN,
          subs: [],
        },
        {
          //CVHT
          key: rid(),
          title: "Danh sách lớp học",
          icon: <InsertRowAboveOutlined />,
          path: paths.DANH_SACH_LOP_HOC,
          subs: [],
        }
      );
      arr.join();
    }

    return arr;
  }, [isStudent]);

  useEffect(() => {
    items.forEach((item) => {
      if (item.subs.length > 0) {
        item.subs.forEach((subItem) => {
          if (subItem.path === pathname) {
            setCurrent(subItem.key);
            return;
          }
        });
      } else if (item.path === pathname) {
        setCurrent(item.key);
        return;
      }
    });
  }, [items, pathname]);

  return (
    <Layout.Sider
      width={SIDER_WIDTH}
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed((val) => !val)}
      className={layouts["sider-container"]}
    >
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[current]}
        onClick={(e) => setCurrent(e.key)}
      >
        {items.map((item) =>
          item.subs.length > 0 ? (
            <Menu.SubMenu key={item.key} title={item.title} icon={item.icon}>
              {item.subs.map((subItem) => (
                <Menu.Item
                  key={subItem.key}
                  icon={subItem.icon}
                  onClick={() => history.push(subItem.path)}
                >
                  {subItem.title}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => history.push(item.path)}
            >
              {item.title}
            </Menu.Item>
          )
        )}
      </Menu>
    </Layout.Sider>
  );
};

export default withRouter(Sider);
