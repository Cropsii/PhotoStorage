import { Card, Image, Popconfirm } from "antd";
import { useImgUrl } from "../../Hooks/useImgUrl";
import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteItem } from "../../Hooks/useDeleteItem";
import styles from "./ProjectCard.module.css";
export const ProjectCard = ({ record }) => {
  const { url } = useImgUrl(record);
  const { deleteItem, loading } = useDeleteItem();

  return (
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
  );
};
