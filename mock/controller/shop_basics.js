import { mock } from "mockjs";

export default [
  {
    url: "/shop_basics/SaveShop",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "success",
        totalCount: 999,
        data: { msg: "修改成功" },
      };
    },
  },
];
