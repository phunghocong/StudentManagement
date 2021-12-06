import { Col, Modal, Row, Table, Form, Button, Input } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import { getCurrentUser, updateAccount } from "../../api/accounts";
const UserPasswordChange = forwardRef((props, ref) => {

  const [form] = useForm();

  const onFinish = (values) => {
    const password = {
      password: values.newPassword
    }
    //console.log(password);
     updateAccount(getCurrentUser().id, password)
     .then(res=> {
       setVisible(false);
       form.resetFields();
     })
  }
  useEffect(() => {

  }, []);

  const [visible, setVisible] = useState(false);
  const [initdata, setInitdata] = useState({});

  useImperativeHandle(ref, () => ({
    open(data) {
      setVisible(true);

    },
  }));

  return (
    <Modal
      visible={visible}
      title="Thay đổi mật khẩu"
      onCancel={() => setVisible(false)}
      footer={null}
      width={300}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* <Row>
          <Form.Item label="Mật khẩu hiện tại" name="password" rules={[
            { required: true, message: "Hãy nhập mật khẩu hiện tại" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 chữ" }]}>
            <Input.Password />
          </Form.Item>
        </Row> */}
        <Row>
          <Form.Item label="Mật khẩu mới" name="newPassword" rules={[
            { required: true, message: "Hãy nhập mật khẩu mới" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 chữ" }]}>
            <Input.Password />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item label="Nhập lại mật khẩu mới" name="retypeNewPassword" rules={[
            { required: true, message: "Hãy nhập lại mật khẩu mới" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 chữ" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không trùng'));
              },
            }),]}>
            <Input.Password min={6} />
          </Form.Item>
        </Row>

      </Form>
      <Button type="primary" onClick={() => form.submit()}>
        Lưu
      </Button>
    </Modal>
  );
});

export default UserPasswordChange;
