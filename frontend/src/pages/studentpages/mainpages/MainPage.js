import {
  Button,
  Table,
  Row,
  Col,
  Input,
  Select,
  Menu,
  Avatar,
  Form,
} from "antd";

import { UserOutlined } from "@ant-design/icons";

export default function MainPage() {
  const onFinish = (value) => {
    console.log(value);
  };
  return (
    <div>
      <Row>
        <Col flex="300px" style={{ textAlign: "center" }}>
          <Avatar size={120} icon={<UserOutlined />} />
          <p>Edogaru</p>
          <p>edogaru@gmail.com</p>

          <Button
            type="primary"
            style={{
              display: "block",
              textAlign: "center",
              margin: "20px auto",
            }}
          >
            Sửa thông tin cá nhân
          </Button>
          <Button type="primary">Đổi mật khẩu</Button>
        </Col>

        <Col flex="auto">
          <h1>Profile Settings</h1>

          <Form layout="vertical" onFinish={onFinish}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item name="name" label="Tên">
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="lastname" label="Họ">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="maSV" label="Mã sinh viên">
              <Input />
            </Form.Item>

            <Form.Item name="birthday" label="Ngày sinh">
              <Input />
            </Form.Item>

            <Form.Item name="phone" label="Số điện thoại">
              <Input />
            </Form.Item>

            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>

            <Form.Item name="address" label="Địa chỉ thường trú">
              <Input />
            </Form.Item>

            <Form.Item name="que" label="Quê quán">
              <Input />
            </Form.Item>

            <Form.Item name="dantoc" label="Dân tộc">
              <Input />
            </Form.Item>
            
            <Form.Item name="class" label="Lớp">
              <Input />
            </Form.Item>

            <Form.Item name="object" label="Ngành học : không thể sửa">
              <Input />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Save Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
