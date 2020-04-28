
## setting.js 配置

module.exports = {
  title: "vue-admin-beautiful", //标题
  abbreviation: "byui", //简写
  devPort: "80", //开发环境端口号
  version: "V2.2", //版本号
  copyright: "初志鑫1204505056@qq.com", //烦请保留版权，如需去除请联系群主
  routesWhiteList: ["/login", "/404", "/401"], //不经过token校验的路由
  loadingText: "正在加载中...", //加载时显示文字
  tokenName: "accessToken", //token名称
  tokenTableName: "BYUI-VUE-TABLE", //token表名
  storage: "localStorage", //token存储位置
  logo: true, //是否显示logo
  header: "fixed", //固定fixed 不固定noFixed
  layout: "vertical", //横纵布局 horizontal vertical
  themeBar: true, //是否开启主题配置按钮
  tagsView: true, //是否显示多标签页
  messageDuration: 3000, //消息框消失时间
  requestTimeout: 5000, //最长请求时间
  successCode: 200, //操作正常code
  invalidCode: 402, //登录失效code
  errorCode: 500, //系统异常code
  noPermissionCode: 401, //无权限code
  errorLog: ["development", "test", "production"], //是否显示在页面高亮错误
  shieldF12: false, //设置生产环境是否屏蔽f12等开发组工具快捷键
  loginInterception: true, //是否开启登录拦截
  loginRSA: false, //是否开启登录RSA加密
  httpRequestFile: false, //是否依据mock数据生成webstorm HTTP Request请求文件
  authentication: "intelligence", //intelligence和all两种方式，前者后端权限只控制roles不控制view文件的import（前后端配合，减轻后端工作量），all方式完全交给后端前端只负责加载
};
```

## variables.scss 配置

- 说明：这里可以修改你项目的配色方案。
- 示例代码：

```scss
@charset "utf-8";
/* byui scss全局变量开始 */
$base-color-default: #1890ff;

$base-menu-background: #001529;
$base-menu-children-background: #000c17;
$base-menu-active-background: $base-color-default;
$base-menu-text: hsla(0, 0%, 100%, 0.95);
$base-menu-text-active: hsla(0, 0%, 100%, 0.95);
$base-title: #ffffff;

$base-font-size-small: 12px;
$base-font-size-default: 14px;
$base-font-size-big: 16px;
$base-font-size-bigger: 18px;
$base-font-size-max: 22px;
$base-color-header: $base-menu-background;
$base-color-blue: $base-color-default;
$base-color-green: #13ce66;
$base-color-white: #ffffff;
$base-color-black: #000000;
$base-color-yellow: #ffba00;
$base-color-red: #ff4d4f;
$base-color-gray: rgba(0, 0, 0, 0.65);
$base-main-width: 1279px;
$base-border-radius: 2px;
$base-border-color: #ebeef5;
$base-form-width: 600px;
$base-input-height: 32px;
$base-pagination-height: 28px;
$base-dialog-title-height: 40px;
$base-padding: 15px;
$base-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
$base-font-color: #606266;
$base-left-menu-width: 220px;
$base-right-content-width: calc(100% - 220px);
$base-left-menu-width-min: 65px;
$base-right-content-width-min: calc(100% - 65px);
/* byui scss全局变量结束 */
:export {
  menuText: $base-menu-text;
  menuTextAcive: $base-menu-text-active;
  menuBackground: $base-menu-background;
  menuChildrenBackground: $base-menu-children-background;
  menuActiveBackground: $base-menu-active-background;
  tagViewsActiveBackground: $base-color-blue;
  buttonBackground: $base-color-blue;
  paginationActiveBackground: $base-color-blue;
}
```

## 环境变量配置

```
.env.development    # 在开发环境中被载入
.env.production     # 在生成环境中被载入
```

# 和服务端进行交互

## 前端请求示例

```js
import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/table/list",
    method: "post",
    data,
  });
}
```

## 前端请求约定

请求中会自动传 accessToken，用于后端接收，accessToken 的字段名可以在 setting.js 中配置

```
/*表格中请求参数约定*/
{
    "pageNo": 1, //页数
    "pageSize": 10 //每页条数
}
```

## 后端返回 JSON 数据的约定（路由接口除外）

```
{
    "code": 200,//成功的状态码
    "msg": "success",//提示信息
    "totalCount": 238,//总条数（表格中用到）
    "data": [{}，{}，{}]//返回数据
}
```

# 开发（必看）

## 新增 router

这个不用多说了吧，建完了 view 必须在配置路由才能访问，后端配置参照 mock 文件夹下的 router.js,前端配置在 router 文件夹下的 index.js

## 创建 view

不用自己建，已为您提供了模板

```bash
cnpm run template
#选择创建view，填入名称会自动为您创建
```

## 创建 api 与 mock

不用自己建，已为您提供了模板

```bash
cnpm run template
#选择创建mock，填入名称会自动为您创建
```

## 新增组件

不用自己建，已为您提供了模板

```bash
cnpm run template
#选择创建components，填入名称会自动为您创建
```

## 新增 store

不用自己建，已为您提供了模板

```bash
cnpm run template
#选择创建vuex，填入名称会自动为您创建
```

## 更多文档

加群获取
