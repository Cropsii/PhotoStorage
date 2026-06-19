import { Card, Image } from "antd";
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
            className={styles.ProjectImage}
            src={url}
            alt={record.id}
          ></Image>
        )
      }
      title={record?.title}
      actions={[
        <DeleteOutlined
          onClick={() => deleteItem(record.collectionName, record.id)}
        ></DeleteOutlined>,
      ]}
    >
      <Card.Meta description={record.description}></Card.Meta>
    </Card>
  );
};
