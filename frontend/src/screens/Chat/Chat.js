import { Avatar, Button, Col, Divider, Input, Row } from "antd";
import chat from "./chat.module.scss";
import { SendOutlined } from "@ant-design/icons";
import { useEffect, useRef } from "react";

const Chat = () => {
  const ref = useRef();

  useEffect(() => {
    scrollToBottom();
  }, [ref]);

  const scrollToBottom = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Row className={chat["container"]} gutter={20}>
      <Col flex="350px">
        <div className={chat["left-col"]}>
          <Row align="middle" justify="space-between">
            <h3>Tin nhan</h3>

            <Button type="primary">Tạo nhóm</Button>
          </Row>

          <Divider />

          <div className={chat["chat-room-list"]}>
            <div className={chat["chat-room"]}>
              <p>Phong chat 1</p>
              <span>Hello guys !!!</span>
            </div>

            <div className={chat["chat-room"]}>
              <p>Phong chat 1</p>
              <span>Hello guys !!!</span>
            </div>

            <div className={chat["chat-room"]}>
              <p>Phong chat 1</p>
              <span>Hello guys !!!</span>
            </div>

            <div className={chat["chat-room"]}>
              <p>Phong chat 1</p>
              <span>Hello guys !!!</span>
            </div>

            <div className={chat["chat-room"]}>
              <p>Phong chat 1</p>
              <span>Hello guys !!!</span>
            </div>

            <div className={chat["chat-room"]}>
              <p>Phong chat 1</p>
              <span>Hello guys !!!</span>
            </div>

            <div className={chat["chat-room"]}>
              <p>Phong chat 1</p>
              <span>Hello guys !!!</span>
            </div>

            <div className={chat["chat-room"]}>
              <p>Phong chat 1</p>
              <span>Hello guys !!!</span>
            </div>

            <div className={chat["chat-room"]}>
              <p>Phong chat 1</p>
              <span>Hello guys !!!</span>
            </div>
          </div>
        </div>
      </Col>

      <Col flex="auto">
        <div className={chat["right-col"]}>
          <div className={chat["top-bar"]}>
            <h3>Phong chat so 1</h3>
          </div>

          <div className={chat["chat-window"]}>
            <div className={chat["chat-inner"]} ref={ref}>
              <Row
                className={chat["bubble"]}
                align="middle"
                gutter={10}
                wrap={false}
              >
                <Col>
                  <Avatar>Name</Avatar>
                </Col>

                <Col>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, suscipit!
                </Col>
              </Row>

              <Row
                className={chat["bubble"]}
                align="middle"
                gutter={10}
                wrap={false}
              >
                <Col>
                  <Avatar>Name</Avatar>
                </Col>

                <Col>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, suscipit!
                </Col>
              </Row>

              <Row
                className={chat["bubble"]}
                align="middle"
                gutter={10}
                wrap={false}
              >
                <Col>
                  <Avatar>Name</Avatar>
                </Col>

                <Col>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, suscipit!
                </Col>
              </Row>

              <Row
                className={chat["bubble"]}
                align="middle"
                gutter={10}
                wrap={false}
              >
                <Col>
                  <Avatar>Name</Avatar>
                </Col>

                <Col>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, suscipit!
                </Col>
              </Row>

              <Row
                className={chat["bubble"]}
                align="middle"
                gutter={10}
                wrap={false}
              >
                <Col>
                  <Avatar>Name</Avatar>
                </Col>

                <Col>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, suscipit!
                </Col>
              </Row>

              <Row
                className={chat["bubble"]}
                align="middle"
                gutter={10}
                wrap={false}
              >
                <Col>
                  <Avatar>Name</Avatar>
                </Col>

                <Col>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, suscipit!
                </Col>
              </Row>

              <Row
                className={chat["bubble"]}
                align="middle"
                gutter={10}
                wrap={false}
              >
                <Col>
                  <Avatar>Name</Avatar>
                </Col>

                <Col>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, suscipit!
                </Col>
              </Row>

              <Row
                className={chat["bubble"]}
                align="middle"
                gutter={10}
                wrap={false}
              >
                <Col>
                  <Avatar>Name</Avatar>
                </Col>

                <Col>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, suscipit!
                </Col>
              </Row>

              <Row
                className={chat["bubble"]}
                align="middle"
                gutter={10}
                wrap={false}
              >
                <Col>
                  <Avatar>Name</Avatar>
                </Col>

                <Col>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, suscipit!
                </Col>
              </Row>

              <Row
                className={chat["bubble"]}
                align="middle"
                gutter={10}
                wrap={false}
              >
                <Col>
                  <Avatar>Name</Avatar>
                </Col>

                <Col>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, suscipit!
                </Col>
              </Row>

              <Row
                className={chat["bubble"]}
                align="middle"
                gutter={10}
                wrap={false}
              >
                <Col>
                  <Avatar>Name</Avatar>
                </Col>

                <Col>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, suscipit!
                </Col>
              </Row>

              <Row
                className={chat["bubble"]}
                align="middle"
                gutter={10}
                wrap={false}
              >
                <Col>
                  <Avatar>Name</Avatar>
                </Col>

                <Col>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, suscipit!
                </Col>
              </Row>

              <Row
                className={chat["bubble"]}
                align="middle"
                gutter={10}
                wrap={false}
              >
                <Col>
                  <Avatar>Name</Avatar>
                </Col>

                <Col>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, suscipit!
                </Col>
              </Row>
              <Row
                className={chat["bubble"]}
                align="middle"
                gutter={10}
                wrap={false}
              >
                <Col>
                  <Avatar>Name</Avatar>
                </Col>

                <Col>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, suscipit!
                </Col>
              </Row>
            </div>
          </div>

          <Row className={chat["chat-bar"]}>
            <Col flex="auto" style={{ paddingRight: 10 }}>
              <Input placeholder="Nhập tin nhắn..." />
            </Col>

            <Col>
              <Button icon={<SendOutlined />} type="primary"></Button>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default Chat;
