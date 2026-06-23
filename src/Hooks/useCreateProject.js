import { pb } from "../Utils/PB";
import { useContext, useState } from "react";

import { App } from "antd";
import { ProjectContext } from "../Contexts/ProjectContext";
import { AuthContext } from "../Contexts/AuthContext";

export default function useCreateProject() {
  const { setReload } = useContext(ProjectContext);

  const { message } = App.useApp();
  const { user } = useContext(AuthContext);

  const [loading, setLodaing] = useState(false);
  async function createProject(data) {
    try {
      setLodaing(true);
      await pb.collection("Projects").create({ ...data, relation: user?.id });
      setReload((prev) => !prev);
    } catch (error) {
      console.error(error);
      message.error(
        `Не удалось создать проект ${error.data.data.index.message}`,
      );
    } finally {
      setLodaing(false);
    }
  }
  return { createProject, loading };
}
