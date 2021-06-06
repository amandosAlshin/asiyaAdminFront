import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import { Spin, Button, Card, Row, Col, message } from "antd";
import { getClasses, deleteClass, addClass } from "@/api/classes";
import { getUserInfo } from '@/store/actions/user';
import AddClassModal from "./modals/AddClassModal"
import AddSubjectModal from "./modals/AddSubjectModal"
import "./index.less";
import { func } from "prop-types";

const Classes = (props) => {
  const { user } = props;
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const getClassesList = async () => {
    const result = await getClasses()
    const { data, status } = result;
    if (status === 200 && data) {
      setLoading(false);
      setClasses(data.subjects);
    }
  }

  const handleAddSubject = () => {
    alert('add subject');
  }

  const onAddClassOk = () => {
    getClassesList();
  }

  const onAddSubjectOk = () => {
    getClassesList();
  }

  useEffect(() => {
    getClassesList();
  },[]);
  return (
    <DocumentTitle title={"Сыныптар тізімі"}>
      <Spin spinning={loading} tip="жүктеу...">
        <div className=" classes-list-container">
          <Row>
            <Col span={32}>
              <div className="btn-actions">
                { user.role === 'admin' && (<AddClassModal
                  onOk={onAddClassOk}
                />) }
                { user.role === 'admin' && (<AddSubjectModal
                  onOk={onAddSubjectOk}
                />) }
              </div>
            </Col>
          </Row>
          <Row>
            {
              classes.map(function(val) {
                return(
                  <Col span={8} key={val.id}>
                    <Card
                      title={val.cName}
                      bordered={false}
                    >
                      <div><h3>{val.sName}</h3></div> 
                      <Link to={`/sections/${val.sId}`}>
                        <Button type="primary">
                          Бөлімдер
                        </Button>
                      </Link>
                    </Card>   
                  </Col>
                )
              })
            }
          </Row>
        </div>
      </Spin>
    </DocumentTitle>
  );
};

// export default Classes;
export default connect((state) => ({ user: state.user }), null)(Classes);
