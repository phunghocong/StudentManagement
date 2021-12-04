import { Button, Checkbox, Col, Drawer, Form, Input, Row, Switch } from "antd";
import { useForm } from "antd/lib/form/Form";
import { FormProvider } from "rc-field-form";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { update, updateByID, createStudentAndRegisterNewAccount } from "../../api/students"
import { CalendarOutlined, PhoneOutlined } from "@ant-design/icons"
const types = {
  NEW: "new",
  EDIT: "edit",
};

const fieldNames = {
  firstName: "firstName",
  surName: "surName",
  birthday: "birthday",
  national: "national",
  gender: "gender",
  ethnic: "ethnic", //King
  religion: "religion", //Dao phat
  bornAddress: "bornAddress",
  citizenCardId: "citizenCardId", //chung minh thu
  homeAddress: "homeAddress",
  currentAddress: "currentAddress",
  phoneNumber: "phoneNumber",
  email: "email",
  fatherPhoneNumber: "fatherPhoneNumber",
  motherPhoneNumber: "motherPhoneNumber",
  isEnlisted: "isEnlisted",
  draftDate: "draftDate",
  school: "school", // UET
  academyMethod: "academyMethod", //chinh quy...a
  levelOfAcademy: "levelOfAcademy", //University, Doctorate
  schoolYearGroup: "schoolYearGroup", //K64,.. ??
  baseClass: "baseClass", //CA-CLC4
  major: "major", //Khoa hoc may tinh
  startedYear: "startedYear",
  managedBy: "managedBy",
  note: "note",
  id: "id"
};

const StudentConfig = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [currentType, setCurrentType] = useState();
  const [form] = useForm();
  const [isEnlisted, setIsEnlisted] = useState(false);

  useImperativeHandle(ref, () => ({
    openNew() {
      setVisible(true);
      setCurrentType(types.NEW);
    },
    openEdit(data) {
      setVisible(true);

      setCurrentType(types.EDIT);
      setIsEnlisted(data.isEnlisted);
      //console.log("openEdit" + isEnlisted);

      form.setFields(
        Object.values(fieldNames).map((name) => ({
          name: name,
          value: data[name],
        }))
      );
    },
  }));
  useEffect(() => {
    //console.log("useEffect" + isEnlisted);

  })
  const onFinish = (values) => {

    if (currentType === types.NEW) {
      delete values.id;
      createStudentAndRegisterNewAccount(values)
        .then(res => {
          if (res.status ===200)
            window.location.reload(false);
          else alert("Không thể tạo tài khoản. Lỗi server")

        })
    } else {
      updateByID(values.id, values).then(res => {
        if (res.status === 200)
          window.location.reload(false);
        else alert("Không thể cập nhập tài khoản. Lỗi server")
      });
    }
  };

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  return (
    <Drawer
      visible={visible}
      onClose={onCancel}
      width={800}
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
        Thông tin cơ bản
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item label="Họ" name={fieldNames.surName} rules={[{ required: true, message: "Hãy nhập họ của sinh viên" }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Tên" name={fieldNames.firstName} rules={[{ required: true, message: "Hãy nhập tên của sinh viên" }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Ngày sinh" name={fieldNames.birthday} rules={[{ required: true, message: "Hãy nhập ngày sinh của sinh viên" }]}>
              <Input />
            </Form.Item>
          </Col>

        </Row>

        <Row gutter={10}>
          <Col span={8}>
            <Form.Item label="Giới tính" name={fieldNames.gender} rules={[{ required: true, message: "Hãy nhập giới tính của sinh viên" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item  label="Số điện thoại" name={fieldNames.phoneNumber} rules={[{ required: true, message: "Hãy nhập số điện thoại của sinh viên" }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Email" name={fieldNames.email} rules={[{ required: true, message: "Hãy nhập email của sinh viên" }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>

          <Col span={12}>
            <Form.Item label="Số điện thoại bố" name={fieldNames.fatherPhoneNumber} >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Số điện thoại mẹ" name={fieldNames.motherPhoneNumber}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Nơi sinh" name={fieldNames.bornAddress} rules={[{ required: true, message: "Hãy nhập nơi sinh của sinh viên" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Địa chỉ thường trú" name={fieldNames.homeAddress} rules={[{ required: true, message: "Hãy nhập Địa chỉ thường trú của sinh viên" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Địa chỉ hiện tại" name={fieldNames.currentAddress} rules={[{ required: true, message: "Hãy nhập Địa chỉ hiện tại của sinh viên" }]}>
          <Input />
        </Form.Item>

        <Row gutter={10}>
          <Col span={8}>
            <Form.Item label="Quốc tịch" name={fieldNames.national} rules={[{ required: true, message: "Hãy nhập Quốc tịch của sinh viên" }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Dân tộc" name={fieldNames.ethnic} rules={[{ required: true, message: "Hãy nhập Dân tộc của sinh viên" }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Tôn giáo" name={fieldNames.religion} rules={[{ required: true, message: "Hãy nhập Tôn giáo của sinh viên. Để là 'Không Có' nếu không có" }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Căn cước công dân" name={fieldNames.citizenCardId} rules={[{ required: true, message: "Hãy nhập căn cước công dân của sinh viên" }]}>
          <Input />
        </Form.Item>
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item label="Đã đi nhập ngũ" name={fieldNames.isEnlisted}>
              {/*  <Checkbox defaultChecked={isEnlisted} /> */}
              <Input />

            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Ngày nhập ngũ" name={fieldNames.draftDate}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        Thông tin trường
        <Row gutter={10}>
          <Col span={10}>
            <Form.Item label="Tên trường" name={fieldNames.school} rules={[{ required: true, message: "Hãy nhập tên trường học của sinh viên" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item label="Ngành học" name={fieldNames.major} rules={[{ required: true, message: "Hãy nhập tên ngành học của sinh viên" }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={10}>
            <Form.Item label="Hình thức học tập" name={fieldNames.academyMethod} rules={[{ required: true, message: "Hãy nhập Hình thức học tập của sinh viên" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item label="Trình độ học vấn" name={fieldNames.levelOfAcademy} rules={[{ required: true, message: "Hãy nhập Trình độ học vấn của sinh viên" }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item label="Khóa" name={fieldNames.schoolYearGroup} rules={[{ required: true, message: "Hãy nhập khóa của sinh viên" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Lớp" name={fieldNames.baseClass} rules={[{ required: true, message: "Hãy nhập Lớp của sinh viên" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Năm bắt đầu học" name={fieldNames.startedYear} rules={[{ required: true, message: "Hãy nhập Năm bắt đầu học của sinh viên" }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>





        <Form.Item label="Quản lý bởi" name={fieldNames.managedBy}>
          <Input />
        </Form.Item>
        <Form.Item label="Ghi chú SV" name={fieldNames.note}>
          <Input />
        </Form.Item>
        <Form.Item label="id" name={fieldNames.id} hidden={true}>
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
});

export default StudentConfig;
