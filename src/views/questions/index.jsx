import React, { useState ,useEffect,useRef} from "react";
import DocumentTitle from "react-document-title";
import { Spin,Table,  Button,message } from "antd";
import { getQuestions, deleteQuestion, addQuestion } from "@/api/question";
import { getAnswers, deleteAnswers, addAnswers } from "@/api/answers";
import AddQuestionForm from "./forms/add-question-form"
import AddAnswerForm from "./forms/add-answer-form"
import "./index.less";

function Questions(props){
  
  const [loading, setLoading] = useState(true);

  const [questions,setQuestions]= useState([]);

  const [addQuestionModalVisible,setAddQuestionModalVisible] = useState(false);
  
  const [addQuestionModalLoading,setAddQuestionModalLoading] = useState(false);


  const onChangeType = e => {
    let form = formRef.current.form;
    form.setFieldsValue({ type: e.target.value });
  };

  const formRef = useRef(null);

  const getQuestionsList = async () => {
    const result = await getQuestions()
    const { data, status } = result.data;
      if (status === 0) {
        setLoading(false);
        setQuestions(data);
      }
  }

  const handleDelete = (key) => {
    deleteQuestion({key}).then(result => {
      const {status} = result.data;
      if(status === 0){
        message.success("Сәтті өшірілді")
        getQuestionsList();
      }
      
    })
  }  
  const handleCancel = _ => {
    setAddQuestionModalVisible(false);
  };
  const handleAddQuestion = (row) => {
    setAddQuestionModalVisible(true);
   
  };
  const handleAddQuestionOk = _ => {
    let form = formRef.current.form;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      setAddQuestionModalLoading(true);
      addQuestion(values).then((response)=>{
        form.resetFields();
        setAddQuestionModalVisible(false);
        setAddQuestionModalLoading(false);
        message.success("Сабақ сәтті қосылды!");
        getQuestionsList();
      }).catch(e=>{
        message.success("Сәтсіздік қайталап көріңіз!");
      });  
      
    });
  };

  //answer
  const [addAnswerModalVisible,setAddAnswerModalVisible] = useState(false);

  const [addAnswerModalLoading,setAddAnswerModalLoading] = useState(false);
  const [questionActive,setQuestionActive] = useState([]);
  const [answers,setAnswers] = useState([]);

  const handleAnswer = async (row) => {
    const result = await getAnswers({questionId: row.key})
    const { data, status } = result.data;
      if (status === 0) {
        setAnswers(data);
        setQuestionActive(row);
        setAddAnswerModalVisible(true);
      }
   
  };
  const addAnswer=(value)=>{
    let form = formRef.current.form;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if(answers.length>0){

      }
      
      
    });
  }
  const handleAnswersCancel = _ => {
    setAddAnswerModalVisible(false);
  };
  const handleAddAnswersOk = _ => {
    
  };
  
  useEffect(() => {
    getQuestionsList();
  },[]);
  const columns = [
    {
      title: 'Сұрақ',
      dataIndex: 'question',
      key: 'question'
    },
    {
      title: 'Дискриптр',
      dataIndex: 'discp',
      key: 'discp'
    },
    {
      title: 'Балл',
      dataIndex: 'amount',
      key: 'amount'
    },
    {
      title: 'Бағалау критериясы',
      dataIndex: 'criterion',
      key: 'criterion'
    },
    {
      title: 'Жауаптар',
     
      render: row=>{
        return(
          <Button onClick={()=>handleAnswer(row)} download type="primary" icon="down" title="Файлды алу" />
        )
      }
    },
    {
      title: 'Өшіру',
      dataIndex: 'key',
      key: 'key',
      render: id=>{
        return(
          <Button type="primary" icon="delete" title="өту" onClick={handleDelete.bind(null,id)}/>
        )
      }
    },
  ];
  return (
    <DocumentTitle title={"Тақырыптар"}>
      <Spin spinning={loading} tip="жүктеу...">
        <div className="sections-list-container">
        <Button type='primary' onClick={handleAddQuestion}>Сұрақ қосу</Button>
          {
            questions.length > 0 ? <Table columns={columns} dataSource={questions} /> : false
          }
          <AddQuestionForm
            onChangeType={onChangeType}
            wrappedComponentRef={formRef}
            visible={addQuestionModalVisible}
            confirmLoading={addQuestionModalLoading}
            onCancel={handleCancel}
            onOk={handleAddQuestionOk}
          />  
          <AddAnswerForm
            addAnswer={addAnswer}
            answers={answers}
            questionActive={questionActive}
            wrappedComponentRef={formRef}
            visible={addAnswerModalVisible}
            confirmLoading={addAnswerModalLoading}
            onCancel={handleAnswersCancel}
            onOk={handleAddAnswersOk}
          />  
        </div>
        
      </Spin>
    </DocumentTitle>
  );
};

export default Questions;
