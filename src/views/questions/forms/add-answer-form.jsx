import React, { useImperativeHandle, useState, useEffect } from "react";
import { Form, Input, Icon, Radio, Modal, Select, Button, Checkbox } from "antd";
// import { getAnswers } from "@/api/answers";

let id = 0;
const { Option } = Select;
const AddAnswerForm = Form.create({
  name: "addAnswerForm"
})(
React.forwardRef((props, ref) => {
  const {
    visible,
    onCancel,
    onOk,
    form,
    questionActive,
    answers,
    confirmLoading,
  } = props;
  const { getFieldDecorator, getFieldValue } = form;
  const [ newAnswer, setNewAnswer] = useState('');
  const [ isTrueAnswer, setIsTrueAnswer ] = useState(false);

  useImperativeHandle(ref, () => ({
    form
  }));
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };
  getFieldDecorator('answers', { initialValue: answers.map((x) => x.id) });
  const answerList = getFieldValue('answers');
  const formItems = answerList.map((k, index) => (
    <Form.Item
      {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
      label={index === 0 ? 'Жауаптар' : ''}
      required={false}
      key={k}
    >
      {getFieldDecorator(`names[${k}]`, {
        validateTrigger: ['onChange', 'onBlur'],
        rules: [
          {
            required: true,
            whitespace: true,
            message: "Жауаптарды енгізіңізді сұраймыз.",
          },
        ],
        initialValue: answers[index].answer,
      })(<Input placeholder="Жауап" style={{ width: '60%', marginRight: 8 }} />)}
      {answerList.length > 1 ? (
        <Icon
          className="dynamic-delete-button"
          type="minus-circle-o"
          onClick={() => remove(k)}
        />
      ) : null}
    </Form.Item>
  ));

  const remove = k => {
    // can use data-binding to get
    const answers = form.getFieldValue('answers');
    // We need at least one passenger
    if (answers.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      answers: answers.filter(key => key !== k),
      trueAnswer: null,
    });
  };

  const add = () => {
    const answers = form.getFieldValue('answers');
    const nextAnswers = answers.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      answers: nextAnswers,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  const initialTrue = () => {
    if (!answers) return null;
    const index = answers.findIndex(x => x.trueAnswer)
    if (index !== -1) return null;
    return index;
  }

  return (
    <Modal
      title={questionActive.question}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={confirmLoading}
      okText={"Сақтау"}
      cancelText={"Жабу"}
    >
    <div>
      <Form onSubmit={handleSubmit}>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={add} style={{ width: '60%' }}>
            <Icon type="plus" /> Жауап қосу
          </Button>
        </Form.Item>
        <Form.Item label="Дұрыс жауап">
          {getFieldDecorator("trueAnswer", {
                rules: [
                  {
                    required: true,
                    message: "Дұрыс жауап таңдаңыз",
                  },
                ],
                initialValue: initialTrue(),
              })(
                <Radio.Group
                  placeholder="Дұрыс жауап"
                  // value={initialTrue()}
                  onChange={(value) => form.setFieldsValue({ trueAnswer: value })}
                >
                  {
                     answerList &&
                      answerList.map(function(item, i) {
                        return <Radio key={item} value={i} >{i + 1} жауап</Radio>
                      })
                  }
                </Radio.Group>
              )}
        </Form.Item>
      </Form>
    </div>
    </Modal>
  );
}))

export default AddAnswerForm;
