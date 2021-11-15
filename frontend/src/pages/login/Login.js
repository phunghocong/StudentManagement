import { Button, Col, Form, Input, Row, notification } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";


export default function Login() {
  return (
    <div className="login">
      <Row justify="space-between" align="middle">
        <Col lg={10}>
          <img  alt="" />
        </Col>

        <Col lg={12}>
          <h1>Đăng nhập</h1>

          <Form layout="vertical" >
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
              <Button htmlType="submit" >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
