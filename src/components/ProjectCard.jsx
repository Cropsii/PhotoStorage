import { Card } from "antd";
import { useImgUrl } from "../Hooks/useImgUrl";
import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteItem } from "../Hooks/useDeleteItem";

export const ProjectCard = ({ record }) => {
  const { url } = useImgUrl(record);
  const { deleteItem, loading } = useDeleteItem();
  return (
    <Card
      loading={loading}
      cover={
        url && (
          <img
            style={{
              width: "200px",
              objectFit: "cover",
            }}
            alt="img"
            src={url || null}
          ></img>
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
