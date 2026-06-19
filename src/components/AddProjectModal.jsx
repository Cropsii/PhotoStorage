import { UploadOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Modal, Upload } from "antd";
import FormItem from "antd/es/form/FormItem";
import useCreateProject from "../Hooks/useCreateProject";

export const AddProjectModal = ({ isOpen, setIsOpen }) => {
  const [form] = Form.useForm();

  const { createProject, loading } = useCreateProject();
  const finish = async (values) => {
    const rawFile = values.file?.[0]?.originFileObj || null;
    const payload = {
      ...values,
      file: rawFile,
    };
    await createProject(payload);
    form.resetFields();
  };
  const normFile = (e) => {
    return e?.fileList;
  };
  return (
    <Form
      form={form}
      initialValues={{ remember: true }}
      onFinish={finish}
      layout="vertical"
    >
      <Modal
        destroyOnHidden={true}
        title="Добавить проект"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            onClick={() => form.submit()}
          >
            Добавить
          </Button>,
        ]}
      >
        <FormItem
          name={"title"}
          label="Имя проекта"
          rules={[{ required: true }]}
        >
          <Input></Input>
        </FormItem>
        <FormItem
          label="Описание"
          rules={[{ required: true }]}
          name={"description"}
        >
          <Input.TextArea rows={2}></Input.TextArea>
        </FormItem>
        <Flex align="center" vertical>
          <FormItem
            label="Обложка"
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
      </Modal>
    </Form>
  );
};
