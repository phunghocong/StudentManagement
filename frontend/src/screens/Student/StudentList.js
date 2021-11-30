import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Table, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import { findAll, findByMod } from "../../api/students";
import StudentDelete from "./StudentDelete";
import StudentConfig from "./StudentConfig";
import StudentGrade from "./StudentGrade";
import { currentUserIsCon, getCurrentUser } from "../../api/accounts";
const studentType = {
  ANY: "any",
  GOOD: "good",
  BAD: "bad",
};

export default function StudentList() {
  const columns = [
    {
      title: "Mã số SV",
      key: "studentID",
      dataIndex: "studentID",
      width: "10%",
      sorter: {
        compare: (a, b) => a.studentID - b.studentID,
        multiple: 1,
      },
    },
    { title: "Họ", key: "surName", dataIndex: "surName", width: "15%" },
    { title: "Tên", key: "firstName", dataIndex: "firstName", width: "10%" },
    { title: "Năm sinh", key: "birthday", dataIndex: "birthday", width: "10%" },
    { title: "Ngành học", key: "major", dataIndex: "major", width: "25%" },
    { title: "Lớp", key: "baseClass", dataIndex: "baseClass", width: "10%" },
    {
      title: "GPA",
      key: "GPA",
      dataIndex: "GPA",
      width: "5%",
      sorter: {
        compare: (a, b) => a.GPA - b.GPA,
        multiple: 1,
      },
    }, //Cần chuyển 2.330000000 -> 2.34
    {
      title: "",
      key: "actions",
      dataIndex: "studentID",
      width: "0px",
      render: (studentID, record) => (
        <Row gutter={10} wrap={false}>
          <Col>
            <Button
              icon={<InfoCircleOutlined />}
              onClick={() => gradeRef.current.open(record)}
            ></Button>
          </Col>

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

  const configRef = useRef();
  const deleteRef = useRef();
  const gradeRef = useRef();

  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  const getList = async (mode = studentType.ANY) => {
    try {
      setIsLoading(true);
      var res;
      if(currentUserIsCon()) {
        res = await findByMod(mode, getCurrentUser().username)
        console.log(res);
      } else {
        res = await findAll(mode);
      }
      setDataList(
        res.data.map((item) => ({
          ...item,
          key: item.studentID,
        }))
      );
      setIsLoading(false);
    } catch (error) {
      console.log("get student list error", error);
    }
  };

  return (
    <div className="container">
      <Row justify="space-between" align="middle">
        <Row align="middle" gutter={20}>
          <Col>
            <h1>Danh sách sinh viên</h1>
          </Col>

          <Col>
            <Button type="primary" onClick={() => configRef.current.openNew()}>
              Tạo mới
            </Button>
          </Col>
        </Row>

        <Select
          onChange={(data) => getList(data)}
          defaultValue={studentType.ANY}
          style={{ width: 200 }}
        >
          {Object.values(studentType).map((val, index) => (
            <Select.Option key={index} value={val}>
              {val === studentType.ANY
                ? "Tất cả"
                : val === studentType.GOOD
                ? "Tốt"
                : "Kém"}
            </Select.Option>
          ))}
        </Select>
      </Row>

      <br />

      <Table columns={columns} dataSource={dataList} loading={isLoading} />

      <StudentDelete ref={deleteRef} />
      <StudentConfig ref={configRef} />
      <StudentGrade ref={gradeRef} />
    </div>
  );
}
