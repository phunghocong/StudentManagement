import { Button, Col, Drawer, Form, Input, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { forwardRef, useImperativeHandle, useState } from "react";

const types = {
  NEW: "new",
  EDIT: "edit",
};

const fieldNames = {
  username: "username",
  password: "password",
  firstName: "firstName",
  surName: "surName",
  email: "email",
};

const AccountConfig = forwardRef((props, ref) => {
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

      form.setFields(
        Object.values(fieldNames).map((name) => ({
          name: name,
          value: data[name],
        }))
      );
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
    <Drawer
      visible={visible}
      onClose={onCancel}
      width={400}
      title={
        currentType === types.NEW ? "Tạo mới tài khoản" : "Chỉnh sửa tài khoản"
      }
      footer={
        <Row gutter={10}>
          <Col>
            <Button onClick={onCancel}>Huỷ bỏ</Button>
          </Col>

          <Col>
            <Button type="primary" onClick={() => form.submit()}>
              {currentType === types.NEW ? "Tạo mới" : "Cập nhật"}
            </Button>
          </Col>
        </Row>
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Họ" name={fieldNames.surName}>
          <Input />
        </Form.Item>

        <Form.Item label="Tên" name={fieldNames.firstName}>
          <Input />
        </Form.Item>

        <Form.Item label="Email" name={fieldNames.email}>
          <Input />
        </Form.Item>

        <Form.Item label="Tên tài khoản" name={fieldNames.username}>
          <Input />
        </Form.Item>

        <Form.Item label="Mật khẩu" name={fieldNames.password}>
          <Input.Password />
        </Form.Item>
      </Form>
    </Drawer>
  );
});

export default AccountConfig;
