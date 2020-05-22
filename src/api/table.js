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

export function InsertCourseType(data) {
  return request({
    url: "/api/Course/InsertCourseType",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function UpdateCourseType(data) {
  return request({
    url: "/api/Course/UpdateCourseType",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function deleteCourseType(data) {
  return request({
    url: "/api/Course/DeleteCourseType",
    method: "post",
    data: data,
    headers: headers,
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

export function GetCourseList() {
  return request({
    url: "/api/Course/CourseSelectList",
    method: "get",
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

export function InsertCoursePrice(data) {
  return request({
    url: "/api/Course/InsertCoursePrice",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function UpdateCoursePrice(data) {
  return request({
    url: "/api/Course/UpdateCoursePrice",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function deleteCoursePrice(data) {
  return request({
    url: "/api/Course/DeleteCoursePrice",
    method: "post",
    data: data,
    headers: headers,
  });
}
