import { Col, Modal, Row, Table } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { findByStudentId } from "../../api/classRecord"
import { useEffect } from "react";

const StudentGrade = forwardRef((props, ref) => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const columns = [
    { title: "Tên lớp học", key: "classname", dataIndex: "classname", width: "10%" },
    {
      title: "Tên môn học", key: "subjectName", dataIndex: "subjectName", width: "25%"
    },
    { title: "Số tín chỉ", key: "subjectCredit", dataIndex: "subjectCredit", width: "7%" },
    {
      title: "Năm học", key: "year", dataIndex: "year", width: "7%", sorter: {
        compare: (a, b) => a.year - b.year,
      },
    },
    { title: "Học kỳ", key: "semeter", dataIndex: "semeter", width: "7%" },
    {
      title: "Điểm giữa kì", key: "midtermGrade", dataIndex: "midtermGrade", width: "7%", sorter: {
        compare: (a, b) => a.midtermGrade - b.midtermGrade,
      }
    },
    {
      title: "Điểm cuối kì", key: "grade", dataIndex: "grade", width: "7%", sorter: {
        compare: (a, b) => a.grade - b.grade,
      }
    },
    {
      title: "Điểm tổng kết", key: "totalGrade", dataIndex: "totalGrade", width: "7%", sorter: {
        compare: (a, b) => a.totalGrade - b.totalGrade,
      }
    },
    {
      title: "Điểm hệ 4", key: "totalGrade4", dataIndex: "totalGrade4", width: "7%", sorter: {
        compare: (a, b) => a.totalGrade4 - b.totalGrade4,
      }
    },
    {
      title: "Tích luỹ GPA", key: "gpa", dataIndex: "gpa", width: "7%"
    }
    ,
  ];
  useEffect(() => {

  }, []);
  const getGPAchar = (score) => {
    if (score < 4) return "F";
    else if (score <= 4.9) return "D";
    else if (score <= 5.4) return "D+";
    else if (score <= 6.4) return "C";
    else if (score <= 6.9) return "C+";
    else if (score <= 7.9) return "B";
    else if (score <= 8.4) return "B+";
    else if (score <= 8.9) return "A";
    else if (score <= 10) return "A+";

  }
  const shortenDigit = (num, length) => {
    const temp = Math.pow(10, length);
    return Math.round(parseFloat(num) * temp) / temp;
  }
  const getList = async (studentID) => {
    try {
      setIsLoading(true);
      const res = await findByStudentId(studentID)
      updateTotal(res.data);
      setDataList(
        res.data.map((item) => ({
          ...item,
          midtermGrade: shortenDigit(item.midtermGrade, 1),

          grade: shortenDigit(item.grade, 1),
          totalGrade: Math.round((parseFloat(item.midtermGrade) * 0.4 + parseFloat(item.grade) * 0.6) * 100) / 100,
          totalGrade4: Math.round((parseFloat(item.midtermGrade) * 4 + parseFloat(item.grade) * 6) * 0.4) / 10,
          gpa: getGPAchar(Math.round((parseFloat(item.midtermGrade) * 4 + parseFloat(item.grade) * 6)) / 10),
          key: item._id,

        }))
      );
      setIsLoading(false);

    } catch (error) {
      console.log("get student list error", error);
    }
  };
  const [sumCredit, setSumCredit] = useState(0);
  const [averageGPA, setAverageGPA] = useState("0");
  const updateTotal = classList => {

    setSumCredit(classList.map(i => i.subjectCredit).reduce((a, b) => parseInt(a) + parseInt(b)));
    var midTerm = (classList.map(i => i.midtermGrade).reduce((a, b) => parseFloat(a) + parseFloat(b)));
    var final = (classList.map(i => i.grade).reduce((a, b) => parseFloat(a) + parseFloat(b)));

    //gpa = (shortenDigit(gpa / classList.length, 1));
    var gpa = shortenDigit((0.4 * midTerm + 0.6 * final) * 0.4 / classList.length, 1);
    setAverageGPA(gpa);
    //console.log(sumCredit);
    //console.log(averageGPA);
  }
  const [visible, setVisible] = useState(false);
  const [initdata, setInitdata] = useState({});

  useImperativeHandle(ref, () => ({
    open(data) {
      setVisible(true);

      setInitdata(data);
      getList(JSON.parse(initdata.studentID));

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
      <p>Mssv: {initdata.studentID}</p>

      <br />

      <Table columns={columns} dataSource={dataList} loading={isLoading} pagination={false} />

      <br />

      <Row gutter={50}>
        <Col>
          <p>Tổng số tín chỉ tích luỹ: {sumCredit}</p>
        </Col>

        <Col>
          <p>GPA trung bình: {averageGPA}</p>
        </Col>
      </Row>
    </Modal>
  );
});

export default StudentGrade;
