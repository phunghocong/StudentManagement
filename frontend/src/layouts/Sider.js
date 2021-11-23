import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import {
  DashboardOutlined, UnorderedListOutlined,
  BarChartOutlined, GroupOutlined, CommentOutlined, CalendarOutlined, BookOutlined,
  OrderedListOutlined, ToolOutlined, NotificationOutlined, NotificationFilled,
  UserOutlined, InfoCircleOutlined, LogoutOutlined, UsergroupAddOutlined
} from "@ant-design/icons";
import randomString from "crypto-random-string";
import paths from "../constants/paths";
import { useHistory, withRouter } from "react-router-dom";
import logo from "../assets/img/studmana.png";
const rid = () => randomString({ length: 5 });
//Chung là để render cho tất cả ng dùng
//SV render cho sv
//CVHT render cho cvht
const items = [
  {
    key: rid(),
    title: "Bảng điều khiển",
    icon: <DashboardOutlined />,
    path: paths.BANG_DIEU_KHIEN,
    subs: [],
  },
  {//CVHT
    key: rid(),
    title: "Công cụ cố vấn học tập",
    icon: <ToolOutlined />,
    path: undefined,
    subs: [
      {
        key: rid(),
        title: "Danh sách sinh viên",
        icon: <OrderedListOutlined />,
        path: paths.DANH_SACH_SINH_VIEN,
        subs: [],
      },
      {
        key: rid(),
        title: "Danh sách tài khoản",
        icon: <UnorderedListOutlined />,
        path: paths.DANH_SACH_TAI_KHOAN,
        subs: [],
      },
      {
        key: rid(),
        title: "Danh sách lớp học",
        icon: <UnorderedListOutlined />,
        path: paths.DANH_SACH_LOP_HOC,
        subs: [],
      },
      /* {
        key: rid(),
        title: "Danh sách sinh viên học tập tốt",
        icon: <OrderedListOutlined />,
        path: paths.DANH_SACH_SINH_VIEN_TOT,
        subs: [],
      },
      {
        key: rid(),
        title: "Danh sách sinh viên học tập kém",
        icon: <OrderedListOutlined />,
        path: paths.DANH_SACH_SINH_VIEN_KEM,
        subs: [],
      }, */
      {
        key: rid(),
        title: "Thống kê",
        icon: <BarChartOutlined />,
        path: paths.THONG_KE,
        subs: [],
      },
      {
        key: rid(),
        title: "Tạo thông báo",
        icon: <NotificationOutlined />,
        path: paths.TAO_THONG_BAO,
        subs: [],
      },
      {
        key: rid(),
        title: "Tạo tài khoản mới",
        icon: <UsergroupAddOutlined />,
        path: paths.DANG_KY_TAI_KHOAN,
        subs: [],
      },
    ],
  },
  {//SV
    key: rid(),
    title: "Kết quả học tập",
    icon: <BookOutlined />,
    path: paths.KET_QUA_HOC_TAP,
    subs: [],
  },
  {//Chung
    key: rid(),
    title: "Thông báo công việc cần làm",
    icon: <CalendarOutlined />,
    path: paths.CONG_VIEC_CAN_LAM,
    subs: [],
  },
  {//Chung
    key: rid(),
    title: "Chat với người khác",
    icon: <CommentOutlined />,
    path: paths.CHATTING,
    subs: [],
  },
  {//Chung
    key: rid(),
    title: "Diễn dàn trao đổi",
    icon: <GroupOutlined />,
    path: paths.DIEN_DAN,
    subs: [],
  },
  {//Chung
    key: rid(),
    title: "Tài khoản cá nhân",
    icon: <UserOutlined />,
    path: undefined,
    subs: [
      {//Chung
      key: rid(),
      title: "Xem thông tin tài khoản",
        icon: <InfoCircleOutlined />,
      path: paths.THONG_TIN_TAI_KHOAN,
      subs: [],
    },
    {//Chung
      key: rid(),
      title: "Đăng xuất",
      icon: <LogoutOutlined />,
      path: paths.DANG_XUAT,
      subs: [],
    },],
  },
];
var barWidth = 250;
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
      width={barWidth}
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed((val) => !val)}
    >
 {/*      <div>
        <img src={logo} alt="Logo" width="250"/>
      </div> */}

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
