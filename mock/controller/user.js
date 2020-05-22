const accessTokens = {
  admin: "byui-admin-accessToken",
  editor: "byui-editor-accessToken",
  test: "byui-test-accessToken",
};

export default [
  {
    url: "/publicKey",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "success",
        data: {
          mockServer: true,
        },
      };
    },
  },
  {
    url: "/api/Employee/EmployeeLgoin",
    type: "post",
    response: (config) => {
      return {
        msg: "接口调用成功",
        code: 200,
        url: null,
        data: {
          accessToken: "byui-admin-accessToken",
        },
        exceptionGuid: null,
        totalCount: null,
      };
    },
  },
  {
    url: "/api/Employee/tokeninfo",
    type: "post",
    response: (config) => {
      return {
        msg: "接口调用成功",
        code: 200,
        url: null,
        data: { roles: "admin", name: "超级管理员" },
        exceptionGuid: null,
        totalCount: null,
      };
    },
  },

  {
    url: "/api/Employee/logout",
    type: "post",
    response: () => {
      return {
        msg: "接口调用成功",
        code: 200,
        url: null,
        data: "success",
        exceptionGuid: null,
        totalCount: null,
      };
    },
  },
];
