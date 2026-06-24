import { Card, Image, Popconfirm, Spin, Tag, Tooltip, Typography } from "antd";
import { useImgUrl } from "../../Hooks/useImgUrl";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteItem } from "../../Hooks/useDeleteItem";
import styles from "./ProjectCard.module.css";
import { useContext } from "react";
import { ProjectContext } from "../../Contexts/ProjectContext";

export const ProjectCard = ({ record, giveOpenData }) => {
  const { url, loading: imgLoading } = useImgUrl(record);
  const { deleteItem, error } = useDeleteItem();
  const { setMainData } = useContext(ProjectContext);
  const realFakeDele = async () => {
    await deleteItem(record.collectionName, record.id);
    if (!error) {
      setMainData((prev) => prev.filter((item) => item.id != record.id));
    }
  };

  return (
    <Spin percent={"auto"} spinning={imgLoading}>
      <Card
        extra={
          <Tag variant="">
            <Typography.Text type="secondary">{`#${record.index}`}</Typography.Text>
          </Tag>
        }
        hoverable
        className={styles.ProjectCard}
        cover={
          <Image
            loading="lazy"
            placeholder
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
        }
        title={record?.title}
        actions={[
          <Tooltip title="Редактирвоть проект?" mouseEnterDelay={0.8}>
            <EditOutlined onClick={() => giveOpenData(record)}></EditOutlined>
          </Tooltip>,
          <Popconfirm
            description={"Дейстиве необратимо"}
            title="Удалить?"
            okText="Да"
            cancelText="Нет"
            onConfirm={() => realFakeDele()}
          >
            <DeleteOutlined></DeleteOutlined>
          </Popconfirm>,
        ]}
      >
        <Card.Meta
          description={
            <Typography.Paragraph ellipsis={{ rows: 1 }}>
              {record.description}
            </Typography.Paragraph>
          }
        ></Card.Meta>
      </Card>
    </Spin>
  );
};
