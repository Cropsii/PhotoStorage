import { Col, Empty, Row, Spin } from "antd";
import { ProjectCard } from "./ProjectCard/ProjectCard";
import { useOutletContext } from "react-router";

export const ProjectGrid = () => {
  const { mainData: data, editModalOpenSetData, loading } = useOutletContext();
  const isEmptyData = !data || data.length === 0;

  if (loading) {
    return (
      <Spin size="large" fullscreen description="Ща все будет" percent="auto" />
    );
  }

  if (isEmptyData) {
    return (
      <Row align={"middle"} justify={"center"}>
        <Empty
          description="Ничего нет - добавте проекты"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Row>
    );
  }

  return (
    <Row gutter={[24, 24]} justify="start">
      {data.map((item) => (
        <Col key={item.id} xs={24} sm={12} md={8} lg={6} xl={4}>
          <ProjectCard record={item} giveOpenData={editModalOpenSetData} />
        </Col>
      ))}
    </Row>
  );
};
