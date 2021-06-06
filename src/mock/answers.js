const answers = [
  {
    key: 0,
    questionId: 0,
    data: [
      {
        id: 0,
        answer: 'Daulet',
        trueAnswer: false,
        
      },
      {
        id: 1,
        answer: "Amandos",
        trueAnswer: true,
      },
      {
        id: 2,
        answer: "Jandos",
        trueAnswer: false,
      }
    ],
  },
  {
    key: 1,
    questionId: 1,
    data: [
      {
        id: 0,
        answer: 'Almaty',
        trueAnswer: true,
      },
      {
        id: 1,
        answer: "Astana",
        trueAnswer: false,
      },
      {
        id: 2,
        answer: "Aktau",
        trueAnswer: false,
      }
    ],
  },
  {
    key: 2,
    questionId: 2,
    data: [
      {
        id: 0,
        answer: 'Kulash',
        trueAnswer: true,
      },
    ],
  },
];

export default {
  getAnswers: (config) => {
    const {questionId} = JSON.parse(config.body);
    const data = answers.filter((item) => item.questionId === questionId);
    return {
      status: 0,
      data: data,
    };
  },
  deleteAnswer: (config) => {
    const {key} = JSON.parse(config.body);
    const item = answers.filter((item) => item.key === key);
    const index = answers.indexOf(item[0]);
    answers.splice(index, 1);
    return {
      status: 0,
    };
  },
  addAnswer: (config) => {
    const {questionId,trueAnswer,data} = JSON.parse(config.body);
    answers.push({key: answers.length,questionId: questionId,trueAnswer: trueAnswer, data: data});
    return {
      status: 0,
    };
  }
};
