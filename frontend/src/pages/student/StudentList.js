import { Button, Table, Row, Col, Input, Select, Menu, Dropdown, message } from "antd";
import { DeleteOutlined, EditOutlined, DownOutlined, SearchOutlined, ReloadOutlined, LoadingOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import StudentConfig from "./StudentConfig";
import StudentDelete from "./StudentDelete";
import { findAllToStudentList } from "../../api/students";
function useForceUpdate() {
  const [loaded, setLoaded] = useState(0);
  return () => setLoaded(loaded => loaded + 1); // update the state to force render
}
var mode = "any", justChangedMode = true;
let studentData;
export default function StudentList() {


  const configRef = useRef();
  const deleteRef = useRef();

  const forceUpdate = useForceUpdate();
  const onSearch = (value) => console.log(value);
  const changeMode = ({ key }) => {
    mode = key;
    justChangedMode = true;
    forceUpdate();
    studentData = null;
    console.log(mode);
  }
  useEffect(() => {
    if (studentData == null) {
      forceUpdate();

    }
    if (justChangedMode) {
      justChangedMode = false;
      findAllToStudentList(mode)
        .then(res => {
          studentData = res.data;
          forceUpdate();
        })
    }
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
    {
      title: "Mã số SV", key: "studentID", dataIndex: "studentID", width: '10%', sorter: {
        compare: (a, b) => a.studentID - b.studentID,
        multiple: 1,
      }
    },
    { title: "Họ", key: "surName", dataIndex: "surName", width: '15%' },
    { title: "Tên", key: "firstName", dataIndex: "firstName", width: '10%' },
    { title: "Năm sinh", key: "birthday", dataIndex: "birthday", width: '10%' },
    { title: "Ngành học", key: "major", dataIndex: "major", width: '25%' },
    { title: "Lớp", key: "baseClass", dataIndex: "baseClass", width: '10%' },
    {
      title: "GPA", key: "GPA", dataIndex: "GPA", width: '5%', sorter: {
        compare: (a, b) => a.GPA - b.GPA,
        multiple: 1,
      }
    },//Cần chuyển 2.330000000 -> 2.34
    {
      title: "",
      key: "actions",
      dataIndex: "studentID",
      width: "0px",
      render: (studentID, record) => (
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
  if (studentData == null)
    return (<LoadingOutlined />);
  return (
    <div className="">
      <Row align="middle">
        <h1 style={{ margin: "0 20px 0 0" }}>Danh sách sinh viên</h1>
        <Button type="primary" onClick={() => configRef.current.openNew()}>
          Tạo mới
        </Button>
        <Button type="primary" onClick={forceUpdate}>
          <ReloadOutlined />
        </Button>
        <Dropdown overlay={menu}>
          <Button className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            Phân loại học tập<DownOutlined />
          </Button>
        </Dropdown>
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
