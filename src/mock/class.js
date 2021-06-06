const classes = [
  {
    key: 0,
    name: '1 сынып',
    subject: "Информатика",
  },
  {
    key: 1,
    name: '2 сынып',
    subject: "АТЖ",
  },
  {
    key: 2,
    name: '4 сынып',
    subject: "Информатика",
  },
];

export default {
  getClasses: () => {
    return {
      status: 0,
      data: classes,
    };
  },
  deleteClass: (config) => {
    const {key} = JSON.parse(config.body);
    const item = classes.filter((item) => item.key === key);
    const index = classes.indexOf(item[0]);
    classes.splice(index, 1);
    return {
      status: 0,
    };
  },
  addClass: (config) => {
    const {name,subject} = JSON.parse(config.body);
    classes.push({key: classes.length,name: name,subject: subject});
    return {
      status: 0,
    };
  }
};
