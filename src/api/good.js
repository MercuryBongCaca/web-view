import request from "@/utils/request";
var headers = {
  "Content-Type": "application/json;charset=utf-8",
};

export function GetGoodTypeList(data) {
  return request({
    url: "/api/Good/GoodTypeList",
    method: "get",
    data: data,
    headers: headers,
  });
}

export function InsertGoodType(data) {
  return request({
    url: "/api/Good/InsertGoodType",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function UpdateGoodType(data) {
  return request({
    url: "/api/Good/UpdateGoodType",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function deleteGoodType(data) {
  return request({
    url: "/api/Good/DeleteGoodType",
    method: "post",
    data: data,
    headers: headers,
  });
}
