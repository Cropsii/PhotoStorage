import { useState } from "react";
import { pb } from "../Utils/PB";
import { App } from "antd";
import { useNavigate } from "react-router";

export function useLogIn() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const navigate = useNavigate();
  async function logIn(data) {
    try {
      setLoading(true);
      const res = await pb
        .collection("users")
        .authWithPassword(data.email, data.password);
      setData(res);
      navigate("/main");
      message.success("Успешный вход");
    } catch (error) {
      console.error(error);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return { logIn, data, loading };
}
