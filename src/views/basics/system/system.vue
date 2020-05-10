<template>
  <el-tabs v-model="activeName" class="system_tabs" @tab-click="handleClick">
    <el-tab-pane label="基础信息" name="first">
      <el-card class="box-card">
        <h4>基础信息</h4>
        <div style="margin: 20px;"></div>
        <el-row :gutter="20">
          <el-form
            ref="baseform"
            :label-position="labelPosition"
            :rules="shopRules"
            :model="baseform"
          >
            <el-col :span="8">
              <el-form-item label="代码" prop="ShopNo">
                <el-input v-model="baseform.ShopNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机构名称" prop="ShopName">
                <el-input v-model="baseform.ShopName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话">
                <el-input v-model="baseform.ShopNumber"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="地址&简介">
                <el-input
                  v-model="baseform.Uaddress"
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
              <el-form-item label="负责人" prop="Uname">
                <el-input v-model="baseform.Uname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号" prop="Umobile">
                <el-input v-model="baseform.Umobile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="微信号">
                <el-input v-model="baseform.WeChat"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Email">
                <el-input v-model="baseform.Email">
                  <i slot="prefix" class="el-input__icon el-icon-message"></i>
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24" align="right">
              <el-button type="primary" @click="baseformSave('baseform')"
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
            @click="roleDialogFormVisible = true"
            >添加
          </el-button>
        </div>
        <el-table
          v-loading="false"
          :data="rolesList"
          element-loading-text="正在加载..."
          height="80vh"
        >
          <el-table-column type="expand">
            <template slot-scope="scope">
              <div style="margin-top: 20px;">
                <el-col
                  :span="24"
                  style="text-align: left; padding: 0px 0px 20px 30px;"
                >
                  <h4>权限</h4>
                </el-col>
                <el-row :gutter="20">
                  <el-checkbox-group
                    v-model="authorityRoles[scope.row.RolesID]"
                    size="small"
                  >
                    <el-col
                      v-for="item in authorityList"
                      :key="item.AuthorityID"
                      style="margin-bottom: 20px;"
                      :xs="12"
                      :sm="6"
                      :md="5"
                      :lg="4"
                      :xl="3"
                    >
                      <el-checkbox :label="item.AuthorityID" border>{{
                        item.Name
                      }}</el-checkbox>
                    </el-col>
                  </el-checkbox-group>
                  <el-col :span="24" align="right">
                    <el-button
                      type="primary"
                      @click="authorityRolesSave(scope.row.RolesID)"
                      >保存
                    </el-button>
                  </el-col>
                </el-row>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="角色名" prop="Name"></el-table-column>
          <el-table-column
            label="权限"
            prop="Authoritys"
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
        width="300px"
        title="添加角色"
      >
        <el-form ref="roleform" :model="roleform" :rules="roleRules">
          <el-form-item label="角色名称" prop="Name">
            <el-input v-model="roleform.Name" autocomplete="off"></el-input>
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
                  @click="courseTypeDialogFormVisible = true"
                  >添加
                </el-button>
              </div>
              <el-table
                v-loading="false"
                :data="courseTypeList"
                element-loading-text="正在加载..."
                height="80vh"
              >
                <el-table-column label="名称" prop="Name"></el-table-column>
                <el-table-column label="备注" prop="Remark"></el-table-column>
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
          <el-form-item label="类型名称" prop="Name">
            <el-input
              v-model="courseTypeform.Name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="courseTypeform.Remark"
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
                  @click="goodsTypeDialogFormVisible = true"
                  >添加
                </el-button>
              </div>

              <el-table
                v-loading="false"
                :data="goodsTypeList"
                element-loading-text="正在加载..."
                height="80vh"
              >
                <el-table-column label="名称" prop="Name"></el-table-column>
                <el-table-column label="备注" prop="Remark"></el-table-column>
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
          <el-form-item label="类型名称" prop="Name">
            <el-input
              v-model="goodsTypeform.Name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="goodsTypeform.Remark" type="textarea"></el-input>
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
                  @click="areaDialogFormVisible = true"
                  >添加
                </el-button>
              </div>

              <el-table
                v-loading="false"
                :data="areaList"
                element-loading-text="正在加载..."
                height="80vh"
              >
                <el-table-column label="名称" prop="Name"></el-table-column>
                <el-table-column label="面积" prop="Size"></el-table-column>
                <el-table-column label="备注" prop="Remark"></el-table-column>
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
          <el-form-item label="场地名称" prop="Name">
            <el-input v-model="areaform.Name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="面积">
            <el-input v-model="areaform.Size" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="areaform.Remark" type="textarea"></el-input>
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
import { SaveShop } from "@/api/shop_basics";
export default {
  name: "System",
  components: {},
  filters: {},
  data() {
    return {
      areaDialogFormVisible: false,
      goodsTypeDialogFormVisible: false,
      courseTypeDialogFormVisible: false,
      roleDialogFormVisible: false,
      courseTypeList: [
        {
          TypeID: "c2",
          Name: "音乐",
          Remark: "有架子鼓,吉他,钢琴等",
        },
      ],
      goodsTypeList: [
        {
          TypeID: "g2",
          Name: "饮料",
          Remark: "新饮料",
        },
      ],
      areaList: [
        {
          TypeID: "a2",
          Name: "基础场地",
          Size: 36.7,
          Remark: "绿化好",
        },
      ],
      authorityRoles: {},
      authorityList: [
        { AuthorityID: "a1", Name: "员工修改" },
        { AuthorityID: "a2", Name: "员工添加" },
      ],
      rolesList: [
        {
          RolesID: "b2",
          Name: "管理员A",
          Authoritys: "员工修改,员工修改A,员工修改B,员工修改C",
        },
      ],
      areaRules: {
        Name: [
          {
            required: true,
            message: "请输入场地名称",
            trigger: "blur",
          },
        ],
      },
      goodsTypeRules: {
        Name: [
          {
            required: true,
            message: "请输入类型名称",
            trigger: "blur",
          },
        ],
      },
      courseTypeRules: {
        Name: [
          {
            required: true,
            message: "请输入类型名称",
            trigger: "blur",
          },
        ],
      },
      roleRules: {
        Name: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur",
          },
        ],
      },
      shopRules: {
        ShopNo: [
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
        ShopName: [
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
        Uname: [
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
        Umobile: [
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
      baseform: {
        ShopID: "",
        ShopNo: "",
        ShopName: "",
        Uname: "",
        Umobile: "",
        ShopNumber: "",
        WeChat: "",
        Email: "",
        Uaddress: "",
        IndexUrl: "",
        UID: "",
        BeginTime: "",
        EndTime: "",
        Status: "",
        IsDeleted: "",
        upTime: "",
        upUser: "",
      },
      roleform: {
        Name: "",
        RolesID: "",
      },
      goodsTypeform: {
        Name: "",
        TypeID: "",
      },
      areaform: {
        Name: "",
        AreaID: "",
      },
      courseTypeform: {
        Name: "",
        TypeID: "",
      },
      activeName: "first",
    };
  },
  created() {
    let self = this;
    self.rolesList.forEach(function (value) {
      self.$set(self.authorityRoles, value.RolesID, []);
    });
  },
  methods: {
    handleAdd() {},
    authorityRolesSave(roleid) {
      //角色权限保存
      let self = this;
      let checkedRoles = self.authorityRoles[roleid]; //选中的权限
      console.log(checkedRoles);
    },

    baseformSave(formName) {
      let self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.$baseMessage("保存成功！", "success");
          //调用API  import { SaveShop } from "@/api/shop_basics";
          SaveShop(self.baseform).then((res) => {
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
          console.log(self.goodsTypeform);
          self.$baseMessage("保存成功！", "success");
          self.goodsTypeDialogFormVisible = false;

          self.$refs[formName].resetFields(); //重置表单
        } else {
          return false;
        }
      });
    },
    goodsTypeAdd(formName) {
      let self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(self.goodsTypeform);
          self.$baseMessage("保存成功！", "success");
          self.goodsTypeDialogFormVisible = false;

          self.$refs[formName].resetFields(); //重置表单
        } else {
          return false;
        }
      });
    },
    areaEdit(row, flag) {
      let self = this;
      self.areaform = JSON.parse(JSON.stringify(row));
      if (flag == "edit") {
        self.areaDialogFormVisible = true;
      } else {
        this.$baseConfirm(
          "你确定要删除选中项吗",
          null,
          () => {
            self.$baseMessage("删除成功！", "success");
          },
          () => {
            console.log("点击了取消");
          }
        );
      }
    },
    goodsTypeEdit(row, flag) {
      let self = this;
      self.goodsTypeform = JSON.parse(JSON.stringify(row));
      if (flag == "edit") {
        self.goodsTypeDialogFormVisible = true;
      } else {
        this.$baseConfirm(
          "你确定要删除选中项吗",
          null,
          () => {
            self.$baseMessage("删除成功！", "success");
          },
          () => {
            console.log("点击了取消");
          }
        );
      }
    },
    courseTypeAdd(formName) {
      let self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(self.courseTypeform);
          self.$baseMessage("保存成功！", "success");
          self.courseTypeDialogFormVisible = false;

          self.$refs[formName].resetFields(); //重置表单
        } else {
          return false;
        }
      });
    },
    courseTypeEdit(row, flag) {
      let self = this;
      self.courseTypeform = JSON.parse(JSON.stringify(row));
      if (flag == "edit") {
        self.courseTypeDialogFormVisible = true;
      } else {
        this.$baseConfirm(
          "你确定要删除选中项吗",
          null,
          () => {
            self.$baseMessage("删除成功！", "success");
          },
          () => {
            console.log("点击了取消");
          }
        );
      }
    },
    roleAdd(formName) {
      let self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(self.roleform);
          self.$baseMessage("保存成功！", "success");
          self.roleDialogFormVisible = false;

          self.$refs[formName].resetFields(); //重置表单
        } else {
          return false;
        }
      });
    },
    roleEdit(row, flag) {
      let self = this;
      self.roleform = JSON.parse(JSON.stringify(row));
      if (flag == "edit") {
        self.roleDialogFormVisible = true;
      } else {
        this.$baseConfirm(
          "你确定要删除选中项吗",
          null,
          () => {
            self.$baseMessage("删除成功！", "success");
          },
          () => {
            console.log("点击了取消");
          }
        );
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
