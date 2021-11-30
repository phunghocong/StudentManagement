import { Button, Col, Drawer, Form, Input, Row, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { forwardRef, useEffect, useImperativeHandle, useState, useRef } from "react";
import { createTopic } from "../../../api/forum";
import { getAccountPoster } from "../../../api/accounts";

const NewDiscussion = forwardRef((props, ref) => {
  const [poster, setPoster] = useState("");
  const [visible, setVisible] = useState(false);
  const [form] = useForm();

  const getPoster = async () => {
    try {
      const res = await getAccountPoster(JSON.parse(localStorage.getItem("user")).id);
      setPoster(res);
    } catch(error) {
      console.log(error);
    }
  }

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
  }));

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = async (values) => {
    try {
      const newTopic = {...values, poster: poster};
      createTopic(newTopic)
        .then(data => {
          console.log(data);

        })
        .catch(err => {
          console.log(err);
        })
    } catch (error) {
      console.log("error when create new topic", error);
    }
  };

  useEffect(() => {
    getPoster();
  }, []);

  return (
    <Drawer
      className="container"
      title="Tạo cuộc thảo luận"
      visible={visible}
      onClose={onClose}
      width={400}
      footer={
        <Row gutter={10}>
          <Col>
            <Button onClick={onClose}>Huỷ bỏ</Button>
          </Col>

          <Col>
            <Button type="primary" onClick={() => form.submit()}>
              Tạo mới
            </Button>
          </Col>
        </Row>
      }
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Nhập đầy đủ nội dung" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          name="detail"
          rules={[{ required: true, message: "Nhập đầy đủ nội dung" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Drawer>
  );
});

export default NewDiscussion;

const danhMucMau = [
];
