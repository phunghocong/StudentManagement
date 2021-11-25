import { Col, Modal, Row, Table } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";

const StudentGrade = forwardRef((props, ref) => {
  const columns = [
    { title: "Tên lớp học", key: "ten_lop_hoc", dataIndex: "ten_lop_hoc" },
    { title: "Tên môn học", key: "ten_mon_hoc", dataIndex: "ten_mon_hoc" },
    { title: "Số tín chỉ", key: "so_tin_chi", dataIndex: "so_tin_chi" },
    { title: "Năm học", key: "nam_hoc", dataIndex: "nam_hoc" },
    { title: "Học kỳ", key: "hoc_ky", dataIndex: "hoc_ky" },
    {
      title: "Điểm tổng kết",
      key: "diem_tong_ket",
      dataIndex: "diem_tong_ket",
    },
    { title: "Điểm hệ 4", key: "diem_he_4", dataIndex: "diem_he_4" },
    { title: "Tích luỹ GPA", key: "tich_luy_gpa", dataIndex: "tich_luy_gpa" },
  ];

  const [visible, setVisible] = useState(false);
  const [initdata, setInitdata] = useState({});

  useImperativeHandle(ref, () => ({
    open(data) {
      setVisible(true);
      setInitdata(data);
    },
  }));

  return (
    <Modal
      visible={visible}
      title="Kết quả học tập"
      onCancel={() => setVisible(false)}
      footer={null}
      width={800}
    >
      <h3>Họ và tên: {initdata.surName + " " + initdata.firstName}</h3>
      <p>Mssv: 19020102</p>

      <br />

      <Table columns={columns} dataSource={[1, 2, 3, 4]} pagination={false} />

      <br />

      <Row gutter={50}>
        <Col>
          <p>Tổng số tín chỉ tích luỹ: 150</p>
        </Col>

        <Col>
          <p>GPA trung bình: 4.0</p>
        </Col>
      </Row>
    </Modal>
  );
});

export default StudentGrade;
