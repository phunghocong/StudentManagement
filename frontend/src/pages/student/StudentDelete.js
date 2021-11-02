import { Modal } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";

const StudentDelete = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
  }));

  const onOk = () => {
    setVisible(false);
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
      <h3>Bạn có chắc chắn xoá sinh viên này không?</h3>
    </Modal>
  );
});

export default StudentDelete;
