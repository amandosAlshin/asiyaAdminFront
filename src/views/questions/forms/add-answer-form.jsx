import React, { useImperativeHandle } from "react";
import { Form, Input, Radio, Modal,Space, Button} from "antd";
const AddAnswerForm = Form.create({
  name: "addAnswerForm"
})(
React.forwardRef((props, ref) => {
  const { visible,onCancel,addAnswer, onOk, form, questionActive,answers,confirmLoading } = props;
  const { getFieldDecorator } = form;

  useImperativeHandle(ref, () => ({
    form
  }));
  const formItemLayout = {
    labelCol: {
      sm: { span: 8 },
    },
    wrapperCol: {
      sm: { span: 10 },
    },
  };
  // console.log(questionActive,answers);
  //type, question, 
  return (
    <Modal
      title={questionActive.question+" Компьютер мен желілердің техникалық сипаттамалар Компьютер мен желілердің техникалық сипаттамалар"}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={confirmLoading}
      okText={"Сақтау"}
      cancelText={"Жабу"}
    >
        
      {
        answers.length > 0 ?
            questionActive.type === 0 ? 
              <div>
                {/* <Radio.Group value={answers.filter(()=>{return trueAnswer === true})}>
                    {
                      answers.map(function(item){
                        return(
                          <div key={item.id}>
                             <Radio  value={item.id}>{item.answer}</Radio>
                             <br />
                          </div>
                          
                        )
                      })      
                    }
                </Radio.Group>
                <div style={{margin: '10px 0px'}}>
                  <Form.Item label="Жауап қосу:">
                    {getFieldDecorator("answer", {
                      
                    })(<Input  />)}
                  </Form.Item>
                  <Button  onClick={addAnswer}>Жауап қосу</Button>
                </div> */}
              </div>
                
            :
                <Input value={answers.answer}/> 
        : 
            questionActive.type === 0 ? 
              <Button onClick={addAnswer}>Жауап қосу</Button>
            :
              <Input />
      }
    </Modal>
  );
}))

export default AddAnswerForm;
