import { Button, Col, Drawer, Form, Input, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { getIdByUsername, createNotification } from "../../../api/accounts";

const NewNoti = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [form] = useForm();
  const [isUserValid, setIsUserValid] = useState("");

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
      setIsUserValid("");
      const destinationId = await getIdByUsername(values.id);
      createNotification(destinationId, { title: values.title, message: values.message })
        .then(data => {
          // console.log(data);
          window.location.reload();
        })
        .catch(error => {
          console.log(error);
        })
    } catch (error) {
      if (values.message && values.title) {
        setIsUserValid("User is not exist!");
      }
    }
  };

  return (
    <Drawer
      className="container"
      title="Tạo mới thông báo"
      visible={visible}
      onClose={onClose}
      width={400}
      footer={
        <Row gutter={10}>
          <Col>
            <Button onClick={onClose}>Huỷ bỏ</Button>
          </Col>

          <Col>
            <Button type="primary" onClick={() => {
              form.submit();
              setIsUserValid("");
            }
            }>
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
          name="message"
          rules={[{ required: true, message: "Nhập đầy đủ nội dung" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Người nhận - Tên người dùng"
          name="id"
          rules={[{ required: true, message: "Nhập đầy đủ nội dung" }]}
        >
          <Input />
        </Form.Item>
      </Form>

      <div role="alert">{isUserValid}</div>
    </Drawer>
  );
});

export default NewNoti;
