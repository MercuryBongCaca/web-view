import request from "@/utils/request";
var headers = {
  "Content-Type": "application/json;charset=utf-8",
};

export function getEmployee(data) {
  return request({
    url: "api/Employee/GetEmployeeSelectList",
    method: "post",
    data: data,
    headers: headers,
  });
}
export function getAreaList() {
  return request({
    url: "/api/Area/AreaList",
    method: "post",
  });
}
export function getCourseList() {
  return request({
    url: "/api/Course/CourseSelectList",
    method: "get",
  });
}
export function getTemplateList() {
  return request({
    url: "/course/getTemplateList",
    method: "post",
  });
}
export function getPaymentTypeList(data) {
  return request({
    url: "/api/Dictionaries/DictionariesList",
    method: "post",
    data: data,
    headers: headers,
  });
}
export function getContractStatusList() {
  return request({
    url: "/system/getContractStatus",
    method: "post",
  });
}
