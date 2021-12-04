import React from 'react';
import { Line, Column, Pie, G2 } from '@ant-design/charts';
import { Row, Col, Button, Form, Input } from "antd";
import { getAccount, getCurrentUser, currentUserIsAdmin, currentUserIsMod, currentUserIsCon, currentUserIsStudent } from '../../api/accounts';
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { graphStudentCountEachYear, graphGenderCount } from '../../api/students';
import { getStudentGPA } from '../../api/classRecord';
export default function Dashboard() {
  const G = G2.getEngine('canvas');

  const allWidth = 500, allHeigh = 300;

  useEffect(() => {
    getUser();
    getStudentYearData();
    getGenderData();
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
  var from = 2000, to = 2030;
  const getStudentYearData = () => {
    setstudentYearDataIsLoading(true);
    graphStudentCountEachYear(from, to)
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
  const genderDatas = [{ "gender": "Khác", "count": 31 }, { "gender": "Nam", "count": 24 }, { "gender": "Nữ", "count": 18 }];
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
    height: allHeigh+100,
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
        console.log(genderData);
        setGenderDataIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div>
      <Row><h1>Xin chào {fullName}</h1></Row>
      <Row gutter={10}>
        <Col span={12}>
          <h2>Số lượng sinh viên theo từng năm</h2>
          <Row>
            <Column {...studentYearDataGraphConfig} loading={studentYearDataIsLoading} />
          </Row>
          <Row>
            <Col span={8}><Input addonBefore="Từ" defaultValue={from}
              onChange={e => { from = e.target.value }}
              onPressEnter={getStudentYearData} /></Col>
            <Col span={8}><Input addonBefore="Đến" defaultValue={to}
              onChange={e => { to = e.target.value }}
              onPressEnter={getStudentYearData} /></Col>
            <Col span={4}><Button type="primary" onClick={getStudentYearData}>Cập nhập</Button></Col>
          </Row>
        </Col>
        <Col span={12}>
          <h2>Tỷ lệ giới tính</h2>
          <Pie {...genderDataGraphConfig} loading={genderDataIsLoading} />
        </Col>
      </Row>
      <Row>


      </Row>
    </div>
  );
};
