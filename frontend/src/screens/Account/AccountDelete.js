import { Modal } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";

const AccountDelete = forwardRef((props, ref) => {
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
      title="Xoá tài khoản"
      okText="Xác nhận"
      cancelText="Quay lại"
      onOk={onOk}
      onCancel={() => setVisible(false)}
    >
      <h4>Bạn có chắc chắn xoá tài khoản này không?</h4>
    </Modal>
  );
});

export default AccountDelete;
