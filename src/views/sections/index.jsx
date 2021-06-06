import React, { useState ,useEffect,useRef} from "react";
import DocumentTitle from "react-document-title";
import { Spin,Table, Tag, Button,message } from "antd";
import { Link } from "react-router-dom";
import { getSections, deleteSection, addSection } from "@/api/section";
import AddSectionForm from "./forms/add-section-form"
import "./index.less";

function Sections(props){
  const columns = [
    {
      title: 'Аты',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Тақырыптар',
      dataIndex: 'id',
      key: 'id',
      render: (id) => {
        return(
          <Link to={`/lessons/${id}`}><Button type="primary" icon="right" title="өту" /></Link>
        )
      }
    },
    {
      title: 'БЖБ',
      key: 'examId',
      dataIndex: 'examId',
      render: examId => {
        let color = examId > 0 ? 'green' : 'geekblue';
        return (
          <Tag color={color} key={examId}>
            {examId > 0 ? 'БЖБ құрастырылған' : 'БЖБ құрастырылмаған'}
          </Tag>
        );
      }
    },
    {
      title: 'Өшіру',
      key: 'key',
      dataIndex: 'id',
      render: (id) => {
      return(
          <Button type="primary" shape="circle" icon="delete" title="Өшіру" onClick={handleDelete.bind(null,id)}/>
      )},
    },
  ];
  const [loading, setLoading] = useState(true);
  const [sections, setSections]= useState([]);
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [addUserModalLoading, setAddUserModalLoading] = useState(false);
  const handleCancel = _ => {
    setAddUserModalVisible(false);
  };
  const handleAddSection = (row) => {
    setAddUserModalVisible(true);
  };
  const handleAddSectionOk = _ => {
    const { match } = props;
   
    let form = formRef.current.form;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      setAddUserModalLoading(true);
      addSection({
        ...values,
        subjectId: match.params.class
      }).then((response)=>{
        form.resetFields();
        setAddUserModalVisible(false);
        setAddUserModalLoading(false);
        message.success("Бөлім сәтті қосылды!");
        getSectionsList();
      }).catch(e=>{
        message.success("Сәтсіздік қайталап көріңіз!");
      });  
      
    });
  };
  const formRef = useRef(null);

  const getSectionsList = async () => {
    const { match } = props;
    const result = await getSections({ subjectsId: match.params.class })
    const { data, status } = result;
      if ((status === 200) && data) {
        setLoading(false);
        setSections(data.sections);
      }
  }

  const handleDelete = (sectionId) => {
    deleteSection({sectionId}).then(result => {
      const { status, data } = result;
      if(status === 200 && data && data.type === "ok") {
        message.success("Сәтті өшірілді")
        getSectionsList();
      }
      
    })
  }  
  useEffect(() => {
    getSectionsList();
  },[]);
  return (
    <DocumentTitle title={"Информатика 1 сынап бөлімдер"}>
      <Spin spinning={loading} tip="жүктеу...">
        <div className="sections-list-container">
        <Button type='primary' onClick={handleAddSection}>Бөлім қосу</Button>
          {
            sections && sections.length !== 0 ? (
              <Table columns={columns} rowKey="id" dataSource={sections} />
            ) : null
          }
          <AddSectionForm
            wrappedComponentRef={formRef}
            visible={addUserModalVisible}
            confirmLoading={addUserModalLoading}
            onCancel={handleCancel}
            onOk={handleAddSectionOk}
          />  
        </div>
        
      </Spin>
    </DocumentTitle>
  );
};

export default Sections;
