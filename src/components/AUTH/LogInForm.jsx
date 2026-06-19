import { Button, Flex, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useLogIn } from "../../Hooks/useLogIn";

export const LogInForm = () => {
  const { logIn, loading } = useLogIn();
  const onLogIn = async (values) => {
    logIn(values);
  };
  return (
    <Form initialValues={{ remember: true }} onFinish={onLogIn}>
      <Flex vertical justify="center">
        <FormItem
          name={"email"}
          label="почта"
          getValueFromEvent={(e) => e.target.value.toLowerCase()}
          rules={[
            {
              required: true,
              message: "Поле не должно быть пустым",
            },
          ]}
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
        <Button htmlType="submit" loading={loading} block>
          Войти
        </Button>
      </Flex>
    </Form>
  );
};
