import { Col, Modal, Row, Table } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { findByStudentId } from "../../api/classRecord"
import { useEffect } from "react";
import { findByID } from "../../api/students";

const StudentNewGrade = forwardRef((props, ref) => {


  
  useEffect(() => {

  }, []);
 
  const [visible, setVisible] = useState(false);
  const [initdata, setInitdata] = useState({});

  useImperativeHandle(ref, () => ({
    open(data) {
      setVisible(true);

    },
  }));

  return (
    <Modal
      visible={visible}
      title="Kết quả học tập"
      onCancel={() => setVisible(false)}
      footer={null}
      width={600}
    >
      
    </Modal>
  );
});

export default StudentNewGrade;
