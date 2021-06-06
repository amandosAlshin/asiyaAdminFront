import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Button, message } from "antd";
import { withRouter } from "react-router";
import { addSubject } from "@/api/subjects";
import { getAnswers, addAnswer } from "@/api/answers";
import AddAnswerForm from "../forms/add-answer-form"

const AddAnswerModal = (props) => {
  const {
    onOk,
    modalVisible,
    setModalVisible,
    questionActive,
    setQuestionActive,
    handleAdd,
    match,
  } = props;
  const [modalLoading, setModalLoading] = useState(false);
  const [answers,setAnswers] = useState([]);
  const handleCancel = _ => {
    setModalVisible(false);
  };
  const handleAddOk = _ => {
    const { match } = props;
   
    let form = formRef.current.form;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log({ err, values });
      setModalLoading(true);
      addAnswer({
        questionId: questionActive.id,
        answers: values.names.filter(x => x),
        trueAnswer: values.trueAnswer ? 1 : 0,
        examId: match.params.exam,
      }).then((response)=>{
        form.resetFields();
        setModalVisible(false);
        setModalLoading(false);
        message.success("Сабақ сәтті қосылды!");
        if (onOk) {
          onOk();
        }
        ;
      }).catch(e=>{
        setModalLoading(false);
        message.error("Сәтсіздік қайталап көріңіз!");
      });  
      
    });
  };
  const formRef = useRef(null);

  // const handleAnswer = async (row) => {
  //   const result = await getAnswers({ questionId: questionActive.id })
  //   const { data, status } = result.data;
  //     if (status === 0) {
  //       setAnswers(data);
  //       setQuestionActive(row);
  //       setModalVisible(true);
  //     }
   
  // };

  const getAnswerList = () => {
    getAnswers({ questionId: questionActive.id })
      .then(res => {
        console.log({ res });
        if (res.status === 200 && res.data && res.data.type === 'ok') {
          setAnswers(res.data.answers);
        }
      })
      .catch(err => {
        console.log({ err });
      })
  }

  useEffect(() => {
    getAnswerList()
  }, [questionActive])

  return (
    <React.Fragment>
        <AddAnswerForm
          answers={answers}
          questionActive={questionActive}
          wrappedComponentRef={formRef}
          visible={modalVisible}
          confirmLoading={modalLoading}
          onCancel={handleCancel}
          onOk={handleAddOk}
        />  
    </React.Fragment>
  );
};

export default withRouter(AddAnswerModal);
