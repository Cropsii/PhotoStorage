import { useContext, useEffect } from "react";
import { Button, Flex, Layout, Popconfirm } from "antd";
import { AuthContext } from "../Contexts/AuthContext";
import { ThemeContext } from "../Contexts/ThemeContext";
import { ProjectCard } from "../components/ProjectCard";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { useLoadCollection } from "../Hooks/useLoadCollection";
import { ProjectContext } from "../Contexts/ProjectContext";

export const Main = () => {
  const { mainData, setMainData, reload } = useContext(ProjectContext);
  const { data, loading } = useLoadCollection("Projects", 1, 30, reload);
  const { logOut } = useContext(AuthContext);
  const { Toggle } = useContext(ThemeContext);

  useEffect(() => {
    if (data) {
      setMainData(data);
    }
  }, [data, setMainData]);
  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <Popconfirm title="Уверен?" onConfirm={() => logOut()}>
        <Button>Выйти</Button>
      </Popconfirm>
      <Button onClick={Toggle}>АП</Button>
      <Layout.Content>
        <Flex gap={20}>
          {loading ? (
            <Loading3QuartersOutlined />
          ) : (
            mainData.map((item) => <ProjectCard key={item.id} record={item} />)
          )}
        </Flex>
      </Layout.Content>
    </Layout>
  );
};
