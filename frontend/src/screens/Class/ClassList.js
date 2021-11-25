import { Card, List } from "antd";
import { useEffect, useState } from "react";
import { getAllClass } from "../../api/students";

export default function ClassList() {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    getAllClass().then((res) => {
      setDataList(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Danh sách lớp học</h1>

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
        dataSource={dataList}
        renderItem={(item) => (
          <List.Item>
            <Card title={item}></Card>
          </List.Item>
        )}
      />
    </div>
  );
}
