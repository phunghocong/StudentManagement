import { Button, Col, Drawer, Form, Input, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { forwardRef, useImperativeHandle, useState } from "react";

const NewNoti = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [form] = useForm();

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
  }));

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log(values);
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
          name="tieu_de"
          rules={[{ required: true, message: "Nhập đầy đủ nội dung" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          name="noi_dung"
          rules={[{ required: true, message: "Nhập đầy đủ nội dung" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Drawer>
  );
});

export default NewNoti;
