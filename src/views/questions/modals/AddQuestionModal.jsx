import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Button, message } from "antd";
import { withRouter } from "react-router";
import { addQuestion } from "@/api/question";
import AddQuestionForm from "../forms/add-question-form"

const AddQuestionModal = (props) => {
  const { onOk } = props;
  const [ modalVisible, setModalVisible] = useState(false);
  const [ modalLoading, setModalLoading] = useState(false);
  const handleCancel = _ => {
    setModalVisible(false);
  };
  const handleAdd = (row) => {
    setModalVisible(true);
  };


  const handleAddOk = _ => {
    const { match } = props;
   
    let form = formRef.current.form;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      setModalLoading(true);
      addQuestion({ ...values, examId: match.params.exam }).then((response) => {
        const { status, data } = response;
        if (status === 200 && data.type === 'ok') {
          form.resetFields();
          setModalVisible(false);
          setModalLoading(false);
          message.success("Сұрақ сәтті қосылды!");
          if (onOk) {
            onOk();
          }
        }
      }).catch(e=>{
        message.success("Сәтсіздік қайталап көріңіз!");
      });  
      
    });
  };
  const formRef = useRef(null);


  return (
    <React.Fragment>
      <Button type='primary' onClick={handleAdd}>Сұрақ қосу</Button>
        <AddQuestionForm
          wrappedComponentRef={formRef}
          visible={modalVisible}
          confirmLoading={modalLoading}
          onCancel={handleCancel}
          onOk={handleAddOk}
        />  
    </React.Fragment>
  );
};

export default withRouter(AddQuestionModal);
