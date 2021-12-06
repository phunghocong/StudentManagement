import { Modal } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { deleteAccount} from "../../api/accounts"
const AccountDelete = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState("");

  useImperativeHandle(ref, () => ({
    open(data) {
      setId(data.id)
      setVisible(true);
    },
  }));

  const onOk = () => {
    deleteAccount(id);
    window.location.reload(false);
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
