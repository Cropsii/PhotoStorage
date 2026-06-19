import { useContext, useEffect } from "react";
import { Col, Layout, Row, Spin } from "antd";
import { ProjectCard } from "../components/ProjectCard/ProjectCard";
import { useLoadCollection } from "../Hooks/useLoadCollection";
import { ProjectContext } from "../Contexts/ProjectContext";

export const Main = () => {
  const { mainData, setMainData, reload } = useContext(ProjectContext);
  const { data, loading } = useLoadCollection("Projects", 1, 30, reload);

  useEffect(() => {
    if (data) {
      setMainData(data);
    }
  }, [data, setMainData]);
  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <Layout.Content>
        <Row gutter={[24, 24]}>
          {loading ? (
            <Spin></Spin>
          ) : (
            mainData.map((item) => (
              <Col span={4}>
                <ProjectCard key={item.id} record={item} />
              </Col>
            ))
          )}
        </Row>
      </Layout.Content>
    </Layout>
  );
};
