import { Button, Col, Drawer, Form, Input, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { forwardRef, useImperativeHandle, useState } from "react";

const types = {
  NEW: "new",
  EDIT: "edit",
};

const StudentConfig = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [currentType, setCurrentType] = useState();
  const [form] = useForm();

  useImperativeHandle(ref, () => ({
    openNew() {
      setVisible(true);
      setCurrentType(types.NEW);
    },
    openEdit(data) {
      setVisible(true);
      setCurrentType(types.EDIT);
      form.setFields([{ name: "name", value: data.name }]);
    },
  }));

  const onFinish = (values) => {
    console.log(values);
  };

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  return (
    <Drawer visible={visible} onClose={onCancel} width={500}>
      <h2>
        {currentType === types.NEW
          ? "Tạo mới sinh viên"
          : "Chỉnh sửa sinh viên"}
      </h2>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Họ và tên" name="name">
          <Input />
        </Form.Item>

        <Row gutter={10}>
          <Col>
            <Button type="primary" htmlType="submit">
              {currentType === types.NEW ? "Tạo" : "Lưu"}
            </Button>
          </Col>

          <Col>
            <Button onClick={onCancel}>Huỷ</Button>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
});

export default StudentConfig;
