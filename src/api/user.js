import request from "@/utils/request";
import { encryptedData } from "@/utils/encrypt";
import { getPublicKey } from "@/api/publicKey";
import { loginRSA } from "@/config/settings";
var headers = {
  "Content-Type": "application/json;charset=utf-8",
};
export async function login(data) {
  return request({
    url: "/api/Employee/EmployeeLgoin",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function getInfo(accessToken) {
  return request({
    url: "/api/Employee/tokeninfo",
    method: "post",
    data: { accessToken: accessToken },
    headers: headers,
  });
}

export function logout() {
  return request({
    url: "/api/Employee/logout",
    method: "post",
  });
}
