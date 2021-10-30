import { Layout } from "antd";

export default function Header() {
  return (
    <Layout.Header
      style={{ position: "sticky", top: 0, textAlign: "end", color: "#fff" }}
    >
      Logout
    </Layout.Header>
  );
}
