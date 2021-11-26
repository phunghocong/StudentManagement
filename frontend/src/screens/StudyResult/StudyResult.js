import { Col, Row, Table } from "antd";
import { findByStudentId } from "../../api/classRecord"
import { useEffect, useRef, useState } from "react";
import keys from "../../constants/keys";

export default function StudyResult() {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  var sumCredit, averageGPA;

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
    getList(JSON.parse(localStorage.getItem("user")).username);
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
      const res = await findByStudentId(studentID);
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
      sumCredit = dataList.map(i => i.subjectCredit).reduce((a, b) => parseInt(a) + parseInt(b));
      averageGPA = dataList.map(i => i.totalGrade4).reduce((a, b) => parseInt(a) + parseInt(b));
      averageGPA = shortenDigit(averageGPA / dataList.length, 1);
      console.log(sumCredit);
      console.log(averageGPA);

      setIsLoading(false);
    } catch (error) {
      console.log("get student list error", error);
    }
  };
  return (
    <div className="container">
      <h1>Kết quả học tập</h1>

      <br />

      <Table columns={columns} dataSource={dataList} loading={isLoading} pagination={false} filterMultiple={false} />

      <br />

      <Row gutter={50} >
        <Col loading={isLoading}>
          <p>Tổng số tín chỉ tích luỹ: {sumCredit}</p>
        </Col>

        <Col loading={isLoading}>
          <p>GPA trung bình: {averageGPA}</p>
        </Col>
      </Row>
    </div>
  );
}
