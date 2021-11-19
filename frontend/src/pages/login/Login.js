import { Button, Col, Form, Input, Row } from "antd";
import login from "./login.module.scss";
import banner from "../../assets/img/unknown.png";

export default function Login() {
  return (
    <div className={login["container"]}>
      <Row justify="space-between" align="middle" style={{ width: "100%" }}>
        <Col lg={10}>
          <img alt="" src={banner} />
        </Col>

        <Col lg={12}>
          <h1>Đăng nhập</h1>

          <Form layout="vertical">
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: "Hãy nhập số điện thoại" }]}
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
