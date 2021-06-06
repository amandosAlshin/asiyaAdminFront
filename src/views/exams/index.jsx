import React, { useState ,useEffect,useRef} from "react";
import { Link } from "react-router-dom";
import DocumentTitle from "react-document-title";
import { Spin,Table, Button,message } from "antd";
import { getExams, deleteExam, addExam } from "@/api/exam";
import AddExamForm from "./forms/add-exam-form"
import "./index.less";

function Exams(props){
  const columns = [
    {
      title: 'Аты',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Бөлім',
      dataIndex: 'sectionName',
      key: 'sectionName',
    },
    {
      title: 'Сынып',
      dataIndex: 'className',
      key: 'className',
    },
    {
      title: 'Құрастырылған күн',
      dataIndex: 'dateCreate',
      key: 'dateCreate',
    },
    {
      title: 'Уақыты',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Сұрақтар',
      dataIndex: 'qCount',
      key: 'qCount',
      render: id=>{
        return(
          <Link to={`/questions/${id}`}><Button type="primary" icon="right" title="өту" /></Link>
        )
      }
    },
    {
      title: 'Тапсырғандар',
      dataIndex: 'qCount',
      key: 'qCount',
      render: id=>{
        return(
          <Link to={`/finished/${id}`}><Button type="primary" icon="right" title="өту" /></Link>
        )
      }
    },
    {
      title: 'Сілтеме',
      dataIndex: 'link',
      key: 'link',
      render: link=>{
        return(
          <Link to={link}>{link}</Link>
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
  const [loading, setLoading] = useState(true);

  const [exams,setExams]= useState([]);

  const [addExamModalVisible,setAddExamModalVisible] = useState(false);
  
  const [addExamModalLoading,setAddExamModalLoading] = useState(false);
  
  const formRef = useRef(null);

  const getExamsList = async () => {
    const result = await getExams()
    const { data, status } = result.data;
      if (status === 0) {
        setLoading(false);
        setExams(data);
      }
  }

  const handleDelete = (key) => {
    deleteExam({key}).then(result => {
      const {status} = result.data;
      if(status === 0){
        message.success("Сәтті өшірілді")
        getExamsList();
      }
      
    })
  }  
  const handleCancel = _ => {
    setAddExamModalVisible(false);
  };
  const handleAddLesson = (row) => {
    setAddExamModalVisible(true);
   
  };
  const handleAddLessonOk = _ => {
   
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
        message.success("БЖБ сәтті қосылды!");
        getExamsList();
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
  useEffect(() => {
    getExamsList();
  },[]);
  return (
    <DocumentTitle title={"БЖБ"}>
      <Spin spinning={loading} tip="жүктеу...">
        <div className="sections-list-container">
        <Button type='primary' onClick={handleAddLesson}>БЖБ қосу</Button>
          {
            exams.length > 0 ? <Table columns={columns} dataSource={exams} /> : false
          }
          <AddExamForm
            onChangeSection = {onChangeSection}
            onChangeClass = {onChangeClass}
            wrappedComponentRef={formRef}
            visible={addExamModalVisible}
            confirmLoading={addExamModalLoading}
            onCancel={handleCancel}
            onOk={handleAddLessonOk}
          />  
        </div>
      </Spin>
    </DocumentTitle>
  );
};

export default Exams;
