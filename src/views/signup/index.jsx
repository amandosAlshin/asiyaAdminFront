import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Select, Input, Button, message, Spin } from "antd";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import "./index.less";
import { login, getUserInfo } from "@/store/actions";
import { getSubjects } from "@/api/subjects";
import { func } from "prop-types";
const { Option } = Select;
function SignUp(props){
  const { form, token, login, getUserInfo } = props;
  const { getFieldDecorator } = form;

  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState(false);
  const handleChange=(value) =>{
    console.log(`selected ${value}`);
  }
  const handleLogin = (username, password) => {
    setLoading(true);
    login(username, password)
      .then((data) => {
        message.success("Жүйеге ену сәтті аяталды!");
        handleUserInfo(data.token);
      })
      .catch((error) => {
        setLoading(false);
        message.error(error);
      });
  };
  const handleUserInfo = (token) => {
    getUserInfo(token)
      .then((data) => {})
      .catch((error) => {
        message.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        handleLogin(username, password);
      } else {
        console.log("Жүйеге ену қате!");
      }
    });
  };

  if (token) {
    return <Redirect to="/dashboard" />;
  }
  const getSubjectsList = async () => {
    const result = await getSubjects()
    const { data, status } = result.data;
      if (status === 0) {
        setLoading(false);
        setSubjects(data);
      }
  }
  
  getSubjectsList()
  console.log(subjects)
  return (
    <DocumentTitle title={"БЖБ"}>
      <div className="login-container">
        <Form onSubmit={handleSubmit} className="content">
          <div className="title">
            <h2>Тіркелу</h2>
          </div>
          <Spin spinning={loading} tip="жүктеу...">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "Аты жөніңіз",
                  },
                ],
              })(
                <Input
                  placeholder="Аты жөніңіз"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("login", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "логин ді толтырыңыз",
                  },
                ],
              })(
                <Input
                  placeholder="Логин"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "кілт сөзді толтырыңыз",
                  },
                ],
              })(
                <Input
                  type="password"
                  placeholder="Кілт сөз"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("passwordRepeat", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "кілт сөзді қайталаңыз",
                  },
                ],
              })(
                <Input
                  type="password"
                  placeholder="Кілт сөзді қайталаңыз"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("subjects", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "Сабақтарды таңдаңыз",
                  },
                ],
              })(
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Сабақтар"
                  onChange={handleChange}
                >
                  {
                    subjects.type === "ok" ? 
                      subjects.subjects.map(function(item){
                        return <Option key={item.sId}>{item.cName} {item.sName}</Option>
                      })
                    :
                      false
                  }
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Тіркелу
              </Button>
              <Button
                onClick={()=>props.history.push("/login")}
                className="login-form-button"
              >
                Мен тіркелгенмін!
              </Button>
            </Form.Item>
          </Spin>
        </Form>
      </div>
    </DocumentTitle>
  );
};

const WrapSignup = Form.create()(SignUp);

export default connect((state) => state.user, { login, getUserInfo })(
  WrapSignup
);
