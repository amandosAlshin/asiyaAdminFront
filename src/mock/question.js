const questions = [
  {
    key: 0,
    question: 'Компьютер мен желілердің техникалық сипаттамалары',
    discp: "dsfdsfds",
    amount: 30,
    criterion: 15,
    type: 0,

  },
  {
    key: 1,
    question: 'Компьютер мен желілердің техникалық сипаттамалары',
    discp: "dsfdsfds",
    amount: 30,
    criterion: 15,
    type: 0,
  },
  {
    key: 2,
    question: 'Компьютер мен желілердің техникалық сипаттамалары',
    discp: "dsfdsfds",
    amount: 30,
    criterion: 15,
    type: 1,
  },
];

export default {
  getQuestions: () => {
    return {
      status: 0,
      data: questions,
    };
  },
  deleteQuestion: (config) => {
    const {key} = JSON.parse(config.body);
    const item = questions.filter((item) => item.key === key);
    const index = questions.indexOf(item[0]);
    questions.splice(index, 1);
    return {
      status: 0,
    };
  },
  addQuestion: (config) => {
    const {question,discp,amount,criterion,type} = JSON.parse(config.body);
    questions.push({key: questions.length,
      question: question,
      discp: discp, 
      amount: amount,
      criterion: criterion,
      type: type
    });
    return {
      status: 0,
    };
  }
};
