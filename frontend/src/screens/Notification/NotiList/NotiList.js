import { Button, Col, List, Row } from "antd";
import notiList from "./notiList.module.scss";
import keys from "../../../constants/keys";
import { useRef } from "react";
import NewNoti from "../NewNoti/NewNoti";

export default function NotiList() {
  const isStudent = JSON.parse(localStorage.getItem(keys.USER)).isStudent;
  const ref = useRef();

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
        dataSource={[1, 2, 3, 4]}
        renderItem={(item) => (
          <List.Item className={notiList["item"]} size="large">
            <List.Item.Meta
              title={
                <Row
                  justify="space-between"
                  align="middle"
                  className={notiList["bar"]}
                >
                  <h4>Thong bao so 1</h4>

                  <p>22/11/2021</p>
                </Row>
              }
            />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor neque
            quisquam veritatis at hic explicabo placeat fugiat cum nesciunt
            ipsum ad quibusdam possimus ab maxime modi, similique earum
            laboriosam qui quas nihil ipsam eligendi! Quibusdam possimus,
            suscipit ab a nam doloribus accusantium consectetur quod magnam
            porro, cumque officia perferendis magni.
          </List.Item>
        )}
      />

      <NewNoti ref={ref} />
    </div>
  );
}
