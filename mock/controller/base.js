const employeeData = [
  { Name: "李老师A", EmployeeID: "1" },
  { Name: "王老师", EmployeeID: "2" },
  { Name: "孙老师", EmployeeID: "3" },
];
const areaData = [
  { Name: "教室A", AreaID: "1" },
  { Name: "教室B", AreaID: "2" },
];
const courseData = [
  { Name: "吉他", CourseID: "1", Min: 70 },
  { Name: "架子鼓", CourseID: "2", Min: 60 },
];
const scheduleTemplateData = [
  {
    Name: "按周课表A",
    TemplateID: "1",
    Type: 1,
    TemplateData:
      "[{\"title\":\"星期一\",\"data\":[{\"StartTime\":\"18:23\",\"EndTime\":\"18:41\",\"AreaID\":\"2\",\"CourseID\":\"2\",\"EmployeeID\":\"3\",\"diff\":18}]},{\"title\":\"星期二\",\"data\":[]},{\"title\":\"星期三\",\"data\":[]},{\"title\":\"星期四\",\"data\":[]},{\"title\":\"星期五\",\"data\":[]},{\"title\":\"星期六\",\"data\":[]},{\"title\":\"星期日\",\"data\":[]}]",
  },
  {
    Name: "按天课表B",
    TemplateID: "2",
    Type: 2,
    TemplateData:
      "[{\"title\":\"Day\",\"data\":[{\"StartTime\":\"15:15\",\"EndTime\":\"15:15\",\"AreaID\":\"1\",\"CourseID\":\"1\",\"EmployeeID\":\"2\",\"diff\":0}]}]",
  },
];

export default [
  {
    url: "/course/getTemplateList",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "success",
        totalCount: 999,
        data: scheduleTemplateData,
      };
    },
  },
  {
    url: "/employee/getlist",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "success",
        totalCount: 999,
        data: employeeData,
      };
    },
  },
  {
    url: "/area/getlist",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "success",
        totalCount: 999,
        data: areaData,
      };
    },
  },
  {
    url: "/course/getlist",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "success",
        totalCount: 999,
        data: courseData,
      };
    },
  },
];
