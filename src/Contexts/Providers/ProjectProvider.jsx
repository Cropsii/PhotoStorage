import { useState } from "react";
import { ProjectContext } from "../ProjectContext";

export const ProjectProvider = ({ children }) => {
  const [mainData, setMainData] = useState([]);
  const [reload, setReload] = useState(true);
  return (
    <ProjectContext.Provider
      value={{ mainData, setMainData, reload, setReload }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
