import { useContext, useEffect, useState } from "react";
import { Affix, Layout, Pagination } from "antd";
import { useLoadCollection } from "../Hooks/useLoadCollection";
import { ProjectContext } from "../Contexts/ProjectContext";

import { EditProjectModal } from "../components/Modal/EditProjectModal";
import { Outlet, useNavigate, useParams } from "react-router";

const queryOptions = { sort: "+index" };

export const Main = () => {
  const navigate = useNavigate();
  const params = useParams();
  const pageIndex = params.pageIndex;

  const { mainData, setMainData, reload } = useContext(ProjectContext);
  const { data, loading } = useLoadCollection(
    "Projects",
    pageIndex,
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
          <Outlet
            context={{ mainData, editModalOpenSetData, loading }}
          ></Outlet>
        </Layout.Content>

        {data.totalPages > 1 && (
          <Layout.Footer>
            <Affix offsetBottom={50}>
              <Pagination
                onChange={(v) => navigate(`${v}`, { relative: true })}
                align="center"
                current={pageIndex}
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
