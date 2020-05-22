<template>
  <el-tabs v-model="activeName" class="system_tabs" @tab-click="handleClick">
    <el-tab-pane label="基础信息" name="first">
      <el-card class="box-card">
        <h4>基础信息</h4>
        <div style="margin: 20px;"></div>
        <el-row :gutter="20">
          <el-form
            ref="Shopform"
            :label-position="labelPosition"
            :rules="shopRules"
            :model="Shopform"
          >
            <el-col :span="8">
              <el-form-item label="代码" prop="shopCode">
                <el-input v-model="Shopform.shopCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机构名称" prop="shopName">
                <el-input v-model="Shopform.shopName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话" prop="umobile">
                <el-input v-model="Shopform.umobile"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="地址&简介">
                <el-input
                  v-model="Shopform.uaddress"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="主页">
                <el-input v-model="baseform.Indexurl">
                  <i slot="prefix" class="el-input__icon el-icon-position"></i>
                </el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="负责人" prop="uname">
                <el-input v-model="Shopform.uname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号" prop="telephone">
                <el-input v-model="Shopform.telephone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="微信号">
                <el-input v-model="Shopform.wechatNumber"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Email">
                <el-input v-model="Shopform.email">
                  <i slot="prefix" class="el-input__icon el-icon-message"></i>
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24" align="right">
              <el-button type="primary" @click="ShopformSave('Shopform')"
                >保存
              </el-button>
            </el-col>
          </el-form>
        </el-row>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="角色&权限" name="second">
      <el-card class="box-card">
        <h4>角色</h4>
        <div style="margin: 20px;"></div>
        <div style="text-align: right; padding-bottom: 10px;">
          <el-button
            icon="el-icon-plus"
            type="primary"
            @click="roleEdit('', 'add')"
            >添加
          </el-button>
        </div>
        <el-table
          v-loading="false"
          :data="rolesList"
          element-loading-text="正在加载..."
          height="80vh"
        >
          <el-table-column label="角色名" prop="name"></el-table-column>
          <el-table-column
            label="权限"
            prop="authorityName"
            width="150"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="roleEdit(scope.row, 'edit')"
                >编辑
              </el-button>
              <el-button type="text" @click="roleEdit(scope.row, 'del')"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-dialog
        :visible.sync="roleDialogFormVisible"
        width="500px"
        title="添加角色"
      >
        <el-form ref="roleform" :model="roleform" :rules="roleRules">
          <el-form-item label="角色名称" prop="name">
            <el-input
              v-model="roleform.name"
              style="width: 200px;"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-select
              v-model="roleform.authorityID"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in authorityList"
                :key="item.authorityID"
                :label="item.name"
                :value="item.authorityID"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="roleDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="roleAdd('roleform')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </el-tab-pane>
    <el-tab-pane label="课程类型" name="third">
      <el-card class="box-card">
        <h4>课程类型</h4>
        <div style="margin: 20px;"></div>
        <el-row :gutter="20">
          <el-col :xs="24" :span="24">
            <div>
              <div style="text-align: right; padding-bottom: 10px;">
                <el-button
                  icon="el-icon-plus"
                  type="primary"
                  @click="courseTypeEdit('', 'add')"
                  >添加
                </el-button>
              </div>
              <el-table
                v-loading="false"
                :data="courseTypeList"
                element-loading-text="正在加载..."
                height="80vh"
              >
                <el-table-column
                  label="名称"
                  prop="courseTypeName"
                ></el-table-column>
                <el-table-column label="备注" prop="remarks"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="courseTypeEdit(scope.row, 'edit')"
                      >编辑
                    </el-button>
                    <el-button
                      type="text"
                      @click="courseTypeEdit(scope.row, 'del')"
                      >删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <el-dialog
        :visible.sync="courseTypeDialogFormVisible"
        width="300px"
        title="类型编辑"
      >
        <el-form
          ref="courseTypeform"
          :model="courseTypeform"
          :rules="courseTypeRules"
        >
          <el-form-item label="类型名称" prop="courseTypeName">
            <el-input
              v-model="courseTypeform.courseTypeName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="courseTypeform.remarks"
              type="textarea"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="courseTypeDialogFormVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" @click="courseTypeAdd('courseTypeform')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </el-tab-pane>
    <el-tab-pane label="商品类型" name="fourth">
      <el-card class="box-card">
        <h4>商品类型</h4>
        <div style="margin: 20px;"></div>
        <el-row :gutter="20">
          <el-col :xs="24" :span="24">
            <div>
              <div style="text-align: right; padding-bottom: 10px;">
                <el-button
                  icon="el-icon-plus"
                  type="primary"
                  @click="goodsTypeEdit('', 'add')"
                  >添加
                </el-button>
              </div>

              <el-table
                v-loading="false"
                :data="goodsTypeList"
                element-loading-text="正在加载..."
                height="80vh"
              >
                <el-table-column
                  label="名称"
                  prop="goodTypeName"
                ></el-table-column>
                <el-table-column label="备注" prop="remarks"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="goodsTypeEdit(scope.row, 'edit')"
                      >编辑
                    </el-button>
                    <el-button
                      type="text"
                      @click="goodsTypeEdit(scope.row, 'del')"
                      >删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </el-card>

      <el-dialog
        :visible.sync="goodsTypeDialogFormVisible"
        width="300px"
        title="类型编辑"
      >
        <el-form
          ref="goodsTypeform"
          :model="goodsTypeform"
          :rules="goodsTypeRules"
        >
          <el-form-item label="类型名称" prop="goodTypeName">
            <el-input
              v-model="goodsTypeform.goodTypeName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="goodsTypeform.remarks"
              type="textarea"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="goodsTypeDialogFormVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" @click="goodsTypeAdd('goodsTypeform')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </el-tab-pane>
    <el-tab-pane label="场地设定" name="area">
      <el-card class="box-card">
        <h4>场地设定</h4>
        <div style="margin: 20px;"></div>
        <el-row :gutter="20">
          <el-col :xs="24" :span="24">
            <div>
              <div style="text-align: right; padding-bottom: 10px;">
                <el-button
                  icon="el-icon-plus"
                  type="primary"
                  @click="areaEdit('', 'add')"
                  >添加
                </el-button>
              </div>

              <el-table
                v-loading="false"
                :data="areaList"
                element-loading-text="正在加载..."
                height="80vh"
              >
                <el-table-column label="名称" prop="areaName"></el-table-column>
                <el-table-column
                  label="面积"
                  prop="areaCovered"
                ></el-table-column>
                <el-table-column label="备注" prop="remarks"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" @click="areaEdit(scope.row, 'edit')"
                      >编辑
                    </el-button>
                    <el-button type="text" @click="areaEdit(scope.row, 'del')"
                      >删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </el-card>

      <el-dialog
        :visible.sync="areaDialogFormVisible"
        width="300px"
        title="场地编辑"
      >
        <el-form ref="areaform" :model="areaform" :rules="areaRules">
          <el-form-item label="场地名称" prop="areaName">
            <el-input v-model="areaform.areaName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="面积">
            <el-input
              v-model="areaform.areaCovered"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="areaform.remarks" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="areaDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="areaAdd('areaform')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { SaveShop, getShopList } from "@/api/shop_basics";
import {
  GetCourseTypeList,
  UpdateCourseType,
  InsertCourseType,
  deleteCourseType,
} from "@/api/table";
import {
  GetGoodTypeList,
  UpdateGoodType,
  InsertGoodType,
  deleteGoodType,
} from "@/api/good";
import { GetAreaList, UpdateArea, InsertArea, deleteArea } from "@/api/area";
import {
  getRolesList,
  UpdateRoles,
  InsertRoles,
  deleteRoles,
  getAuthorityList,
} from "@/api/roles";

export default {
  name: "System",
  components: {},
  filters: {},
  data() {
    return {
      value1: [],
      areaDialogFormVisible: false,
      goodsTypeDialogFormVisible: false,
      courseTypeDialogFormVisible: false,
      roleDialogFormVisible: false,
      ShopID: "945D66C8-ABB0-499B-A5A3-D4F1032C86BF",
      //基础信息表单
      Shopform: {},
      courseTypeList: [],
      goodsTypeList: [],
      areaList: [
        {
          areaID: "",
        },
      ],
      authorityRoles: {},
      authorityList: [],
      rolesList: [],
      areaRules: {
        areaName: [
          {
            required: true,
            message: "请输入场地名称",
            trigger: "blur",
          },
        ],
      },
      goodsTypeRules: {
        goodTypeName: [
          {
            required: true,
            message: "请输入类型名称",
            trigger: "blur",
          },
        ],
      },
      courseTypeRules: {
        courseTypeName: [
          {
            required: true,
            message: "请输入类型名称",
            trigger: "blur",
          },
        ],
      },
      roleRules: {
        name: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur",
          },
        ],
      },
      shopRules: {
        shopCode: [
          {
            required: true,
            message: "请输入编号(用于登录,简短易记)",
            trigger: "blur",
          },
          {
            min: 3,
            max: 30,
            message: "长度在 3 到 30 个字符",
            trigger: "blur",
          },
        ],
        shopName: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
          {
            min: 3,
            max: 30,
            message: "长度在 3 到 30 个字符",
            trigger: "blur",
          },
        ],
        uname: [
          {
            required: true,
            message: "请输入负责人",
            trigger: "blur",
          },
          {
            min: 3,
            max: 30,
            message: "长度在 3 到 30 个字符",
            trigger: "blur",
          },
        ],
        umobile: [
          {
            required: true,
            message: "请输入负责人手机号",
            trigger: "blur",
          },
          {
            min: 3,
            max: 30,
            message: "长度在 3 到 30 个字符",
            trigger: "blur",
          },
        ],
      },
      labelPosition: "top",
      roleform: {},
      goodsTypeform: {},
      areaform: {},
      courseTypeform: {},
      activeName: "first",
    };
  },
  created() {
    let self = this;
    self.rolesList.forEach(function (value) {
      self.$set(self.authorityRoles, value.RolesID, []);
    });
    //绑定基础信息
    this.getShopList(this.ShopID);
    //绑定角色信息
    this.getRolesList();
    //绑定权限信息
    this.getAuthorityList(this.ShopID);
    //绑定课程类型
    this.GetCourseTypeList();
    //绑定商品类型
    this.GetGoodTypeList();
    //绑定场地列表
    this.GetAreaList();
  },
  methods: {
    handleAdd() {},
    //获取权限信息
    getAuthorityList(ShopID) {
      return new Promise((resolve, reject) => {
        getAuthorityList(ShopID)
          .then((response) => {
            const { data } = response;
            this.authorityList = response.data;
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //获取课程类型列表
    getRolesList() {
      return new Promise((resolve, reject) => {
        getRolesList()
          .then((response) => {
            const { data } = response;
            this.rolesList = response.data;
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //获取课程类型列表
    GetCourseTypeList() {
      return new Promise((resolve, reject) => {
        GetCourseTypeList()
          .then((response) => {
            const { data } = response;
            this.courseTypeList = response.data;
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //获取商品类型列表
    GetGoodTypeList() {
      return new Promise((resolve, reject) => {
        GetGoodTypeList()
          .then((response) => {
            const { data } = response;
            this.goodsTypeList = response.data;
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //获取商品类型列表
    GetAreaList() {
      return new Promise((resolve, reject) => {
        GetAreaList()
          .then((response) => {
            const { data } = response;
            this.areaList = response.data;
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //基础信息赋值
    getShopList(ShopID) {
      return new Promise((resolve, reject) => {
        getShopList(ShopID)
          .then((response) => {
            const { data } = response;
            this.Shopform = response.data[0];
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //基础信息保存
    ShopformSave(formName) {
      let self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.$baseMessage("保存成功！", "success");
          //调用API  import { SaveShop } from "@/api/shop_basics";
          SaveShop(self.Shopform).then((res) => {
            console.log(res);
          });
          //self.$refs[formName].resetFields();//重置表单
        } else {
          return false;
        }
      });
    },
    areaAdd(formName) {
      let self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          if (self.areaform.areaID != "") {
            self.UpdateArea(self.areaform);
          } else {
            self.InsertArea(self.areaform);
          }
          self.areaDialogFormVisible = false;
          // self.$refs[formName].resetFields(); //重置表单
        } else {
          return false;
        }
      });
    },
    goodsTypeAdd(formName) {
      let self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          if (self.goodsTypeform.goodTypeID != "") {
            self.UpdateGoodType(self.goodsTypeform);
          } else {
            self.InsertGoodType(self.goodsTypeform);
          }
          self.goodsTypeDialogFormVisible = false;
        } else {
          return false;
        }
      });
    },
    areaEdit(row, flag) {
      let self = this;
      if (flag == "edit") {
        self.areaform = JSON.parse(JSON.stringify(row));
        self.areaDialogFormVisible = true;
      } else if (flag == "del") {
        self.areaform = JSON.parse(JSON.stringify(row));
        this.$baseConfirm(
          "你确定要删除选中项吗",
          null,
          () => {
            self.deleteArea(self.areaform.areaID);
            self.$baseMessage("删除成功！", "success");
          },
          () => {
            console.log("点击了取消");
          }
        );
      } else if (flag == "add") {
        self.areaDialogFormVisible = true;
        self.areaform.areaID = "";
        self.areaform.areaName = "";
        self.areaform.areaCovered = "";
        self.areaform.remarks = "";
      }
    },
    goodsTypeEdit(row, flag) {
      let self = this;
      if (flag == "edit") {
        self.goodsTypeform = JSON.parse(JSON.stringify(row));
        self.goodsTypeDialogFormVisible = true;
      } else if (flag == "del") {
        self.goodsTypeform = JSON.parse(JSON.stringify(row));
        this.$baseConfirm(
          "你确定要删除选中项吗",
          null,
          () => {
            self.deleteGoodType(self.goodsTypeform.goodTypeID);
            self.$baseMessage("删除成功！", "success");
          },
          () => {
            console.log("点击了取消");
          }
        );
      } else if (flag == "add") {
        self.goodsTypeDialogFormVisible = true;
        // self.$refs[formName].resetFields(); //重置表单
        self.goodsTypeform.goodTypeID = "";
        self.goodsTypeform.goodTypeName = "";
        self.goodsTypeform.remarks = "";
      }
    },
    courseTypeAdd(formName) {
      let self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          if (self.courseTypeform.courseTypeID != "") {
            self.UpdateCourseType(self.courseTypeform);
          } else {
            self.InsertCourseType(self.courseTypeform);
          }
          self.courseTypeDialogFormVisible = false;
          // self.$refs[formName].resetFields(); //重置表单
        } else {
          return false;
        }
      });
    },
    courseTypeEdit(row, flag) {
      let self = this;

      if (flag == "edit") {
        self.courseTypeform = JSON.parse(JSON.stringify(row));
        self.courseTypeDialogFormVisible = true;
      } else if (flag == "del") {
        self.courseTypeform = JSON.parse(JSON.stringify(row));
        this.$baseConfirm(
          "你确定要删除选中项吗",
          null,
          () => {
            self.deleteCourseType(self.courseTypeform.courseTypeID);
            self.$baseMessage("删除成功！", "success");
          },
          () => {
            console.log("点击了取消");
          }
        );
      } else if (flag == "add") {
        self.courseTypeDialogFormVisible = true;
        // self.$refs[formName].resetFields(); //重置表单
        self.courseTypeform.courseTypeID = "";
        self.courseTypeform.courseTypeName = "";
        self.courseTypeform.remarks = "";
      }
    },
    //添加课程类型
    InsertCourseType(courseTypeForm) {
      let that = this;
      return new Promise((resolve, reject) => {
        InsertCourseType(courseTypeForm)
          .then((response) => {
            const { data } = response;
            if (data == 1) {
              that.$baseMessage("添加成功", "success");
            } else {
              that.$baseMessage("添加失败", "success");
            }
            this.GetCourseTypeList();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //修改课程价格
    UpdateCourseType(courseTypeForm) {
      let that = this;
      return new Promise((resolve, reject) => {
        UpdateCourseType(courseTypeForm)
          .then((response) => {
            const { data } = response;
            if (data == 1) {
              that.$baseMessage("修改成功", "success");
            } else {
              that.$baseMessage("修改失败", "success");
            }
            this.GetCourseTypeList();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //删除课程类型
    deleteCourseType(CourseTypeID) {
      return new Promise((resolve, reject) => {
        deleteCourseType(CourseTypeID)
          .then((response) => {
            const { data } = response;
            this.GetCourseTypeList();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //添加商品类型
    InsertGoodType(goodTypeForm) {
      let that = this;
      return new Promise((resolve, reject) => {
        InsertGoodType(goodTypeForm)
          .then((response) => {
            const { data } = response;
            if (data == 1) {
              that.$baseMessage("添加成功", "success");
            } else {
              that.$baseMessage("添加失败", "success");
            }
            this.GetGoodTypeList();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //修改商品类型
    UpdateGoodType(goodTypeForm) {
      let that = this;
      return new Promise((resolve, reject) => {
        UpdateGoodType(goodTypeForm)
          .then((response) => {
            const { data } = response;
            if (data == 1) {
              that.$baseMessage("修改成功", "success");
            } else {
              that.$baseMessage("修改失败", "success");
            }
            this.GetGoodTypeList();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //删除商品类型
    deleteGoodType(goodTypeID) {
      return new Promise((resolve, reject) => {
        deleteGoodType(goodTypeID)
          .then((response) => {
            const { data } = response;
            this.GetGoodTypeList();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //添加场地
    InsertArea(areaForm) {
      let that = this;
      return new Promise((resolve, reject) => {
        InsertArea(areaForm)
          .then((response) => {
            const { data } = response;
            if (data == 1) {
              that.$baseMessage("添加成功", "success");
            } else {
              that.$baseMessage("添加失败", "success");
            }
            this.GetAreaList();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //修改场地
    UpdateArea(areaForm) {
      let that = this;
      return new Promise((resolve, reject) => {
        UpdateArea(areaForm)
          .then((response) => {
            const { data } = response;
            if (data == 1) {
              that.$baseMessage("修改成功", "success");
            } else {
              that.$baseMessage("修改失败", "success");
            }
            this.GetAreaList();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //删除场地
    deleteArea(areaID) {
      return new Promise((resolve, reject) => {
        deleteArea(areaID)
          .then((response) => {
            const { data } = response;
            this.GetAreaList();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //添加角色
    InsertRoles(rolesForm) {
      let that = this;
      return new Promise((resolve, reject) => {
        let rolesau = {
          authorityID: JSON.stringify(rolesForm.authorityID),
          name: rolesForm.name,
          rolesID: rolesForm.rolesID,
        };
        InsertRoles(rolesau)
          .then((response) => {
            const { data } = response;
            if (data == 1) {
              that.$baseMessage("添加成功", "success");
            } else {
              that.$baseMessage("添加失败", "success");
            }
            this.getRolesList();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //修改角色
    UpdateRoles(rolesForm) {
      let that = this;
      return new Promise((resolve, reject) => {
        let rolesau = {
          authorityID: JSON.stringify(rolesForm.authorityID),
          name: rolesForm.name,
          rolesID: rolesForm.rolesID,
        };
        UpdateRoles(rolesau)
          .then((response) => {
            const { data } = response;
            if (data == 1) {
              that.$baseMessage("修改成功", "success");
            } else {
              that.$baseMessage("修改失败", "success");
            }
            this.getRolesList();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //删除角色
    deleteRoles(rolesID) {
      return new Promise((resolve, reject) => {
        deleteRoles(rolesID)
          .then((response) => {
            const { data } = response;
            this.getRolesList();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    roleAdd(formName) {
      let self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          if (self.roleform.rolesID != "") {
            self.UpdateRoles(self.roleform);
          } else {
            self.InsertRoles(self.roleform);
          }
          self.roleDialogFormVisible = false;
        } else {
          return false;
        }
      });
    },
    roleEdit(row, flag) {
      let self = this;
      if (flag == "edit") {
        self.roleform = JSON.parse(JSON.stringify(row));
        let authorityIDs = self.roleform.authorityID.split(",");
        self.roleform.authorityID = authorityIDs;
        self.roleDialogFormVisible = true;
      } else if (flag == "del") {
        self.roleform = JSON.parse(JSON.stringify(row));
        this.$baseConfirm(
          "你确定要删除选中项吗",
          null,
          () => {
            self.deleteRoles(self.roleform.rolesID);
            self.$baseMessage("删除成功！", "success");
          },
          () => {
            console.log("点击了取消");
          }
        );
      } else if (flag == "add") {
        self.roleDialogFormVisible = true;
        self.roleform.rolesID = "";
        self.roleform.name = "";
        self.roleform.authorityID = "";
      }
    },
    handleClick(tab, event) {},
  },
};
</script>
<style>
.box-card {
  width: 100%;
  height: 70vh;
  min-height: 500px;
}
</style>
