import React, { useState ,useEffect,useRef} from "react";
import DocumentTitle from "react-document-title";
import { Spin,Table,  Button,message } from "antd";
import { getQuestions, deleteQuestion, addQuestion } from "@/api/question";
import { deleteAnswers } from "@/api/answers";
import AddQuestionModal from './modals/AddQuestionModal';
import AddAnswerModal from './modals/AddAnswerModal';
import "./index.less";

function Questions(props){
  
  const [loading, setLoading] = useState(true);

  const [questions,setQuestions]= useState([]);

  const getQuestionsList = async () => {
    const { match } = props;
    const result = await getQuestions({ examId: match.params.exam })
    const { data, status } = result;
      if (status === 200 && data && data.questions) {
        setLoading(false);
        setQuestions(data.questions);
      }
  }

  const handleDelete = (questionId) => {
    deleteQuestion({ questionId }).then(result => {
      const { status, data } = result;
      if(status === 200 && data.type === 'ok'){
        message.success("Сәтті өшірілді")
        getQuestionsList();
      }
    })
  }  

  //answer
  const [questionActive,setQuestionActive] = useState([]);
  const [answerModalVisible, setAnswerModalVisible] = useState(false);

  const handleAnswer = (question) => {
    setAnswerModalVisible(true);
    setQuestionActive(question);
  }

  const handleAnswerAdd = () => {
    console.log('success add answer');
  }

  const handleQuestionAdd = () => {
    getQuestionsList();
  }

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
      key: 'answers',
      render: row => {
        return(
          <Button onClick={()=> handleAnswer(row)} download type="primary" icon="down" title="Жауаптар" />
        )
      }
    },
    {
      title: 'Өшіру',
      dataIndex: 'id',
      key: 'key',
      render: id=>{
        return(
          <Button type="danger" icon="delete" title="өту" onClick={handleDelete.bind(null,id)}/>
        )
      }
    },
  ];
  return (
    <DocumentTitle title={"Тақырыптар"}>
      <Spin spinning={loading} tip="жүктеу...">
        <div className="sections-list-container">
          <AddQuestionModal onOk={handleQuestionAdd} />
          {
            questions.length > 0 ? <Table columns={columns} dataSource={questions} /> : false
          }
        </div>
        <AddAnswerModal
          modalVisible={answerModalVisible}
          setModalVisible={setAnswerModalVisible}
          onOk={handleAnswerAdd}
          questionActive={questionActive}
          setQuestionActive={setQuestionActive}
        />
      </Spin>
    </DocumentTitle>
  );
};

export default Questions;
