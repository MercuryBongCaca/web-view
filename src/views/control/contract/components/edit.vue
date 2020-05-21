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
                  :preview-src-list="[scope.row.imgURL]"
                  :src="scope.row.imgURL"
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
    <el-form label-width="80px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="课程名称">
            <el-select v-model="form.CourseID" filterable placeholder="请选择">
              <el-option
                v-for="item in courseList"
                :key="item.CourseID"
                :label="item.Name"
                :value="item.CourseID"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上课老师">
            <el-select
              v-model="form.EmployeeID"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in employeeList"
                :key="item.EmployeeID"
                :label="item.Name"
                :value="item.EmployeeID"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="课程数量">
            <el-input v-model="form.Number" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="销售人">
            <el-select
              v-model="form.SaleEmployeeID"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in employeeList"
                :key="item.EmployeeID"
                :label="item.Name"
                :value="item.EmployeeID"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同开始">
            <el-date-picker
              v-model="form.StartTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同结束">
            <el-date-picker
              v-model="form.EndTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同金额">
            <el-input
              v-model="form.BasePrice"
              :disabled="true"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最终收款">
            <el-input v-model="form.FinalPrice" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input
              v-model="form.Remark"
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
      <el-button type="primary" @click="save">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
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
      form: {
        ContractID: "",
        MemberID: "",
        CourseID: "",
        ContractNo: "",
        Number: "",
        EmployeeID: "",
        SaleEmployeeID: "",
        Status: "",
        BasePrice: "",
        PaidPrice: "",
        CreatetTime: "",
        StartTime: new Date(),
        EndTime: "",
        Remark: "",
        ShopID: "",
        IsDeleted: "",
        upTime: "",
        upUser: "",
      },
      selectedMember: {
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
  created() {},
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
      this.selectedMember.name = val.name;
      this.selectedMember.mobile = val.mobile;
    },
    getMemberList() {},
    showEdit(row) {
      if (!row) {
        this.title = "新增合同";
      } else {
        this.title = "合同详情";
      }
      this.dialogFormVisible = true;
    },
    close() {
      this.dialogFormVisible = false;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    save() {
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style>
h4 {
  color: #67abd8;
}
</style>
