import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload } from "antd";
import FormItem from "antd/es/form/FormItem";
export const EditProjectModal = ({ isOpen, setIsOpen, record }) => {
  return (
    <Form layout="vertical">
      <Modal
        footer={[
          <Button htmlType="submit" block type="primary">
            Извенить
          </Button>,
        ]}
        title={`Редактор "${record.title}"`}
        open={isOpen}
        onCancel={() => setIsOpen((prev) => !prev)}
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
        <FormItem name={"file"}>
          <Upload listType="picture-card" beforeUpload={() => null}>
            <UploadOutlined></UploadOutlined>
          </Upload>
        </FormItem>
      </Modal>
    </Form>
  );
};
