import { Card, Image, Popconfirm } from "antd";
import { useImgUrl } from "../../Hooks/useImgUrl";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteItem } from "../../Hooks/useDeleteItem";
import styles from "./ProjectCard.module.css";
import { EditProjectModal } from "../EditProjectModal/EditProjectModal";
import { useState } from "react";
export const ProjectCard = ({ record }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { url } = useImgUrl(record);
  const { deleteItem, loading } = useDeleteItem();

  return (
    <>
      <EditProjectModal
        record={record}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></EditProjectModal>
      <Card
        hoverable
        className={styles.ProjectCard}
        loading={loading}
        cover={
          url && (
            <Image
              style={{
                height: "200px",
                width: "100%",
                objectFit: "cover",
                display: "block",
              }}
              className={styles.ProjectImage}
              src={url}
              alt={record.id}
            ></Image>
          )
        }
        title={record?.title}
        actions={[
          <EditOutlined onClick={() => setIsOpen(true)}></EditOutlined>,

          <Popconfirm
            description={"Дейстиве необратимо"}
            title="Удалить?"
            okText="Да"
            cancelText="Нет"
            onConfirm={() => deleteItem(record.collectionName, record.id)}
          >
            <DeleteOutlined></DeleteOutlined>
          </Popconfirm>,
        ]}
      >
        <Card.Meta description={record.description}></Card.Meta>
      </Card>
    </>
  );
};
