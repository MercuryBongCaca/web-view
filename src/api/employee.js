import request from "@/utils/request";
var headers = {
  "Content-Type": "application/json;charset=utf-8",
};

export function getEmployeeList(data) {
  return request({
    url: "/api/Employee/EmployeeList",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function InsertEmployee(data) {
  return request({
    url: "/api/Employee/InsertEmployee",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function UpdateEmployee(data) {
  return request({
    url: "/api/Employee/UpdateEmployee",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function deleteEmployee(data) {
  return request({
    url: "/api/Employee/DeleteEmployee",
    method: "post",
    data: data,
    headers: headers,
  });
}
