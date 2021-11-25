import { Col, Row, Form, Input, Button } from "antd";
import { AuthBanner, LogoTrans } from "../../assets/img";
import login from "./login.module.scss";
import { login as doLogin } from "../../api/accounts";
import { useHistory } from "react-router-dom";
import paths from "../../constants/paths";
import { useState } from "react";

export default function Login() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values) => {
    const { username, password } = values;
    setIsLoading(true);

    doLogin(username, password)
      .then(() => history.push(paths.BANG_DIEU_KHIEN))
      .catch((err) => {
        setIsLoading(false);
        alert(
          "Tên đăng nhập hoặc mật khẩu bạn vừa nhập đã sai.\nXin hãy nhập lại."
        );
      });
  };

  return (
    <div className={login["container"]}>
      <Row gutter={20} className={login["inner"]}>
        <Col span={14}>
          <img src={AuthBanner} alt="" className={login["banner"]} />
        </Col>

        <Col span={10} className={login["right-col"]}>
          <div className={login["logo"]}>
            <img src={LogoTrans} alt="" />
          </div>

          <h1>Đăng nhập</h1>

          <br />

          <Form layout="vertical" onFinish={onFinish} className={login["form"]}>
            <Form.Item
              label="Tên người dùng"
              name="username"
              rules={[{ required: true, message: "Hãy nhập tên người dùng" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Hãy nhập mật khẩu" }]}
            >
              <Input.Password className="input-password" />
            </Form.Item>

            <br />

            <Button htmlType="submit" type="primary" loading={isLoading}>
              Đăng nhập
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
