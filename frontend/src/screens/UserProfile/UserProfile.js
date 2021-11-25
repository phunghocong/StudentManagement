import { Row, Col, Avatar, Button, Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function UserProfile() {
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
                  <Input placeholder="Name" type="text" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="lastname" label="Họ">
                  <Input placeholder="surname" type="text" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="maSV" label="Mã sinh viên">
              <Input placeholder="VD:18021014" type="text" />
            </Form.Item>

            <Form.Item name="birthday" label="Ngày sinh">
              <Input placeholder="enter your birthday" type="text" />
            </Form.Item>

            <Form.Item name="phone" label="Số điện thoại">
              <Input placeholder="enter your phone number" type="text" />
            </Form.Item>

            <Form.Item name="email" label="Email">
              <Input placeholder="your email" type="text" />
            </Form.Item>

            <Form.Item name="address" label="Địa chỉ thường trú">
              <Input placeholder=" address line 1" type="text" />
            </Form.Item>

            <Form.Item name="que" label="Quê quán">
              <Input placeholder="address line 2" type="text" />
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
