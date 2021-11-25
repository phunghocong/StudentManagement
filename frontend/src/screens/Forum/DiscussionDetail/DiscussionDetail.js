import {
  Avatar,
  List,
  Col,
  PageHeader,
  Row,
  Tag,
  Comment,
  Tooltip,
  Form,
  Input,
  Button,
} from "antd";
import { useHistory } from "react-router-dom";
import paths from "../../../constants/paths";
import { CalendarOutlined } from "@ant-design/icons";
import discussionDetail from "./discussionDetail.module.scss";
import moment from "moment";

export default function DiscussionDetail() {
  const history = useHistory();

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div>
      <PageHeader
        className={discussionDetail["page-header"]}
        onBack={() => history.push(paths.FORUM)}
        title="Chu de so 1"
        ghost={false}
        footer={
          <Row
            gutter={25}
            align="middle"
            className={discussionDetail["page-header-footer"]}
          >
            <Col>
              <Row gutter={10} align="middle">
                <Col>
                  <Avatar size={25}>Author</Avatar>
                </Col>

                <Col className={discussionDetail["data"]}>Author</Col>
              </Row>
            </Col>

            <Col>
              <Row gutter={10} align="middle">
                <Col>
                  <CalendarOutlined className={discussionDetail["data"]} />
                </Col>

                <Col className={discussionDetail["data"]}>21/11/2021</Col>
              </Row>
            </Col>

            <Col>
              <Tag color="orange">Danh muc so 1</Tag>
            </Col>
          </Row>
        }
      />

      <List
        className={discussionDetail["comment-list"]}
        header={
          <span className={discussionDetail["count-ans"]}>
            {data.length} trả lời
          </span>
        }
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <li>
            <Comment
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
              className={discussionDetail["comment"]}
            />
          </li>
        )}
      />

      <Comment
        className={discussionDetail["rep-comment"]}
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <Form onFinish={onFinish}>
            <Form.Item
              name="comment"
              rules={[{ required: true, message: "Hãy điền bình luận" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                Thêm bình luận
              </Button>
            </Form.Item>
          </Form>
        }
      />
    </div>
  );
}

const data = [
  {
    author: "Han Solo",
    avatar: "https://joeschmoe.io/api/v1/random",
    content: (
      <span>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </span>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>{moment().subtract(1, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    author: "Han Solo",
    avatar: "https://joeschmoe.io/api/v1/random",
    content: (
      <span>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </span>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>{moment().subtract(1, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
];
