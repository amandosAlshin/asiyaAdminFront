import React, { useImperativeHandle } from "react";
import { Form, Input, Radio, Modal,Icon} from "antd";
const AddQuestionForm = Form.create({
  name: "addQuestionForm"
})(
React.forwardRef((props, ref) => {
  const { visible, onCancel, onOk, form, confirmLoading } = props;
  const { getFieldDecorator } = form;

  useImperativeHandle(ref, () => ({
    form
  }));
  const formItemLayout = {
    labelCol: {
      sm: { span: 8 },
    },
    wrapperCol: {
      sm: { span: 10 },
    },
  };

  const onChangeType = e => {
    form.setFieldsValue({ type: e.target.value });
  };
  
  return (
    <Modal
      title="Сұрақ қосу"
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={confirmLoading}
      okText={"Қосу"}
      cancelText={"Жабу"}
    >
      <Form >
        <Form.Item label="Сұрақ:">
          {getFieldDecorator("question", {
            rules: [{ required: true }],
          })(<Input placeholder="сұрақ" />)}
        </Form.Item>
        <Form.Item label="Дескриптор:">
          {getFieldDecorator("description", {
            rules: [{ required: true }],
          })(<Input placeholder="дескриптор" />)}
        </Form.Item>
        <Form.Item label="Балл:">
          {getFieldDecorator("amount", {
            rules: [{ required: true }],
          })(<Input type="number" placeholder="балл" />)}
        </Form.Item>
        <Form.Item label="Бағалау критериясы:">
          {getFieldDecorator("measure", {
            rules: [{ required: true }],
          })(<Input placeholder="бағалау критериясы" />)}
        </Form.Item>
        <Form.Item label="Жауап түрі:">
          {getFieldDecorator("type", {
            rules: [{ required: true }],
          })(<Radio.Group onChange={onChangeType}>
            <Radio value={0}>Дұрыс жауап таңдау</Radio>
            <Radio value={1}>Дұрыс жауап жазу</Radio>
          </Radio.Group>)}
        </Form.Item>
        
      </Form>
    </Modal>
  );
}))

export default AddQuestionForm;
