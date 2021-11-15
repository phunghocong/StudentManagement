import "./adminSider.scss";
import PugImg from "../../../../assets/pug.png";
import {
  Account_Icon,
  Appointment_Icon,
  Chat_Icon,
  Clinic_Icon,
  Dashboard_Icon,
  Donation_Icon,
  Pet_Icon,
  Volunteer_Icon,
} from "./siderIcons";
import { Link, withRouter } from "react-router-dom";
import pathNames from "../../../../router/pathNames";

const AdminSider = ({ location }) => {
  const { pathname } = location;

  const isAtDashboard = pathname === pathNames.ADMIN;
  const isAtVolunteer = pathname === pathNames.ADMIN_VOLUNTEER;
  const isAtDonation =
    pathname === pathNames.ADMIN_DONATION ||
    pathname === pathNames.ADMIN_NEW_DONATION;
  const isAtPet =
    pathname === pathNames.ADMIN_PET ||
    pathname.slice(0, pathNames.ADMIN_VIEW_PET_nId.length) ===
      pathNames.ADMIN_VIEW_PET_nId;
  const isAtClinic = pathname === pathNames.ADMIN_CLINIC;
  const isAtExamination =
    pathname === pathNames.ADMIN_APPOINTMENT ||
    pathname === pathNames.ADMIN_REPORT;
  const isAtChat = pathname === pathNames.ADMIN_CHAT;
  const isAtAccount = pathname === pathNames.ADMIN_ACCOUNT;

  return (
    <div className="admin-sider">
      <div className="logo">
        <img src={PugImg} alt="" />

        <div className="sider-container">
          <Link to={pathNames.ADMIN}>
            <div className={"sider-item " + (isAtDashboard && "active")}>
              <img src={Dashboard_Icon} alt="" />
              <span>Bảng điều khiển</span>
            </div>
          </Link>

          <Link to={pathNames.ADMIN_VOLUNTEER}>
            <div className={"sider-item " + (isAtVolunteer && "active")}>
              <img src={Volunteer_Icon} alt="" />
              <span>Quản lý sinh viên</span>
            </div>
          </Link>

          <Link to={pathNames.ADMIN_DONATION}>
            <div className={"sider-item " + (isAtDonation && "active")}>
              <img src={Donation_Icon} alt="" />
              <span>Quản lý học vụ</span>
            </div>
          </Link>

          <Link to={pathNames.ADMIN_PET}>
            <div className={"sider-item " + (isAtPet && "active")}>
              <img src={Pet_Icon} alt="" />
              <span>Diễn đàn</span>
            </div>
          </Link>

          <Link to={pathNames.ADMIN_CLINIC}>
            <div className={"sider-item " + (isAtClinic && "active")}>
              <img src={Clinic_Icon} alt="" />
              <span>Tài khoản</span>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default withRouter(AdminSider);
