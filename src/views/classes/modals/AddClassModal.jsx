import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Button, message } from "antd";
import { withRouter } from "react-router";
import { addClass } from "@/api/classes";
import AddClassForm from "../forms/AddClassForm"

const AddClassModal = (props) => {
  const { onOk } = props;
  const [addClassModalVisible, setAddClassModalVisible] = useState(false);
  const [addClassModalLoading, setAddClassModalLoading] = useState(false);
  const handleClassCancel = _ => {
    setAddClassModalVisible(false);
  };
  const handleAddClass = (row) => {
    setAddClassModalVisible(true);
  };
  const handleAddClassOk = _ => {
    const { match } = props;
   
    let form = formRef.current.form;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      setAddClassModalLoading(true);
      addClass(values).then((response)=>{
        form.resetFields();
        setAddClassModalVisible(false);
        setAddClassModalLoading(false);
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
  const formRef = useRef(null);

  return (
    <React.Fragment>
      <Button type='primary' onClick={handleAddClass}>Сынып қосу</Button>
      <AddClassForm
        wrappedComponentRef={formRef}
        visible={addClassModalVisible}
        confirmLoading={addClassModalLoading}
        onCancel={handleClassCancel}
        onOk={handleAddClassOk}
      />
    </React.Fragment>
  );
};

export default withRouter(AddClassModal);
