import {
  Button,
  Table,
  Row,
  Col,
  Input,
  Select,
  Menu,
  Avatar,
  Form,
} from "antd";

export default function ScoreBoard() {
  return (
    <div>
      <Row>
      <Col flex="200px">Tên lớp học</Col>
      <Col flex="200px">Số tín chỉ</Col>
      <Col flex="200px">Năm học</Col>
      <Col flex="200px">Học kì</Col>
      <Col flex="200px">Điểm tổng kết</Col>
      <Col flex="200px">Tích lũy GPA</Col>

    </Row>
    </div>
  );
}
