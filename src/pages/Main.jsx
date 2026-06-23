import { useContext, useEffect, useState } from "react";
import { Layout, Pagination } from "antd";
import { useLoadCollection } from "../Hooks/useLoadCollection";
import { ProjectContext } from "../Contexts/ProjectContext";
import { EditProjectModal } from "../components/EditProjectModal";
import { ProjectGrid } from "../components/ProjectGrid";

const queryOptions = { sort: "+index" };

export const Main = () => {
  const [page, setPage] = useState(1);
  const { mainData, setMainData, reload } = useContext(ProjectContext);
  const { data, loading } = useLoadCollection(
    "Projects",
    page,
    12,
    queryOptions,
    reload,
  ); // Сырые данные по проектам - сами проекты хранятся в поле items
  const [projectData, setProjectDara] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setMainData(data.items);
    }
  }, [data, setMainData]);

  // Надо бы поменять название на нормальное
  const editModalOpenSetData = (record) => {
    setProjectDara(record);
    setIsOpen(true);
  };

  return (
    <>
      <EditProjectModal
        record={projectData}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></EditProjectModal>

      <Layout style={{ minHeight: "100dvh", padding: "24px" }}>
        <Layout.Content>
          <ProjectGrid
            data={mainData}
            loading={loading}
            editModalOpenSetData={editModalOpenSetData}
          ></ProjectGrid>
        </Layout.Content>
        <Layout.Footer>
          <Pagination
            onChange={(v) => setPage(v)}
            align="center"
            defaultCurrent={page}
            total={data.totalPages}
            responsive
            pageSize={12}
            simple
          ></Pagination>
        </Layout.Footer>
      </Layout>
    </>
  );
};
