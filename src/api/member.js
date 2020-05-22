import request from "@/utils/request";
var headers = {
  "Content-Type": "application/json;charset=utf-8",
};

export function getMemberList(data) {
  return request({
    url: "/api/Member/MemberList",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function InsertMember(data) {
  return request({
    url: "/api/Member/InsertMember",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function UpdateMember(data) {
  return request({
    url: "/api/Member/UpdateMember",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function deleteMember(data) {
  return request({
    url: "/api/Member/DeleteMember",
    method: "post",
    data: data,
    headers: headers,
  });
}
