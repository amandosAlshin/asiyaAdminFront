import React, { useEffect, useImperativeHandle, useState } from "react";
import { Form, Input, Modal, Select } from "antd";
import { getClassesAll } from "@/api/classes";

const { Option } = Select;
const AddSubjectForm = Form.create({
  name: "addSubjectForm"
})(
React.forwardRef((props, ref) => {
  const { visible, onCancel, onOk, form, confirmLoading } = props;
  const { getFieldDecorator } = form;

  const [classes, setClasses] = useState([]);

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


  const handleChange = (value, name) =>{
    console.log(`selected ${value} ${name}`);
    form.setFieldsValue({ "classId" : value });
  }
  const getClassesList = async () => {
    const result = await getClassesAll()
    const { data, status } = result;
    if (status === 200 && data && data.classes) {
      setClasses(data.classes);
    }
  }

  useEffect(() => {
    getClassesList()
  }, [])

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
            rules: [{
              required: true,
              whitespace: true,
              message: "Атын енгізіңіз",
            }],
          })(<Input placeholder="сабақ аты" />)}
        </Form.Item>
        <Form.Item label="Сынып:">
          {getFieldDecorator("classId", {
            rules: [{
              required: true,
              message: "Сынып таңдаңыз",
            }],
          })(
            <Select
              allowClear
              style={{ width: '100%' }}
              placeholder="Сынып"
              onChange={(value) => handleChange(value, 'classId')}
            >
              {
                classes && 
                  classes.map(function(item){
                    return <Option key={item.id}>{item.name} {item.name}</Option>
                  })
              }
            </Select>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}))

export default AddSubjectForm;
