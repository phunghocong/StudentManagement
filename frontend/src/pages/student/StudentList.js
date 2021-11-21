import { Button, Table, Row, Col, Input, Select } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRef } from "react";
import StudentConfig from "./StudentConfig";
import StudentDelete from "./StudentDelete";

export default function StudentList() {
  const configRef = useRef();
  const deleteRef = useRef();

  const onSearch = (value) => console.log(value);

  const columns = [
   /*  { title: "ID", key: "id", dataIndex: "id" }, */
    { title: "Mã số sinh viên", key: "studentID", dataIndex: "studentID" },
    { title: "Họ", key: "surName", dataIndex: "surName", },
    { title: "Tên", key: "firstName", dataIndex: "firstName", },

    { title: "Năm sinh", key: "birthday", dataIndex: "birthday" },
    { title: "Ngành học", key: "major", dataIndex: "major" },
    { title: "Lớp", key: "baseClass", dataIndex: "baseClass" },
    { title: "GPA", key: "", dataIndex: "" },

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

  return (
    <div className="">
      <Row align="middle">
        <h1 style={{ margin: "0 20px 0 0" }}>Danh sách sinh viên</h1>
        <Button type="primary" onClick={() => configRef.current.openNew()}>
          Tạo mới
        </Button>
      </Row>

      <br />

      <Row justify="space-between" gutter={10}>
        <Col flex="200px">
          <Select style={{ width: "100%" }}></Select>
        </Col>

        <Col flex="300px">
          <Input.Search />
        </Col>
      </Row>

      <br />

      <Table columns={columns} dataSource={dataSource} />

      <StudentConfig ref={configRef} />
      <StudentDelete ref={deleteRef} />
    </div>
  );
}

const dataSource = [ /*
  ...Array.apply(null, Array(10)).map((_, i) => ({
    id: i,
    key: i,
    name: "Nguyen Van A",
    age: "17/09/2000",
    mssv: "18021014",
    subject: "Khoa học máy tính",
    status: "Đang online",
  }
  
  )), */
  {
    "majorAchievement": [],
    "GPA": [],
    "conduct": [],
    "studentID": "20170039",
    "firstName": "An",
    "surName": "Quách Đoạn",
    "birthday": "2000-05-25",
    "national": "Việt Nam",
    "ethnic": "Tày",
    "religion": "Không có",
    "bornAddress": "3195 Dakota Lane",
    "citizenCardId": "7058509476",
    "currentAddress": "0 Waywood Crossing",
    "phoneNumber": "5074417419",
    "email": "mwheeler1@cnbc.com",
    "isEnlisted": true,
    "draftDate": "2016-08-02",
    "school": "UET",
    "academyMethod": "Chính quy",
    "levelOfAcademy": "Sinh viên",
    "schoolYearGroup": "K65",
    "baseClass": "QHI-1",
    "major": "Vật lý kỹ thuật",
    "startedYear": "2017",
    "createdAt": "2021-11-04T16:15:45.292Z",
    "updatedAt": "2021-11-04T16:15:45.292Z",
    "id": "618407318efa904c9889bacc"
  },
  {
    "majorAchievement": [],
    "GPA": [],
    "conduct": [],
    "studentID": "20210003",
    "firstName": "Bi",
    "surName": "Lạc Lèng",
    "birthday": "2005-01-09",
    "national": "Việt Nam",
    "ethnic": "Mông",
    "religion": "Không có",
    "bornAddress": "6844 Bultman Avenue",
    "citizenCardId": "5027363044",
    "currentAddress": "2 Merry Lane",
    "phoneNumber": "2732050316",
    "email": "adoleyv@smugmug.com",
    "isEnlisted": false,
    "draftDate": "",
    "school": "UET",
    "academyMethod": "Chính quy",
    "levelOfAcademy": "Sinh viên",
    "schoolYearGroup": "K51",
    "baseClass": "QHI-CLC2",
    "major": "Hệ thống thông tin",
    "startedYear": "2021",
    "createdAt": "2021-11-04T16:12:33.650Z",
    "updatedAt": "2021-11-04T16:12:33.650Z",
    "id": "618406718efa904c9889b882"
  },
  {
    "majorAchievement": [],
    "GPA": [],
    "conduct": [],
    "studentID": "20180051",
    "firstName": "Biên",
    "surName": "Anh Duy",
    "birthday": "2002-04-12",
    "national": "Việt Nam",
    "ethnic": "Kinh",
    "religion": "Hòa Hảo",
    "bornAddress": "761 Porter Crossing",
    "citizenCardId": "8498539854",
    "currentAddress": "2 Raven Trail",
    "phoneNumber": "7972341823",
    "email": "mduhamel1w@com.com",
    "isEnlisted": false,
    "draftDate": "",
    "school": "UET",
    "academyMethod": "Chính quy",
    "levelOfAcademy": "Sinh viên",
    "schoolYearGroup": "K76",
    "baseClass": "CA-CLC2",
    "major": "Kỹ thuật năng lượng",
    "startedYear": "2018",
    "createdAt": "2021-11-04T16:15:48.643Z",
    "updatedAt": "2021-11-04T16:15:48.643Z",
    "id": "618407348efa904c9889bb96"
  },
  {
    "majorAchievement": [],
    "GPA": [],
    "conduct": [],
    "studentID": "20210035",
    "firstName": "Biểu",
    "surName": "Đỗ Phùng",
    "birthday": "1995-03-15",
    "national": "Việt Nam",
    "ethnic": "Kinh",
    "religion": "Không có",
    "bornAddress": "70 Holy Cross Park",
    "citizenCardId": "3710626102",
    "currentAddress": "50980 Sage Center",
    "phoneNumber": "3054269944",
    "email": "thubballa@nymag.com",
    "isEnlisted": true,
    "draftDate": "2019-01-11",
    "school": "UET",
    "academyMethod": "Chính quy",
    "levelOfAcademy": "Sinh viên đã tốt nghiệp",
    "schoolYearGroup": "K50",
    "baseClass": "C-CLC3",
    "major": "Công nghệ kỹ thuật xây dựng",
    "startedYear": "2021",
    "createdAt": "2021-11-04T16:15:45.698Z",
    "updatedAt": "2021-11-04T16:15:45.698Z",
    "id": "618407318efa904c9889bae7"
  },
  {
    "majorAchievement": [],
    "GPA": [],
    "conduct": [],
    "studentID": "20200020",
    "firstName": "Bình",
    "surName": "Dương Thế",
    "birthday": "1993-02-13",
    "national": "Việt Nam",
    "ethnic": "Tày",
    "religion": "Không có",
    "bornAddress": "685 Karstens Terrace",
    "citizenCardId": "8995575131",
    "currentAddress": "5 Jay Point",
    "phoneNumber": "8163593187",
    "email": "rwooffitt1p@ucoz.ru",
    "isEnlisted": false,
    "draftDate": "",
    "school": "UET",
    "academyMethod": "Chính quy",
    "levelOfAcademy": "Sinh viên",
    "schoolYearGroup": "K61",
    "baseClass": "QH-1",
    "major": "Cơ kỹ thuật",
    "startedYear": "2020",
    "createdAt": "2021-11-04T16:12:58.736Z",
    "updatedAt": "2021-11-04T16:12:58.736Z",
    "id": "6184068a8efa904c9889b9be"
  },
  {
    "majorAchievement": [],
    "GPA": [],
    "conduct": [],
    "studentID": "20180013",
    "firstName": "Bích",
    "surName": "Kiểu Ông",
    "birthday": "1997-07-24",
    "national": "Việt Nam",
    "ethnic": "Kinh",
    "religion": "Không có",
    "bornAddress": "41749 8th Drive",
    "citizenCardId": "1817040774",
    "currentAddress": "584 Cherokee Avenue",
    "phoneNumber": "1344762854",
    "email": "lguest1q@wp.com",
    "isEnlisted": false,
    "draftDate": "",
    "school": "UET",
    "academyMethod": "Chính quy",
    "levelOfAcademy": "Sinh viên",
    "schoolYearGroup": "K46",
    "baseClass": "C-CLC1",
    "major": "Công nghệ thông tin",
    "startedYear": "2018",
    "createdAt": "2021-11-04T16:12:35.037Z",
    "updatedAt": "2021-11-04T16:12:35.037Z",
    "id": "618406738efa904c9889b8df"
  },
  {
    "majorAchievement": [],
    "GPA": [],
    "conduct": [],
    "studentID": "20200028",
    "firstName": "Bích",
    "surName": "Liên Phùng",
    "birthday": "2000-12-11",
    "national": "Việt Nam",
    "ethnic": "Kinh",
    "religion": "Hồi giáo",
    "bornAddress": "44 Ohio Street",
    "citizenCardId": "4660412881",
    "currentAddress": "0 Gale Road",
    "phoneNumber": "8336178002",
    "email": "chadleyd@guardian.co.uk",
    "isEnlisted": true,
    "draftDate": "2018-03-03",
    "school": "UET",
    "academyMethod": "Chính quy",
    "levelOfAcademy": "Sinh viên",
    "schoolYearGroup": "K51",
    "baseClass": "C-4",
    "major": "Công nghệ thông tin định hướng thị trường Nhật Bản",
    "startedYear": "2020",
    "createdAt": "2021-11-04T16:15:45.829Z",
    "updatedAt": "2021-11-04T16:15:45.829Z",
    "id": "618407318efa904c9889baf0"
  },
  {
    "majorAchievement": [],
    "GPA": [],
    "conduct": [],
    "studentID": "20200036",
    "firstName": "Bính",
    "surName": "Lã Nhâm",
    "birthday": "2004-02-17",
    "national": "Việt Nam",
    "ethnic": "Mông",
    "religion": "Không có",
    "bornAddress": "7 Eastwood Road",
    "citizenCardId": "1320910092",
    "currentAddress": "85 Stone Corner Circle",
    "phoneNumber": "6176865329",
    "email": "msimmig1e@squarespace.com",
    "isEnlisted": true,
    "draftDate": "2017-04-07",
    "school": "UET",
    "academyMethod": "Chính quy",
    "levelOfAcademy": "Sinh viên đã tốt nghiệp",
    "schoolYearGroup": "K65",
    "baseClass": "CA-CLC1",
    "major": "Công nghệ nông nghiệp",
    "startedYear": "2020",
    "createdAt": "2021-11-04T16:15:47.650Z",
    "updatedAt": "2021-11-04T16:15:47.650Z",
    "id": "618407338efa904c9889bb5f"
  },
  {
    "majorAchievement": [],
    "GPA": [],
    "conduct": [],
    "studentID": "20200042",
    "firstName": "Bông",
    "surName": "Thân Ong",
    "birthday": "1990-12-01",
    "national": "Việt Nam",
    "ethnic": "Thái",
    "religion": "Tin Lành",
    "bornAddress": "6 Hollow Ridge Court",
    "citizenCardId": "3073961038",
    "currentAddress": "14363 Oriole Lane",
    "phoneNumber": "6599218259",
    "email": "krizon1@acquirethisname.com",
    "isEnlisted": false,
    "draftDate": "",
    "school": "UET",
    "academyMethod": "Chính quy",
    "levelOfAcademy": "Sinh viên",
    "schoolYearGroup": "K57",
    "baseClass": "CA-CLC2",
    "major": "Công nghệ kỹ thuật xây dựng",
    "startedYear": "2020",
    "createdAt": "2021-11-06T10:33:44.142Z",
    "updatedAt": "2021-11-06T10:33:44.142Z",
    "id": "61865a080707573da4881c3f"
  }
];
