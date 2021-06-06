const sections = [
  {
    key: 0,
    name: 'Компьютер мен желілердің техникалық сипаттамалары',
    lesson: "32",
    test: true,
  },
  {
    key: 1,
    name: 'Ақпаратты электронды кестелерде өңдеу',
    lesson: 32,
    test: false,
  },
  {
    key: 2,
    name: 'Программалау жүйелері',
    lesson: 32,
    test: true,
  },
];

export default {
  getSections: () => {
    return {
      status: 0,
      data: sections,
    };
  },
  deleteSection: (config) => {
    const {key} = JSON.parse(config.body);
    const item = sections.filter((item) => item.key === key);
    const index = sections.indexOf(item[0]);
    sections.splice(index, 1);
    return {
      status: 0,
    };
  },
  addSection: (config) => {
    const {name} = JSON.parse(config.body);
    sections.push({key: sections.length,name: name,lesson: 0,test: false});
    return {
      status: 0,
    };
  }
};
