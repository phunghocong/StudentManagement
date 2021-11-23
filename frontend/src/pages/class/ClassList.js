import { Button, Table, Row, Col, Input, Select, Menu, Dropdown, message, List, Card } from "antd";
import { DeleteOutlined, EditOutlined, DownOutlined, SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { getAllClass } from "../../api/students";
function useForceUpdate() {
  const [loaded, setLoaded] = useState(0);
  return () => setLoaded(loaded => loaded + 1); // update the state to force render
}
let classList;
export default function ClassList() {
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    getAllClass()
      .then(res => {
        classList = res.data;
      }) 
  })
  

  return (
    <div className="">
      <Row align="middle">
        <h1 style={{ margin: "0 20px 0 0" }}>Các lớp học</h1>        
        <Button type="primary" onClick={forceUpdate}>
          <ReloadOutlined />
        </Button>
      </Row>
      <br />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={classList}
        renderItem={item => (
          <List.Item>
            <Card title={item}> 
            
            </Card>
          </List.Item>
        )}
      />,
    </div>
  );
}
