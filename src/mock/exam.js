const exams = [
  {
    key: 0,
    sectionName: 'Компьютер мен желілердің техникалық сипаттамалары',
    name: "exam 1-1",
    time: 30,
    qCount: 15,
    dateCreate: "13.04.21",
    className: "Информатика 2 сынып",
    link: "/f3fdf4ffdsskk5"
  },
  {
    key: 1,
    sectionName: 'Компьютер мен желілердің техникалық сипаттамалары',
    name: "exam 2-1",
    time: 30,
    qCount: 15,
    dateCreate: "13.04.21",
    className: "Информатика 2 сынып",
    link: "/f3fdf4ffdsskk5"
  },
  {
    key: 2,
    sectionName: 'Компьютер мен желілердің техникалық сипаттамалары',
    name: "exam 3-1",
    time: 30,
    qCount: 15,
    dateCreate: "13.04.21",
    className: "Информатика 2 сынып",
    link: "/f3fdf4ffdsskk5"
  },
];

export default {
  getExams: () => {
    return {
      status: 0,
      data: exams,
    };
  },
  deleteExam: (config) => {
    const {key} = JSON.parse(config.body);
    const item = exams.filter((item) => item.key === key);
    const index = exams.indexOf(item[0]);
    exams.splice(index, 1);
    return {
      status: 0,
    };
  },
  addExam: (config) => {
    const {name,sectionName,className,time} = JSON.parse(config.body);
    exams.push({key: exams.length,name: name,className: className, sectionName: sectionName,time: time,qCount: 0,dateCreate: Date.now(), link: "/f3fdf4ffdsskk5"});
    return {
      status: 0,
    };
  }
};
