import request from "@/utils/request";
var headers = {
  "Content-Type": "application/json;charset=utf-8",
};
export function getList(data) {
  return request({
    url: "/api/table/list",
    method: "post",
    data,
  });
}

export function getCourseList(data) {
  return request({
    url: "/api/Course/CourseList",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function GetCourseTypeList() {
  return request({
    url: "/api/Course/CourseTyperList",
    method: "get",
  });
}

export function InsertCourse(data) {
  return request({
    url: "/api/Course/InsertCourse",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function UpdateCourse(data) {
  return request({
    url: "/api/Course/UpdateCourse",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function deleteCourse(data) {
  return request({
    url: "/api/Course/DeleteCourse",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function getCoursePriceList(data) {
  return request({
    url: "/api/Course/CoursePriceList",
    method: "post",
    data: data,
    headers: headers,
  });
}
