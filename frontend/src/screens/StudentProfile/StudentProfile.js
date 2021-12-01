import { Row, Col, Avatar, Button, Form, Input, Checkbox } from "antd";
import { useEffect, useRef, useState } from "react";
import { findByID, updateByID } from "../../api/students";
import { useForm } from "antd/lib/form/Form";
export default function UserProfile() {

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
    id: "id"
  };
  const [form] = useForm();
  useEffect(() => {
    findByID(JSON.parse(localStorage.getItem("user")).username)
      .then(res => {
        console.log(res);
        form.setFields(
          Object.values(fieldNames).map((name) => ({
            name: name,
            value: res.data[name],
          }))
        );
      });
  }, []);
  const onFinish = (values) => {
    updateByID(values.id, values).then(res => {
      if (res.status == 200)
        window.location.reload(false);
      else alert("Không thể cập nhập tài khoản. Lỗi server")
    });

  };
  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={10}>
          <Col flex="500px">
            <b>Thông tin cơ bản</b>

            <Row gutter={10}>
              <Col span={12}>
                <Form.Item label="Họ" name={fieldNames.surName} >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Tên" name={fieldNames.firstName}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={6}>
                <Form.Item label="Giới tính" name={fieldNames.gender}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Ngày sinh" name={fieldNames.birthday}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="CCCD" name={fieldNames.citizenCardId}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
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
            <Form.Item label="Nơi sinh" name={fieldNames.bornAddress}>
              <Input />
            </Form.Item>
            <Form.Item label="Địa chỉ thường trú" name={fieldNames.homeAddress}>
              <Input />
            </Form.Item>
            <b>Liên lạc</b>

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
            <Form.Item label="Địa chỉ hiện tại" name={fieldNames.currentAddress}>
              <Input />
            </Form.Item>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item label="Số điện thoại bố" name={fieldNames.fatherPhoneNumber}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Số điện thoại mẹ" name={fieldNames.motherPhoneNumber}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col flex="500px">
            <b>Thông tin Nhập ngũ</b>
            <Row gutter={10}>
              <Col span={8}>
                <Form.Item label="Đã đi nhập ngũ" name={fieldNames.isEnlisted}>
                  <Checkbox />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Ngày nhập ngũ" name={fieldNames.draftDate}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <b>Thông tin trường</b>
            <Row gutter={10}>
              <Col span={10}>
                <Form.Item label="Trường học" name={fieldNames.school}>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item label="Ngành học" name={fieldNames.major}>
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={10}>
                <Form.Item label="Hình thức học tập" name={fieldNames.academyMethod}>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item label="Trình độ học vấn" name={fieldNames.levelOfAcademy}>
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={8}>
                <Form.Item label="Khóa" name={fieldNames.schoolYearGroup}>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Lớp" name={fieldNames.baseClass}>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Năm bắt đầu học" name={fieldNames.startedYear}>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Form.Item label="" name={fieldNames.id} hidden>
                <Input disabled />
              </Form.Item>
            </Row>
          </Col>
        </Row>
      </Form>

      <Button type="primary" onClick={() => form.submit()}>
        Lưu
      </Button>
    </div>
  );
}
