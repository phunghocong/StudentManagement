import { Button, Col, Form, Input, Row } from "antd";
import loginStyle from "./login.module.scss";
import logo from "../../assets/img/studmana.png";
// import { login } from "../../api/auth/userAuth";
import axios from "axios";
import { createAccount, deleteAccount, getAccount, updateAccount, url, login } from "../../api/accounts";

export default function Login() {
  const enterLogin = () => {
    // login(document.getElementsByName("username").values, document.getElementsByName("password").values)
    // login("nowano", "hentaiz.net")
    //   .then(res => {
    //     console.log(res);
    //   }).catch(err => {
    //     console.log(err);
    //   })

    // Dùng button để test axios tí hehe

    login("thaehan061101asd", "nhatlinh")
      .then(res => {
        res.data.json();
      })
      .catch(err => {
        console.log(err);
      })

    // getAccount("6197eb7a002b5948502155ec")
    //   .then(res => {
    //     res.data.json();
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })

    // createAccount({username: "thaehan123", password: "nhatlinh", firstName: "Dat", surName:  "Do", email: "thaehan0611@gmail.com"})
    //   .then(res => {
    //     res.data.json();
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    // deleteAccount("http://localhost:8080/api/accounts/update/6197eb73002b5948502155e9")
    //   .then(res => {
    //     res.data.json();
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    // updateAccount("6197eb7a002b5948502155ec", {username: "thaehan061101asd", password: "nhatlinh", email: "thaehan0611@gmail.com"})
    //   .then(res => {
    //     res.data.json();
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })


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
