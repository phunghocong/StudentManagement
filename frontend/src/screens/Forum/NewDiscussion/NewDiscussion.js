import { Button, Col, Drawer, Form, Input, Row, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { forwardRef, useImperativeHandle, useState } from "react";

const NewDiscussion = forwardRef((props, ref) => {
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
    console.log({ ...values, danh_muc: JSON.parse(values.danh_muc) });
  };

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
          name="tieu_de"
          rules={[{ required: true, message: "Nhập đầy đủ nội dung" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="danh_muc"
          rules={[{ required: true, message: "Hãy chọn đầy đủ" }]}
        >
          <Select>
            {danhMucMau.map((item) => (
              <Select.Option key={item.key} value={JSON.stringify(item)}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
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

export default NewDiscussion;

const danhMucMau = [
  {
    key: 1,
    name: "Danh muc 1",
  },
  {
    key: 2,
    name: "Danh muc 2",
  },
  {
    key: 3,
    name: "Danh muc 3",
  },
];
