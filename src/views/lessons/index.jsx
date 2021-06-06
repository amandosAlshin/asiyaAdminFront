import React, { useState ,useEffect,useRef} from "react";
import DocumentTitle from "react-document-title";
import { Spin,Table,  Button,message } from "antd";
import { getLessons, deleteLesson, addLesson } from "@/api/lesson";
import AddLessonForm from "./forms/add-lesson-form"
import "./index.less";

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
      dataIndex: 'fail',
      key: 'fail',
      render: file=>{
        return(
          <a target="_blank" rel="noopener noreferrer" download href='https://cdn.cliqueinc.com/posts/219559/italian-fashion-girl-wardrobe-219559-1508970166637-main.700x0c.jpg'>
            <Button download type="primary" icon="down" title="Файлды алу" />
          </a>
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

  const [lessons,setLessons]= useState([]);

  const [addLessonModalVisible,setAddLessonModalVisible] = useState(false);
  
  const [addLessonModalLoading,setAddLessonModalLoading] = useState(false);
  
  const formRef = useRef(null);

  const getLessonsList = async () => {
    const result = await getLessons()
    const { data, status } = result.data;
      if (status === 0) {
        setLoading(false);
        setLessons(data);
      }
  }

  const handleDelete = (key) => {
    deleteLesson({key}).then(result => {
      const {status} = result.data;
      if(status === 0){
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
      setAddLessonModalLoading(true);
      addLesson(values).then((response)=>{
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
      name: 'file',
      multiple: false,
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} Файл сәтті жүктелді.`);
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
