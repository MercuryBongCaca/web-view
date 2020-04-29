<template>
  <el-tabs v-model="activeName" class="system_tabs" @tab-click="handleClick">
    <el-tab-pane label="基础信息" name="first">
      <el-card class="box-card">
        <h4>基础信息</h4>
        <div style="margin: 20px;"></div>
        <el-row :gutter="20">
          <el-form
            :label-position="labelPosition"
            :rules="rules"
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
              <el-form-item label="地址简介">
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
              <el-button type="primary" @click="baseformSave">保存 </el-button>
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
          <el-button icon="el-icon-plus" type="primary" @click="handleAdd"
            >添加
          </el-button>
        </div>
        <el-table
          ref="tableSort"
          v-loading="false"
          :data="list"
          element-loading-text="正在加载..."
          height="80vh"
        >
          <el-table-column type="expand">
            <template>
              <div style="margin-top: 20px;">
                <el-col
                  :span="24"
                  style="text-align: left; padding: 0px 0px 20px 30px;"
                >
                  <h4>权限</h4>
                </el-col>
                <el-row :gutter="20">
                  <el-checkbox-group v-model="checkboxGroup1" size="small">
                    <el-col
                      v-for="i in 10"
                      :key="i"
                      style="margin-bottom: 20px;"
                      :xs="12"
                      :sm="6"
                      :md="5"
                      :lg="4"
                      :xl="3"
                    >
                      <el-checkbox label="员工修改" border></el-checkbox>
                    </el-col>
                  </el-checkbox-group>
                </el-row>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="角色名" prop="name"></el-table-column>
          <el-table-column label="权限" prop="name"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEdit(scope.row)"
                >编辑
              </el-button>
              <el-button type="text" @click="handleEdit(scope.row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="课程类型" name="third">
      <el-card class="box-card">
        <h4>课程类型</h4>
        <div style="margin: 20px;"></div>
        <el-row :gutter="20">
          <el-col :xs="24" :span="24">
            <div>
              <div style="text-align: right; padding-bottom: 10px;">
                <el-button icon="el-icon-plus" type="primary" @click="handleAdd"
                  >添加
                </el-button>
              </div>
              <el-table
                ref="tableSort"
                v-loading="false"
                :data="list2"
                element-loading-text="正在加载..."
                height="80vh"
              >
                <el-table-column label="名称" prop="name"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" @click="handleEdit(scope.row)"
                      >编辑
                    </el-button>
                    <el-button type="text" @click="handleEdit(scope.row)"
                      >删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="商品类型" name="fourth">
      <el-card class="box-card">
        <h4>商品类型</h4>
        <div style="margin: 20px;"></div>
        <el-row :gutter="20">
          <el-col :xs="24" :span="24">
            <div>
              <div style="text-align: right; padding-bottom: 10px;">
                <el-button icon="el-icon-plus" type="primary" @click="handleAdd"
                  >添加
                </el-button>
              </div>

              <el-table
                ref="tableSort"
                v-loading="false"
                :data="list2"
                element-loading-text="正在加载..."
                height="80vh"
              >
                <el-table-column label="名称" prop="name"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" @click="handleEdit(scope.row)"
                      >编辑
                    </el-button>
                    <el-button type="text" @click="handleEdit(scope.row)"
                      >删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </el-card>
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
      checkboxGroup1: [],
      list: [
        {
          name: "管理员",
        },
      ],
      list2: [
        {
          name: "管理员",
        },
      ],
      rules: {
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
      activeName: "first",
    };
  },
  created() {},
  methods: {
    baseformSave() {
      this.$baseMessage("保存成功！", "success");
      //调用API  import { SaveShop } from "@/api/shop_basics";
      SaveShop(this.baseform).then((res) => {
        console.log(res);
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
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
