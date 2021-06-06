import React, { useState ,useEffect,useRef} from "react";
import { Link } from "react-router-dom";
import DocumentTitle from "react-document-title";
import { Spin,Table, Button,message } from "antd";
import { getExams, deleteExam, addExam } from "@/api/exam";
import AddExamModal from './modals/AddExamModal';
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
      dataIndex: 'sName',
      key: 'sectionName'
    },
    {
      title: 'Сынып',
      dataIndex: 'cName',
      key: 'className',
    },
    {
      title: 'Құрастырылған күн',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: dateCreated => {
        const date = new Date(dateCreated);
        return <span>{((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear()}</span>
      }
    },
    {
      title: 'Уақыты',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Сұрақтар',
      // dataIndex: 'qCount',
      key: 'qCount',
      render: row => {
        console.log({ row });
        return(
          <Link to={`/questions/${row.id}`}><Button type="primary" icon="right" title="өту" />{row.qCount}</Link>
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
      dataIndex: 'id',
      key: 'key',
      render: id=>{
        return(
          <Button type="danger" icon="delete" title="өту" onClick={handleDelete.bind(null,id)}/>
        )
      }
    },
  ];
  const [loading, setLoading] = useState(true);

  const [exams,setExams]= useState([]);

  const getExamsList = async () => {
    const result = await getExams()
    const { data, status } = result;
    if (status === 200 && data && data.exams) {
      setLoading(false);
      setExams(data.exams);
    } else {

    }
  }

  const handleDelete = (examId) => {
    deleteExam({ examId }).then(result => {
      const { status } = result;
      if(status === 200){
        message.success("Сәтті өшірілді")
        getExamsList();
      }
      
    })
  }
  const handleAddExamOk = () => {
    getExamsList();
  }

  // const onChangeClass = _ => {
  //   let form = formRef.current.form;
  //   form.setFieldsValue({ className: 1 });
  // }
  // const onChangeSection = _ => {
  //   let form = formRef.current.form;
  //   form.setFieldsValue({ sectionName: 1 });
  // }
  useEffect(() => {
    getExamsList();
  },[]);
  return (
    <DocumentTitle title={"БЖБ"}>
      <Spin spinning={loading} tip="жүктеу...">
        <div className="sections-list-container">
        <div class="btn-actions">
          <AddExamModal onOk={handleAddExamOk} />
        </div>
          {
            exams.length > 0 ? <Table rowKey="id" columns={columns} dataSource={exams} /> : false
          }
          
        </div>
      </Spin>
    </DocumentTitle>
  );
};

export default Exams;
