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
    <Layout style={{ minHeight: "100dvh", padding: "24px" }}>
      <Layout.Content>
        <Row gutter={[24, 24]} justify={loading ? "center" : "start"}>
          {loading ? (
            <Spin size="large" />
          ) : (
            mainData.map((item) => (
              <Col key={item.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                <ProjectCard record={item} />
              </Col>
            ))
          )}
        </Row>
      </Layout.Content>
    </Layout>
  );
};
