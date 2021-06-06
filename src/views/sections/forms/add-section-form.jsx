import React, { useImperativeHandle } from "react";
import { Form, Input, Modal } from "antd";
const AddSectionForm = Form.create({
  name: "addSectionForm"
})(
React.forwardRef((props, ref) => {
  const { visible, onCancel, onOk, form, confirmLoading } = props;
  const { getFieldDecorator } = form;

  useImperativeHandle(ref, () => ({
    form
  }));
  const formItemLayout = {
    labelCol: {
      sm: { span: 4 },
    },
    wrapperCol: {
      sm: { span: 16 },
    },
  };
  return (
    <Modal
      title="Бөлім қосу"
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={confirmLoading}
      okText={"Қосу"}
      cancelText={"Жабу"}
    >
      <Form {...formItemLayout}>
        <Form.Item label="Аты:">
          {getFieldDecorator("name", {
            rules: [{
              required: true,
              whitespace: true,
              message: "Атын енгізіңіз",
            }],
          })(<Input placeholder="бөлім аты" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
}))

export default AddSectionForm;
