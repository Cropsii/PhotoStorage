import { UploadOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Modal, Upload } from "antd";
import FormItem from "antd/es/form/FormItem";
import useCreateProject from "../Hooks/useCreateProject";

export const AddProjectModal = ({ openState }) => {
  const [form] = Form.useForm();

  const { createProject, loading } = useCreateProject();
  const finish = (values) => {
    const rawFile = values.file?.[0]?.originFileObj || null;
    const payload = {
      ...values,
      file: rawFile,
    };
    createProject(payload);
    form.resetFields();
  };
  const normFile = (e) => {
    return e?.fileList;
  };
  return (
    <Modal open={openState}>
      <Form form={form} initialValues={{ remember: true }} onFinish={finish}>
        <FormItem name={"title"} rules={[{ required: true }]}>
          <Input></Input>
        </FormItem>
        <FormItem rules={[{ required: true }]} name={"description"}>
          <Input.TextArea></Input.TextArea>
        </FormItem>
        <Flex align="center" vertical>
          <FormItem
            name={"file"}
            getValueFromEvent={normFile}
            valuePropName="fileList"
          >
            <Upload
              accept={".png,.jpg"}
              name="picture"
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
            >
              <UploadOutlined></UploadOutlined>
            </Upload>
          </FormItem>
        </Flex>
        <FormItem>
          <Button htmlType="submit" loading={loading} type="primary" block>
            Добавить
          </Button>
        </FormItem>
      </Form>
    </Modal>
  );
};
