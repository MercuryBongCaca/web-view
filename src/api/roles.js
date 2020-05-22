import request from "@/utils/request";
var headers = {
  "Content-Type": "application/json;charset=utf-8",
};

export function getRolesList(data) {
  return request({
    url: "/api/Roles/RolesList",
    method: "get",
    data: data,
    headers: headers,
  });
}

export function InsertRoles(data) {
  return request({
    url: "/api/Roles/InsertRoles",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function UpdateRoles(data) {
  return request({
    url: "/api/Roles/UpdateRoles",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function deleteRoles(data) {
  return request({
    url: "/api/Roles/DeleteRoles",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function getAuthorityList(data) {
  return request({
    url: "/api/Roles/AuthorityList",
    method: "post",
    data: data,
    headers: headers,
  });
}
