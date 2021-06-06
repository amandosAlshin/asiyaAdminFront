import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Form, Select, Input, Button, message, Spin } from "antd";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import { func } from "prop-types";
import "./index.less";
import { register, getUserInfo } from "@/store/actions";
import { getSubjects } from "@/api/subjects";
import { signUp } from "@/api/user";
const { Option } = Select;

function SignUp(props){
  const { form, token, register, getUserInfo } = props;

  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState(false);

  // const [ form ] = Form.useForm()
  const { getFieldDecorator } = form;

  const handleChange=(value, name) =>{
    console.log(`selected ${value} ${name}`);
    form.setFieldsValue({ "subjects" : value });
  }

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
        const { fullname, password } = values;
        // handleRegister(username, password);
        console.log({ values })
        register(values)
          .then(res => {
            if (res.type === "ok" && res.token) {
              message.success("Жүйеге тіркелу сәтті аяталды!");
              handleUserInfo(res.token);
            }
          })
          .catch((error) => {
            console.log({ error });
            setLoading(false);
            message.error(error);
          });
      } else {
        console.log("Жүйеге ену қате!");
      }
    });
  };


  const getSubjectsList = async () => {
    const result = await getSubjects()
    const { data, status } = result;
    console.log({ data, status, result })
    if (status === 200 && data && data.subjects) {
      setLoading(false);
      setSubjects(data.subjects);
    } else {
      alert('Сабақтар алу қатесі орын алды')
    }
  }

  useEffect(() => {
    getSubjectsList()
  }, [])


  if (token) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <DocumentTitle title={"БЖБ"}>
      <div className="login-container">
        <Form onSubmit={handleSubmit} className="content">
          <div className="title">
            <h2>Тіркелу</h2>
          </div>
          <Spin spinning={loading} tip="жүктеу...">
            <Form.Item>
              {getFieldDecorator("fullname", {
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
              {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    type: "email",
                    message: "Email дұрыс емес",
                  },
                ],
              })(
                <Input
                  placeholder="Email"
                  name="email"
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
                  name="password"
                  placeholder="Кілт сөз"
                />
              )}
            </Form.Item>
{/*            <Form.Item>
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
                  type="passwordRepeat"
                  name="passwordRepeat"
                  placeholder="Кілт сөзді қайталаңыз"
                />
              )}
            </Form.Item>
*/}            <Form.Item>
              {getFieldDecorator("subjects", {
                rules: [
                  {
                    required: true,
                    message: "Сабақтарды таңдаңыз",
                  },
                ],
              })(
                <Select
                  mode="multiple"
                  allowClear
                  name="subjects"
                  style={{ width: '100%' }}
                  placeholder="Сабақтар"
                  onChange={(value) => handleChange(value, 'subjects')}
                >
                  {
                    subjects && 
                      subjects.map(function(item){
                        return <Option key={item.sId}>{item.cName} {item.sName}</Option>
                      })
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

const SingUpWrapper = Form.create()(SignUp);

export default connect((state) => state.user, { register, getUserInfo })(
  SingUpWrapper
);
