import React from 'react';
import { Line, Column, Pie, G2 } from '@ant-design/charts';
import { Row, Col, Button, Form, Input, Progress ,Avatar} from "antd";
import { getAccount, getCurrentUser, currentUserIsAdmin, currentUserIsMod, currentUserIsCon, currentUserIsStudent } from '../../api/accounts';
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { graphStudentCountEachYear, graphGenderCount } from '../../api/students';
import { useHistory } from 'react-router';
import paths from "../../constants/paths";

import { getStudentGPA, graphGPAPerYear, graphGradeCount, graphGradeCountOfStudent } from '../../api/classRecord';
export default function Dashboard() {
  const G = G2.getEngine('canvas');
  const history = useHistory();

  const allWidth = 500, allHeigh = 300;
  const [GPA, setGPA] = useState(0);
  useEffect(() => {
    getUser();
    if (!currentUserIsStudent()) {
      getStudentYearData();
      getGenderData();
      getGpaPerYearData();
      getgradeCountData();
    } else {
      getStudentGradeCountData();
      //console.log(getStudentGPA(getCurrentUser().username));
      getStudentGPA(getCurrentUser().username)
        .then(data => {
          setGPA(data.data.GPA);
        })
    }

  }, []);
  const [fullName, setFullName] = useState("")

  const getUser = () => {
    getAccount(getCurrentUser().id)
      .then(res => {
        setFullName(res.data.surName + " " + res.data.firstName)
      });
  }

  let chart;
  const downloadImage = () => {
    chart?.downloadImage();
  };
  const [studentYearDataIsLoading, setstudentYearDataIsLoading] = useState(false);
  const [studentYearData, setStudentYearData] = useState([]);
  const studentYearDataGraphConfig = {
    data: studentYearData,
    xField: 'year',
    yField: 'studentCount',
    width: allWidth,
    height: allHeigh,
    autoFit: false,
    label: {
      position: 'bottom',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      year: {
        alias: 'Năm',
      },
      studentCount: {
        alias: 'Số lượng sinh viên',
      },
    },
  };
  var getStudentYearDataFrom = 2000, getStudentYearDataTo = 2030;
  const getStudentYearData = () => {
    setstudentYearDataIsLoading(true);
    graphStudentCountEachYear(getStudentYearDataFrom, getStudentYearDataTo)
      .then(res => {
        setStudentYearData(res.data);
        setstudentYearDataIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const [genderDataIsLoading, setGenderDataIsLoading] = useState(false);
  const [genderData, setGenderData] = useState([]);
  const genderDataGraphConfig = {
    appendPadding: 10,
    data: genderData,
    angleField: 'count',
    colorField: 'gender',
    color: ({ gender }) => {
      if (gender === 'Nam') {
        return '#6495ED';
      } else if (gender === 'Nữ') {
        return 'pink';
      } else
        return '#008000';
    },
    width: allWidth,
    height: allHeigh + 100,
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  const getGenderData = () => {
    setGenderDataIsLoading(true);
    graphGenderCount()
      .then(res => {
        setGenderData(res.data);
        //console.log(genderData);
        setGenderDataIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }


  const [gpaPerYearIsLoading, setGpaPerYearIsLoading] = useState(false);
  const [gpaPerYearData, setGpaPerYearData] = useState([]);
  const gpaPerYearGraphConfig = {
    data: gpaPerYearData,
    padding: 'auto',
    xField: '_id',
    yField: 'totalGrade',
    width: allWidth,
    height: allHeigh,
    yAxis: { max: 10 },
    point: {
      size: 5,
      shape: 'diamond',
    },

    annotations: [
      {
        type: 'regionFilter',
        start: ['min', '6'],
        end: ['max', '0'],
        color: '#F4664A',
      },
      {
        type: 'text',
        position: ['min', '6'],
        content: '',
        offsetY: -4,
        style: {
          textBaseline: 'bottom',
        },
      },
      {
        type: 'line',
        start: ['min', '6'],
        end: ['max', '6'],
        style: {
          stroke: '#F4664A',
          lineDash: [2, 2],
        },
      },
    ],
  };
  var getGpaPerYearDataFrom = 2000, getGpaPerYearDataTo = 2030;

  const getGpaPerYearData = () => {
    setGpaPerYearIsLoading(true);
    graphGPAPerYear(getGpaPerYearDataFrom, getGpaPerYearDataTo)
      .then(res => {
        setGpaPerYearData(res.data);
        //console.log(res.data);
        setGpaPerYearIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const [gradeCountIsLoading, setGradeCountIsLoading] = useState(false);
  const [gradeCountData, setGradeCountData] = useState([]);
  const gradeCountDataGraphConfig = {
    data: gradeCountData,
    xField: "grade",
    yField: "count",
    color: ({ grade }) => {
      if (grade === 'A+') {
        return '#5DEA60';
      } else if (grade === 'A') {
        return '#6FE080';
      } else if (grade === 'B+') {
        return '#5DEA60';
      } else if (grade === 'B') {
        return '#F1F957';
      } else if (grade === 'C+') {
        return '#FCE43A';
      } else if (grade === 'C') {
        return '#FFC94C';
      } else if (grade === 'D+') {
        return '#FFC94C';
      } else if (grade === 'D') {
        return '#FC7E1E';
      } else if (grade === 'F') {
        return '#FC7E1E';
      }

    },
    width: allWidth,
    height: allHeigh,
    autoFit: false,
    label: {
      position: "bottom",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      grade: {
        alias: "Điểm",
      },
      count: {
        alias: "Số lượng",
      },
    },
  };
  //var gradeCountYear = 2020,   gradeCountSemeter = 1;
  const [gradeCountYear, setGradeCountYear] = useState("2020");
  const [gradeCountSemeter, setGradeCountSemeter] = useState("1");

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
  const getgradeCountData = () => {
    setGradeCountIsLoading(true);
    graphGradeCount(gradeCountYear, gradeCountSemeter)
      .then((res) => {
        var scoreList = {
          'A+': 0,
          'A': 0,
          'B+': 0,
          'B': 0,
          'C+': 0,
          'C': 0,
          'D+': 0,
          'D': 0,
          'F': 0,

        };
        for (const value of res.data) {

          var char = getGPAchar(value.score);
          scoreList[char]++;
        }
        var list = []
        for (const val in scoreList) {
          list.push({
            'grade': val,
            'count': scoreList[val]
          })
        }
        setGradeCountData(list);
        setGradeCountIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [studentGradeIsLoading, setStudentGradeIsLoading] = useState(false);
  const [studentGradeData, setStudentGradeData] = useState([]);
  const studentGradeDataGraphConfig = {
    data: studentGradeData,
    xField: "grade",
    yField: "count",
    color: ({ grade }) => {
      if (grade === 'A+') {
        return '#5DEA60';
      } else if (grade === 'A') {
        return '#6FE080';
      } else if (grade === 'B+') {
        return '#5DEA60';
      } else if (grade === 'B') {
        return '#F1F957';
      } else if (grade === 'C+') {
        return '#FCE43A';
      } else if (grade === 'C') {
        return '#FFC94C';
      } else if (grade === 'D+') {
        return '#FFC94C';
      } else if (grade === 'D') {
        return '#FC7E1E';
      } else if (grade === 'F') {
        return '#FC7E1E';
      }

    },
    width: allWidth,
    height: allHeigh,
    autoFit: false,
    label: {
      position: "bottom",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      grade: {
        alias: "Điểm",
      },
      count: {
        alias: "Số lượng",
      },
    },
  };


  const getStudentGradeCountData = () => {
    setStudentGradeIsLoading(true);
    graphGradeCountOfStudent(getCurrentUser().username)
      .then((res) => {
        var scoreList = {
          'A+': 0,
          'A': 0,
          'B+': 0,
          'B': 0,
          'C+': 0,
          'C': 0,
          'D+': 0,
          'D': 0,
          'F': 0,

        };
        for (const value of res.data) {

          var char = getGPAchar(value.score);
          scoreList[char]++;
        }
        var list = []
        for (const val in scoreList) {
          list.push({
            'grade': val,
            'count': scoreList[val]
          })
        }
        setStudentGradeData(list);
        setStudentGradeIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Row><h1>Xin chào {fullName}</h1></Row>

      {!currentUserIsStudent() ? <div>

        <Row gutter={10}>
          <Col span={12}>
            <h2>Số lượng sinh viên theo từng năm</h2>
            <Row>
              <Column {...studentYearDataGraphConfig} loading={studentYearDataIsLoading} />
            </Row>
            <Row>
              <Col span={8}
              ><Input addonBefore="Từ" defaultValue={getStudentYearDataFrom}
                onChange={e => { getStudentYearDataFrom = e.target.value }}
                onPressEnter={getStudentYearData} />
              </Col>
              <Col span={8}><Input addonBefore="Đến" defaultValue={getStudentYearDataTo}
                onChange={e => { getStudentYearDataTo = e.target.value }}
                onPressEnter={getStudentYearData} /></Col>
              <Col span={4}><Button type="primary" onClick={getStudentYearData}>Cập nhập</Button></Col>
            </Row>
          </Col>
          <Col span={12}>
            <h2>Tỷ lệ giới tính</h2>
            <Row>
              <Pie {...genderDataGraphConfig} loading={genderDataIsLoading} />
            </Row>

          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <h2>Điểm trung bình của sinh viên từng năm</h2>
            <Row>
              <Line {...gpaPerYearGraphConfig} loading={gpaPerYearIsLoading} />
            </Row>
            <Row>
              <Col span={8}><Input addonBefore="Từ" defaultValue={getStudentYearDataFrom}
                onChange={e => { getGpaPerYearDataFrom = e.target.value }}
                onPressEnter={getGpaPerYearData} /></Col>
              <Col span={8}><Input addonBefore="Đến" defaultValue={getStudentYearDataTo}
                onChange={e => { getGpaPerYearDataTo = e.target.value }}
                onPressEnter={getGpaPerYearData} /></Col>
              <Col span={4}><Button type="primary" onClick={getGpaPerYearData}>Cập nhập</Button></Col>
            </Row>
          </Col>
          <Col span={12}>
            <h2>Kết quả học tập toàn trường kì {gradeCountSemeter} năm {gradeCountYear}</h2>
            <Row>
              <Column {...gradeCountDataGraphConfig} loading={gradeCountIsLoading} />
            </Row>
            <Row>
              <Col span={8}
              ><Input addonBefore="Kì" defaultValue={gradeCountSemeter}
                onChange={e => { setGradeCountSemeter(e.target.value) }}
                onPressEnter={getgradeCountData} />
              </Col>
              <Col span={8}><Input addonBefore="Năm" defaultValue={gradeCountYear}
                onChange={e => { setGradeCountYear(e.target.value) }}
                onPressEnter={getgradeCountData} /></Col>
              <Col span={4}><Button type="primary" onClick={getgradeCountData}>Cập nhập</Button></Col>
            </Row>
          </Col>
        </Row>
      </div> :
        <Row gutter={10}>
          <Col span={6} flex="300px" style={{ textAlign: "center" }}>
            <Avatar size={120} src={"https://joeschmoe.io/api/v1/" + getCurrentUser().username + " - " + fullName} /><br />
            Bạn có thể:
            <Button
              type="primary"
              style={{
                display: "block",
                textAlign: "center",
                margin: "20px auto",
              }}
              disabled={!currentUserIsStudent()}
              onClick={() => history.push(paths.HO_SO_SINH_VIEN)}
            >
              Xem thông tin cá nhân
            </Button>
            hoặc
            <Button
              type="primary"
              style={{
                display: "block",
                textAlign: "center",
                margin: "20px auto",
              }}
              disabled={!currentUserIsStudent()}
              onClick={() => history.push(paths.KET_QUA_HOC_TAP)}
            >
              Xem kết quả học tập
            </Button>
          </Col>
          <Col span={6}>
            <h2>GPA của bạn: </h2>
            <Row>
              <Progress type="circle" percent={GPA * 100 / 4} format={percent => GPA + "/4"} width={150} />
            </Row>
          </Col>
          <Col span={12}>
            <h2>Kết quả học tập của bạn:</h2>
            <Row>
              <Column {...studentGradeDataGraphConfig} loading={studentGradeIsLoading} />
            </Row>
          </Col>

        </Row>}

    </div>

  );
};
