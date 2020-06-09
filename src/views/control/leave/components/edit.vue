<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
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
          <el-table-column label="姓名" prop="name"></el-table-column>
          <el-table-column label="手机号" prop="mobile"></el-table-column>
          <el-table-column label="合同编号" prop="contractNo"></el-table-column>
          <el-table-column label="课程名称" prop="CourseName"></el-table-column>
          <el-table-column
            label="剩余节数"
            prop="stillNumber"
          ></el-table-column>
          <el-table-column label="有效期起" prop="StartTime"></el-table-column>
          <el-table-column
            label="有效期止"
            prop="EndTime"
          ></el-table-column></el-table
      ></el-col>
    </el-row>

    <el-divider content-position="left"> <h4>已选合同信息</h4></el-divider>

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
            <el-col :span="12">
              <el-form-item label="合同编号">
                <el-input
                  v-model="selectedMember.contractNo"
                  :disabled="true"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="课程名">
                <el-input
                  v-model="selectedMember.CourseName"
                  :disabled="true"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同开始日">
                <el-input
                  v-model="selectedMember.StartTime"
                  :disabled="true"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同结束日">
                <el-input
                  v-model="selectedMember.EndTime"
                  :disabled="true"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="剩余节数">
                <el-input
                  v-model="selectedMember.stillNumber"
                  :disabled="true"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-divider content-position="left"> <h4>请假信息</h4></el-divider>
    <el-form label-width="auto">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="请假开始日">
            <el-date-picker
              v-model="form.StartTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="请假结束日">
            <el-date-picker
              v-model="form.EndTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="请假类型">
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
        <el-col :span="24">
          <el-form-item label="请假原因">
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
          contractNo: "0001",
          stillNumber: 9,
          StartTime: "2020-1-2",
          EndTime: "2020-10-2",
          CourseName: "初级吉他",
          imgURL: "https://i.picsum.photos/id/25/200/300.jpg",
        },
        {
          name: "李四",
          mobile: "1766045448",
          contractNo: "0002",
          stillNumber: 10,
          StartTime: "2020-1-2",
          EndTime: "2020-7-2",
          CourseName: "架子鼓课",
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
      this.selectedMember = val;
    },
    getMemberList() {},
    showEdit() {
      this.title = "请假";
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
