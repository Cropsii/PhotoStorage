import { FloatButton, Popconfirm, Tooltip } from "antd";
import FloatButtonGroup from "antd/es/float-button/FloatButtonGroup";
import { AddProjectModal } from "./Modal/AddProjectModal";
import { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import {
  FolderAddOutlined,
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { ThemeContext } from "../Contexts/ThemeContext";

export const FloatButtonComponent = () => {
  const [open, setState] = useState(false);
  const { logOut } = useContext(AuthContext);
  const { Toggle, mode } = useContext(ThemeContext);
  const switchIcons = () => {
    const localTheme = localStorage.getItem("theme");
    switch (localTheme) {
      case "light":
        return <SunOutlined></SunOutlined>;
      case "dark":
        return <MoonOutlined></MoonOutlined>;
      default:
        return "auto";
    }
  };
  return (
    <>
      <AddProjectModal isOpen={open} setIsOpen={setState}></AddProjectModal>
      <FloatButtonGroup
        shape="square"
        trigger="click"
        icon={<ToolOutlined></ToolOutlined>}
      >
        <Popconfirm
          cancelText="нет"
          okText="да"
          title="Выйти из аккаунта?"
          onConfirm={() => logOut()}
        >
          <Tooltip placement="left" title="кнопка выхода">
            <FloatButton icon={<LogoutOutlined></LogoutOutlined>}></FloatButton>
          </Tooltip>
        </Popconfirm>
        <Tooltip title="Добавить проект" placement="left">
          <FloatButton
            icon={<FolderAddOutlined></FolderAddOutlined>}
            onClick={() => setState((prev) => !prev)}
          ></FloatButton>
        </Tooltip>
        <Tooltip placement="left" title="Изменить тему">
          <FloatButton
            onClick={() => {
              Toggle();
              console.log(mode);
            }}
            icon={switchIcons()}
          ></FloatButton>
        </Tooltip>
      </FloatButtonGroup>
    </>
  );
};
