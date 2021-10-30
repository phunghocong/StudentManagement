import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { DashboardOutlined } from "@ant-design/icons";
import randomString from "crypto-random-string";
import paths from "../constants/paths";
import { useHistory, withRouter } from "react-router-dom";

const rid = () => randomString({ length: 5 });

const items = [
  {
    key: rid(),
    title: "Bảng điều khiển",
    icon: <DashboardOutlined />,
    path: paths.DASHBOARD,
    subs: [],
  },
  {
    key: rid(),
    title: "Quản lý sinh viên",
    icon: <DashboardOutlined />,
    path: paths.STUDENT,
    subs: [],
  },
  {
    key: rid(),
    title: "Quản lý học vụ",
    icon: <DashboardOutlined />,
    path: undefined,
    subs: [
      {
        key: rid(),
        title: "Điểm rèn luyện",
        icon: <DashboardOutlined />,
        path: paths.GRADE,
        subs: [],
      },
      {
        key: rid(),
        title: "Quản lý sinh viên",
        icon: <DashboardOutlined />,
        path: paths.DISCIPLINE,
        subs: [],
      },
    ],
  },
  {
    key: rid(),
    title: "Diễn đàn",
    icon: <DashboardOutlined />,
    path: paths.FORUM,
    subs: [],
  },
  {
    key: rid(),
    title: "Tài khoản",
    icon: <DashboardOutlined />,
    path: paths.ACCOUNT,
    subs: [],
  },
];

const Sider = ({ location }) => {
  const { pathname } = location;
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState();

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
  }, [pathname]);

  return (
    <Layout.Sider
      style={{
        height: "100vh",
        position: "sticky",
        top: 0,
        overflow: "auto",
      }}
      width={250}
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed((val) => !val)}
    >
      <div
        className=""
        style={{
          width: "100%",
          color: "#fff",
          fontSize: 30,
          padding: "10px 20px",
          textAlign: "center",
        }}
      >
        LOGO
      </div>

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
