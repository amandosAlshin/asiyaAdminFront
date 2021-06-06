import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Button, message } from "antd";
import { withRouter } from "react-router";
import { addClass } from "@/api/classes";
import { addSubject } from "@/api/subjects";
import AddSubjectForm from "../forms/AddSubjectForm";

const AddSubjectModal = (props) => {
  const { onOk } = props;
  const [addSubjectModalVisible, setAddSubjectModalVisible] = useState(false);
  const [addSubjectModalLoading, setAddSubjectModalLoading] = useState(false);
  const handleClassCancel = _ => {
    setAddSubjectModalVisible(false);
  };
  const handleAddSubject = (row) => {
    setAddSubjectModalVisible(true);
  };
  const handleAddSubjectOk = _ => {
    const { match } = props;
   
    let form = formRef.current.form;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      setAddSubjectModalLoading(true);
      addSubject(values).then((response)=>{
        form.resetFields();
        setAddSubjectModalVisible(false);
        setAddSubjectModalLoading(false);
        message.success("Сабақ сәтті қосылды!");
        if (onOk) {
          onOk();
        }
        ;
      }).catch(e=>{
        message.success("Сәтсіздік қайталап көріңіз!");
      });  
      
    });
  };
  const formRef = useRef(null);

  return (
    <React.Fragment>
      <Button type='primary' onClick={handleAddSubject}>Сабақ қосу</Button>
      <AddSubjectForm
        wrappedComponentRef={formRef}
        visible={addSubjectModalVisible}
        confirmLoading={addSubjectModalLoading}
        onCancel={handleClassCancel}
        onOk={handleAddSubjectOk}
      />
    </React.Fragment>
  );
};

export default withRouter(AddSubjectModal);
