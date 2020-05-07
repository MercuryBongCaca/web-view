import request from "@/utils/request";

export function getEmployee() {
  return request({
    url: "/employee/getlist",
    method: "post",
  });
}
export function getAreaList() {
  return request({
    url: "/area/getlist",
    method: "post",
  });
}
export function getCourseList() {
  return request({
    url: "/course/getlist",
    method: "post",
  });
}
export function getTemplateList() {
  return request({
    url: "/course/getTemplateList",
    method: "post",
  });
}
