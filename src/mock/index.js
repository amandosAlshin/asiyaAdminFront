import Mock from "mockjs";
import loginAPI from "./login";
import excelAPI from "./excel";
import tableAPI from "./table";
import sectionAPI from "./section";
import lessonAPI from "./lesson";
import examAPI from "./exam";
import classAPI from "./class";
import questionAPI from "./question";
import answersAPI from "./answers";

Mock.mock(/\/login/, "post", loginAPI.login);
Mock.mock(/\/logout/, "post", loginAPI.logout);
Mock.mock(/\/userInfo/, "post", loginAPI.userInfo);
Mock.mock(/\/user\/list/, "get", loginAPI.getUsers);
Mock.mock(/\/user\/delete/, "post", loginAPI.deleteUser);
Mock.mock(/\/user\/edit/, "post", loginAPI.editUser);
Mock.mock(/\/user\/validatUserID/, "post", loginAPI.ValidatUserID);
Mock.mock(/\/user\/add/, "post", loginAPI.addUser);



// excel
Mock.mock(/\/excel\/list/, "get", excelAPI.excelList);

// table
Mock.mock(/\/table\/list/, "post", tableAPI.tableList);
Mock.mock(/\/table\/delete/, "post", tableAPI.deleteItem);
Mock.mock(/\/table\/edit/, "post", tableAPI.editItem);

// sections
Mock.mock(/\/section\/list/, "get", sectionAPI.getSections);
Mock.mock(/\/section\/delete/, "post", sectionAPI.deleteSection);
Mock.mock(/\/section\/add/, "post", sectionAPI.addSection);

// lessons
Mock.mock(/\/lesson\/list/, "get", lessonAPI.getLessons);
Mock.mock(/\/lesson\/delete/, "post", lessonAPI.deleteLesson);
Mock.mock(/\/lesson\/add/, "post", lessonAPI.addLesson);

// exams
Mock.mock(/\/exam\/list/, "get", examAPI.getExams);
Mock.mock(/\/exam\/delete/, "post", examAPI.deleteExam);
Mock.mock(/\/exam\/add/, "post", examAPI.addExam);

// classes
Mock.mock(/\/classes\/list/, "get", classAPI.getClasses);
Mock.mock(/\/class\/delete/, "post", classAPI.deleteClass);
Mock.mock(/\/class\/add/, "post", classAPI.addClass);

// question
Mock.mock(/\/question\/list/, "get", questionAPI.getQuestions);
Mock.mock(/\/question\/delete/, "post", questionAPI.deleteQuestion);
Mock.mock(/\/question\/add/, "post", questionAPI.addQuestion);

// answer
Mock.mock(/\/answer\/list/, "post", answersAPI.getAnswers);
Mock.mock(/\/answer\/delete/, "post", answersAPI.deleteAnswer);
Mock.mock(/\/answer\/add/, "post", answersAPI.addAnswer);


export default Mock;
