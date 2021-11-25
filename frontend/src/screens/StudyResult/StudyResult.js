import { Col, Row, Table } from "antd";

export default function StudyResult() {
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

  return (
    <div className="container">
      <h1>Kết quả học tập</h1>

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
    </div>
  );
}
