import { Button, Table, Row, Col, Input, Select, Menu, Dropdown, message } from "antd";
import { DeleteOutlined, EditOutlined, DownOutlined, ReloadOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { getAllAccount } from "../../api/accounts";
function useForceUpdate() {
  const [loaded, setLoaded] = useState(0);
  return () => setLoaded(loaded => loaded + 1); // update the state to force render
}
let accountData;
export default function AccountList() {

  const forceUpdate = useForceUpdate();
  useEffect(() => {
    getAllAccount()
      .then(res => {
        accountData = res.data;
        forceUpdate();
      })
  })


  const columns = [
    { title: "Tên người dùng", key: "username", dataIndex: "username" },
    { title: "Họ", key: "surName", dataIndex: "surName", },
    { title: "Tên", key: "firstName", dataIndex: "firstName", },
    { title: "Email", key: "email", dataIndex: "email" },    
    {
      title: "",
      key: "actions",
      dataIndex: "id",
      width: "0px",
      render: (id, record) => (
        <Row gutter={10} wrap={false}>
          <Col>
            <Button
              icon={<EditOutlined />}
              // onClick={() => configRef.current.openEdit(record)}
              type="primary"
            ></Button>
          </Col>
          <Col>
            <Button
              icon={<DeleteOutlined />}
              // onClick={() => deleteRef.current.open(record)}
              type="primary"
              danger
            ></Button>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <div className="">
      <Row align="middle">
        <h1 style={{ margin: "0 20px 0 0" }}>Danh sách tài khoản</h1>
        <Button type="primary" onClick={forceUpdate}>
          <ReloadOutlined />
        </Button>,
      </Row>
      <br />
{/*       <Row justify="space-between" gutter={10}>
        <Col flex="200px">
          <Select style={{ width: "100%" }}></Select>
        </Col>
        <Col flex="300px">
          <Input.Search />
        </Col>
      </Row>
      <br /> */}
      <Table columns={columns}
        dataSource={accountData}
      />
    </div>
  );
}
