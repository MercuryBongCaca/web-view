import request from "@/utils/request";

export function SaveShop(data) {
  return request({
    url: "/shop_basics/SaveShop", //代码生成机生成的url,请修改为正确的url
    method: "post",
    data,
  });
}
