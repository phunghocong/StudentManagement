import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import { getAllAccount } from "../../api/accounts";
import AccountDelete from "./AccountDelete";
import AccountConfig from "./AccountConfig";

export default function AccountList() {
  const columns = [
    {
      title: "Avatar",
      dataIndex: "imageUrl",
      width: "7%",
      render: (theImageURL) => (
        <img
          border-radius="50%"
          width="40px"
          alt={theImageURL}
          src={
            "https://icon-library.com/images/avatar-png-icon/avatar-png-icon-3.jpg"
          }
        />
      ),
    },
    { title: "Tên người dùng", key: "username", dataIndex: "username" },
    { title: "Họ", key: "surName", dataIndex: "surName" },
    { title: "Tên", key: "firstName", dataIndex: "firstName" },
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

  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getAllAccount()
      .then((res) => {
        setDataList(
          res.data.map((item, index) => ({
            ...item,
            key: index,
          }))
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("get account list error", error);
      });
  }, []);

  return (
    <div className="container">
      <Row align="middle" gutter={20}>
        <Col>
          <h1>Danh sách tài khoản</h1>
        </Col>

        <Col>
          <Button type="primary" onClick={() => configRef.current.openNew()}>
            Tạo mới
          </Button>
        </Col>
      </Row>

      <br />

      <Table columns={columns} dataSource={dataList} loading={isLoading} />

      <AccountDelete ref={deleteRef} />
      <AccountConfig ref={configRef} />
    </div>
  );
}
