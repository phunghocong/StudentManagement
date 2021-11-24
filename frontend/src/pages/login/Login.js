import { Button, Col, Form, Input, Row } from "antd";
import style from "./login.module.scss";
import logo from "../../assets/img/studmana.png";
import { login, getCurrentUser } from "../../api/accounts";
import { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router";
function useForceUpdate() {
  const [loaded, setLoaded] = useState(0);
  return () => setLoaded(loaded => loaded + 1); // update the state to force render
}
export default function Login() {
  const forceUpdate = useForceUpdate();
  const enterLogin = () => {
    // login(document.getElementsByName("username").values, document.getElementsByName("password").values)
    // login("nowano", "hentaiz.net")
    //   .then(res => {
    //     console.log(res);
    //   }).catch(err => {
    //     console.log(err);
    //   })

    // Dùng button để test axios tí hehe



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
  var state = {
    loggedIn: false
  }
  const redirectToDashboard = () => {
    //console.log(getCurrentUser);
    // if(getCurrentUser) {

    return <Redirect to="/danh-sach-sinh-vien/" />;
    //}
  }
  const onFinish = values => {
    login(values.username, values.password)
      .then(res => {
        if (res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        console.log(localStorage);
      })
      .catch(err => {
        alert("Tên đăng nhập hoặc mật khẩu bạn vừa nhập đã sai.\nXin hãy nhập lại.");
      })
    redirectToDashboard();

  }
  useEffect(() => {
    return <Redirect to="/danh-sach-sinh-vien/" />;

  })
  const onFinishFailed = () => {

  }
  return (
    <div className={style["container"]}>
      <Row justify="space-between" align="middle" style={{ width: "100%" }}>
        <Col lg={10}>
          <img alt="logo" src={logo} />
        </Col>
        <Col lg={10}>
          <div className={style["loginForm"]}>
            <h1>Đăng nhập</h1>
            <Form layout="vertical"
              onFinish={onFinish}>
              <Form.Item
                label="Tên người dùng"
                name="username"
                rules={[{ required: true, message: "Hãy nhập tên người dùng" }]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Hãy nhập mật khẩu" }]}>
                <Input.Password className="input-password" />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary" style={{ background: "coral", borderColor: "white" }}>
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>

          </div>
        </Col>
      </Row>
    </div>
  );
}
