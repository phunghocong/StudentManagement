import React from 'react';
import { Line, Column } from '@ant-design/charts';
import { Row, Col, Button, Form, Input } from "antd";
import { getAccount, getCurrentUser, currentUserIsAdmin, currentUserIsMod, currentUserIsCon, currentUserIsStudent } from '../../api/accounts';
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { graphStudentCountEachYear } from '../../api/students';
import { getStudentGPA } from '../../api/classRecord';
export default function Dashboard() {
  const allWidth = 500;

  useEffect(() => {
    getUser();
    getStudentYearData();

  }, []);
  const [fullName, setFullName] = useState("")

  const getUser = () => {
    getAccount(getCurrentUser().id)
      .then(res => {
        setFullName(res.data.surName + " " + res.data.firstName)
      });
  }
  /*  
      const config = {
        data,
        width: 400,
        height: 300,
        autoFit: false,
        xField: 'year',
        yField: 'value',
        point: {
          size: 5,
          shape: 'diamond',
        },
        label: {
          style: {
            fill: '#aaa',
          },
        },
      };  */

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
    height: 300,
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
  return (
    <div>
      <Row><h1>Xin chào {fullName}</h1></Row>
      <Row align="middle" >
        <Col span={12}>
          <h2>Số lượng sinh viên theo từng năm</h2>

          {/*           <button type="button" onClick={downloadImage} style={{ marginRight: 24 }}>
            Export Image
          </button> */}
          <Row>
            <Column {...studentYearDataGraphConfig} loading={studentYearDataIsLoading} />
          </Row>
          <Row>
            <Col span={8}><Input addonBefore="Từ" defaultValue={from} 
            onChange={e => { from = e.target.value }} 
            onPressEnter={getStudentYearData}/></Col>
            <Col span={8}><Input addonBefore="Đến" defaultValue={to} 
            onChange={e => { to = e.target.value }}
              onPressEnter={getStudentYearData} /></Col>
            <Col span={4}><Button type="primary" onClick={getStudentYearData}>Cập nhập</Button></Col>

          </Row>
        </Col>
      </Row>
    </div>
  );
};
