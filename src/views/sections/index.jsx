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
      dataIndex: 'lesson',
      key: 'lesson',
      render: id=>{
        return(
          <Link to={`/lessons/${id}`}><Button type="primary" icon="right" title="өту" /></Link>
        )
      }
    },
    {
      title: 'БЖБ',
      key: 'test',
      dataIndex: 'test',
      render: test => {
        let color = test === true ? 'green' : 'geekblue';
        return (
          <Tag color={color} key={test}>
            {test === true ? 'БЖБ құрастырылған' : 'БЖБ құрастырылмаған'}
          </Tag>
        );
      }
    },
    {
      title: 'Өшіру',
      key: 'key',
      render: (record) => {
      return(
          <Button type="primary" shape="circle" icon="delete" title="Өшіру" onClick={handleDelete.bind(null,record.key)}/>
      )},
    },
  ];
  const [loading, setLoading] = useState(true);

  const [sections,setSections]= useState([]);

  const [addUserModalVisible,setAddUserModalVisible] = useState(false);
  
  const [addUserModalLoading,setAddUserModalLoading] = useState(false);
  
  const formRef = useRef(null);

  const getSectionsList = async () => {
    const result = await getSections()
    const { data, status } = result.data;
      if (status === 0) {
        setLoading(false);
        setSections(data);
      }
  }

  const handleDelete = (key) => {
    deleteSection({key}).then(result => {
      const {status} = result.data;
      if(status === 0){
        message.success("Сәтті өшірілді")
        getSectionsList();
      }
      
    })
  }  
  const handleCancel = _ => {
    setAddUserModalVisible(false);
  };
  const handleAddUser = (row) => {
    setAddUserModalVisible(true);
   
  };
  const handleAddUserOk = _ => {
   
    let form = formRef.current.form;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      setAddUserModalLoading(true);
      addSection(values).then((response)=>{
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
  useEffect(() => {
    getSectionsList();
  },[]);
  return (
    <DocumentTitle title={"Информатика 1 сынап бөлімдер"}>
      <Spin spinning={loading} tip="жүктеу...">
        <div className="sections-list-container">
        <Button type='primary' onClick={handleAddUser}>Бөлім қосу</Button>
          {
            sections.length > 0 ? <Table columns={columns} dataSource={sections} /> : false
          }
          <AddSectionForm
            wrappedComponentRef={formRef}
            visible={addUserModalVisible}
            confirmLoading={addUserModalLoading}
            onCancel={handleCancel}
            onOk={handleAddUserOk}
          />  
        </div>
        
      </Spin>
    </DocumentTitle>
  );
};

export default Sections;
