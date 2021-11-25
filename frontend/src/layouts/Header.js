import { Layout, Row } from "antd";
import { LogoTrans } from "../assets/img";
import keys from "../constants/keys";
import layouts from "./layouts.module.scss";

export default function Header() {
  const handleLogout = () => {
    localStorage.removeItem(keys.USER);
    window.location.reload();
  };

  return (
    <Layout.Header className={layouts["header-container"]}>
      <Row justify="space-between" align="middle">
        <img src={LogoTrans} alt="" />

        <span onClick={handleLogout}>Đăng xuất</span>
      </Row>
    </Layout.Header>
  );
}
