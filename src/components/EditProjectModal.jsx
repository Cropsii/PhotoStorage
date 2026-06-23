import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEditItem } from "../Hooks/useEditItem";
import { useEffect } from "react";
export const EditProjectModal = ({ isOpen, setIsOpen, record }) => {
  const [form] = Form.useForm();

  const { editItem, loading } = useEditItem();
  const finish = async (values) => {
    let payload = values;
    const rawFile = values.file?.at(0).originFileObj || null;
    if (rawFile) {
      console.log(rawFile);

      payload = { ...values, file: rawFile };
    }
    await editItem(record?.collectionName, record?.id, payload);
  };
  useEffect(() => {
    form.setFieldsValue({
      title: record.title,
      description: record.description,
    });
  }, [form, record, isOpen]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={finish}
      initialValues={{ remember: true }}
    >
      <Modal
        destroyOnHidden
        footer={[
          <Button
            key={"submitButton"}
            htmlType="submit"
            block
            type="primary"
            onClick={() => form.submit()}
            loading={loading}
          >
            Извенить
          </Button>,
        ]}
        title={`Редактор "${record?.title}"`}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
      >
        <FormItem
          rules={[{ required: true }]}
          name={"title"}
          label="Новое название"
        >
          <Input></Input>
        </FormItem>
        <FormItem
          rules={[{ required: true }]}
          name={"description"}
          label="Новое описание"
        >
          <Input.TextArea rows={2}></Input.TextArea>
        </FormItem>

        <FormItem
          name={"file"}
          getValueFromEvent={(e) => e?.fileList}
          valuePropName="fileList"
        >
          <Upload
            accept={".png,.jpg,.jpeg"}
            maxCount={1}
            listType="picture-card"
            beforeUpload={() => false}
          >
            <UploadOutlined></UploadOutlined>
          </Upload>
        </FormItem>
      </Modal>
    </Form>
  );
};
