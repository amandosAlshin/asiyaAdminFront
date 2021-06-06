import React, { useImperativeHandle } from "react";
import { Form, Input, Upload, Modal,Icon} from "antd";
const { Dragger } = Upload;
const AddLessonForm = Form.create({
  name: "addLessonForm"
})(
React.forwardRef((props, ref) => {
  const { visible, draggerProps,onCancel, onOk, form, confirmLoading } = props;
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
      title="Сабақ қосу"
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
        <Dragger {...draggerProps()}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">
            Файлды жүктеу үшін басыңыз немесе файлды әкеліңіз! DOCX және PDF форматтар
          </p>
        </Dragger>
      </Form>
    </Modal>
  );
}))

export default AddLessonForm;
