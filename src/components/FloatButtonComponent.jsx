import RefIcon from "@ant-design/icons/es/icons/AccountBookFilled";
import { FloatButton } from "antd";
import FloatButtonGroup from "antd/es/float-button/FloatButtonGroup";
import { AddProjectModal } from "./AddProjectModal";
import { useState } from "react";

export const FloatButtonComponent = () => {
  const [open, setState] = useState(false);
  return (
    <>
      <AddProjectModal openState={open}></AddProjectModal>
      <FloatButtonGroup trigger="click">
        <FloatButton
          icon={<RefIcon></RefIcon>}
          onClick={() => setState((prev) => !prev)}
        ></FloatButton>
      </FloatButtonGroup>
    </>
  );
};
