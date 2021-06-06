import React, { useState ,useEffect,useRef} from "react";
import DocumentTitle from "react-document-title";
import { Spin,Table,  Button,message } from "antd";
import { getLessons, deleteLesson, addLesson } from "@/api/lesson";
import AddLessonForm from "./forms/add-lesson-form"
import "./index.less";

const apiUrl = process.env.REACT_APP_BASE_API;

function Lessons(props){
  console.log(props.match.params.section);
  const columns = [
    {
      title: 'Аты',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Файл',
      dataIndex: 'file',
      key: 'file',
      render: file => {
        return(
          <a target="_blank" rel="noopener noreferrer" download href={`${apiUrl}${file}`}>
            <Button download type="primary" icon="down" title="Файлды алу" />
          </a>
        )
      }
    },
    {
      title: 'Өшіру',
      dataIndex: 'id',
      key: 'key',
      render: id => {
        return(
          <Button type="primary" icon="delete" title="өту" onClick={handleDelete.bind(null,id)}/>
        )
      }
    },
  ];
  const [loading, setLoading] = useState(true);
  const [lessons,setLessons]= useState([]);
  const [addLessonModalVisible,setAddLessonModalVisible] = useState(false);
  const [addLessonModalLoading,setAddLessonModalLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState();
  
  const formRef = useRef(null);

  const getLessonsList = async () => {
    const { match } = props;
    console.log({ match });
    const result = await getLessons({ sectionId: match.params.section })
    const { data, status } = result;
      if (status === 200 && data) {
        setLoading(false);
        setLessons(data.topics);
      }
  }

  const handleDelete = (topicId) => {
    deleteLesson({ topicId  }).then(result => {
      const { status, data } = result;
      if(status === 200 && data && data.type === 'ok') {
        message.success("Сәтті өшірілді")
        getLessonsList();
      }
      
    })
  }  
  const handleCancel = _ => {
    setAddLessonModalVisible(false);
  };
  const handleAddLesson = (row) => {
    setAddLessonModalVisible(true);
   
  };
  const handleAddLessonOk = _ => {
   
    let form = formRef.current.form;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (!fileUrl) {
        message.error("Сіз файл таңдамадыңыз!");
      }
      setAddLessonModalLoading(true);
      const body = {
        file: fileUrl,
        sectionId: props.match.params.section,
        name: values.name,
      }
      addLesson(body).then((response)=>{
        form.resetFields();
        setAddLessonModalVisible(false);
        setAddLessonModalLoading(false);
        message.success("Сабақ сәтті қосылды!");
        getLessonsList();
      }).catch(e=>{
        message.success("Сәтсіздік қайталап көріңіз!");
      });  
      
    });
  };
  const draggerProps = () => {
    return {
      name: 'sampleFile',
      multiple: false,
      action: `${apiUrl}api/upload/topicfile`,
      onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          console.log({ info });
          message.success(`${info.file.name} Файл сәтті жүктелді.`);
          setFileUrl(info.file.response.path);
        } else if (status === 'error') {
          message.error(`${info.file.name} Файлды жүктеу кезінде сәтсіздік орын алды.`);
        }
      },
    };
  };
  useEffect(() => {
    getLessonsList();
  },[]);
  return (
    <DocumentTitle title={"Тақырыптар"}>
      <Spin spinning={loading} tip="жүктеу...">
        <div className="sections-list-container">
        <Button type='primary' onClick={handleAddLesson}>Сабақ қосу</Button>
          {
            lessons.length > 0 ? <Table columns={columns} dataSource={lessons} /> : false
          }
          <AddLessonForm
            draggerProps={draggerProps}
            wrappedComponentRef={formRef}
            visible={addLessonModalVisible}
            confirmLoading={addLessonModalLoading}
            onCancel={handleCancel}
            onOk={handleAddLessonOk}
          />  
        </div>
        
      </Spin>
    </DocumentTitle>
  );
};

export default Lessons;
