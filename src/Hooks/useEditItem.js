import { useState } from "react";
import { pb } from "../Utils/PB";
import { App } from "antd";

export function useEditItem() {
  const { message } = App.useApp();
  const [newItem, setItem] = useState(null);
  const [loading, setLodaing] = useState(false);
  const editItem = async (collectionName, recordId, newRecord) => {
    try {
      setLodaing(true);
      const res = await pb
        .collection(collectionName)
        .update(recordId, newRecord);
      setItem(res);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLodaing(false);
    }
  };
  return { newItem, loading, editItem };
}
