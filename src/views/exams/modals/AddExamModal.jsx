import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Button, message } from "antd";
import { withRouter } from "react-router";
import { addExam } from "@/api/exam";
import AddExamForm from "../forms/add-exam-form"

const AddExamModal = (props) => {
  const { onOk } = props;
  const [addExamModalVisible, setAddExamModalVisible] = useState(false);
  const [addExamModalLoading, setAddExamModalLoading] = useState(false);
  const handleCancel = _ => {
    setAddExamModalVisible(false);
  };
  const handleAddExam = (row) => {
    setAddExamModalVisible(true);
  };
  const handleAddOk = _ => {
    const { match } = props;
   
    let form = formRef.current.form;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      setAddExamModalLoading(true);
      addExam(values).then((response)=>{
        form.resetFields();
        setAddExamModalVisible(false);
        setAddExamModalLoading(false);
        message.success("Сынып сәтті қосылды!");
        if (onOk) {
          onOk();
        }
        ;
      }).catch(e=>{
        message.success("Сәтсіздік қайталап көріңіз!");
      });  
      
    });
  };
  const onChangeClass = _ => {
    let form = formRef.current.form;
    form.setFieldsValue({ className: 1 });
  }
  const onChangeSection = _ => {
    let form = formRef.current.form;
    form.setFieldsValue({ sectionName: 1 });
  }
  const formRef = useRef(null);

  return (
    <React.Fragment>
      <Button type='primary' onClick={handleAddExam}>БЖБ қосу</Button>
      <AddExamForm
        onChangeSection={onChangeSection}
        onChangeClass={onChangeClass}
        wrappedComponentRef={formRef}
        visible={addExamModalVisible}
        confirmLoading={addExamModalLoading}
        onCancel={handleCancel}
        onOk={handleAddOk}
      />
    </React.Fragment>
  );
};

export default withRouter(AddExamModal);
