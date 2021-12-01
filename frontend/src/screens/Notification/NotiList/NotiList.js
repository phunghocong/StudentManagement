import { Button, Col, List, Row } from "antd";
import notiList from "./notiList.module.scss";
import { useEffect, useRef, useState } from "react";
import NewNoti from "../NewNoti/NewNoti";
import { currentUserIsStudent, getNotification } from "../../../api/accounts";

export default function NotiList() {
  const isStudent = currentUserIsStudent();
  const ref = useRef();

  const [notification, setNotification] = useState([]);

  const getNotificationList = async () => {
    try {
      const res = await getNotification(JSON.parse(localStorage.getItem("user")).id);
      setNotification(res);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNotificationList();
  }, [])

  return (
    <div className="container">
      <Row align="middle" gutter={20}>
        <Col>
          <h1>Thông báo</h1>
        </Col>

        {!isStudent && (
          <Col>
            <Button type="primary" onClick={() => ref.current.open()}>
              Tạo mới
            </Button>
          </Col>
        )}
      </Row>

      <br />

      <List
        itemLayout="horizontal"
        dataSource={notification}
        renderItem={(item) => (
          <List.Item className={notiList["item"]} size="large">
            <List.Item.Meta
              title={
                <Row
                  justify="space-between"
                  align="middle"
                  className={notiList["bar"]}
                >
                  <h4>{item.title}</h4>

                  <p>{item.createdTime}</p>
                </Row>
              }
            />
            {item.message}
          </List.Item>
        )}
      />

      <NewNoti ref={ref} />
    </div>
  );
}
