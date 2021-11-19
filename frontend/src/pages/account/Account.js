import { Input, Form, Button, notification, Row, Col } from "antd";
import { useEffect } from "react";

export default function Account() {
  return (
    <div className="account">
      <h1>Tài khoản</h1>

      <br />

      <h2>Đổi mật khẩu</h2>

      <Form layout="vertical">
        <Row gutter={[{ md: 20 }, { sm: 20 }]}>
          <Col md={12}>
            <Form.Item
              label="Mật khẩu mới"
              name="password"
              rules={[
                {
                  required: "true",
                  message: "Hãy nhập mật khẩu mới",
                },
              ]}
            >
              <Input.Password className="input-password" />
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item
              label="Nhập lại mật khẩu mới"
              name="retype"
              rules={[
                {
                  required: "true",
                  message: "Hãy nhập lại mật khẩu mới",
                },
              ]}
            >
              <Input.Password className="input-password" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button htmlType="submit">Cập nhật</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
