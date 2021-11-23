import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import {
  DashboardOutlined, UnorderedListOutlined,
  BarChartOutlined, GroupOutlined, CommentOutlined, CalendarOutlined, BookOutlined,
  OrderedListOutlined, ToolOutlined, NotificationOutlined, NotificationFilled,
  UserOutlined, InfoCircleOutlined, LogoutOutlined, UsergroupAddOutlined
} from "@ant-design/icons";
import 'boxicons'

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
    icon: <box-icon name='dashboard' type='solid' color='white' ></box-icon>,
    path: paths.BANG_DIEU_KHIEN,
    subs: [],
  },
  {//CVHT
    key: rid(),
    title: "Công cụ cố vấn học tập",
    icon: <box-icon name='wrench' color='white'></box-icon>,
    path: undefined,
    subs: [
      {
        key: rid(),
        title: "Danh sách sinh viên",
        icon: <box-icon name='list-ol' color='white'></box-icon>,
        path: paths.DANH_SACH_SINH_VIEN,
        subs: [],
      },
      {
        key: rid(),
        title: "Danh sách tài khoản",
        icon: <box-icon name='list-ul' color='white'></box-icon>,
        path: paths.DANH_SACH_TAI_KHOAN,
        subs: [],
      },
      {
        key: rid(),
        title: "Danh sách lớp học",
        icon: <box-icon name='grid-horizontal' color='white' ></box-icon>,
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
        icon: <box-icon name='line-chart' color='white' ></box-icon>,
        path: paths.THONG_KE,
        subs: [],
      },
      {
        key: rid(),
        title: "Tạo thông báo",
        icon: <box-icon name='megaphone' type='solid' color='white'></box-icon>,
        path: paths.TAO_THONG_BAO,
        subs: [],
      },
      {
        key: rid(),
        title: "Tạo tài khoản mới",
        icon: <box-icon type='solid' name='user-plus' color='white'></box-icon>,
        path: paths.DANG_KY_TAI_KHOAN,
        subs: [],
      },
    ],
  },
  {//SV
    key: rid(),
    title: "Kết quả học tập",
    icon: <box-icon name='book-bookmark' color='white'></box-icon>,
    path: paths.KET_QUA_HOC_TAP,
    subs: [],
  },
  {//Chung
    key: rid(),
    title: "Thông báo công việc cần làm",
    icon: <box-icon name='calendar-check' color='white'></box-icon>,
    path: paths.CONG_VIEC_CAN_LAM,
    subs: [],
  },
  {//Chung
    key: rid(),
    title: "Chat với người khác",
    icon: <box-icon name='chat' color='white'></box-icon>,
    path: paths.CHATTING,
    subs: [],
  },
  {//Chung
    key: rid(),
    title: "Diễn dàn trao đổi",
    icon: <box-icon name='comment-detail' color='white' ></box-icon>,
    path: paths.DIEN_DAN,
    subs: [],
  },
  {//Chung
    key: rid(),
    title: "Tài khoản cá nhân",
    icon: <box-icon name='user' type='solid' color='white'></box-icon>,
    path: undefined,
    subs: [
      {//Chung
      key: rid(),
      title: "Xem thông tin tài khoản",
        icon: <box-icon name='user-account' type='solid' color='white'></box-icon>,
      path: paths.THONG_TIN_TAI_KHOAN,
      subs: [],
    },
    {//Chung
      key: rid(),
      title: "Đăng xuất",
      icon: <box-icon name='log-out-circle' flip='vertical' color='white'></box-icon>,
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
