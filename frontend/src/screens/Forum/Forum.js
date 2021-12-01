import { Button, Col, Row, List, Avatar, Divider, Tag, Select } from "antd";
import { useRef, useState, useEffect } from "react";
import forum from "./forum.module.scss";
import NewDiscussion from "./NewDiscussion/NewDiscussion";
import { Link } from "react-router-dom";
import paths from "../../constants/paths";
import { getAllTopic, deleteTopic } from "../../api/forum";
import { DeleteOutlined, PushpinOutlined } from "@ant-design/icons"
import { currentUserIsStudent, getCurrentUser } from "../../api/accounts";
const sort = {
  ANY: "any",
  OLDEST: "oldest",
  LASTEST: "lastet",
  MOST_REPLIES: "most_replies"
};
const dateRange = {
  HOUR: "hour",
  DAY: "day",
  MONTH: "month",
  YEAR: "year"
}
export default function Forum() {
  const ref = useRef();

  const [data, setDataList] = useState([]);

  const getList = async () => {
    try {
      const res = await getAllTopic();
      setDataList(
        res.data.map((item) => ({
          ...item,
          key: item.id,
        }))
      );
    } catch (error) {
      console.log("get all topic error", error);
    }
  };
  const handleDeleteTopic = async id => {

    try {
      deleteTopic(id)
        .then(res => {
          if (res.status == 200)
            window.location.reload();
        })

    } catch (error) {
      console.log("delete topic error", error);
    }
  }
  const handlePinTopic = async id => {

    try {
      /* deleteTopic(id)
        .then(res => {
          if (res.status == 200)
            window.location.reload();
        }) */

    } catch (error) {
      console.log("pin topic error", error);
    }
  }
  useEffect(() => {
    getList();
  }, []);
  const onChangeSortType = () => {

  }
  return (
    <div className="container">
      <Row align="middle" gutter={20}>
        <Col>
          <h1>Diễn đàn trao đổi</h1>
        </Col>

        <Col>
          <Button type="primary" onClick={() => ref.current.open()}>
            Tạo mới
          </Button>
        </Col>
        <div >
          <Select
            onChange={onChangeSortType}
            defaultValue={sort.ANY}
            style={{ width: 200 }}
          >
            {Object.values(sort).map((val, index) => (
              <Select.Option key={index} value={val}>
                {val === sort.ANY ? "Tất cả"
                  : val === sort.LASTEST ? "Mới nhất"
                    : val === sort.OLDEST ? "Cũ nhất"
                      : "Nhiều bình luận nhất"}
              </Select.Option>
            ))}
          </Select>
          <Select
            onChange={onChangeSortType}
            defaultValue={dateRange.HOUR}
            style={{ width: 200 }}
          >
            {Object.values(dateRange).map((val, index) => (
              <Select.Option key={index} value={val}>
                {val === dateRange.HOUR ? "Trong 1 giờ"
                  : val === dateRange.DAY ? "Trong 1 ngày"
                    : val === dateRange.MONTH ? "Trong 1 tháng"
                      : "Trong 1 năm"}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Row>

      <br />

      <List
        itemLayout="vertical"
        dataSource={data}
        renderItem={(item) => (
          <List.Item className={forum["item"]} size="large">
            <List.Item.Meta
              avatar={<Avatar src={"https://joeschmoe.io/api/v1/" + item.poster}>{item.poster}</Avatar>}
              title={
                <Row justify="space-between" align="middle">
                  <Link to={paths.CHI_TIET_FORUM_nId + item.id}>
                    <h4>{item.title}</h4>
                  </Link>
{/*                   {(!currentUserIsStudent()) ?
                    <Button value={item.id} style={{ right: -200 }}
                      shape="circle" onClick={e => {
                        e.stopPropagation();
                        handlePinTopic(item.id);
                      }}><PushpinOutlined /></Button> : ""} */}
                  {(!currentUserIsStudent() || item.poster.includes(getCurrentUser().username)) ?
                    <Button value={item.id} danger style={{ right: 1 }}
                      shape="circle" onClick={e => {
                        e.stopPropagation();
                        handleDeleteTopic(item.id);
                      }}><DeleteOutlined /></Button> : ""}

                </Row>
              }
              description={<Row align="middle">@ {item.poster}</Row>}
            />
            <Divider style={{ margin: "10px 0" }} />
            {item.detail}
          </List.Item>
        )}
      />

      <NewDiscussion ref={ref} />
    </div>
  );
}


