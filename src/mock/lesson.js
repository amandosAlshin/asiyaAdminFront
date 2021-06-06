const lessons = [
  {
    key: 0,
    name: 'Компьютер мен желілердің техникалық сипаттамалары',
    file: "32",
  },
  {
    key: 1,
    name: 'Ақпаратты электронды кестелерде өңдеу',
    file: 32,
  },
  {
    key: 2,
    name: 'Программалау жүйелері',
    file: 32,
  },
];

export default {
  getLessons: () => {
    return {
      status: 0,
      data: lessons,
    };
  },
  deleteLesson: (config) => {
    const {key} = JSON.parse(config.body);
    const item = lessons.filter((item) => item.key === key);
    const index = lessons.indexOf(item[0]);
    lessons.splice(index, 1);
    return {
      status: 0,
    };
  },
  addLesson: (config) => {
    const {name} = JSON.parse(config.body);
    lessons.push({key: lessons.length,name: name,file: "https://drive.google.com/file/d/1puxJbWzTRVf4v9f-DHjsf742W0ZSgjQn/view?usp=sharing"});
    return {
      status: 0,
    };
  }
};
