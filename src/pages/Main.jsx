import { useContext, useEffect, useState } from "react";
import { Affix, Layout, Pagination } from "antd";
import { useLoadCollection } from "../Hooks/useLoadCollection";
import { ProjectContext } from "../Contexts/ProjectContext";
import { ProjectGrid } from "../components/ProjectGrid";
import { EditProjectModal } from "../components/Modal/EditProjectModal";

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

  const [projectData, setProjectData] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setMainData(data.items);
    }
  }, [data, setMainData]);

  // Надо бы поменять название на нормальное
  const editModalOpenSetData = (record) => {
    setProjectData(record);
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
        {data.totalPages > 1 && (
          <Layout.Footer>
            <Affix offsetBottom={50}>
              <Pagination
                onChange={(v) => setPage(v)}
                align="center"
                current={page}
                defaultCurrent={1}
                total={data?.totalItems || 0}
                responsive
                pageSize={12}
                simple
              ></Pagination>
            </Affix>
          </Layout.Footer>
        )}
      </Layout>
    </>
  );
};
