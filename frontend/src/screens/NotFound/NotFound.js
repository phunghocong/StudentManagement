import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import paths from "../../constants/paths";

export default function NotFound() {
  return (
    <div className="container">
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, trang bạn đang vào không tồn tại."
        extra={
          <Link to={paths.BANG_DIEU_KHIEN}>
            <Button type="primary">Quay lại trang chủ</Button>
          </Link>
        }
      />
      ,
    </div>
  );
}
