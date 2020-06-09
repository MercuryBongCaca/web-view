<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
    <div style="padding-bottom: 10px;">
      <el-input
        v-model="searchMember.nameMobile"
        autocomplete="off"
        placeholder="姓名/手机号"
        class="zq_m_r"
        style="width: 250px;"
      ></el-input>

      <el-button type="primary" @click="getMemberList">搜索</el-button>
    </div>
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

    <el-divider content-position="left"> <h4>已选信息</h4></el-divider>

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
    <el-divider content-position="left"> <h4>预约信息</h4></el-divider>
    <el-form label-width="80px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="预约课程">
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
          <el-form-item label="预约数量">
            <el-input
              v-model="form.ReserveNumber"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上课老师">
            <el-select
              v-model="form.ReserveEmployeeID"
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
          <el-form-item label="上课时间">
            <el-date-picker
              v-model="form.ReserveTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              placeholder="选择时间"
            >
            </el-date-picker>
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
      <el-button type="primary" @click="save">预 约</el-button>
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
        ReservationID: "",
        CourseID: "",
        ContractID: "",
        ReserveTime: "",
        ReserveNumber: "",
        FinalNumber: "",
        StillNumber: "",
        StartTime: "",
        EndTime: "",
        CancelTime: "",
        MemberID: "",
        ReserveEmployeeID: "",
        FinalEmployeeID: "",
        Status: "",
        Remark: "",
        ShopID: "",
        IsDeleted: "",
        upTime: "",
        upUser: "",
      },
      selectedMember: {
        name: "",
        mobile: "",
        contractNo: "",
        stillNumber: "",
        StartTime: "",
        CourseName: "",
        EndTime: "",
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
  mounted() {},

  methods: {
    handleCurrentChange(val) {
      this.selectedMember = val;
    },
    getMemberList() {},
    showEdit(row) {
      this.title = "预约课程";

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
