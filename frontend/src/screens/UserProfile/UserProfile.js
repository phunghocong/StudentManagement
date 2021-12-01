import { Row, Col, Avatar, Button, Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { getAccount,getCurrentUser,currentUserIsStudent } from "../../api/accounts";
import { useForm } from "antd/lib/form/Form";
export default function UserProfile() {
  const onFinish = (value) => {
    console.log(value);
  };
  const fieldNames = {
    username: "username",
    password: "password",
    firstName: "firstName",
    surName: "surName",
    email: "email",
    messageOn: "messageOn",
    avatarColor: "avatarColor",
  };
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("")
  const [form] = useForm();
  useEffect(() => {
    getAccount(getCurrentUser().id)
      .then(res => {
        setFullName(res.data.surName + " " + res.data.firstName)
        setEmail(res.data.email);
        console.log(res);
        form.setFields(
          Object.values(fieldNames).map((name) => ({
            name: name,
            value: res.data[name],
          }))
        );
      });
  }, []);

  return (
    <div>
      <Row>
        <Col flex="300px" style={{ textAlign: "center" }}>
          <Avatar size={120} src={"https://joeschmoe.io/api/v1/"+getCurrentUser().username+" - "+fullName} /><br />
          {fullName}<br />
          {email}<br />
          <Button
            type="primary"
            style={{
              display: "block",
              textAlign: "center",
              margin: "20px auto",
            }}
            disabled={!currentUserIsStudent()}
          
          >
            Xem thông tin sinh viên
          </Button>
          <Button type="primary">Đổi mật khẩu</Button>
        </Col>

        <Col flex="auto">
          <h1>Sửa đổi thông tin cá nhân</h1>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={10}>
              <Col span={8}>
                <Form.Item label="Họ" name={fieldNames.surName} >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Tên" name={fieldNames.firstName}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={8}>
                <Form.Item label="Tên đăng nhập" name={fieldNames.username} >
                  <Input disabled/>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="email" name={fieldNames.email}>
                  <Input/>
                </Form.Item>
              </Col>
            </Row>

          </Form>
          <Button type="primary" onClick={() => form.submit()}>
            Lưu
          </Button>
        </Col>
      </Row>
    </div>
  );
}
