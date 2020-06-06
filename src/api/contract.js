import request from "@/utils/request";
var headers = {
  "Content-Type": "application/json;charset=utf-8",
};

export function GetContractMemberList(data) {
  return request({
    url: "/api/Member/GetContractMember",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function getContractList(data) {
  return request({
    url: "/api/Contract/ContractList",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function getContractListPaymentList(data) {
  return request({
    url: "/api/Contract/ContractList",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function InsertContract(data) {
  return request({
    url: "/api/Contract/InsertContract",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function UpdateContract(data) {
  return request({
    url: "/api/Contract/UpdateContract",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function deleteContract(data) {
  return request({
    url: "/api/Contract/DeleteContract",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function ContractPayment(data) {
  debugger;
  return request({
    url: "/api/Contract/ContractPayment",
    method: "post",
    data: data,
    headers: headers,
  });
}
