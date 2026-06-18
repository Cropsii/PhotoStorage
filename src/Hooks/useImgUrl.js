import { useEffect, useState } from "react";
import { pb } from "../Utils/PB";
import { App } from "antd";

export function useImgUrl(record) {
  const { message } = App.useApp();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!record.file) {
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        const fileToken = await pb.files.getToken();

        const fileUrl = pb.files.getURL(record, record.file, {
          token: fileToken,
        });

        setUrl(fileUrl);
      } catch (error) {
        console.error(error);
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [record, message]);
  return { url, loading };
}
