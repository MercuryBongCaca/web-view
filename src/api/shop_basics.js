import request from "@/utils/request";
var headers = {
  "Content-Type": "application/json;charset=utf-8",
};
export function SaveShop(data) {
  return request({
    url: "/api/Shop/UpdateShop",
    method: "post",
    data: data,
    headers: headers,
  });
}

export function getShopList(data) {
  return request({
    url: "/api/Shop/ShopList",
    method: "post",
    data: data,
    headers: headers,
  });
}
