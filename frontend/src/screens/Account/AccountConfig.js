import { Button, Col, Drawer, Form, Input, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { forwardRef, useImperativeHandle, useState } from "react";
import { createAccount, updateAccount } from "../../api/accounts";
const types = {
  NEW: "new",
  EDIT: "edit",
};

const fieldNames = {
  id: "id",
  username: "username",
  password: "password",
  firstName: "firstName",
  surName: "surName",
  email: "email",
  authorityLevel: "authorityLevel",
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
    if (currentType == types.NEW) {
      createAccount(values)
        .then(res => {
          if (res.status == 200) {
            window.location.reload(false);
          }
        })
        .catch(err => {
          alert("Có lỗi xảy ra khi thêm tài khoản");
        })
    } else {
      updateAccount(values.id, values)
        .then(res => {
          if (res.status == 200) {
            window.location.reload(false);
          }
        })
        .catch(err => {
          alert("Có lỗi xảy ra khi cập nhập tài khoản");
        })
    }
    console.log(values);

  };

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };
  const resetPassword = () => {
    const password = {
      password: form.getFieldValue(fieldNames.username)
    }
    //console.log(password);
    updateAccount(form.getFieldValue(fieldNames.id), password)
      .then(res => {
        setVisible(false);
      })

  }
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
            <Button onClick={resetPassword}>Đặt lại mật khẩu</Button>
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
        <Form.Item label="Họ" name={fieldNames.surName} rules={[
          { required: true, message: "Hãy nhập họ của người dùng" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Tên" name={fieldNames.firstName} rules={[
          { required: true, message: "Hãy nhập tên của người dùng" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email" name={fieldNames.email} rules={[
          { required: true, message: "Hãy nhập email của người dùng" }
/*           , { type: email, message: "Email không hợp lệ" }
 */          ]}>
          <Input />
        </Form.Item>

        <Form.Item label="Tên tài khoản" name={fieldNames.username} rules={[
          { required: true, message: "Hãy nhập tên tài khoản của người dùng" },
          { whitespace: true }]}>
          <Input />
        </Form.Item>

        {currentType === types.NEW ? <Form.Item label="Mật khẩu" name={fieldNames.password} rules={[
          { required: true, message: "Hãy nhập mật khẩu" },
          { min: 6, message: "Mật khẩu phải có ít nhất 6 chữ" }]}>
          <Input.Password />
        </Form.Item> : ""}

        <Form.Item label="Mức quyền" name={fieldNames.authorityLevel} rules={[
          { required: true, message: "Hãy nhập quyền hạn" },
          { enum: ["", "CON", "MOD", "ADMIN"], message: "Mật khẩu phải có ít nhất 6 chữ" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Mức quyền" hidden name={fieldNames.id} >
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
});

export default AccountConfig;
