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
import { useState, useEffect, Fragment } from "react";
import { getAllCommentOf, getTopic, createComment } from "../../../api/forum";
import { getAccountPoster, createNotification, getIdByUsername, getCurrentUser } from "../../../api/accounts";
import { useForm } from "antd/lib/form/Form";

export default function DiscussionDetail() {
  const loc = useLocation();
  const history = useHistory();
  const topicId = loc.pathname.substring(paths.CHI_TIET_FORUM_nId.length)

  const [poster, setPoster] = useState("");
  const [comment, setCommentList] = useState([]);
  const [topic, setTopic] = useState({});
  const [commentForm] = useForm();

  const getPoster = async () => {
    try {
      const res = await getAccountPoster(JSON.parse(localStorage.getItem("user")).id);
      setPoster(res);
    } catch (error) {
      console.log(error);
    }
  }

  const getTopicTemp = async () => {
    try {
      const res = await getTopic(topicId);
      setTopic(res.data);
    } catch (error) {
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
      createComment(topicId, { ...values, poster: poster, })
        .then(async data => {
          const destinationId = await getIdByUsername(poster.split(" - ")[0]);
          //console.log(getCurrentUser().id);
          //console.log(destinationId);
          //if (getCurrentUser().id != destinationId) {
            if (true) {

            await createNotification(destinationId,
              {
                title: "Bạn có bình luận trên bài đăng của bạn",
                message: "http://localhost:3000/chi-tiet-thao-luan/" + topicId
              })
              .then(data => {
                console.log(data);
              })
              .catch(error => {
                console.log(error);
              })
          }
          getPoster();
          getTopicTemp();
          getList();
          commentForm.resetFields();
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
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
          <Fragment>
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
            <Row>
              <br></br>
              {topic.detail}
            </Row>
          </Fragment>
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
              avatar={<Avatar src={"https://joeschmoe.io/api/v1/" + item.poster} alt="Error avt" />}
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
          <Avatar src={"https://joeschmoe.io/api/v1/" + poster} alt="Error avt" />
        }
        content={
          <Form form={commentForm} onFinish={onFinish}>
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
