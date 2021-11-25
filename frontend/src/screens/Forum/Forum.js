import { Button, Col, Row, List, Avatar, Divider, Tag } from "antd";
import { useRef } from "react";
import forum from "./forum.module.scss";
import NewDiscussion from "./NewDiscussion/NewDiscussion";
import { Link } from "react-router-dom";
import paths from "../../constants/paths";

export default function Forum() {
  const ref = useRef();

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
        dataSource={dataSample}
        renderItem={(item) => (
          <List.Item className={forum["item"]} size="large">
            <List.Item.Meta
              avatar={<Avatar src={item.avatar}>{item.author}</Avatar>}
              title={
                <Row justify="space-between" align="middle">
                  <Link to={paths.CHI_TIET_FORUM_nId + item.id}>
                    <h4>{item.title}</h4>
                  </Link>

                  <Tag color="orange">{item.category}</Tag>
                </Row>
              }
              description={<Row align="middle">@ {item.author}</Row>}
            />
            <Divider style={{ margin: "10px 0" }} />
            {item.content}
          </List.Item>
        )}
      />

      <NewDiscussion ref={ref} />
    </div>
  );
}

const dataSample = [
  {
    id: 1,
    author: "Tac gia 1",
    title: "Chu de 1",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis animi quaerat reprehenderit saepe, aliquid optio! Molestiae magnam deserunt quisquam facilis! Quibusdam voluptas est nemo. Magni vitae similique qui iusto, enim, voluptates voluptas nulla aut eligendi perspiciatis culpa deserunt! Distinctio, natus? Eligendi distinctio incidunt explicabo sint autem quia ab dolorem minima?",
    avatar: "",
    category: "Danh muc so 1",
  },
  {
    id: 2,
    author: "Tac gia 2",
    title: "Chu de 2",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis animi quaerat reprehenderit saepe, aliquid optio! Molestiae magnam deserunt quisquam facilis! Quibusdam voluptas est nemo. Magni vitae similique qui iusto, enim, voluptates voluptas nulla aut eligendi perspiciatis culpa deserunt! Distinctio, natus? Eligendi distinctio incidunt explicabo sint autem quia ab dolorem minima?",
    avatar: "",
    category: "Danh muc so 1",
  },
  {
    id: 3,
    author: "Tac gia 3",
    title: "Chu de 3",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis animi quaerat reprehenderit saepe, aliquid optio! Molestiae magnam deserunt quisquam facilis! Quibusdam voluptas est nemo. Magni vitae similique qui iusto, enim, voluptates voluptas nulla aut eligendi perspiciatis culpa deserunt! Distinctio, natus? Eligendi distinctio incidunt explicabo sint autem quia ab dolorem minima?",
    avatar: "",
    category: "Danh muc so 1",
  },
];
