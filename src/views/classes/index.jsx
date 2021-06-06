import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import DocumentTitle from "react-document-title";
import { Spin,Button,Card, Row, Col } from "antd";
import { getClasses, deleteClass, addClass } from "@/api/classes";
import "./index.less";
import { func } from "prop-types";

const Classes = (props) => {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);


  const getClassesList = async () => {
    const result = await getClasses()
    const { data, status } = result.data;
      if (status === 0) {
        setLoading(false);
        setClasses(data);
      }
  }
  useEffect(() => {
    getClassesList();
  },[]);
  return (
    <DocumentTitle title={"Сыныптар тізімі"}>
      <Spin spinning={loading} tip="жүктеу...">
        <div className=" classes-list-container">
          <Row>
            {
              classes.map(function(val){
                return(
                  <Col span={8}>
                    <Card
                      title={val.name}
                      bordered={false}
                    >
                      <div><h3>{val.subject}</h3></div> 
                      <Link to='/sections/12342'>
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

export default Classes;
