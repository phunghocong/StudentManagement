import { Button, Table, Row, Col, Input, Select } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRef } from "react";
import StudentConfig from "./StudentConfig";
import StudentDelete from "./StudentDelete";
import { findAllToStudentList } from "../../api/students";

export default function StudentList() {
  const configRef = useRef();
  const deleteRef = useRef();
  var studentData;
  const onSearch = (value) => console.log(value);
 // var x = findAllToStudentList().then(res=> {studentData = res.data;});
  
  const columns = [
   /*  { title: "ID", key: "id", dataIndex: "id" }, */
    { title: "Mã số sinh viên", key: "studentID", dataIndex: "studentID" },
    { title: "Họ", key: "surName", dataIndex: "surName", },
    { title: "Tên", key: "firstName", dataIndex: "firstName", },

    { title: "Năm sinh", key: "birthday", dataIndex: "birthday" },
    { title: "Ngành học", key: "major", dataIndex: "major" },
    { title: "Lớp", key: "baseClass", dataIndex: "baseClass" },
    { title: "GPA", key: "GPA", dataIndex: "GPA"},//Cần chuyển 2.330000000 -> 2.34
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

const dataSource = [
  {
    "studentID": "20200061",
    "firstName": "An",
    "surName": "Chung Luyện",
    "birthday": "1999-12-19",
    "baseClass": "CA-4",
    "major": "Hệ thống thông tin",
    "GPA": "2.3377777777777777"
  },
  {
    "studentID": "20180019",
    "firstName": "Biên",
    "surName": "Ngô Tinh",
    "birthday": "1996-11-11",
    "baseClass": "QH-CLC4",
    "major": "Vật lý kỹ thuật",
    "GPA": "2.4000000000000004"
  },
  {
    "studentID": "20190036",
    "firstName": "Biện",
    "surName": "Đăng Chung",
    "birthday": "2000-06-02",
    "baseClass": "QHI-3",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.206666666666667"
  },
  {
    "studentID": "20200044",
    "firstName": "Bá",
    "surName": "Bảo H’nia",
    "birthday": "2001-06-10",
    "baseClass": "QHI-3",
    "major": "Hệ thống thông tin",
    "GPA": "2.1244444444444444"
  },
  {
    "studentID": "20160027",
    "firstName": "Bái",
    "surName": "Lộ Thái",
    "birthday": "2000-03-24",
    "baseClass": "CA-CLC1",
    "major": "Kỹ thuật máy tính",
    "GPA": "2.417777777777778"
  },
  {
    "studentID": "20160009",
    "firstName": "Bích",
    "surName": "Mục Ân",
    "birthday": "2003-03-11",
    "baseClass": "C-CLC3",
    "major": "Công nghệ thông tin định hướng thị trường Nhật Bản",
    "GPA": "2.2239999999999998"
  },
  {
    "studentID": "20190017",
    "firstName": "Bôn",
    "surName": "Lý Triệu",
    "birthday": "1997-03-30",
    "baseClass": "QHI-CLC4",
    "major": "Khoa Học Máy Tính",
    "GPA": "1.8311111111111111"
  },
  {
    "studentID": "20190026",
    "firstName": "Bông",
    "surName": "Hoa Đương",
    "birthday": "1990-11-27",
    "baseClass": "CA-1",
    "major": "Công nghệ Hàng không vũ trụ",
    "GPA": "2.3111111111111113"
  },
  {
    "studentID": "20210015",
    "firstName": "Bưu",
    "surName": "Hùng Hoa",
    "birthday": "1998-12-01",
    "baseClass": "C-CLC2",
    "major": "Cơ kỹ thuật",
    "GPA": "2.204444444444445"
  },
  {
    "studentID": "20170005",
    "firstName": "Bạ",
    "surName": "Đức Lý",
    "birthday": "1993-02-20",
    "baseClass": "C-CLC3",
    "major": "Công nghệ nông nghiệp",
    "GPA": "1.9760000000000002"
  },
  {
    "studentID": "20180002",
    "firstName": "Bạ",
    "surName": "Lý Tiêu",
    "birthday": "2001-03-29",
    "baseClass": "QHI-1",
    "major": "Kỹ thuật năng lượng",
    "GPA": "2.312727272727273"
  },
  {
    "studentID": "20190002",
    "firstName": "Bạch",
    "surName": "Lương Bồ",
    "birthday": "1991-12-14",
    "baseClass": "C-CLC1",
    "major": "Kỹ thuật máy tính",
    "GPA": "2.3360000000000003"
  },
  {
    "studentID": "20210023",
    "firstName": "Bản",
    "surName": "Anh Đặng",
    "birthday": "1991-06-20",
    "baseClass": "CA-2",
    "major": "Công nghệ nông nghiệp",
    "GPA": "2.64"
  },
  {
    "studentID": "20200054",
    "firstName": "Bật",
    "surName": "Nông Đống",
    "birthday": "2002-04-27",
    "baseClass": "C-CLC2",
    "major": "Kỹ thuật điều khiển và tự động hóa",
    "GPA": "2.097777777777778"
  },
  {
    "studentID": "20200016",
    "firstName": "Bắc",
    "surName": "Cống Bồ",
    "birthday": "2000-09-27",
    "baseClass": "QHI-CLC4",
    "major": "Công nghệ thông tin định hướng thị trường Nhật Bản",
    "GPA": "2.097777777777778"
  },
  {
    "studentID": "20210022",
    "firstName": "Bốc",
    "surName": "Quang Giả",
    "birthday": "2004-04-21",
    "baseClass": "QHI-3",
    "major": "Hệ thống thông tin",
    "GPA": "2.16"
  },
  {
    "studentID": "20180013",
    "firstName": "Bốn",
    "surName": "Khúc Ông",
    "birthday": "1999-03-02",
    "baseClass": "QH-3",
    "major": "Kỹ thuật năng lượng",
    "GPA": "2.0533333333333332"
  },
  {
    "studentID": "20170050",
    "firstName": "Bội",
    "surName": "Tấn Bế",
    "birthday": "2003-09-14",
    "baseClass": "QH-4",
    "major": "Khoa Học Máy Tính",
    "GPA": "2.1244444444444444"
  },
  {
    "studentID": "20160025",
    "firstName": "Bột",
    "surName": "Tô Thẩm",
    "birthday": "1991-03-06",
    "baseClass": "QH-CLC2",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.106666666666667"
  },
  {
    "studentID": "20170038",
    "firstName": "Cai",
    "surName": "Lưu Lò",
    "birthday": "1995-01-16",
    "baseClass": "QH-CLC3",
    "major": "Hệ thống thông tin",
    "GPA": "2.177777777777778"
  },
  {
    "studentID": "20180025",
    "firstName": "Can",
    "surName": "Võ Hoa",
    "birthday": "2002-08-06",
    "baseClass": "C-1",
    "major": "Công nghệ thông tin định hướng thị trường Nhật Bản",
    "GPA": "1.9911111111111108"
  },
  {
    "studentID": "20200041",
    "firstName": "Can",
    "surName": "Quách Lỗ",
    "birthday": "1991-01-23",
    "baseClass": "QHI-3",
    "major": "Công nghệ kỹ thuật cơ điện tử",
    "GPA": "2.7822222222222224"
  },
  {
    "studentID": "20180041",
    "firstName": "Cao",
    "surName": "Thập Vi",
    "birthday": "2005-03-08",
    "baseClass": "QHI-1",
    "major": "Vật lý kỹ thuật",
    "GPA": "1.7955555555555556"
  },
  {
    "studentID": "20210033",
    "firstName": "Chanh",
    "surName": "Hán Đức",
    "birthday": "1996-10-17",
    "baseClass": "C-2",
    "major": "Công nghệ thông tin định hướng thị trường Nhật Bản",
    "GPA": "2.328888888888889"
  },
  {
    "studentID": "20200040",
    "firstName": "Chiêu",
    "surName": "Hồ Hi",
    "birthday": "2003-03-16",
    "baseClass": "QH-CLC1",
    "major": "Hệ thống thông tin",
    "GPA": "2.355555555555556"
  },
  {
    "studentID": "20180037",
    "firstName": "Chiếm",
    "surName": "Kim Lư",
    "birthday": "1994-12-24",
    "baseClass": "QHI-1",
    "major": "Công nghệ kỹ thuật cơ điện tử",
    "GPA": "2.3111111111111113"
  },
  {
    "studentID": "20170053",
    "firstName": "Chiếm",
    "surName": "Hình Cao",
    "birthday": "1996-01-12",
    "baseClass": "C-4",
    "major": "Công nghệ thông tin định hướng thị trường Nhật Bản",
    "GPA": "1.9555555555555557"
  },
  {
    "studentID": "20160014",
    "firstName": "Chu",
    "surName": "Ngân Cảnh",
    "birthday": "1993-12-07",
    "baseClass": "QH-CLC2",
    "major": "Kỹ thuật Robot",
    "GPA": "1.8577777777777778"
  },
  {
    "studentID": "20180014",
    "firstName": "Chung",
    "surName": "Thịnh Lê",
    "birthday": "2004-12-16",
    "baseClass": "QHI-1",
    "major": "Khoa Học Máy Tính",
    "GPA": "2.035555555555556"
  },
  {
    "studentID": "20150008",
    "firstName": "Châm",
    "surName": "Anh Tôn",
    "birthday": "1991-03-04",
    "baseClass": "QH-CLC2",
    "major": "Công nghệ thông tin",
    "GPA": "2.0533333333333332"
  },
  {
    "studentID": "20180048",
    "firstName": "Chú",
    "surName": "Giàng Thất",
    "birthday": "2003-05-23",
    "baseClass": "C-CLC3",
    "major": "Công nghệ nông nghiệp",
    "GPA": "2.773333333333334"
  },
  {
    "studentID": "20160044",
    "firstName": "Chăm",
    "surName": "Đoàn Mộc",
    "birthday": "2004-06-25",
    "baseClass": "QHI-1",
    "major": "Kỹ thuật Robot",
    "GPA": "2.06"
  },
  {
    "studentID": "20170012",
    "firstName": "Chấn",
    "surName": "Mạnh Đương",
    "birthday": "2002-02-11",
    "baseClass": "CA-CLC1",
    "major": "Công nghệ kỹ thuật cơ điện tử",
    "GPA": "2.3840000000000003"
  },
  {
    "studentID": "20210025",
    "firstName": "Chấp",
    "surName": "Cung Ngọ",
    "birthday": "1997-04-13",
    "baseClass": "QHI-1",
    "major": "Hệ thống thông tin",
    "GPA": "1.8311111111111111"
  },
  {
    "studentID": "20180040",
    "firstName": "Chấp",
    "surName": "Lâm Đàm",
    "birthday": "1996-08-13",
    "baseClass": "CA-2",
    "major": "Cơ kỹ thuật",
    "GPA": "2.328888888888889"
  },
  {
    "studentID": "20180006",
    "firstName": "Chẩn",
    "surName": "Lăng Lư",
    "birthday": "1994-03-02",
    "baseClass": "QH-CLC1",
    "major": "Công nghệ nông nghiệp",
    "GPA": "1.9120000000000001"
  },
  {
    "studentID": "20200011",
    "firstName": "Chỉ",
    "surName": "Nghị Ngô",
    "birthday": "1994-07-12",
    "baseClass": "C-2",
    "major": "Kỹ thuật Robot",
    "GPA": "2.3680000000000003"
  },
  {
    "studentID": "20170032",
    "firstName": "Chỉ",
    "surName": "Thiều Chiêm",
    "birthday": "1998-11-06",
    "baseClass": "QHI-CLC3",
    "major": "Công nghệ nông nghiệp",
    "GPA": "2.355555555555556"
  },
  {
    "studentID": "20200003",
    "firstName": "Chỉnh",
    "surName": "Chu/Châu Dư",
    "birthday": "1992-09-29",
    "baseClass": "CA-CLC1",
    "major": "Vật lý kỹ thuật",
    "GPA": "2.072"
  },
  {
    "studentID": "20200033",
    "firstName": "Chử",
    "surName": "Thẩm Bảo",
    "birthday": "1999-06-24",
    "baseClass": "CA-1",
    "major": "Công nghệ nông nghiệp",
    "GPA": "2"
  },
  {
    "studentID": "20180028",
    "firstName": "Câu",
    "surName": "Nhâm Đan",
    "birthday": "2005-10-08",
    "baseClass": "C-CLC4",
    "major": "Công nghệ kỹ thuật cơ điện tử",
    "GPA": "2.2311111111111113"
  },
  {
    "studentID": "20170054",
    "firstName": "Côn",
    "surName": "Âu Võ",
    "birthday": "1994-01-19",
    "baseClass": "CA-4",
    "major": "Kỹ thuật năng lượng",
    "GPA": "2.1244444444444444"
  },
  {
    "studentID": "20210006",
    "firstName": "Công",
    "surName": "Cai Đỗ",
    "birthday": "1991-04-25",
    "baseClass": "C-CLC1",
    "major": "Công nghệ thông tin",
    "GPA": "1.9288888888888893"
  },
  {
    "studentID": "20180016",
    "firstName": "Công",
    "surName": "Ngũ Khu",
    "birthday": "1992-12-27",
    "baseClass": "QHI-CLC2",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.5244444444444443"
  },
  {
    "studentID": "20200010",
    "firstName": "Cơ",
    "surName": "Vương Dương",
    "birthday": "2000-09-28",
    "baseClass": "CA-CLC1",
    "major": "Cơ kỹ thuật",
    "GPA": "2.3280000000000003"
  },
  {
    "studentID": "20190033",
    "firstName": "Cường",
    "surName": "Mạc Sử",
    "birthday": "1994-11-10",
    "baseClass": "CA-CLC2",
    "major": "Cơ kỹ thuật",
    "GPA": "2.4355555555555557"
  },
  {
    "studentID": "20160015",
    "firstName": "Cảnh",
    "surName": "Nhan Chung",
    "birthday": "1999-09-10",
    "baseClass": "QH-CLC3",
    "major": "Điện Tử Viễn Thông",
    "GPA": "2.355555555555556"
  },
  {
    "studentID": "20170009",
    "firstName": "Cẩm",
    "surName": "Sái Cam",
    "birthday": "1991-08-25",
    "baseClass": "QHI-CLC4",
    "major": "Công nghệ kỹ thuật cơ điện tử",
    "GPA": "2.184"
  },
  {
    "studentID": "20160029",
    "firstName": "Cận",
    "surName": "Thiều Ma",
    "birthday": "2000-01-03",
    "baseClass": "C-4",
    "major": "Điện Tử Viễn Thông",
    "GPA": "2.302222222222222"
  },
  {
    "studentID": "20190008",
    "firstName": "Cống",
    "surName": "Cồ Đổng",
    "birthday": "1998-12-30",
    "baseClass": "QHI-CLC1",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.2880000000000003"
  },
  {
    "studentID": "20210002",
    "firstName": "Củng",
    "surName": "Vương Tiêu",
    "birthday": "2004-05-16",
    "baseClass": "CA-CLC2",
    "major": "Công nghệ Hàng không vũ trụ",
    "GPA": ""
  },
  {
    "studentID": "20190036",
    "firstName": "Cử",
    "surName": "Xa Bạc",
    "birthday": "2001-08-06",
    "baseClass": "C-3",
    "major": "Công nghệ kỹ thuật cơ điện tử",
    "GPA": ""
  },
  {
    "studentID": "20180003",
    "firstName": "Cửu",
    "surName": "Mang Tống",
    "birthday": "1999-09-14",
    "baseClass": "QHI-CLC3",
    "major": "Công nghệ nông nghiệp",
    "GPA": "2.113684210526316"
  },
  {
    "studentID": "20160012",
    "firstName": "Danh",
    "surName": "Cai Lộ",
    "birthday": "1991-06-29",
    "baseClass": "QHI-1",
    "major": "Công nghệ thông tin",
    "GPA": "2.204444444444445"
  },
  {
    "studentID": "20190021",
    "firstName": "Di",
    "surName": "Chúng H’nia",
    "birthday": "1991-03-11",
    "baseClass": "C-2",
    "major": "Kỹ thuật điều khiển và tự động hóa",
    "GPA": "1.7599999999999998"
  },
  {
    "studentID": "20170033",
    "firstName": "Diệm",
    "surName": "Nhữ Cao",
    "birthday": "1999-07-26",
    "baseClass": "QH-2",
    "major": "Điện Tử Viễn Thông",
    "GPA": "1.9466666666666665"
  },
  {
    "studentID": "20160017",
    "firstName": "Diệp",
    "surName": "Lò Hồng",
    "birthday": "1998-12-12",
    "baseClass": "C-3",
    "major": "Cơ kỹ thuật",
    "GPA": "2.302222222222222"
  },
  {
    "studentID": "20190032",
    "firstName": "Diệu",
    "surName": "Lý Tống",
    "birthday": "1993-05-25",
    "baseClass": "QHI-2",
    "major": "Công nghệ nông nghiệp",
    "GPA": "2.097777777777778"
  },
  {
    "studentID": "20210024",
    "firstName": "Duyên",
    "surName": "Thành Ngũ",
    "birthday": "1991-06-26",
    "baseClass": "C-CLC3",
    "major": "Kỹ thuật Robot",
    "GPA": "2.177777777777778"
  },
  {
    "studentID": "20190015",
    "firstName": "Duyệt",
    "surName": "Trịnh Lãnh",
    "birthday": "1995-08-04",
    "baseClass": "QHI-2",
    "major": "Công nghệ kỹ thuật cơ điện tử",
    "GPA": "2.0133333333333336"
  },
  {
    "studentID": "20170045",
    "firstName": "Duyệt",
    "surName": "Hồng Bạch",
    "birthday": "2002-10-20",
    "baseClass": "QHI-CLC1",
    "major": "Mạng máy tính và truyền thông dữ liệu",
    "GPA": "2.08"
  },
  {
    "studentID": "20190031",
    "firstName": "Duật",
    "surName": "Bành Đăng",
    "birthday": "2005-03-22",
    "baseClass": "QH-2",
    "major": "Công nghệ nông nghiệp",
    "GPA": "2.2311111111111113"
  },
  {
    "studentID": "20170042",
    "firstName": "Duệ",
    "surName": "Triệu Ứng",
    "birthday": "1998-05-21",
    "baseClass": "C-CLC4",
    "major": "Khoa Học Máy Tính",
    "GPA": "1.9644444444444449"
  },
  {
    "studentID": "20200047",
    "firstName": "Dân",
    "surName": "Đậu Đương",
    "birthday": "2003-09-01",
    "baseClass": "QH-2",
    "major": "Kỹ thuật máy tính",
    "GPA": "2.2933333333333334"
  },
  {
    "studentID": "20210026",
    "firstName": "Dũng",
    "surName": "Bàn Đầu",
    "birthday": "1998-11-09",
    "baseClass": "QH-CLC2",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.2222222222222223"
  },
  {
    "studentID": "20160003",
    "firstName": "Dẫn",
    "surName": "Ung H’",
    "birthday": "1999-03-28",
    "baseClass": "QH-3",
    "major": "Công nghệ kỹ thuật cơ điện tử",
    "GPA": "2.3120000000000003"
  },
  {
    "studentID": "20210044",
    "firstName": "Dẫn",
    "surName": "Phi Lưu",
    "birthday": "2004-04-08",
    "baseClass": "QHI-CLC4",
    "major": "Hệ thống thông tin",
    "GPA": "1.7511111111111115"
  },
  {
    "studentID": "20180007",
    "firstName": "Dật",
    "surName": "Cù Kiểu",
    "birthday": "1999-05-05",
    "baseClass": "QHI-1",
    "major": "Mạng máy tính và truyền thông dữ liệu",
    "GPA": "1.9200000000000004"
  },
  {
    "studentID": "20160007",
    "firstName": "Dật",
    "surName": "Xung Ấu",
    "birthday": "1992-11-05",
    "baseClass": "QHI-CLC3",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.152"
  },
  {
    "studentID": "20200026",
    "firstName": "Dị",
    "surName": "Nhâm Hề",
    "birthday": "1997-02-10",
    "baseClass": "C-CLC4",
    "major": "Công nghệ thông tin",
    "GPA": "2.355555555555556"
  },
  {
    "studentID": "20180024",
    "firstName": "Dục",
    "surName": "Ứng Phù",
    "birthday": "1996-04-07",
    "baseClass": "QH-CLC1",
    "major": "Mạng máy tính và truyền thông dữ liệu",
    "GPA": "1.9288888888888893"
  },
  {
    "studentID": "20190000",
    "firstName": "Dự",
    "surName": "Hàn Đường",
    "birthday": "2005-10-03",
    "baseClass": "C-4",
    "major": "Hệ thống thông tin",
    "GPA": "1.9120000000000001"
  },
  {
    "studentID": "20210002",
    "firstName": "Giá",
    "surName": "Uông Lèng",
    "birthday": "1995-07-31",
    "baseClass": "QH-2",
    "major": "Kỹ thuật năng lượng",
    "GPA": "2.16"
  },
  {
    "studentID": "20160020",
    "firstName": "Giám",
    "surName": "Vũ Giao",
    "birthday": "1993-12-23",
    "baseClass": "QH-1",
    "major": "Kỹ thuật máy tính",
    "GPA": "2.3111111111111113"
  },
  {
    "studentID": "20190004",
    "firstName": "Giũ",
    "surName": "Khiếu Hàn",
    "birthday": "1996-02-15",
    "baseClass": "CA-CLC3",
    "major": "Mạng máy tính và truyền thông dữ liệu",
    "GPA": "2.248"
  },
  {
    "studentID": "20160036",
    "firstName": "Giũ",
    "surName": "Khúc Hoàng",
    "birthday": "1993-11-04",
    "baseClass": "CA-4",
    "major": "Công nghệ thông tin",
    "GPA": "1.982222222222222"
  },
  {
    "studentID": "20170001",
    "firstName": "Giả",
    "surName": "Hạ Lăng",
    "birthday": "2005-10-03",
    "baseClass": "CA-CLC2",
    "major": "Kỹ thuật Robot",
    "GPA": "2.2622222222222224"
  },
  {
    "studentID": "20170030",
    "firstName": "Giả",
    "surName": "Đồng Lã",
    "birthday": "2001-03-14",
    "baseClass": "QHI-3",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.3111111111111113"
  },
  {
    "studentID": "20150000",
    "firstName": "Hai",
    "surName": "Hà Hứa",
    "birthday": "1992-04-08",
    "baseClass": "CA-CLC1",
    "major": "Công nghệ Hàng không vũ trụ",
    "GPA": "2.1760000000000006"
  },
  {
    "studentID": "20170010",
    "firstName": "Hanh",
    "surName": "Hi Tông",
    "birthday": "1996-09-17",
    "baseClass": "CA-CLC4",
    "major": "Kỹ thuật Robot",
    "GPA": "2.16"
  },
  {
    "studentID": "20150006",
    "firstName": "Hiếu",
    "surName": "Ty Mầu/Màu",
    "birthday": "1998-09-18",
    "baseClass": "QHI-CLC2",
    "major": "Khoa Học Máy Tính",
    "GPA": "1.8400000000000003"
  },
  {
    "studentID": "20180020",
    "firstName": "Hoa",
    "surName": "Nghiêm Đức",
    "birthday": "1992-09-27",
    "baseClass": "CA-CLC3",
    "major": "Công nghệ nông nghiệp",
    "GPA": "2.1244444444444444"
  },
  {
    "studentID": "20160042",
    "firstName": "Hoà",
    "surName": "La Hi",
    "birthday": "1999-08-02",
    "baseClass": "QH-4",
    "major": "Công nghệ Hàng không vũ trụ",
    "GPA": "2.8800000000000003"
  },
  {
    "studentID": "20180033",
    "firstName": "Hoàn",
    "surName": "Ưng Cồ",
    "birthday": "1991-03-09",
    "baseClass": "QH-CLC2",
    "major": "Vật lý kỹ thuật",
    "GPA": "2.1688888888888886"
  },
  {
    "studentID": "20200058",
    "firstName": "Hoá",
    "surName": "Tào Khà",
    "birthday": "1991-07-27",
    "baseClass": "C-3",
    "major": "Công nghệ nông nghiệp",
    "GPA": "2.4355555555555557"
  },
  {
    "studentID": "20210030",
    "firstName": "Huyên",
    "surName": "Nguyễn Hán",
    "birthday": "2001-10-17",
    "baseClass": "QH-CLC1",
    "major": "Khoa Học Máy Tính",
    "GPA": "2.08"
  },
  {
    "studentID": "20170059",
    "firstName": "Huyên",
    "surName": "Phù Vưu",
    "birthday": "1992-01-01",
    "baseClass": "C-CLC2",
    "major": "Kỹ thuật năng lượng",
    "GPA": "2.5200000000000005"
  },
  {
    "studentID": "20160039",
    "firstName": "Huấn",
    "surName": "Giả Đới",
    "birthday": "1999-02-04",
    "baseClass": "CA-2",
    "major": "Công nghệ thông tin",
    "GPA": "1.552"
  },
  {
    "studentID": "20180011",
    "firstName": "Huệ",
    "surName": "Phí Cáp",
    "birthday": "2004-07-15",
    "baseClass": "QHI-3",
    "major": "Công nghệ Hàng không vũ trụ",
    "GPA": "1.8240000000000003"
  },
  {
    "studentID": "20180046",
    "firstName": "Hy",
    "surName": "Ngọc Mang",
    "birthday": "1999-06-13",
    "baseClass": "CA-CLC4",
    "major": "Kỹ thuật Robot",
    "GPA": "2.1422222222222222"
  },
  {
    "studentID": "20180000",
    "firstName": "Hài",
    "surName": "Chung Đái",
    "birthday": "1997-01-22",
    "baseClass": "QH-CLC2",
    "major": "Công nghệ thông tin",
    "GPA": "2.192"
  },
  {
    "studentID": "20170018",
    "firstName": "Hân",
    "surName": "Ánh Đái",
    "birthday": "1995-05-17",
    "baseClass": "CA-4",
    "major": "Công nghệ Hàng không vũ trụ",
    "GPA": "2.2577777777777777"
  },
  {
    "studentID": "20180031",
    "firstName": "Hùng",
    "surName": "Trác Đầu",
    "birthday": "2002-09-26",
    "baseClass": "C-3",
    "major": "Công nghệ kỹ thuật cơ điện tử",
    "GPA": "2.2933333333333334"
  },
  {
    "studentID": "20210031",
    "firstName": "Hướng",
    "surName": "Ấu Bùi",
    "birthday": "1991-10-06",
    "baseClass": "QH-4",
    "major": "Công nghệ thông tin",
    "GPA": "2"
  },
  {
    "studentID": "20200043",
    "firstName": "Hạc",
    "surName": "Ứng Trác",
    "birthday": "1996-07-05",
    "baseClass": "QH-CLC1",
    "major": "Kỹ thuật điều khiển và tự động hóa",
    "GPA": "2.3111111111111113"
  },
  {
    "studentID": "20170024",
    "firstName": "Hạng",
    "surName": "Đống Khiếu",
    "birthday": "2005-02-21",
    "baseClass": "CA-CLC2",
    "major": "Kỹ thuật Robot",
    "GPA": "2.728888888888889"
  },
  {
    "studentID": "20170049",
    "firstName": "Hạng",
    "surName": "Mùa Doãn",
    "birthday": "1996-05-05",
    "baseClass": "CA-4",
    "major": "Công nghệ thông tin",
    "GPA": "2.462222222222222"
  },
  {
    "studentID": "20160000",
    "firstName": "Hạo",
    "surName": "Kim Đồ",
    "birthday": "1999-09-04",
    "baseClass": "QH-2",
    "major": "Công nghệ thông tin",
    "GPA": "2.4168421052631586"
  },
  {
    "studentID": "20170017",
    "firstName": "Hạp",
    "surName": "Chung Diêm",
    "birthday": "1999-05-06",
    "baseClass": "QHI-1",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.648888888888889"
  },
  {
    "studentID": "20210038",
    "firstName": "Học",
    "surName": "Sùng Kiểu",
    "birthday": "1993-11-11",
    "baseClass": "QHI-CLC3",
    "major": "Kỹ thuật máy tính",
    "GPA": "2.3200000000000003"
  },
  {
    "studentID": "20170022",
    "firstName": "Hối",
    "surName": "Hán Danh",
    "birthday": "2003-01-11",
    "baseClass": "QH-4",
    "major": "Kỹ thuật máy tính",
    "GPA": "2.4444444444444446"
  },
  {
    "studentID": "20200002",
    "firstName": "Hồ",
    "surName": "Quàng Danh",
    "birthday": "2003-03-05",
    "baseClass": "QH-4",
    "major": "Kỹ thuật Robot",
    "GPA": "2.072"
  },
  {
    "studentID": "20160022",
    "firstName": "Hộ",
    "surName": "Ma Trang",
    "birthday": "1996-12-30",
    "baseClass": "CA-CLC3",
    "major": "Công nghệ thông tin",
    "GPA": "2.1333333333333337"
  },
  {
    "studentID": "20160037",
    "firstName": "Hộ",
    "surName": "Kiểu Đổng",
    "birthday": "2004-10-13",
    "baseClass": "CA-3",
    "major": "Vật lý kỹ thuật",
    "GPA": "1.6615384615384616"
  },
  {
    "studentID": "20170026",
    "firstName": "Khanh",
    "surName": "Tòng Điều",
    "birthday": "1995-01-29",
    "baseClass": "QH-CLC3",
    "major": "Điện Tử Viễn Thông",
    "GPA": "1.8311111111111111"
  },
  {
    "studentID": "20190003",
    "firstName": "Khoa",
    "surName": "Ty Dương",
    "birthday": "1996-02-08",
    "baseClass": "QH-2",
    "major": "Kỹ thuật năng lượng",
    "GPA": "1.848"
  },
  {
    "studentID": "20180045",
    "firstName": "Khoa",
    "surName": "Tinh Thất",
    "birthday": "2004-12-24",
    "baseClass": "CA-CLC1",
    "major": "Mạng máy tính và truyền thông dữ liệu",
    "GPA": "2.2133333333333334"
  },
  {
    "studentID": "20190015",
    "firstName": "Khoá",
    "surName": "Ca Lục",
    "birthday": "1994-05-29",
    "baseClass": "C-4",
    "major": "Điện Tử Viễn Thông",
    "GPA": ""
  },
  {
    "studentID": "20200065",
    "firstName": "Khoá",
    "surName": "Đồng Tán",
    "birthday": "1994-11-09",
    "baseClass": "QH-4",
    "major": "Kỹ thuật điều khiển và tự động hóa",
    "GPA": "2.42"
  },
  {
    "studentID": "20170000",
    "firstName": "Khoái",
    "surName": "Ngọc Ninh",
    "birthday": "1999-09-08",
    "baseClass": "C-3",
    "major": "Kỹ thuật Robot",
    "GPA": "1.9781818181818187"
  },
  {
    "studentID": "20210019",
    "firstName": "Khoái",
    "surName": "Trương Đăng",
    "birthday": "2004-08-16",
    "baseClass": "QHI-CLC3",
    "major": "Mạng máy tính và truyền thông dữ liệu",
    "GPA": "2.08"
  },
  {
    "studentID": "20200022",
    "firstName": "Khá",
    "surName": "Lã Bạc",
    "birthday": "1993-06-22",
    "baseClass": "QH-3",
    "major": "Khoa Học Máy Tính",
    "GPA": "2.337777777777778"
  },
  {
    "studentID": "20170027",
    "firstName": "Khá",
    "surName": "Duy Quản",
    "birthday": "1999-03-16",
    "baseClass": "QH-CLC4",
    "major": "Công nghệ Hàng không vũ trụ",
    "GPA": "2.306666666666667"
  },
  {
    "studentID": "20210041",
    "firstName": "Khá",
    "surName": "Ngọ Khiếu",
    "birthday": "1997-07-26",
    "baseClass": "CA-3",
    "major": "Kỹ thuật năng lượng",
    "GPA": "2.16"
  },
  {
    "studentID": "20200036",
    "firstName": "Kháng",
    "surName": "Thất Lý",
    "birthday": "1995-08-07",
    "baseClass": "QH-3",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.1244444444444444"
  },
  {
    "studentID": "20170044",
    "firstName": "Khôi",
    "surName": "Bùi Thoa",
    "birthday": "1998-04-04",
    "baseClass": "CA-2",
    "major": "Kỹ thuật máy tính",
    "GPA": "2.0444444444444447"
  },
  {
    "studentID": "20210005",
    "firstName": "Khôn",
    "surName": "Tuấn Phương",
    "birthday": "1999-11-08",
    "baseClass": "QHI-CLC2",
    "major": "Mạng máy tính và truyền thông dữ liệu",
    "GPA": "2.7073684210526316"
  },
  {
    "studentID": "20200000",
    "firstName": "Khúc",
    "surName": "Trịnh Bạch",
    "birthday": "1996-03-02",
    "baseClass": "C-CLC2",
    "major": "Cơ kỹ thuật",
    "GPA": "1.9440000000000002"
  },
  {
    "studentID": "20160006",
    "firstName": "Khúc",
    "surName": "Nông Cao",
    "birthday": "1993-05-21",
    "baseClass": "CA-2",
    "major": "Cơ kỹ thuật",
    "GPA": "1.9040000000000004"
  },
  {
    "studentID": "20180052",
    "firstName": "Khảng",
    "surName": "Kha Cống",
    "birthday": "1997-07-03",
    "baseClass": "QHI-CLC1",
    "major": "Công nghệ Hàng không vũ trụ",
    "GPA": "2.6"
  },
  {
    "studentID": "20210028",
    "firstName": "Kiên",
    "surName": "Danh Chử",
    "birthday": "1996-10-03",
    "baseClass": "CA-4",
    "major": "Khoa Học Máy Tính",
    "GPA": "2.3822222222222225"
  },
  {
    "studentID": "20190010",
    "firstName": "Kiều",
    "surName": "Lý Thang",
    "birthday": "1997-06-28",
    "baseClass": "C-2",
    "major": "Công nghệ thông tin định hướng thị trường Nhật Bản",
    "GPA": "1.6880000000000002"
  },
  {
    "studentID": "20200023",
    "firstName": "Kỷ",
    "surName": "Hạ Liễu",
    "birthday": "2002-01-25",
    "baseClass": "C-CLC2",
    "major": "Hệ thống thông tin",
    "GPA": "1.8666666666666667"
  },
  {
    "studentID": "20210039",
    "firstName": "Lai",
    "surName": "Diêm Đinh",
    "birthday": "2004-01-05",
    "baseClass": "QH-CLC1",
    "major": "Khoa Học Máy Tính",
    "GPA": "2.186666666666667"
  },
  {
    "studentID": "20170006",
    "firstName": "Lam",
    "surName": "Ca Dương",
    "birthday": "1998-01-29",
    "baseClass": "QHI-CLC3",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.208"
  },
  {
    "studentID": "20170038",
    "firstName": "Lam",
    "surName": "An Thất",
    "birthday": "2001-06-21",
    "baseClass": "CA-4",
    "major": "Kỹ thuật máy tính",
    "GPA": ""
  },
  {
    "studentID": "20160013",
    "firstName": "Lan",
    "surName": "An Dư",
    "birthday": "2000-03-21",
    "baseClass": "QHI-CLC4",
    "major": "Kỹ thuật Robot",
    "GPA": "2.2577777777777777"
  },
  {
    "studentID": "20180039",
    "firstName": "Lanh",
    "surName": "Quang Nhan",
    "birthday": "1999-04-12",
    "baseClass": "QH-1",
    "major": "Cơ kỹ thuật",
    "GPA": "2.1333333333333337"
  },
  {
    "studentID": "20210008",
    "firstName": "Liễn",
    "surName": "Khâu Linh",
    "birthday": "1998-04-10",
    "baseClass": "CA-CLC1",
    "major": "Công nghệ Hàng không vũ trụ",
    "GPA": "2.3120000000000003"
  },
  {
    "studentID": "20200039",
    "firstName": "Loan",
    "surName": "Cát Lăng",
    "birthday": "1997-11-24",
    "baseClass": "C-2",
    "major": "Công nghệ Hàng không vũ trụ",
    "GPA": ""
  },
  {
    "studentID": "20200029",
    "firstName": "Long",
    "surName": "Mạch Chiêm",
    "birthday": "1994-05-19",
    "baseClass": "QHI-2",
    "major": "Cơ kỹ thuật",
    "GPA": "2.008888888888889"
  },
  {
    "studentID": "20160004",
    "firstName": "Luân",
    "surName": "Trưng Khúc",
    "birthday": "1998-11-13",
    "baseClass": "QHI-CLC2",
    "major": "Kỹ thuật máy tính",
    "GPA": "1.8560000000000003"
  },
  {
    "studentID": "20180017",
    "firstName": "Luật",
    "surName": "La Đỗ",
    "birthday": "1991-08-20",
    "baseClass": "QH-CLC2",
    "major": "Vật lý kỹ thuật",
    "GPA": "2.355555555555556"
  },
  {
    "studentID": "20200015",
    "firstName": "Lành",
    "surName": "Giáp Bế",
    "birthday": "1994-07-27",
    "baseClass": "C-4",
    "major": "Hệ thống thông tin",
    "GPA": ""
  },
  {
    "studentID": "20170058",
    "firstName": "Lành",
    "surName": "Mục Nghiêm",
    "birthday": "1991-05-31",
    "baseClass": "QH-2",
    "major": "Kỹ thuật điều khiển và tự động hóa",
    "GPA": "1.8"
  },
  {
    "studentID": "20190012",
    "firstName": "Lâu",
    "surName": "Tôn Sùng",
    "birthday": "1990-11-03",
    "baseClass": "C-CLC2",
    "major": "Vật lý kỹ thuật",
    "GPA": ""
  },
  {
    "studentID": "20190022",
    "firstName": "Lâu",
    "surName": "Thang Cái",
    "birthday": "1995-02-22",
    "baseClass": "QHI-3",
    "major": "Cơ kỹ thuật",
    "GPA": "2.0533333333333332"
  },
  {
    "studentID": "20160002",
    "firstName": "Lãm",
    "surName": "Ưng Doãn",
    "birthday": "2004-05-28",
    "baseClass": "QH-CLC4",
    "major": "Công nghệ thông tin",
    "GPA": "2.2960000000000003"
  },
  {
    "studentID": "20170011",
    "firstName": "Lô",
    "surName": "Bàng Lương",
    "birthday": "1996-02-17",
    "baseClass": "QH-2",
    "major": "Cơ kỹ thuật",
    "GPA": "2.064"
  },
  {
    "studentID": "20200027",
    "firstName": "Lương",
    "surName": "Ong Cao",
    "birthday": "1998-10-28",
    "baseClass": "CA-CLC4",
    "major": "Kỹ thuật năng lượng",
    "GPA": "1.982222222222222"
  },
  {
    "studentID": "20160037",
    "firstName": "Lạc",
    "surName": "Thành Ngạc",
    "birthday": "1997-01-03",
    "baseClass": "QH-CLC1",
    "major": "Điện Tử Viễn Thông",
    "GPA": ""
  },
  {
    "studentID": "20170052",
    "firstName": "Lập",
    "surName": "Lyly Thất",
    "birthday": "1992-03-13",
    "baseClass": "C-CLC3",
    "major": "Hệ thống thông tin",
    "GPA": "1.9200000000000002"
  },
  {
    "studentID": "20200018",
    "firstName": "Lễ",
    "surName": "Tăng Ngân",
    "birthday": "2005-08-30",
    "baseClass": "CA-CLC1",
    "major": "Kỹ thuật điều khiển và tự động hóa",
    "GPA": "2.391111111111111"
  },
  {
    "studentID": "20160034",
    "firstName": "Lễ",
    "surName": "Cổ Đinh",
    "birthday": "1993-02-06",
    "baseClass": "QH-CLC1",
    "major": "Khoa Học Máy Tính",
    "GPA": "2.328888888888889"
  },
  {
    "studentID": "20180044",
    "firstName": "Lịch",
    "surName": "Hán Mâu",
    "birthday": "2001-01-14",
    "baseClass": "C-CLC2",
    "major": "Công nghệ nông nghiệp",
    "GPA": "2.195555555555556"
  },
  {
    "studentID": "20200001",
    "firstName": "Lực",
    "surName": "Thi Bạc",
    "birthday": "1998-11-22",
    "baseClass": "C-CLC2",
    "major": "Cơ kỹ thuật",
    "GPA": "2.216"
  },
  {
    "studentID": "20150005",
    "firstName": "Mãn",
    "surName": "Quang Khai",
    "birthday": "1998-07-07",
    "baseClass": "QHI-3",
    "major": "Vật lý kỹ thuật",
    "GPA": "1.9555555555555557"
  },
  {
    "studentID": "20160000",
    "firstName": "Mẫn",
    "surName": "Ma Khiếu",
    "birthday": "2001-12-06",
    "baseClass": "CA-4",
    "major": "Công nghệ nông nghiệp",
    "GPA": ""
  },
  {
    "studentID": "20200035",
    "firstName": "Nga",
    "surName": "Chu/Châu Lại",
    "birthday": "1992-07-15",
    "baseClass": "C-2",
    "major": "Công nghệ nông nghiệp",
    "GPA": "1.982222222222222"
  },
  {
    "studentID": "20210035",
    "firstName": "Nga",
    "surName": "Mộc Lăng",
    "birthday": "1992-04-23",
    "baseClass": "C-CLC4",
    "major": "Công nghệ kỹ thuật cơ điện tử",
    "GPA": "2.337777777777778"
  },
  {
    "studentID": "20200038",
    "firstName": "Nghinh",
    "surName": "Tông Uông",
    "birthday": "1996-07-22",
    "baseClass": "QH-3",
    "major": "Khoa Học Máy Tính",
    "GPA": "1.9022222222222223"
  },
  {
    "studentID": "20190040",
    "firstName": "Nghinh",
    "surName": "Lý Mạc",
    "birthday": "2002-02-14",
    "baseClass": "C-CLC4",
    "major": "Kỹ thuật điều khiển và tự động hóa",
    "GPA": "2.5"
  },
  {
    "studentID": "20210005",
    "firstName": "Nghiên",
    "surName": "Mùa Huỳnh",
    "birthday": "2004-03-06",
    "baseClass": "CA-CLC3",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": ""
  },
  {
    "studentID": "20190029",
    "firstName": "Nghiệp",
    "surName": "Đoạn Lý",
    "birthday": "1994-10-26",
    "baseClass": "QHI-CLC2",
    "major": "Khoa Học Máy Tính",
    "GPA": "1.8755555555555559"
  },
  {
    "studentID": "20210037",
    "firstName": "Nghê",
    "surName": "Mục Ánh",
    "birthday": "2003-08-28",
    "baseClass": "C-4",
    "major": "Kỹ thuật điều khiển và tự động hóa",
    "GPA": "2.1244444444444444"
  },
  {
    "studentID": "20190038",
    "firstName": "Nghĩa",
    "surName": "Khu Tống",
    "birthday": "1993-10-23",
    "baseClass": "CA-CLC1",
    "major": "Kỹ thuật điều khiển và tự động hóa",
    "GPA": "2.66"
  },
  {
    "studentID": "20210045",
    "firstName": "Ngoã",
    "surName": "Ông Trình",
    "birthday": "1993-01-10",
    "baseClass": "CA-4",
    "major": "Công nghệ thông tin định hướng thị trường Nhật Bản",
    "GPA": "2.017777777777778"
  },
  {
    "studentID": "20170036",
    "firstName": "Ngoạn",
    "surName": "Khương Viên",
    "birthday": "1998-09-29",
    "baseClass": "QH-CLC4",
    "major": "Công nghệ thông tin",
    "GPA": "1.8755555555555559"
  },
  {
    "studentID": "20160045",
    "firstName": "Ngung",
    "surName": "Ông Giang",
    "birthday": "2004-04-24",
    "baseClass": "QH-2",
    "major": "Khoa Học Máy Tính",
    "GPA": ""
  },
  {
    "studentID": "20160031",
    "firstName": "Nguyên",
    "surName": "Khu Thất",
    "birthday": "2004-01-08",
    "baseClass": "QHI-CLC1",
    "major": "Kỹ thuật điều khiển và tự động hóa",
    "GPA": "2.4000000000000004"
  },
  {
    "studentID": "20210036",
    "firstName": "Ngãi",
    "surName": "Hồ H’",
    "birthday": "1991-07-09",
    "baseClass": "QHI-4",
    "major": "Công nghệ nông nghiệp",
    "GPA": "2.2222222222222223"
  },
  {
    "studentID": "20200056",
    "firstName": "Ngãi",
    "surName": "Dã Tiêu",
    "birthday": "2003-07-03",
    "baseClass": "C-1",
    "major": "Cơ kỹ thuật",
    "GPA": "1.982222222222222"
  },
  {
    "studentID": "20160045",
    "firstName": "Ngãi",
    "surName": "Đới Phí",
    "birthday": "1995-03-31",
    "baseClass": "C-CLC1",
    "major": "Kỹ thuật Robot",
    "GPA": "2.04"
  },
  {
    "studentID": "20180026",
    "firstName": "Ngọ",
    "surName": "Đan Lại",
    "birthday": "1991-03-07",
    "baseClass": "QHI-CLC3",
    "major": "Công nghệ Hàng không vũ trụ",
    "GPA": "1.9466666666666665"
  },
  {
    "studentID": "20190018",
    "firstName": "Ngọc",
    "surName": "Quàng Phí",
    "birthday": "1997-01-30",
    "baseClass": "CA-2",
    "major": "Điện Tử Viễn Thông",
    "GPA": "2.017777777777778"
  },
  {
    "studentID": "20200048",
    "firstName": "Ngọc",
    "surName": "Tiếp Nhâm",
    "birthday": "1999-10-15",
    "baseClass": "QH-4",
    "major": "Công nghệ nông nghiệp",
    "GPA": "2.1333333333333337"
  },
  {
    "studentID": "20160024",
    "firstName": "Nham",
    "surName": "Trần Thẩm",
    "birthday": "2000-04-17",
    "baseClass": "QHI-4",
    "major": "Công nghệ Hàng không vũ trụ",
    "GPA": "2.328888888888889"
  },
  {
    "studentID": "20190023",
    "firstName": "Nhan",
    "surName": "Đan Sùng",
    "birthday": "1991-10-13",
    "baseClass": "CA-1",
    "major": "Kỹ thuật điều khiển và tự động hóa",
    "GPA": "2"
  },
  {
    "studentID": "20180021",
    "firstName": "Nhan",
    "surName": "Cao Khổng",
    "birthday": "2001-01-04",
    "baseClass": "QH-4",
    "major": "Kỹ thuật năng lượng",
    "GPA": "2.08"
  },
  {
    "studentID": "20160040",
    "firstName": "Nhan",
    "surName": "Cấn Khâu",
    "birthday": "1996-06-03",
    "baseClass": "C-CLC3",
    "major": "Mạng máy tính và truyền thông dữ liệu",
    "GPA": "1.7440000000000002"
  },
  {
    "studentID": "20150001",
    "firstName": "Nhiệm",
    "surName": "Mã Lộ",
    "birthday": "1994-04-02",
    "baseClass": "C-2",
    "major": "Vật lý kỹ thuật",
    "GPA": "2.352"
  },
  {
    "studentID": "20150009",
    "firstName": "Nho",
    "surName": "Đoạn Lăng",
    "birthday": "2005-08-12",
    "baseClass": "CA-1",
    "major": "Mạng máy tính và truyền thông dữ liệu",
    "GPA": "2.2133333333333334"
  },
  {
    "studentID": "20210042",
    "firstName": "Nhung",
    "surName": "Xa Thất",
    "birthday": "1994-12-16",
    "baseClass": "QH-2",
    "major": "Cơ kỹ thuật",
    "GPA": "2.097777777777778"
  },
  {
    "studentID": "20200063",
    "firstName": "Nhuận",
    "surName": "Kim Bàn",
    "birthday": "1991-08-30",
    "baseClass": "C-CLC2",
    "major": "Công nghệ thông tin",
    "GPA": "1.942857142857143"
  },
  {
    "studentID": "20170025",
    "firstName": "Nhuệ",
    "surName": "Văn Hầu",
    "birthday": "1999-06-17",
    "baseClass": "CA-CLC4",
    "major": "Cơ kỹ thuật",
    "GPA": "2.4266666666666667"
  },
  {
    "studentID": "20170013",
    "firstName": "Nhưỡng",
    "surName": "Đậu Trương",
    "birthday": "1992-03-02",
    "baseClass": "CA-CLC3",
    "major": "Công nghệ nông nghiệp",
    "GPA": "1.7040000000000002"
  },
  {
    "studentID": "20180009",
    "firstName": "Nhất",
    "surName": "Bùi Hạ",
    "birthday": "2004-07-19",
    "baseClass": "QHI-4",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.192"
  },
  {
    "studentID": "20150007",
    "firstName": "Nhậm",
    "surName": "Thập Nhữ",
    "birthday": "2003-08-01",
    "baseClass": "QH-2",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.186666666666667"
  },
  {
    "studentID": "20200009",
    "firstName": "Ninh",
    "surName": "Chế Hạ",
    "birthday": "1999-06-01",
    "baseClass": "QH-CLC4",
    "major": "Công nghệ nông nghiệp",
    "GPA": "1.6320000000000001"
  },
  {
    "studentID": "20190024",
    "firstName": "Nương",
    "surName": "Triệu Bình",
    "birthday": "1999-02-03",
    "baseClass": "C-1",
    "major": "Công nghệ thông tin",
    "GPA": "1.9644444444444449"
  },
  {
    "studentID": "20200012",
    "firstName": "Nữ",
    "surName": "Đan Thục",
    "birthday": "1997-12-01",
    "baseClass": "CA-CLC2",
    "major": "Kỹ thuật máy tính",
    "GPA": "1.952"
  },
  {
    "studentID": "20200045",
    "firstName": "Oánh",
    "surName": "Bàn Sử",
    "birthday": "2005-04-08",
    "baseClass": "C-CLC1",
    "major": "Điện Tử Viễn Thông",
    "GPA": "2.1688888888888886"
  },
  {
    "studentID": "20200006",
    "firstName": "Phán",
    "surName": "Hoàng Uông",
    "birthday": "1991-05-23",
    "baseClass": "QH-CLC2",
    "major": "Kỹ thuật Robot",
    "GPA": "2.192"
  },
  {
    "studentID": "20170047",
    "firstName": "Phát",
    "surName": "Phù Lương",
    "birthday": "1999-05-02",
    "baseClass": "QHI-CLC2",
    "major": "Công nghệ nông nghiệp",
    "GPA": "2.266666666666667"
  },
  {
    "studentID": "20170040",
    "firstName": "Phê",
    "surName": "Từ Hồ",
    "birthday": "1992-08-30",
    "baseClass": "C-2",
    "major": "Kỹ thuật Robot",
    "GPA": "2.106666666666667"
  },
  {
    "studentID": "20210029",
    "firstName": "Phòng",
    "surName": "Viên Nghị",
    "birthday": "1998-12-26",
    "baseClass": "C-CLC2",
    "major": "Cơ kỹ thuật",
    "GPA": "2.2222222222222223"
  },
  {
    "studentID": "20180015",
    "firstName": "Phó",
    "surName": "Vi Khổng",
    "birthday": "1997-03-28",
    "baseClass": "CA-CLC2",
    "major": "Cơ kỹ thuật",
    "GPA": "2.186666666666667"
  },
  {
    "studentID": "20160010",
    "firstName": "Phú",
    "surName": "Thẩm Lô",
    "birthday": "1996-09-04",
    "baseClass": "CA-4",
    "major": "Điện Tử Viễn Thông",
    "GPA": "2.2133333333333334"
  },
  {
    "studentID": "20170007",
    "firstName": "Phương",
    "surName": "Đan Hồng",
    "birthday": "1991-09-05",
    "baseClass": "CA-CLC1",
    "major": "Khoa Học Máy Tính",
    "GPA": ""
  },
  {
    "studentID": "20170037",
    "firstName": "Phước",
    "surName": "Anh Hàn",
    "birthday": "1997-07-30",
    "baseClass": "QHI-4",
    "major": "Vật lý kỹ thuật",
    "GPA": "2.6666666666666665"
  },
  {
    "studentID": "20170035",
    "firstName": "Phổ",
    "surName": "Mùa Khiếu",
    "birthday": "2001-07-05",
    "baseClass": "C-CLC4",
    "major": "Công nghệ Hàng không vũ trụ",
    "GPA": "2.0533333333333332"
  },
  {
    "studentID": "20190006",
    "firstName": "Phụ",
    "surName": "Tiếp Nguyễn",
    "birthday": "1991-03-23",
    "baseClass": "QH-2",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.016"
  },
  {
    "studentID": "20160021",
    "firstName": "Phục",
    "surName": "Thiều Ngô",
    "birthday": "1991-08-27",
    "baseClass": "QH-CLC3",
    "major": "Công nghệ thông tin",
    "GPA": "2.4177777777777782"
  },
  {
    "studentID": "20180027",
    "firstName": "Phụng",
    "surName": "Nghị Vương",
    "birthday": "1995-07-22",
    "baseClass": "QHI-CLC1",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.1244444444444444"
  },
  {
    "studentID": "20180047",
    "firstName": "Phụng",
    "surName": "Thế Khúc",
    "birthday": "2000-08-11",
    "baseClass": "CA-CLC2",
    "major": "Công nghệ thông tin định hướng thị trường Nhật Bản",
    "GPA": "2.062222222222222"
  },
  {
    "studentID": "20150002",
    "firstName": "Qua",
    "surName": "Lương Hứa",
    "birthday": "1993-04-06",
    "baseClass": "CA-CLC3",
    "major": "Kỹ thuật máy tính",
    "GPA": "1.9377777777777776"
  },
  {
    "studentID": "20170007",
    "firstName": "Quang",
    "surName": "Viên Nông",
    "birthday": "1992-01-22",
    "baseClass": "CA-CLC4",
    "major": "Cơ kỹ thuật",
    "GPA": "2.0842105263157897"
  },
  {
    "studentID": "20200031",
    "firstName": "Quang",
    "surName": "Ngọ Đới",
    "birthday": "1991-05-30",
    "baseClass": "QH-2",
    "major": "Điện Tử Viễn Thông",
    "GPA": "2.4844444444444442"
  },
  {
    "studentID": "20180001",
    "firstName": "Quy",
    "surName": "Khiếu Kiểu",
    "birthday": "2005-12-03",
    "baseClass": "QH-4",
    "major": "Công nghệ thông tin định hướng thị trường Nhật Bản",
    "GPA": "2.272"
  },
  {
    "studentID": "20200004",
    "firstName": "Quyến",
    "surName": "Tăng Lâm",
    "birthday": "2005-01-04",
    "baseClass": "CA-CLC1",
    "major": "Khoa Học Máy Tính",
    "GPA": "2.432"
  },
  {
    "studentID": "20160023",
    "firstName": "Quyến",
    "surName": "Điều Vi",
    "birthday": "1994-08-10",
    "baseClass": "QH-3",
    "major": "Kỹ thuật máy tính",
    "GPA": "2.382222222222222"
  },
  {
    "studentID": "20180030",
    "firstName": "Quyết",
    "surName": "Hứa Xung",
    "birthday": "2002-02-14",
    "baseClass": "CA-3",
    "major": "Kỹ thuật điều khiển và tự động hóa",
    "GPA": "2.195555555555556"
  },
  {
    "studentID": "20200014",
    "firstName": "Quyền",
    "surName": "Trình Đôn",
    "birthday": "1995-07-25",
    "baseClass": "CA-3",
    "major": "Kỹ thuật máy tính",
    "GPA": "2.1511111111111116"
  },
  {
    "studentID": "20210004",
    "firstName": "Quân",
    "surName": "Duy Công",
    "birthday": "1993-01-30",
    "baseClass": "QH-CLC4",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "1.9709090909090912"
  },
  {
    "studentID": "20190007",
    "firstName": "Quý",
    "surName": "Viên Linh",
    "birthday": "2004-12-30",
    "baseClass": "QHI-3",
    "major": "Công nghệ thông tin định hướng thị trường Nhật Bản",
    "GPA": "2.072"
  },
  {
    "studentID": "20170027",
    "firstName": "Quản",
    "surName": "Khương Sái",
    "birthday": "2001-07-19",
    "baseClass": "QH-CLC1",
    "major": "Vật lý kỹ thuật",
    "GPA": ""
  },
  {
    "studentID": "20210021",
    "firstName": "Quế",
    "surName": "Lương Tán",
    "birthday": "1997-05-03",
    "baseClass": "CA-CLC3",
    "major": "Công nghệ nông nghiệp",
    "GPA": "1.6977777777777778"
  },
  {
    "studentID": "20200030",
    "firstName": "Quế",
    "surName": "Bạc Cát",
    "birthday": "1991-06-05",
    "baseClass": "QHI-CLC1",
    "major": "Vật lý kỹ thuật",
    "GPA": "1.8311111111111111"
  },
  {
    "studentID": "20200013",
    "firstName": "Quốc",
    "surName": "Lưu Thất",
    "birthday": "2000-10-10",
    "baseClass": "QH-3",
    "major": "Hệ thống thông tin",
    "GPA": "2.2254545454545456"
  },
  {
    "studentID": "20210000",
    "firstName": "Quỳ",
    "surName": "Thạch Lưu",
    "birthday": "2004-10-13",
    "baseClass": "QH-3",
    "major": "Công nghệ thông tin",
    "GPA": "2.176"
  },
  {
    "studentID": "20160019",
    "firstName": "Sinh",
    "surName": "Lỗ Nhữ",
    "birthday": "2005-06-17",
    "baseClass": "C-CLC3",
    "major": "Kỹ thuật điều khiển và tự động hóa",
    "GPA": "2.2844444444444445"
  },
  {
    "studentID": "20180022",
    "firstName": "Siêu",
    "surName": "Đăng Ánh",
    "birthday": "2005-03-10",
    "baseClass": "CA-CLC4",
    "major": "Mạng máy tính và truyền thông dữ liệu",
    "GPA": ""
  },
  {
    "studentID": "20170021",
    "firstName": "Sung",
    "surName": "Ngô Cam",
    "birthday": "2003-05-13",
    "baseClass": "CA-CLC1",
    "major": "Kỹ thuật năng lượng",
    "GPA": "2.4355555555555557"
  },
  {
    "studentID": "20170055",
    "firstName": "Sách",
    "surName": "Thang Liên",
    "birthday": "1996-12-07",
    "baseClass": "CA-2",
    "major": "Công nghệ kỹ thuật cơ điện tử",
    "GPA": "2.373333333333333"
  },
  {
    "studentID": "20210017",
    "firstName": "Sắc",
    "surName": "Đầu Hướng",
    "birthday": "2005-06-11",
    "baseClass": "QHI-3",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.1688888888888886"
  },
  {
    "studentID": "20190019",
    "firstName": "Sở",
    "surName": "Nông Bá",
    "birthday": "1995-01-12",
    "baseClass": "QHI-CLC2",
    "major": "Cơ kỹ thuật",
    "GPA": ""
  },
  {
    "studentID": "20160043",
    "firstName": "Sứ",
    "surName": "Cồ Kha",
    "birthday": "2002-12-24",
    "baseClass": "QH-CLC3",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.22"
  },
  {
    "studentID": "20200015",
    "firstName": "Sử",
    "surName": "Mai Luyện",
    "birthday": "1996-07-01",
    "baseClass": "C-3",
    "major": "Kỹ thuật máy tính",
    "GPA": "2.1726315789473687"
  },
  {
    "studentID": "20210018",
    "firstName": "Sửu",
    "surName": "Hạ Mẫn",
    "birthday": "1996-05-22",
    "baseClass": "C-2",
    "major": "Công nghệ thông tin",
    "GPA": "1.9022222222222223"
  },
  {
    "studentID": "20180050",
    "firstName": "Sự",
    "surName": "Cảnh Huỳnh",
    "birthday": "2002-06-05",
    "baseClass": "C-CLC1",
    "major": "Cơ kỹ thuật",
    "GPA": "1.9555555555555557"
  },
  {
    "studentID": "20190013",
    "firstName": "Thaí",
    "surName": "Trác Hán",
    "birthday": "2002-01-06",
    "baseClass": "CA-4",
    "major": "Kỹ thuật máy tính",
    "GPA": "2.3111111111111113"
  },
  {
    "studentID": "20200025",
    "firstName": "Thinh",
    "surName": "Vạn Ngô",
    "birthday": "1992-09-18",
    "baseClass": "QHI-CLC4",
    "major": "Công nghệ nông nghiệp",
    "GPA": "2.6311111111111116"
  },
  {
    "studentID": "20200024",
    "firstName": "Thiện",
    "surName": "Ma Lý",
    "birthday": "1992-02-14",
    "baseClass": "QH-2",
    "major": "Công nghệ thông tin",
    "GPA": "2.0177777777777783"
  },
  {
    "studentID": "20180053",
    "firstName": "Thoả",
    "surName": "Đào Khương",
    "birthday": "1997-02-01",
    "baseClass": "QH-3",
    "major": "Công nghệ Hàng không vũ trụ",
    "GPA": "1.9600000000000002"
  },
  {
    "studentID": "20200021",
    "firstName": "Thu",
    "surName": "Điều Cát",
    "birthday": "1995-03-02",
    "baseClass": "QHI-CLC3",
    "major": "Kỹ thuật Robot",
    "GPA": "1.8577777777777778"
  },
  {
    "studentID": "20180036",
    "firstName": "Thuyên",
    "surName": "Đào Bàn",
    "birthday": "2004-01-10",
    "baseClass": "QHI-2",
    "major": "Hệ thống thông tin",
    "GPA": "2.497777777777778"
  },
  {
    "studentID": "20210034",
    "firstName": "Thuật",
    "surName": "Kim Chung",
    "birthday": "1992-05-12",
    "baseClass": "C-4",
    "major": "Cơ kỹ thuật",
    "GPA": "2.3111111111111113"
  },
  {
    "studentID": "20160026",
    "firstName": "Thuỵ",
    "surName": "Lương Lò",
    "birthday": "2003-08-08",
    "baseClass": "QHI-2",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.026666666666667"
  },
  {
    "studentID": "20210011",
    "firstName": "Thành",
    "surName": "Hình Khương",
    "birthday": "1996-10-15",
    "baseClass": "CA-4",
    "major": "Hệ thống thông tin",
    "GPA": "2.416"
  },
  {
    "studentID": "20170019",
    "firstName": "Thâu",
    "surName": "Vũ Tiếp",
    "birthday": "1999-03-25",
    "baseClass": "QH-CLC4",
    "major": "Kỹ thuật năng lượng",
    "GPA": "1.5733333333333337"
  },
  {
    "studentID": "20180022",
    "firstName": "Thí",
    "surName": "Đức Lỗ",
    "birthday": "2003-06-09",
    "baseClass": "CA-3",
    "major": "Công nghệ thông tin định hướng thị trường Nhật Bản",
    "GPA": "2.417777777777778"
  },
  {
    "studentID": "20180035",
    "firstName": "Thúc",
    "surName": "Trưng Khổng",
    "birthday": "1995-01-25",
    "baseClass": "CA-CLC2",
    "major": "Công nghệ thông tin định hướng thị trường Nhật Bản",
    "GPA": "2.1422222222222222"
  },
  {
    "studentID": "20170046",
    "firstName": "Thúc",
    "surName": "Chử Cái",
    "birthday": "2000-06-30",
    "baseClass": "C-CLC1",
    "major": "Khoa Học Máy Tính",
    "GPA": "2.373333333333333"
  },
  {
    "studentID": "20190001",
    "firstName": "Thương",
    "surName": "Tấn Tôn",
    "birthday": "1990-12-24",
    "baseClass": "QHI-3",
    "major": "Kỹ thuật điều khiển và tự động hóa",
    "GPA": "1.9680000000000004"
  },
  {
    "studentID": "20160033",
    "firstName": "Thương",
    "surName": "Lỗ Đôn",
    "birthday": "2005-05-17",
    "baseClass": "QHI-4",
    "major": "Cơ kỹ thuật",
    "GPA": "1.9555555555555557"
  },
  {
    "studentID": "20170051",
    "firstName": "Thương",
    "surName": "Hầu Kha",
    "birthday": "1994-12-01",
    "baseClass": "QHI-CLC2",
    "major": "Công nghệ kỹ thuật cơ điện tử",
    "GPA": "2"
  },
  {
    "studentID": "20200005",
    "firstName": "Thượng",
    "surName": "Sầm Vương",
    "birthday": "1994-06-22",
    "baseClass": "C-4",
    "major": "Mạng máy tính và truyền thông dữ liệu",
    "GPA": "2.3280000000000003"
  },
  {
    "studentID": "20210040",
    "firstName": "Thảng",
    "surName": "Lý Hi",
    "birthday": "2002-10-17",
    "baseClass": "CA-CLC3",
    "major": "Kỹ thuật năng lượng",
    "GPA": "2.4177777777777782"
  },
  {
    "studentID": "20210049",
    "firstName": "Thảo",
    "surName": "Phương Võ",
    "birthday": "1993-12-24",
    "baseClass": "C-CLC4",
    "major": "Kỹ thuật năng lượng",
    "GPA": "2.0177777777777783"
  },
  {
    "studentID": "20150004",
    "firstName": "Thị",
    "surName": "Chử Tề",
    "birthday": "1992-12-16",
    "baseClass": "C-4",
    "major": "Khoa Học Máy Tính",
    "GPA": "2.088888888888889"
  },
  {
    "studentID": "20180043",
    "firstName": "Thụ",
    "surName": "Lê Thiều",
    "birthday": "1999-08-27",
    "baseClass": "QHI-CLC4",
    "major": "Khoa Học Máy Tính",
    "GPA": "2.195555555555556"
  },
  {
    "studentID": "20200060",
    "firstName": "Thụ",
    "surName": "Lý Lưu",
    "birthday": "1992-09-06",
    "baseClass": "QHI-CLC2",
    "major": "Kỹ thuật Robot",
    "GPA": "2.5244444444444443"
  },
  {
    "studentID": "20210043",
    "firstName": "Thục",
    "surName": "Đỗ Đậu",
    "birthday": "1992-05-23",
    "baseClass": "C-1",
    "major": "Vật lý kỹ thuật",
    "GPA": "2.195555555555556"
  },
  {
    "studentID": "20170034",
    "firstName": "Thực",
    "surName": "Lăng Tông",
    "birthday": "1998-02-17",
    "baseClass": "C-1",
    "major": "Công nghệ thông tin định hướng thị trường Nhật Bản",
    "GPA": "1.9911111111111108"
  },
  {
    "studentID": "20210012",
    "firstName": "Tiết",
    "surName": "Chu/Châu Nghị",
    "birthday": "1998-07-20",
    "baseClass": "QH-1",
    "major": "Khoa Học Máy Tính",
    "GPA": "2.192"
  },
  {
    "studentID": "20170014",
    "firstName": "Tiềm",
    "surName": "Thất Đàm",
    "birthday": "1996-01-16",
    "baseClass": "QHI-CLC4",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.1066666666666674"
  },
  {
    "studentID": "20160032",
    "firstName": "Tiễn",
    "surName": "Công Phùng",
    "birthday": "1992-12-09",
    "baseClass": "QH-CLC1",
    "major": "Công nghệ thông tin",
    "GPA": "2.4444444444444446"
  },
  {
    "studentID": "20200007",
    "firstName": "Toát",
    "surName": "Lý Ấu",
    "birthday": "2002-01-21",
    "baseClass": "CA-CLC4",
    "major": "Cơ kỹ thuật",
    "GPA": "2.48"
  },
  {
    "studentID": "20180032",
    "firstName": "Toả",
    "surName": "Mạnh Ong",
    "birthday": "1993-09-14",
    "baseClass": "CA-CLC3",
    "major": "Công nghệ thông tin",
    "GPA": "1.982222222222222"
  },
  {
    "studentID": "20200050",
    "firstName": "Trai",
    "surName": "Mai Lương",
    "birthday": "1995-03-10",
    "baseClass": "QH-2",
    "major": "Công nghệ kỹ thuật cơ điện tử",
    "GPA": "2.2222222222222223"
  },
  {
    "studentID": "20200034",
    "firstName": "Trinh",
    "surName": "Ngạc Lâm",
    "birthday": "2001-01-27",
    "baseClass": "C-1",
    "major": "Cơ kỹ thuật",
    "GPA": "2.195555555555556"
  },
  {
    "studentID": "20200055",
    "firstName": "Triệu",
    "surName": "Hùng Vi",
    "birthday": "1996-12-27",
    "baseClass": "CA-CLC4",
    "major": "Công nghệ thông tin",
    "GPA": "2.373333333333333"
  },
  {
    "studentID": "20160041",
    "firstName": "Trân",
    "surName": "Thái Đoạn",
    "birthday": "1995-09-30",
    "baseClass": "CA-CLC1",
    "major": "Công nghệ thông tin",
    "GPA": "1.8600000000000003"
  },
  {
    "studentID": "20170057",
    "firstName": "Trình",
    "surName": "Liêu Diệp",
    "birthday": "1998-09-11",
    "baseClass": "QHI-CLC3",
    "major": "Kỹ thuật năng lượng",
    "GPA": "2.1100000000000003"
  },
  {
    "studentID": "20210014",
    "firstName": "Trước",
    "surName": "Ấu Liên",
    "birthday": "2003-02-02",
    "baseClass": "QH-2",
    "major": "Vật lý kỹ thuật",
    "GPA": "2.1688888888888886"
  },
  {
    "studentID": "20200028",
    "firstName": "Trước",
    "surName": "Dương Ứng",
    "birthday": "2004-09-28",
    "baseClass": "QH-4",
    "major": "Công nghệ kỹ thuật cơ điện tử",
    "GPA": "2.4533333333333336"
  },
  {
    "studentID": "20210027",
    "firstName": "Trạch",
    "surName": "Phùng Sầm",
    "birthday": "2002-07-03",
    "baseClass": "QHI-1",
    "major": "Kỹ thuật năng lượng",
    "GPA": "2.7377777777777776"
  },
  {
    "studentID": "20190011",
    "firstName": "Trắc",
    "surName": "Mâu Cồ",
    "birthday": "2001-09-15",
    "baseClass": "QHI-CLC1",
    "major": "Kỹ thuật máy tính",
    "GPA": "2.106666666666667"
  },
  {
    "studentID": "20200020",
    "firstName": "Trợ",
    "surName": "Khà Ngạc",
    "birthday": "1992-04-30",
    "baseClass": "C-1",
    "major": "Cơ kỹ thuật",
    "GPA": "2"
  },
  {
    "studentID": "20160005",
    "firstName": "Trứ",
    "surName": "Cự Cù",
    "birthday": "1998-05-10",
    "baseClass": "C-4",
    "major": "Điện Tử Viễn Thông",
    "GPA": "2.3120000000000003"
  },
  {
    "studentID": "20170048",
    "firstName": "Trừng",
    "surName": "Đường Lại",
    "birthday": "1995-09-08",
    "baseClass": "C-CLC4",
    "major": "Mạng máy tính và truyền thông dữ liệu",
    "GPA": "2.035555555555556"
  },
  {
    "studentID": "20180004",
    "firstName": "Tung",
    "surName": "Duy Cầm",
    "birthday": "1994-06-30",
    "baseClass": "CA-1",
    "major": "Điện Tử Viễn Thông",
    "GPA": "2.568888888888889"
  },
  {
    "studentID": "20210032",
    "firstName": "Tuyết",
    "surName": "Vi Chúng",
    "birthday": "1999-09-27",
    "baseClass": "C-CLC4",
    "major": "Điện Tử Viễn Thông",
    "GPA": "2.035555555555556"
  },
  {
    "studentID": "20170020",
    "firstName": "Tuyển",
    "surName": "Lương Đỗ",
    "birthday": "1992-04-28",
    "baseClass": "C-4",
    "major": "Khoa Học Máy Tính",
    "GPA": "2.337777777777778"
  },
  {
    "studentID": "20210001",
    "firstName": "Tuân",
    "surName": "Đới Phú",
    "birthday": "2004-07-18",
    "baseClass": "C-CLC1",
    "major": "Điện Tử Viễn Thông",
    "GPA": "2.064"
  },
  {
    "studentID": "20210009",
    "firstName": "Tuân",
    "surName": "Ứng Khâu",
    "birthday": "2001-05-18",
    "baseClass": "QH-CLC2",
    "major": "Kỹ thuật năng lượng",
    "GPA": "2.072"
  },
  {
    "studentID": "20180010",
    "firstName": "Tuân",
    "surName": "Mã Thịnh",
    "birthday": "2003-10-11",
    "baseClass": "QHI-CLC1",
    "major": "Kỹ thuật điều khiển và tự động hóa",
    "GPA": "1.9840000000000004"
  },
  {
    "studentID": "20200049",
    "firstName": "Tuần",
    "surName": "Cồ Mạnh",
    "birthday": "1994-03-31",
    "baseClass": "QH-CLC3",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.3377777777777777"
  },
  {
    "studentID": "20190005",
    "firstName": "Tác",
    "surName": "Nghị Nguyễn",
    "birthday": "2001-02-22",
    "baseClass": "QHI-2",
    "major": "Hệ thống thông tin",
    "GPA": "2.1760000000000006"
  },
  {
    "studentID": "20160028",
    "firstName": "Tác",
    "surName": "Chương Đức",
    "birthday": "1997-09-29",
    "baseClass": "C-CLC2",
    "major": "Công nghệ Hàng không vũ trụ",
    "GPA": "2.115555555555556"
  },
  {
    "studentID": "20170031",
    "firstName": "Tín",
    "surName": "Mạnh Cam",
    "birthday": "2005-06-25",
    "baseClass": "CA-CLC2",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "1.7422222222222223"
  },
  {
    "studentID": "20160016",
    "firstName": "Tương",
    "surName": "Vương Vi",
    "birthday": "1993-07-31",
    "baseClass": "QH-CLC3",
    "major": "Kỹ thuật năng lượng",
    "GPA": "2.088888888888889"
  },
  {
    "studentID": "20190035",
    "firstName": "Tương",
    "surName": "Nhữ Đổng",
    "birthday": "1995-01-23",
    "baseClass": "QHI-2",
    "major": "Kỹ thuật điều khiển và tự động hóa",
    "GPA": "1.7244444444444444"
  },
  {
    "studentID": "20150003",
    "firstName": "Tạo",
    "surName": "Hùng Luyện",
    "birthday": "2000-10-13",
    "baseClass": "QH-CLC2",
    "major": "Cơ kỹ thuật",
    "GPA": "1.8133333333333335"
  },
  {
    "studentID": "20160011",
    "firstName": "Tỉnh",
    "surName": "Tô Cao",
    "birthday": "2000-09-01",
    "baseClass": "QHI-CLC2",
    "major": "Khoa Học Máy Tính",
    "GPA": "1.9377777777777778"
  },
  {
    "studentID": "20210013",
    "firstName": "Tồn",
    "surName": "Mạch Trà",
    "birthday": "2005-06-20",
    "baseClass": "QH-CLC4",
    "major": "Kỹ thuật điều khiển và tự động hóa",
    "GPA": "2.192"
  },
  {
    "studentID": "20170028",
    "firstName": "Tồn",
    "surName": "Đống Biện",
    "birthday": "1997-03-10",
    "baseClass": "QH-CLC1",
    "major": "Cơ kỹ thuật",
    "GPA": "2.16"
  },
  {
    "studentID": "20210047",
    "firstName": "Tụng",
    "surName": "Tông Lăng",
    "birthday": "2004-09-02",
    "baseClass": "QH-3",
    "major": "Công nghệ Hàng không vũ trụ",
    "GPA": "2.4266666666666667"
  },
  {
    "studentID": "20190027",
    "firstName": "Tự",
    "surName": "Ngọc Nhữ",
    "birthday": "1995-06-23",
    "baseClass": "QH-4",
    "major": "Điện Tử Viễn Thông",
    "GPA": "2.2577777777777777"
  },
  {
    "studentID": "20170056",
    "firstName": "Tỵ",
    "surName": "Khổng Nông",
    "birthday": "1991-10-03",
    "baseClass": "CA-2",
    "major": "Công nghệ thông tin",
    "GPA": "2.58"
  },
  {
    "studentID": "20200037",
    "firstName": "Uẩn",
    "surName": "Bì Hứa",
    "birthday": "1991-12-13",
    "baseClass": "QH-2",
    "major": "Kỹ thuật Robot",
    "GPA": "2.2844444444444445"
  },
  {
    "studentID": "20180029",
    "firstName": "Vang",
    "surName": "Thẩm Đàm",
    "birthday": "2005-02-23",
    "baseClass": "C-1",
    "major": "Kỹ thuật năng lượng",
    "GPA": "2.462222222222222"
  },
  {
    "studentID": "20180012",
    "firstName": "Viên",
    "surName": "Lý Hạ",
    "birthday": "1997-08-31",
    "baseClass": "CA-2",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.0960000000000005"
  },
  {
    "studentID": "20190028",
    "firstName": "Việt",
    "surName": "Khiếu Ưng",
    "birthday": "2003-10-04",
    "baseClass": "QH-CLC2",
    "major": "Điện Tử Viễn Thông",
    "GPA": "2.355555555555556"
  },
  {
    "studentID": "20190030",
    "firstName": "Vui",
    "surName": "Sơn Dã",
    "birthday": "1992-03-19",
    "baseClass": "C-CLC4",
    "major": "Kỹ thuật máy tính",
    "GPA": "1.911111111111111"
  },
  {
    "studentID": "20170004",
    "firstName": "Vĩnh",
    "surName": "Quàng Sùng",
    "birthday": "2005-03-19",
    "baseClass": "QH-3",
    "major": "Vật lý kỹ thuật",
    "GPA": "2.115555555555556"
  },
  {
    "studentID": "20210010",
    "firstName": "Vũ",
    "surName": "Đinh Mầu/Màu",
    "birthday": "1994-08-22",
    "baseClass": "QH-CLC4",
    "major": "Công nghệ nông nghiệp",
    "GPA": "2.024"
  },
  {
    "studentID": "20190041",
    "firstName": "Vũ",
    "surName": "Đường Ngọc",
    "birthday": "1994-12-22",
    "baseClass": "CA-3",
    "major": "Kỹ thuật Robot",
    "GPA": "2.8400000000000003"
  },
  {
    "studentID": "20160008",
    "firstName": "Vọng",
    "surName": "Ngân Chiêm",
    "birthday": "2004-06-12",
    "baseClass": "C-CLC3",
    "major": "Công nghệ thông tin định hướng thị trường Nhật Bản",
    "GPA": "2.032"
  },
  {
    "studentID": "20170043",
    "firstName": "Xoài",
    "surName": "Ngụy Cổ",
    "birthday": "2001-01-11",
    "baseClass": "QH-2",
    "major": "Công nghệ Hàng không vũ trụ",
    "GPA": "1.9466666666666665"
  },
  {
    "studentID": "20210046",
    "firstName": "Xoài",
    "surName": "Cảnh Thôi",
    "birthday": "1997-05-08",
    "baseClass": "QH-2",
    "major": "Công nghệ nông nghiệp",
    "GPA": "2.337777777777778"
  },
  {
    "studentID": "20170014",
    "firstName": "Xuyên",
    "surName": "Cai Tinh",
    "birthday": "1995-01-25",
    "baseClass": "QHI-CLC1",
    "major": "Công nghệ thông tin định hướng thị trường Nhật Bản",
    "GPA": ""
  },
  {
    "studentID": "20190012",
    "firstName": "Xuyến",
    "surName": "Âu Đôn",
    "birthday": "1998-09-16",
    "baseClass": "CA-CLC4",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.1422222222222222"
  },
  {
    "studentID": "20200052",
    "firstName": "Xuân",
    "surName": "Thịnh Lạc",
    "birthday": "1996-12-06",
    "baseClass": "C-1",
    "major": "Kỹ thuật điều khiển và tự động hóa",
    "GPA": "2.1688888888888886"
  },
  {
    "studentID": "20190019",
    "firstName": "Xướng",
    "surName": "Chử Tôn",
    "birthday": "1994-02-02",
    "baseClass": "QH-4",
    "major": "Kỹ thuật điều khiển và tự động hóa",
    "GPA": "1.9333333333333336"
  },
  {
    "studentID": "20170001",
    "firstName": "Yểm",
    "surName": "Lục Đặng",
    "birthday": "1994-04-14",
    "baseClass": "QHI-1",
    "major": "Điện Tử Viễn Thông",
    "GPA": ""
  },
  {
    "studentID": "20170041",
    "firstName": "Yểm",
    "surName": "Giả Lyly",
    "birthday": "1992-12-18",
    "baseClass": "QHI-4",
    "major": "Công nghệ kỹ thuật cơ điện tử",
    "GPA": "2.4355555555555557"
  },
  {
    "studentID": "20160035",
    "firstName": "Yểm",
    "surName": "Lý Bá",
    "birthday": "2005-05-28",
    "baseClass": "CA-4",
    "major": "Kỹ thuật năng lượng",
    "GPA": "2.9244444444444446"
  },
  {
    "studentID": "20180042",
    "firstName": "Ái",
    "surName": "Mầu/Màu Thành",
    "birthday": "2004-12-06",
    "baseClass": "C-4",
    "major": "Kỹ thuật điều khiển và tự động hóa",
    "GPA": "2.0622222222222226"
  },
  {
    "studentID": "20180008",
    "firstName": "Ðam",
    "surName": "Phùng Ca",
    "birthday": "1996-02-02",
    "baseClass": "QHI-CLC4",
    "major": "Kỹ thuật máy tính",
    "GPA": "2.4400000000000004"
  },
  {
    "studentID": "20200059",
    "firstName": "Ðang",
    "surName": "Ánh Đào",
    "birthday": "1999-10-27",
    "baseClass": "CA-4",
    "major": "Kỹ thuật Robot",
    "GPA": "2.115555555555556"
  },
  {
    "studentID": "20160018",
    "firstName": "Ðiềm",
    "surName": "Đầu Cự",
    "birthday": "1998-07-13",
    "baseClass": "QHI-CLC2",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "1.9911111111111108"
  },
  {
    "studentID": "20210050",
    "firstName": "Ðiểu",
    "surName": "Chiêm Danh",
    "birthday": "1999-07-25",
    "baseClass": "C-CLC1",
    "major": "Điện Tử Viễn Thông",
    "GPA": "2.49"
  },
  {
    "studentID": "20200062",
    "firstName": "Ðiệp",
    "surName": "Đèo Lều",
    "birthday": "1999-05-06",
    "baseClass": "C-CLC1",
    "major": "Khoa Học Máy Tính",
    "GPA": "1.8400000000000003"
  },
  {
    "studentID": "20170023",
    "firstName": "Ðoan",
    "surName": "Cáp Luyện",
    "birthday": "1999-03-28",
    "baseClass": "C-CLC3",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.1422222222222222"
  },
  {
    "studentID": "20190009",
    "firstName": "Ðoàn",
    "surName": "Chương Cống",
    "birthday": "1992-03-31",
    "baseClass": "QH-4",
    "major": "Kỹ thuật máy tính",
    "GPA": "2.072"
  },
  {
    "studentID": "20200019",
    "firstName": "Ðoá",
    "surName": "Hi Hình",
    "birthday": "1993-08-11",
    "baseClass": "CA-1",
    "major": "Công nghệ Hàng không vũ trụ",
    "GPA": "2.497777777777778"
  },
  {
    "studentID": "20200008",
    "firstName": "Ðàm",
    "surName": "Phương Trà",
    "birthday": "1994-04-11",
    "baseClass": "C-2",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.512"
  },
  {
    "studentID": "20180018",
    "firstName": "Ðàm",
    "surName": "Thành Liêu",
    "birthday": "2001-09-22",
    "baseClass": "QH-CLC4",
    "major": "Cơ kỹ thuật",
    "GPA": "2.275555555555556"
  },
  {
    "studentID": "20180049",
    "firstName": "Ðàn",
    "surName": "Ánh Thế",
    "birthday": "2005-05-22",
    "baseClass": "CA-CLC2",
    "major": "Công nghệ Hàng không vũ trụ",
    "GPA": "2.2222222222222223"
  },
  {
    "studentID": "20210016",
    "firstName": "Ðàng",
    "surName": "Cai Cao",
    "birthday": "1991-09-09",
    "baseClass": "QH-CLC3",
    "major": "Công nghệ nông nghiệp",
    "GPA": "2.2311111111111113"
  },
  {
    "studentID": "20160030",
    "firstName": "Ðán",
    "surName": "Quàng Mã",
    "birthday": "1991-02-22",
    "baseClass": "CA-2",
    "major": "Công nghệ thông tin",
    "GPA": "2.2844444444444445"
  },
  {
    "studentID": "20200031",
    "firstName": "Ðính",
    "surName": "Diệp Đương",
    "birthday": "2001-11-05",
    "baseClass": "C-2",
    "major": "Cơ kỹ thuật",
    "GPA": ""
  },
  {
    "studentID": "20200039",
    "firstName": "Ðính",
    "surName": "Đầu Lều",
    "birthday": "1997-05-12",
    "baseClass": "QH-CLC3",
    "major": "Công nghệ thông tin",
    "GPA": "1.9066666666666667"
  },
  {
    "studentID": "20190039",
    "firstName": "Ðông",
    "surName": "Điền Lư",
    "birthday": "1996-12-10",
    "baseClass": "QH-CLC1",
    "major": "Công nghệ kỹ thuật xây dựng",
    "GPA": "2.06"
  },
  {
    "studentID": "20170016",
    "firstName": "Ðơn",
    "surName": "Sử Tri",
    "birthday": "1995-03-28",
    "baseClass": "CA-2",
    "major": "Kỹ thuật Robot",
    "GPA": "2.2311111111111113"
  },
  {
    "studentID": "20200053",
    "firstName": "Ðạc",
    "surName": "Ong Chương",
    "birthday": "1998-02-15",
    "baseClass": "CA-CLC3",
    "major": "Hệ thống thông tin",
    "GPA": "2.3288888888888892"
  },
  {
    "studentID": "20200063",
    "firstName": "Ðại",
    "surName": "Điêu Lục",
    "birthday": "1994-04-03",
    "baseClass": "QH-1",
    "major": "Công nghệ Hàng không vũ trụ",
    "GPA": ""
  },
  {
    "studentID": "20200056",
    "firstName": "Ðản",
    "surName": "Trác Cầm",
    "birthday": "2000-05-17",
    "baseClass": "QHI-4",
    "major": "Mạng máy tính và truyền thông dữ liệu",
    "GPA": ""
  },
  {
    "studentID": "20200046",
    "firstName": "Ðằng",
    "surName": "Xa Viêm",
    "birthday": "1993-05-14",
    "baseClass": "C-CLC1",
    "major": "Kỹ thuật điều khiển và tự động hóa",
    "GPA": "2.1066666666666674"
  },
  {
    "studentID": "20210048",
    "firstName": "Ðốc",
    "surName": "Lộ Nhan",
    "birthday": "1993-10-12",
    "baseClass": "C-CLC3",
    "major": "Mạng máy tính và truyền thông dữ liệu",
    "GPA": "2.2844444444444445"
  },
  {
    "studentID": "20170003",
    "firstName": "Ðồng",
    "surName": "Vi H’ma",
    "birthday": "2003-07-30",
    "baseClass": "QH-CLC2",
    "major": "Khoa Học Máy Tính",
    "GPA": "1.9709090909090912"
  },
  {
    "studentID": "20180038",
    "firstName": "Ðồng",
    "surName": "Lục Thoa",
    "birthday": "1992-08-06",
    "baseClass": "QH-CLC3",
    "major": "Kỹ thuật năng lượng",
    "GPA": "2.2222222222222223"
  },
  {
    "studentID": "20190034",
    "firstName": "Ðồng",
    "surName": "Trịnh Lục",
    "birthday": "2004-04-21",
    "baseClass": "C-3",
    "major": "Khoa Học Máy Tính",
    "GPA": "2.071111111111111"
  },
  {
    "studentID": "20180051",
    "firstName": "Ấn",
    "surName": "An Ưng",
    "birthday": "1991-08-16",
    "baseClass": "CA-CLC1",
    "major": "Công nghệ thông tin định hướng thị trường Nhật Bản",
    "GPA": "2.3360000000000003"
  },
  {
    "studentID": "20180034",
    "firstName": "Ấp",
    "surName": "Cồ Đan",
    "birthday": "1998-10-13",
    "baseClass": "CA-CLC3",
    "major": "Hệ thống thông tin",
    "GPA": "2.4711111111111115"
  },
  {
    "studentID": "20180003",
    "firstName": "Ất",
    "surName": "Nguyễn Ao",
    "birthday": "1998-07-24",
    "baseClass": "C-CLC2",
    "major": "Mạng máy tính và truyền thông dữ liệu",
    "GPA": ""
  },
  {
    "studentID": "20200049",
    "firstName": "Ất",
    "surName": "Cù Thào",
    "birthday": "1993-06-07",
    "baseClass": "QHI-CLC3",
    "major": "Mạng máy tính và truyền thông dữ liệu",
    "GPA": ""
  },
  {
    "studentID": "20210020",
    "firstName": "Ấu",
    "surName": "Bế Khà",
    "birthday": "1996-06-21",
    "baseClass": "QHI-CLC2",
    "major": "Kỹ thuật năng lượng",
    "GPA": "2.0444444444444447"
  },
  {
    "studentID": "20190025",
    "firstName": "Ấu",
    "surName": "Ao Tiếp",
    "birthday": "2001-03-03",
    "baseClass": "CA-3",
    "major": "Công nghệ nông nghiệp",
    "GPA": "1.8400000000000003"
  }
];
