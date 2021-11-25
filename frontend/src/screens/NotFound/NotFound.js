import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import paths from "../../constants/paths";

export default function NotFound() {
  return (
    <div className="container">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to={paths.BANG_DIEU_KHIEN}>
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
      ,
    </div>
  );
}
