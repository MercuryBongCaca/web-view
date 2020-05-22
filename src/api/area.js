import request from "@/utils/request";
var headers = {
  "Content-Type": "application/json;charset=utf-8",
};

export function GetAreaList(data) {
  return request({
    url: "/api/Area/AreaList",
    method: "get",
    data: data,
    headers: headers,
  });
}

export function InsertArea(data) {
  return request({
    url: "/api/Area/InsertArea",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function UpdateArea(data) {
  return request({
    url: "/api/Area/UpdateArea",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function deleteArea(data) {
  return request({
    url: "/api/Area/DeleteArea",
    method: "post",
    data: data,
    headers: headers,
  });
}
