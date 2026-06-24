import { Button, Flex, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import useCreateUser from "../../Hooks/useCreateNewUser";
import { useNavigate } from "react-router";

export const RegisterForm = () => {
  const { create, loading } = useCreateUser();
  const navigate = useNavigate();
  const register = async (values) => {
    await create(values);
    navigate("/main");
  };
  return (
    <Form initialValues={{ remember: true }} onFinish={register}>
      <Flex vertical justify="center">
        <FormItem
          name={"email"}
          label="почта"
          getValueFromEvent={(e) => e.target.value.toLowerCase()}
          rules={[{ required: true, message: "Поле не должно быть пустым" }]}
        >
          <Input></Input>
        </FormItem>
        <FormItem
          name={"password"}
          label="пароль"
          rules={[{ required: true, message: "Поле не должно быть пустым" }]}
        >
          <Input.Password></Input.Password>
        </FormItem>
        <FormItem
          name={"passwordConfirm"}
          label="пароль"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Повторите пароль" },
            // Бешеная функция - нада бы ее попроще сделать
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Повторите пароль"></Input.Password>
        </FormItem>

        <Button htmlType="submit" block loading={loading}>
          Зарегестрироватся
        </Button>
      </Flex>
    </Form>
  );
};
