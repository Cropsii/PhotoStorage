import { useContext, useEffect, useState } from "react";
import { Layout, Pagination } from "antd";
import { useLoadCollection } from "../Hooks/useLoadCollection";
import { ProjectContext } from "../Contexts/ProjectContext";
import { EditProjectModal } from "../components/EditProjectModal";
import { ProjectGrid } from "../components/ProjectGrid";
import { pb } from "../Utils/PB";
const queryOptions = { sort: "+index" };
let test;
pb.collection("Projects")
  .getFirstListItem("", { sort: "-index" })
  .then((item) => (test = item.index)); // максимальный индекс - потом приберу его красивее

export const Main = () => {
  const [page, setPage] = useState(1);
  const { mainData, setMainData, reload } = useContext(ProjectContext); // С этими данными мы дальше и работаем
  const { data, loading } = useLoadCollection(
    "Projects",
    page,
    12,
    queryOptions,
    reload,
  ); // Данные с бд - проекты
  const [projectData, setProjectDara] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (data) {
      setMainData(data);
    }
  }, [data, setMainData]);

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
            total={test}
            responsive
            pageSize={12}
            simple
          ></Pagination>
        </Layout.Footer>
      </Layout>
    </>
  );
};
