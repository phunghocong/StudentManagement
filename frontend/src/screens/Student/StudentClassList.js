import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Table, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import { findStudentsFromClass, exportToCsvByClass } from "../../api/students";
import StudentDelete from "./StudentDelete";
import StudentConfig from "./StudentConfig";
import StudentGrade from "./StudentGrade";
import paths from "../../constants/paths";
import { useLocation } from "react-router";
const studentType = {
  ANY: "a",
  GOOD: "good",
  BAD: "bad",
};

export default function StudentClassList() {
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
    { title: "Giới tính", key: "gender", dataIndex: "gender", width: "10%" },
    { title: "Năm sinh", key: "birthday", dataIndex: "birthday", width: "10%" },
    { title: "Số điện thoại", key: "phoneNumber", dataIndex: "phoneNumber", width: "10%" },
    { title: "Email", key: "email", dataIndex: "email", width: "10%" },

    {
      title: "GPA",
      key: "GPA",
      dataIndex: "GPA",
      width: "5%",
      sorter: {
        compare: (a, b) => a.GPA - b.GPA,
        multiple: 1,
      },
    },
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
  const [currentMode, setCurrentMode] = useState(studentType);

  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loc = useLocation();
  const baseClass = loc.pathname.substring(paths.DANH_SACH_SINH_VIEN_LOP_HOC.length)

  useEffect(() => {
    getList(baseClass);
  }, []);

  const getList = async (baseClass, mode = studentType.ANY) => {
    setCurrentMode(mode);

    try {
      setIsLoading(true);
      const res = await findStudentsFromClass(mode,baseClass);
      console.log(baseClass);
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
            <h1>Danh sách sinh viên của lớp {baseClass}</h1>
          </Col>      
          <Col>
            <Button type="primary" onClick={() => { exportToCsvByClass(currentMode,baseClass) }}>
              Xuất dữ liệu
            </Button>
          </Col>
        </Row>

{/*         <Select
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
        </Select> */}
      </Row>

      <br />

      <Table columns={columns} dataSource={dataList} loading={isLoading} />

      <StudentDelete ref={deleteRef} />
      <StudentConfig ref={configRef} />
      <StudentGrade ref={gradeRef} />
    </div>
  );
}
