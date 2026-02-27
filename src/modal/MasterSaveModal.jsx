import { Form, Input, message, Modal } from "antd";
import { apiSaveMasterData } from "../api/api";
import { useEffect } from "react";

const MasterSaveModal = ({
  openModal,
  titleModal,
  onSave,
  onCancel,
  oldData,
  mapKey,
}) => {
  const [formUtil] = Form.useForm();

  useEffect(() => {
    formUtil.setFieldsValue(oldData);
  }, [openModal]);

  async function handleSaveData() {
    try {
      const values = formUtil.getFieldsValue();
      const payload = {
        MapKey: mapKey,
        Id: values.id || 0,
        Name: values.name,
        Remark: values.remark || null,
      };
      const res = await apiSaveMasterData(payload);
      if (res.data.code !== "0") {
        return message.error(res.data.message);
      }
      onSave();
      return message.success(res.data.message);
    } catch (error) {
      return message.error(error.message);
    }
  }

  const handleCancel = () => {
    onCancel();
    formUtil.resetFields();
  };

  return (
    <Modal
      open={openModal}
      title={titleModal}
      onOk={handleSaveData}
      onCancel={handleCancel}
    >
      <Form form={formUtil} layout="vertical">
        <Form.Item hidden name="id">
          <Input />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input placeholder="Name..." />
        </Form.Item>
        <Form.Item label="Remark" name="remark">
          <Input.TextArea placeholder="Remark..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MasterSaveModal;
