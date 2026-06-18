import { useEffect, useState } from "react";
import { pb } from "../Utils/PB";
import { App } from "antd";

export function useLoadCollection(collection, page, perPage, reload) {
  const { message } = App.useApp();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!collection) return;
    const load = async () => {
      try {
        setLoading(true);
        const resultList = await pb
          .collection(collection)
          .getList(page, perPage);
        setData(resultList.items);
      } catch (error) {
        console.error(error);
        message.error(error.message);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [collection, page, perPage, reload, message]);

  return { data, loading, error };
}
