import { Button, Col, Drawer, Form, Input, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { forwardRef, useImperativeHandle, useState } from "react";

const types = {
  NEW: "new",
  EDIT: "edit",
};

const fieldNames = {
  firstName: "firstName",
  surName: "surName",
  birthday: "birthday",
  national: "national",
  ethnic: "ethnic", //King
  religion: "religion", //Dao phat
  bornAddress: "bornAddress",
  citizenCardId: "citizenCardId", //chung minh thu
  currentAddress: "currentAddress",
  phoneNumber: "phoneNumber",
  email: "email",
  isEnlisted: "isEnlisted",
  draftDate: "draftDate",
  school: "school", // UET
  academyMethod: "academyMethod", //chinh quy...a
  levelOfAcademy: "levelOfAcademy", //University, Doctorate
  schoolYearGroup: "schoolYearGroup", //K64,.. ??
  baseClass: "baseClass", //CA-CLC4
  major: "major", //Khoa hoc may tinh
  startedYear: "startedYear",
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
      width={700}
      title={
        currentType === types.NEW ? "Tạo mới sinh viên" : "Chỉnh sửa sinh viên"
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
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item label="Họ" name={fieldNames.surName}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Tên" name={fieldNames.firstName}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Ngày sinh" name={fieldNames.birthday}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={10}>
          <Col span={12}>
            <Form.Item label="Số điện thoại" name={fieldNames.phoneNumber}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Email" name={fieldNames.email}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Địa chỉ thường trú" name={fieldNames.bornAddress}>
          <Input />
        </Form.Item>

        <Form.Item label="Địa chỉ hiện tại" name={fieldNames.currentAddress}>
          <Input />
        </Form.Item>

        <Row gutter={10}>
          <Col span={8}>
            <Form.Item label="Quốc tịch" name={fieldNames.national}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Dân tộc" name={fieldNames.ethnic}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Tôn giáo" name={fieldNames.religion}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="CCCD" name={fieldNames.citizenCardId}>
          <Input />
        </Form.Item>

        <Form.Item label="Is Enlisted?" name={fieldNames.isEnlisted}>
          <Input />
        </Form.Item>

        <Form.Item label="Draft Date?" name={fieldNames.draftDate}>
          <Input />
        </Form.Item>

        <Form.Item label="Trường" name={fieldNames.school}>
          <Input />
        </Form.Item>

        <Form.Item label="Academy Method?" name={fieldNames.academyMethod}>
          <Input />
        </Form.Item>

        <Form.Item label="Level of Academy?" name={fieldNames.levelOfAcademy}>
          <Input />
        </Form.Item>

        <Form.Item label="School Year Group?" name={fieldNames.schoolYearGroup}>
          <Input />
        </Form.Item>

        <Form.Item label="Base Class?" name={fieldNames.baseClass}>
          <Input />
        </Form.Item>

        <Form.Item label="Ngành học" name={fieldNames.major}>
          <Input />
        </Form.Item>

        <Form.Item label="Năm bắt đầu học" name={fieldNames.startedYear}>
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
});

export default StudentConfig;
