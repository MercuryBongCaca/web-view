<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="700px"
    @close="close"
  >
    <el-row :gutter="24" style="padding-bottom: 20px;">
      <el-col :span="13">
        <el-input
          v-model="searchMember.nameMobile"
          autocomplete="off"
          placeholder="姓名/手机号"
        ></el-input
      ></el-col>
      <el-col :span="8">
        <el-button type="primary" @click="getMemberList"
          >搜索</el-button
        ></el-col
      >
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-table
          ref="tableSort"
          :data="memberList"
          :element-loading-text="elementLoadingText"
          height="150"
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column label="头像" width="100">
            <template slot-scope="scope">
              <div style="width: 50px; height: 50px;">
                <el-image
                  v-if="imgShow"
                  :preview-src-list="[imageUrl + scope.row.picturePath]"
                  :src="imageUrl + scope.row.picturePath"
                  style="width: 50px; height: 50px;"
                ></el-image>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="name"></el-table-column>
          <el-table-column
            label="手机号"
            prop="mobile"
          ></el-table-column> </el-table
      ></el-col>
    </el-row>

    <el-divider content-position="left"> <h4>已选会员信息</h4></el-divider>

    <el-row :gutter="24">
      <el-col :span="24">
        <el-form label-width="auto">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input
                  v-model="selectedMember.name"
                  :disabled="true"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号">
                <el-input
                  v-model="selectedMember.mobile"
                  :disabled="true"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-divider content-position="left"> <h4>合同基本信息</h4></el-divider>
    <el-form ref="form" :model="form" :rules="formRules" label-width="80px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="课程名称">
            <el-select v-model="form.courseID" filterable placeholder="请选择">
              <el-option
                v-for="item in courseList"
                :key="item.courseID"
                :label="item.courseName"
                :value="item.courseID"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上课老师">
            <el-select
              v-model="form.employeeIDTeacher"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in employeeList"
                :key="item.employeeID"
                :label="item.name"
                :value="item.employeeID"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="课程数量">
            <el-input
              v-model="form.purchaseNumber"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="销售人">
            <el-select
              v-model="form.employeeIDsale"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in employeeList"
                :key="item.employeeID"
                :label="item.name"
                :value="item.employeeID"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同开始">
            <el-date-picker
              v-model="form.contractStartTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同结束">
            <el-date-picker
              v-model="form.contractEndTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同金额">
            <el-input
              v-model="form.amountPayable"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最终收款">
            <el-input
              v-model="form.transactionPrice"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态">
            <el-select
              v-model="form.status"
              style="width: 100%;"
              placeholder="请选择状态"
            >
              <el-option :key="1" label="正常" :value="1"></el-option>
              <el-option :key="2" label="已过期" :value="2"></el-option>
              <el-option :key="3" label="正在执行" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input
              v-model="form.remarks"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="店铺备注">
            <el-input
              v-model="form.storeNotes"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save('form')">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import {
  GetContractMemberList,
  InsertContract,
  UpdateContract,
} from "@/api/contract";
export default {
  name: "ContractEdit",
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      searchMember: {
        nameMobile: "",
      },
      imageUrl: process.env.VUE_APP_BASE_FILE,
      form: {
        contractID: "",
      },
      selectedMember: {
        memberID: "",
        name: "",
        mobile: "",
      },
      memberList: [
        {
          name: "张三",
          mobile: "1766045447",
          imgURL: "https://i.picsum.photos/id/25/200/300.jpg",
        },
        {
          name: "李四",
          mobile: "1766045448",
          imgURL: "https://i.picsum.photos/id/25/200/300.jpg",
        },
      ],

      activities: [
        {
          content: "支持使用图标",
          timestamp: "2018-04-12",
          size: "large",
          type: "primary",
          icon: "el-icon-more",
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87",
        },
        {
          content:
            "修改课程【吉他课=>架子鼓】\n课程【吉他课=>架子鼓】 课程【吉他课=>架子鼓】课程【吉他课=>架子鼓】",
          timestamp: "2018-04-03 20:46",
          size: "large",
        },
        {
          content: "创建课表",
          timestamp: "2018-04-03 20:46",
        },
      ],
      shopID: "7BB271C7-3A8C-4509-B488-1FE50DC34FC0",
      imgShow: true,
      elementLoadingText: "正在加载...",
      tabPosition: "left",
      title: "",
      dialogFormVisible: false,
    };
  },
  computed: {
    ...mapGetters(["employeeList", "courseList"]),
  },
  created() {
    this.GetContractMemberList(this.searchMember.nameMobile);
  },
  beforeDestroy() {
    $("body").off("click");
  },
  mounted() {
    //修复大图查看器存在的bug
    $("body").on("click", ".el-image-viewer__close", () => {
      this.imgShow = false;
      setTimeout(() => {
        this.imgShow = true;
      }, 0);
    });
  },

  methods: {
    handleCurrentChange(val) {
      this.selectedMember.memberID = val.memberID;
      this.selectedMember.name = val.name;
      this.selectedMember.mobile = val.mobile;
    },
    //点击查询
    getMemberList() {
      this.GetContractMemberList(this.searchMember.nameMobile);
    },
    //绑定会员列表下拉框
    GetContractMemberList(memberName) {
      let data = {
        shopID: this.shopID,
        memberName: memberName,
      };
      return new Promise((resolve, reject) => {
        GetContractMemberList(data)
          .then((response) => {
            const { data } = response;
            this.memberList = response.data;
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    showEdit(contract) {
      if (!contract) {
        this.title = "新增合同";
        this.form = {
          contractID: "",
        };
      } else {
        this.title = "合同详情";
        this.form = JSON.parse(JSON.stringify(contract));
        this.selectedMember.memberID = this.form.memberID;
        this.selectedMember.name = this.form.memberName;
        this.selectedMember.mobile = this.form.memberMobile;
      }
      this.dialogFormVisible = true;
    },
    close() {
      this.dialogFormVisible = false;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    save(formName) {
      let self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          if (self.form.contractID != "") {
            self.UpdateContract(self.form);
          } else {
            self.InsertContract(self.form);
          }
          self.dialogFormVisible = false;
        }
      });
    },
    //添加合同
    InsertContract(contractForm) {
      let that = this;
      contractForm.memberID = that.selectedMember.memberID;
      return new Promise((resolve, reject) => {
        InsertContract(contractForm)
          .then((response) => {
            const { data } = response;
            if (data == 1) {
              that.$baseMessage("添加成功", "success");
              that.$emit("resetSearch");
            } else {
              that.$baseMessage("添加失败", "success");
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //修改合同
    UpdateContract(contractForm) {
      let that = this;
      contractForm.memberID = that.selectedMember.memberID;
      return new Promise((resolve, reject) => {
        UpdateContract(contractForm)
          .then((response) => {
            const { data } = response;
            if (data == 1) {
              that.$baseMessage("修改成功", "success");
              that.$emit("resetSearch");
            } else {
              that.$baseMessage("修改失败", "success");
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
</script>

<style>
h4 {
  color: #67abd8;
}
</style>
