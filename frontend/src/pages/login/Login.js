import { Button, Col, Form, Input, Row } from "antd";
import loginStyle from "./login.module.scss";
import logo from "../../assets/img/studmana.png";
import { login } from "../../api/auth/userAuth";


export default function Login() {
  const enterLogin = () => {
    //login(document.getElementsByName("username").values, document.getElementsByName("password").values)
    login("nowano", "hentaiz.net")
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })

  }
  return (
    <div className={loginStyle["container"]}>
      <Row justify="space-between" align="middle" style={{ width: "100%" }}>
        <Col lg={10}>
          <img alt="" src={logo} />
        </Col>
        <Col lg={12}>
          <h1>Đăng nhập</h1>
          <Form layout="vertical"

            onFinish={enterLogin}>
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

            <Form.Item>
              <Button htmlType="submit" type="primary">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
