import { Layout } from "antd";
import logo from "../assets/img/studmana.png";

export default function Header() {
  return (
    <Layout.Header//Can doi mau header 
      style={{ top: 0, color: "#ffffff", height: 75, backgroundColor: "fff" }}
    >
      <div>
        <img src={logo} alt="Logo"
        style={{
            width: 250
          }} />
      </div>
    </Layout.Header>



  );
}
