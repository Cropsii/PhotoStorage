import { useState } from "react";
import { pb } from "../Utils/PB";
import { App } from "antd";
import { useNavigate } from "react-router";

export default function useCreateUser() {
  const { message } = App.useApp();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function create(data) {
    const body = {
      email: data.email,
      emailVisibility: true,
      name: data.name,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    };
    try {
      setLoading(true);
      const res = await pb.collection("users").create(body);
      setRecord(res);
      message.success("Регистрация выполнена");
      navigate("/main");
    } catch (error) {
      console.error(error);
      message.error(["Ошибка регистрации ", error.message]);
    } finally {
      setLoading(false);
    }
  }
  return { create, record, loading };
}
