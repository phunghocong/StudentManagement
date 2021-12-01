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
import { useHistory, useLocation } from "react-router-dom";
import paths from "../../../constants/paths";
import { CalendarOutlined } from "@ant-design/icons";
import discussionDetail from "./discussionDetail.module.scss";
import moment from "moment";
import { useState, useEffect, useRef } from "react";
import { getAllCommentOf, getTopic, createComment } from "../../../api/forum";
import { getAccountPoster } from "../../../api/accounts";

export default function DiscussionDetail() {
  const loc = useLocation();
  const history = useHistory();
  const topicId = loc.pathname.substring(paths.CHI_TIET_FORUM_nId.length)

  const [poster, setPoster] = useState("");
  const [comment, setCommentList] = useState([]);
  const [topic, setTopic] = useState({});

  const getPoster = async () => {
    try {
      const res = await getAccountPoster(JSON.parse(localStorage.getItem("user")).id);
      setPoster(res);
    } catch(error) {
      console.log(error);
    }
  }

  const getTopicTemp = async () => {
    try {
      const res = await getTopic(topicId);
      setTopic(res.data);
    } catch(error) {
      console.log(error);
    }
  };

  const getList = async () => {
    try {
      const res = await getAllCommentOf(topicId);
      setCommentList(
        res.map((item) => ({
          ...item,
          key: item.id,
        }))
      );
    } catch (error) {
      console.log("get all comment error", error);
    }
  };

  useEffect(() => {
    getPoster();
    getTopicTemp();
    getList();
  }, []);

  const onFinish = async (values) => {
    try {
      createComment(topicId, {...values, poster: poster,})
        .then(data => {
          //console.log(data);
          window.location.reload();

        })
        .catch(error => {
          console.log(error);
        });
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div>
      <PageHeader
        className={discussionDetail["page-header"]}
        onBack={() => history.push(paths.FORUM)}
        title={topic.title}
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

                <Col className={discussionDetail["data"]}>{topic.poster}</Col>
              </Row>
            </Col>

            <Col>
              <Row gutter={10} align="middle">
                <Col>
                  <CalendarOutlined className={discussionDetail["data"]} />
                </Col>

                <Col className={discussionDetail["data"]}>{topic.createdTime}</Col>
              </Row>
            </Col>
          </Row>
        }
      />

      <List
        className={discussionDetail["comment-list"]}
        header={
          <span className={discussionDetail["count-ans"]}>
            {comment.length} trả lời
          </span>
        }
        itemLayout="horizontal"
        dataSource={comment}
        renderItem={(item) => (
          <li>
            <Comment
              author={item.poster}
              avatar={<Avatar src={"https://joeschmoe.io/api/v1/"+item.poster} alt="Error avt" />}
              content={item.detail}
              datetime={item.createdTime}
              className={discussionDetail["comment"]}
            />
          </li>
        )}
      />

      <Comment
        className={discussionDetail["rep-comment"]}
        avatar={
          <Avatar src={"https://joeschmoe.io/api/v1/"+poster} alt="Error avt" />
        }
        content={
          <Form onFinish={onFinish}>
            <Form.Item
              name="detail"
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
