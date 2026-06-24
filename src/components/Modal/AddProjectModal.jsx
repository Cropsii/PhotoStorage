import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload } from "antd";
import FormItem from "antd/es/form/FormItem";
import useCreateProject from "../../Hooks/useCreateProject";
import { getMaxIndex } from "../../Utils/getMaxIndexProj";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

export const AddProjectModal = ({ isOpen, setIsOpen }) => {
  const [form] = Form.useForm();
  const { createProject, loading } = useCreateProject();
  const { user } = useContext(AuthContext);
  const finish = async (values) => {
    console.log(values);

    const rawFile = values.file?.[0]?.originFileObj || null;

    const maxIndex = await getMaxIndex(user.id);
    console.log(maxIndex);

    const body = {
      ...values,
      file: rawFile,
      index: maxIndex + 1,
    };
    await createProject(body);
    form.resetFields();
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
        {/* ID нафиг не надо вручную - напоминание исправит его на автомат */}
        {/* <FormItem label="ID" name={"index"} rules={[{ required: true }]}>
          <InputNumber min={0}></InputNumber>
        </FormItem> */}
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
        <FormItem
          rules={[{ required: true }]}
          label="Обложка"
          name={"file"}
          getValueFromEvent={(e) => e?.fileList}
          valuePropName="fileList"
        >
          <Upload
            accept={".png,.jpg,.jpeg"}
            name="picture"
            listType="picture-card"
            maxCount={1}
            beforeUpload={() => false}
          >
            <UploadOutlined></UploadOutlined>
          </Upload>
        </FormItem>
      </Modal>
    </Form>
  );
};
