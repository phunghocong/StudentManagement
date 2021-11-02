import { Button, Table, Row, Col } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRef } from "react";
// import StudentConfig from "./StudentConfig";
// import StudentDelete from "./StudentDelete";``


export default function Discipline() {

  const configRef = useRef();
  const deleteRef = useRef();

  const columns = [
    { title: "ID", key: "id", dataIndex: "id" },
    { title: "Tên sinh viên", key: "name", dataIndex: "name" },
    { title: "Cảnh báo", key: "warning", dataIndex: "warning" },
    {
      title: "",
      key: "actions",
      dataIndex: "id",
      width: "0px",
      render: (id, record) => (
        <Row gutter={10} wrap={false}>
          <Col>
            <Button
              icon={<EditOutlined />}
              onClick={() => configRef.current.openEdit(record)}
              type="primary"
            ></Button>
          </Col>

          <Col>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => deleteRef.current.open(record)}
              type="primary"
              danger
            ></Button>
          </Col>
        </Row>
      ),
    },
  ];

  const dataSource = [
    ...Array.apply(null, Array(10)).map((_, i) => ({
      id: i,
      key: i,
      name: "Nguyen Van A",
      warning :"GPA quá thấp"
    })),
  ];

  return (
    <div className="">
      <Row align="middle" style={{ margin: "0 0 20px 0" }}>
        <h1 style={{ fontSize: 25, margin: "0 20px 0 0" }}>
          Danh sách sinh viên
        </h1>

        <Button type="primary" onClick={() => configRef.current.openNew()}>
          Tạo mới
        </Button>
      </Row>

      <Table columns={columns} dataSource={dataSource} />

    </div>
  );


}
