import { Button, Flex, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import useCreateUser from "../../Hooks/useCreateNewUser";

export const RegisterForm = () => {
  const { create, loading } = useCreateUser();
  const register = async (values) => {
    create(values);
  };
  return (
    <Form initialValues={{ remember: true }} onFinish={register}>
      <Flex vertical justify="center">
        <FormItem
          name={"email"}
          label="почта"
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
            ({ getFieldValue }) => ({
              validator(_, value) {
                console.log(value);
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают!"));
              },
            }),
          ]}
        >
          <Input.Password></Input.Password>
        </FormItem>

        <Button htmlType="submit" block loading={loading}>
          Войти
        </Button>
      </Flex>
    </Form>
  );
};
