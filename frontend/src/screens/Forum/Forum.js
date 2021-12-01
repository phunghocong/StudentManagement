import { Button, Col, Row, List, Avatar, Divider, Tag } from "antd";
import { useRef, useState, useEffect } from "react";
import forum from "./forum.module.scss";
import NewDiscussion from "./NewDiscussion/NewDiscussion";
import { Link } from "react-router-dom";
import paths from "../../constants/paths";
import { getAllTopic } from "../../api/forum";


export default function Forum() {
  const ref = useRef();

  const [data, setDataList] = useState([]);

  const getList = async () => {
    try {
      const res = await getAllTopic();
      setDataList(
        res.data.map((item) => ({
          ...item,
          key: item.id,
        }))
      );
    } catch (error) {
      console.log("get all topic error", error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="container">
      <Row align="middle" gutter={20}>
        <Col>
          <h1>Forum</h1>
        </Col>

        <Col>
          <Button type="primary" onClick={() => ref.current.open()}>
            Tạo mới
          </Button>
        </Col>
      </Row>

      <br />

      <List
        itemLayout="vertical"
        dataSource={data}
        renderItem={(item) => (
          <List.Item className={forum["item"]} size="large">
            <List.Item.Meta
              avatar={<Avatar src={"https://joeschmoe.io/api/v1/"+item.poster}>{item.poster}</Avatar>}
              title={
                <Row justify="space-between" align="middle">
                  <Link to={paths.CHI_TIET_FORUM_nId + item.id}>
                    <h4>{item.title}</h4>
                  </Link>

                </Row>
              }
              description={<Row align="middle">@ {item.poster}</Row>}
            />
            <Divider style={{ margin: "10px 0" }} />
            {item.detail}
          </List.Item>
        )}
      />

      <NewDiscussion ref={ref} />
    </div>
  );
}


