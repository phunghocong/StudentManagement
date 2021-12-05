import { Layout, Row, Menu, Dropdown } from "antd";
import { DownOutlined, LogoutOutlined, DownCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";

import { LogoTrans } from "../assets/img";
import keys from "../constants/keys";
import layouts from "./layouts.module.scss";
import { getCurrentUser, getAccount } from "../api/accounts";
import paths from "../constants/paths";

export default function Header() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("");
  const history = useHistory();

  useEffect(() => {
    getAccount(getCurrentUser().id)
      .then(res => {
        setFullName(res.data.surName + " " + res.data.firstName)
        setEmail(res.data.email);
        console.log(res);

      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(keys.USER);
    window.location.reload();
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        {email}
      </Menu.Item>
      <Menu.Item key="1">
        <a target="_blank" rel="noopener noreferrer" onClick={() => history.push(paths.HO_SO)}>
          <UserOutlined />Hồ sơ
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <a target="_blank" rel="noopener noreferrer" onClick={handleLogout}>
          <LogoutOutlined /> Đăng xuất
        </a>
      </Menu.Item>
      <Menu.Divider />

    </Menu>
  );

  var fullInfo = getCurrentUser().username + " - " + fullName;
  
  return (
    <Layout.Header className={layouts["header-container"]}>
      <Row justify="space-between" align="right">
        <img src={LogoTrans} alt="" />

        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <img
              style={{
                borderRadius: 20,
                width: 40,
                height: 40,

              }}

              alt={""}
              src={
                "https://joeschmoe.io/api/v1/" + fullInfo
              }
            />
            {fullInfo} <DownCircleOutlined />
          </a>
        </Dropdown>
      </Row>
    </Layout.Header>
  );
}
