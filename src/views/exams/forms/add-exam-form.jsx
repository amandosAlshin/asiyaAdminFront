import React, { useImperativeHandle } from "react";
import { Form, Input, Select, Modal} from "antd";
const { Option } = Select;
const AddExamForm = Form.create({
  name: "addExamForm"
})(
React.forwardRef((props, ref) => {
  const { visible, onCancel, onOk, form, onChangeClass, confirmLoading, onChangeSection } = props;
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
      title="БЖБ қосу"
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
            rules: [{ required: true }],
          })(<Input placeholder="бөлім аты" />)}
        </Form.Item>
        <Form.Item label="Сынып:">
        {getFieldDecorator("className", {
            rules: [{ required: true }],
          })(
          <Select
            placeholder="Сыныпты таңдаңыз"
            optionFilterProp="children"
            onChange={onChangeClass}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="1 сынып Информатика">1 сынып Информатика</Option>
            <Option value="2 сынып АТЖ">2 сынып АТЖ</Option>
            <Option value="4 сынып Информатика">4 сынып Информатика</Option>
          </Select>)}
        </Form.Item>
        <Form.Item label="Бөлім:">
        {getFieldDecorator("sectionName", {
            rules: [{ required: true }],
          })(
          <Select
            placeholder="Бөлім таңдаңыз"
            optionFilterProp="children"
            onChange={onChangeSection}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Компьютер мен желілердің техникалық сипаттамалары">Компьютер мен желілердің техникалық сипаттамалары</Option>
            <Option value="Компьютер мен желілердің техникалық сипаттамалары 2">Компьютер мен желілердің техникалық сипаттамалары 2</Option>
            <Option value="Компьютер мен желілердің техникалық сипаттамалары 3">Компьютер мен желілердің техникалық сипаттамалары 3</Option>
          </Select>)}
        </Form.Item>
        <Form.Item label="Уақыт:">
          {getFieldDecorator("time", {
            rules: [{ required: true }],
          })(<Input placeholder="оқушыға берілетін уақыт (мин.)" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
}))

export default AddExamForm;
