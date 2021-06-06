import React, { useImperativeHandle, useState, useEffect } from "react";
import { Form, Input, Select, Modal} from "antd";
import { getClassesAll } from "@/api/classes";
import { getSections } from "@/api/section";
const { Option } = Select;
const AddExamForm = Form.create({
  name: "addExamForm"
})(
React.forwardRef((props, ref) => {
  const { visible, onCancel, onOk, form, confirmLoading  } = props;
  const { getFieldDecorator } = form;
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);

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

  const getClassesList = async () => {
    const result = await getClassesAll()
    const { data, status } = result;
    if (status === 200 && data && data.classes) {
      setClasses(data.classes);
    }
  }

  const getSectionList = async (values) => {
    const result = await getSections(values)
    const { data, status } = result;
    console.log({ result });
    if (status === 200 && data && data.sections) {
      setSections(data.sections);
    }
  }

  const onChangeClass = (value) => {
    form.setFieldsValue({ classId : value });
    form.setFieldsValue({ sectionId: null });
    getSectionList({ subjectsId: value });
  }

  const onChangeSection = (value) => {
    form.setFieldsValue({ sectionId : value });
  }

  useEffect(() => {
    getClassesList()
  }, [])
  
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
            rules: [{
              message: 'Атын енгізіңіз',
              required: true
            }]
          })(<Input placeholder="бөлім аты" />)}
        </Form.Item>
        <Form.Item label="Сынып:">
        {getFieldDecorator("subjectId", {
            rules: [{
              message: 'Сынып таңдаңыз',
              required: true
            }]
          })(
          <Select
            placeholder="Сыныпты таңдаңыз"
            // optionFilterProp="children"
            onChange={onChangeClass}
            // filterOption={(input, option) =>
            //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            // }
          >
            {
              classes && 
                classes.map(function(item){
                  return <Option key={item.id}>{item.name} {item.name}</Option>
                })
            }
          </Select>)}
        </Form.Item>
        <Form.Item label="Бөлім:">
        {getFieldDecorator("sectionId", {
            rules: [{
              required: true,
              message: 'Бөлім таңдаңыз'
            }],
          })(
          <Select
            placeholder="Бөлім таңдаңыз"
            // optionFilterProp="children"
            onChange={onChangeSection}
            // filterOption={(input, option) =>
            //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            // }
          >
            {
              sections && 
                sections.map(function(item){
                  return <Option key={item.id}>{item.name} {item.name}</Option>
                })
            }
          </Select>)}
        </Form.Item>
        <Form.Item label="Уақыт:">
          {getFieldDecorator("time", {
            rules: [{
              message: 'Уақыт енгізіңіз',
              required: true
            }],
          })(<Input type="number" placeholder="оқушыға берілетін уақыт (мин.)" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
}))

export default AddExamForm;
