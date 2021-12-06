import { Modal } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { deleteStudent} from "../../api/students"
const StudentDelete = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [studentID, setStudentID] = useState("");
  useImperativeHandle(ref, () => ({
    open(data) {
      setStudentID(data.studentID)
      setVisible(true);
    },
  }));

  const onOk = () => {
    console.log("deleted"+studentID);
    setVisible(false);
    deleteStudent(studentID)
    
    ;
  };

  return (
    <Modal
      visible={visible}
      title="Xoá sinh viên"
      okText="Xác nhận"
      cancelText="Quay lại"
      onOk={onOk}
      onCancel={() => setVisible(false)}
    >
      <h4>Bạn có chắc chắn xoá sinh viên này không?</h4>
    </Modal>
  );
});

export default StudentDelete;
