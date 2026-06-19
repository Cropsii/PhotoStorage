import { UploadOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Modal, Upload } from "antd";
import FormItem from "antd/es/form/FormItem";
import useCreateProject from "../Hooks/useCreateProject";

export const AddProjectModal = ({ isOpen, setIsOpen }) => {
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
    <Modal
      title="Добавить проект"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
      mask={blur}
    >
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={finish}
        layout="vertical"
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
        <FormItem>
          <Button htmlType="submit" loading={loading} type="primary" block>
            Добавить
          </Button>
        </FormItem>
      </Form>
    </Modal>
  );
};
