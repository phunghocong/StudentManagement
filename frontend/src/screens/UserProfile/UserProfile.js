import { Row, Col, Avatar, Button, Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import UserPasswordChange from "./UserPasswordChange";
import { getAccount, getCurrentUser, currentUserIsStudent, updateAccount } from "../../api/accounts";
import { useForm } from "antd/lib/form/Form";
import paths from "../../constants/paths";
import { useHistory, withRouter } from "react-router-dom";

export default function UserProfile() {
  const history = useHistory();

  const onFinish = (value) => {
    updateAccount(value.id, value)
      .then(res => {
        if (res.status == 200)
          window.location.reload();
      })
      .catch(err => {
        alert("Có lỗi xảy ra.")
      })
  };
  const passwordChangeRef = useRef();
  const fieldNames = {
    id: "id",
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
          <Avatar size={120} src={"https://joeschmoe.io/api/v1/" + getCurrentUser().username + " - " + fullName} /><br />
          {fullName}<br />
          {email}<br />
          {currentUserIsStudent()?<div>
          <Button
            type="primary"
            style={{
              display: "block",
              textAlign: "center",
              margin: "20px auto",
            }}
            disabled={!currentUserIsStudent()}
            onClick={()=>history.push(paths.HO_SO_SINH_VIEN)}
          >
            Xem thông tin sinh viên
          </Button>
          <Button
            type="primary"
            style={{
              display: "block",
              textAlign: "center",
              margin: "20px auto",
            }}
            disabled={!currentUserIsStudent()}
            onClick={()=>history.push(paths.KET_QUA_HOC_TAP)}
          >
            Xem thông kết quả học tập
          </Button>
          </div>
          :""}

          <Button type="primary" onClick={() => passwordChangeRef.current.open()}>Đổi mật khẩu</Button>
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
                  <Input disabled />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="email" name={fieldNames.email}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="email" name={fieldNames.id} hidden>
                  <Input />
                </Form.Item>
              </Col>
            </Row>

          </Form>
          <Button type="primary" onClick={() => form.submit()}>
            Lưu
          </Button>
        </Col>
      </Row>
      <UserPasswordChange ref={passwordChangeRef} />
    </div>
  );
}
