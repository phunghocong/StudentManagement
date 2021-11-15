import { Breadcrumb,Layout,Menu,Typography,Row,Col, Card, } from "antd";
import { DesktopOutlined,PieChartOutlined,FileOutlined,TeamOutlined,UserOutlined } from "@ant-design/icons";
import "./dashboard.scss";


export default function Dashboard() {
  return (
    <>
      
      <div className="dashboard">
      <h1>Bảng điều khiển</h1>

     

      <h2>Thống kê</h2>

      <br />

      <Row gutter={{ sm: 50 }}>
        <Col span={4}>
          <div className="board">
            <h2>Sinh viên</h2>

            <div className="number">
             <span className="unit">người</span>
            </div>

            {/* <br />
            <p>
              Chó: {petList.filter((pet) => pet.type === "Chó").length} con /
              Mèo: {petList.filter((pet) => pet.type === "Mèo").length} con
            </p> */}
          </div>
        </Col>

        <Col span={4}>
          <div className="board">
            <h2>Sinh viên xuất sắc</h2>

            <div className="number">
              {/* 3 <span className="unit">triệu VND</span> */}
            
              <span className="unit">người</span>
            </div>

            {/* <br />
            <p>
              Top 1: Nguyen Van A <br /> (1 triệu VND)
            </p> */}
          </div>
        </Col>

        <Col span={4}>
          <div className="board">
            <h2>Sinh viên giỏi</h2>

            <div className="number">
              <span className="unit">người</span>
            </div>

            <br />
            <p>
              Top 1: Nguyen Van B <br /> (10 con)
            </p>
          </div>
        </Col>

        <Col span={4}>
          <div className="board">
            <h2>Sinh viên khá</h2>

            <div className="number">
              <span className="unit">người</span>
            </div>

            <br />
            <p>
              Top 1: Nguyen Van B <br /> (10 con)
            </p>
          </div>
        </Col>

        <Col span={4}>
          <div className="board">
            <h2>Sinh viên trung bình</h2>

            <div className="number">
              <span className="unit">người</span>
            </div>

            <br />
            <p>
              Top 1: Nguyen Van B <br /> (10 con)
            </p>
          </div>
        </Col>
        <Col span={4}>
          <div className="board">
            <h2>Sinh viên yếu/kém</h2>

            <div className="number">
              <span className="unit">người</span>
            </div>

            <br />
            <p>
              Top 1: Nguyen Van B <br /> (10 con)
            </p>
          </div>
        </Col>
      </Row>

      <br />

      

      <h2>Lịch học và làm việc </h2>

      <br />

 

      <br />
    </div>
    
    
    </>
  )
}
