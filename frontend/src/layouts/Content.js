import { Layout } from "antd";

export default function Content({ children }) {
  return <Layout.Content style={{ padding: 25 }}>{children}</Layout.Content>;
}
