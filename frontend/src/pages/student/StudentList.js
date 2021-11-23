import { Button, Table, Row, Col, Input, Select, Menu, Dropdown, message } from "antd";
import { DeleteOutlined, EditOutlined, DownOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import StudentConfig from "./StudentConfig";
import StudentDelete from "./StudentDelete";
import { findAllToStudentList } from "../../api/students";
function useForceUpdate() {
  const [loaded, setLoaded] = useState(0);
  return () => setLoaded(loaded => loaded + 1); // update the state to force render
}
var mode = "any";
let studentData;
export default function StudentList() {
  const configRef = useRef();
  const deleteRef = useRef();

  const forceUpdate = useForceUpdate();
  const onSearch = (value) => console.log(value);
  const changeMode = ({key}) => {
    mode = key;
    console.log(mode);
  }
  useEffect(() => {
    findAllToStudentList(mode)
      .then(res => {
        studentData = res.data;
        forceUpdate();
      })
  })
  const menu = (
    <Menu onClick={changeMode}>
      <Menu.Item key="any">Kết quả học sinh</Menu.Item>
      <Menu.Item key="good">Kết quả học sinh tốt</Menu.Item>
      <Menu.Item key="bad">Kết quả học sinh kém</Menu.Item>
    </Menu>
  );

  const columns = [
    /*  { title: "ID", key: "id", dataIndex: "id" }, */
    { title: "Mã số sinh viên", key: "studentID", dataIndex: "studentID" },
    { title: "Họ", key: "surName", dataIndex: "surName", },
    { title: "Tên", key: "firstName", dataIndex: "firstName", },

    { title: "Năm sinh", key: "birthday", dataIndex: "birthday" },
    { title: "Ngành học", key: "major", dataIndex: "major" },
    { title: "Lớp", key: "baseClass", dataIndex: "baseClass" },
    { title: "GPA", key: "GPA", dataIndex: "GPA" },//Cần chuyển 2.330000000 -> 2.34
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

  return (
    <div className="">
      <Row align="middle">
        <h1 style={{ margin: "0 20px 0 0" }}>Danh sách sinh viên</h1>
        <Button type="primary" onClick={() => configRef.current.openNew()}>
          Tạo mới
        </Button>
        <Button type="primary" onClick={forceUpdate}>
          ReFresh
        </Button>
        <Dropdown overlay={menu}>
          <Button className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            Kết quả học tập <DownOutlined />
          </Button>
        </Dropdown>,
      </Row>
      <br />
      <Row justify="space-between" gutter={10}>
        <Col flex="200px">
          <Select style={{ width: "100%" }}></Select>
        </Col>
        <Col flex="300px">
          <Input.Search />
        </Col>
      </Row>
      <br />
      <Table columns={columns}
        dataSource={studentData}
      />
      <StudentConfig ref={configRef} />
      <StudentDelete ref={deleteRef} />
    </div>
  );
}
