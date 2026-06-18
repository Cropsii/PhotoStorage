import { useContext, useState } from "react";
import { pb } from "../Utils/PB";
import { App } from "antd";
import { ProjectContext } from "../Contexts/ProjectContext";

export function useDeleteItem() {
  const { setMainData } = useContext(ProjectContext);
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const deleteItem = async (collectionName, itemId) => {
    if (!collectionName || !itemId) {
      return;
    }
    try {
      setLoading(true);
      await pb.collection(collectionName).delete(itemId);
      setMainData((prev) => prev.filter((item) => item.id != itemId));
    } catch (error) {
      setError(error);
      console.error(error.message);
      message.error(["Не удалос удалить ", error.message]);
    } finally {
      setLoading(false);
    }
  };
  return { deleteItem, loading, error };
}
