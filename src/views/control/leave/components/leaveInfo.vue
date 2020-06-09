<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="700px"
    @close="close"
  >
    <el-row :gutter="24">
      <el-col :span="24">
        <el-form label-width="auto">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input
                  v-model="selectedData.name"
                  :disabled="true"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号">
                <el-input
                  v-model="selectedData.mobile"
                  :disabled="true"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同编号">
                <el-input
                  v-model="selectedData.mobile"
                  :disabled="true"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="课程名">
                <el-input
                  v-model="selectedData.mobile"
                  :disabled="true"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同开始日">
                <el-input
                  v-model="selectedData.mobile"
                  :disabled="true"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同结束日">
                <el-input
                  v-model="selectedData.mobile"
                  :disabled="true"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="剩余节数">
                <el-input
                  v-model="selectedData.mobile"
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
              v-model="selectedData.StartTime"
              type="date"
              :disabled="true"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="请假结束日">
            <el-date-picker
              v-model="selectedData.EndTime"
              type="date"
              :disabled="true"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="请假类型">
            <el-select
              v-model="selectedData.LeaveType"
              filterable
              :disabled="true"
              placeholder="请选择"
            >
              <el-option label="病假" value="1"></el-option>
              <el-option label="事假" value="2"></el-option>
              <el-option label="其他" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="请假原因">
            <el-input
              v-model="selectedData.Remark"
              type="textarea"
              :disabled="true"
              :autosize="{ minRows: 2, maxRows: 4 }"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-divider content-position="left"> <h4>审批结果</h4></el-divider>
    <el-form label-width="auto">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="审批日期">
            <el-date-picker
              v-model="form.ApproveTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审批结果">
            <el-select v-model="form.Status" filterable placeholder="请选择">
              <el-option label="通过" value="1"></el-option>
              <el-option label="未通过" value="2"></el-option>
              <el-option label="待审批" value="3"></el-option>
            </el-select>
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
  name: "LeaveInfo",
  filters: {},
  data() {
    return {
      form: {
        ApproveID: "",
        LeaveID: "",
        ApproveTime: "",
        Status: "",
        Remark: "",
        EmployeeID: "",
        ShopID: "",
        IsDeleted: "",
        upTime: "",
        upUser: "",
      },
      selectedData: {
        name: "张三",
        mobile: "1766045447",
        contractNo: "0001",
        stillNumber: 9,
        StartTime: "2020-1-2",
        EndTime: "2020-10-2",
        CourseName: "初级吉他",
        imgURL: "https://i.picsum.photos/id/25/200/300.jpg",
        LeaveType: "1",
        StartTime: "2020-1-2",
        EndTime: "2020-3-2",
        Remark: "请假回家",
      },
      imgShow: true,
      elementLoadingText: "正在加载...",
      tabPosition: "left",
      title: "",
      dialogFormVisible: false,
    };
  },
  computed: {
    ...mapGetters(["employeeList"]),
  },
  created() {},
  beforeDestroy() {
    $("body").off("click");
  },
  mounted() {},

  methods: {
    handleCurrentChange(val) {
      this.selectedMember.name = val.name;
      this.selectedMember.mobile = val.mobile;
    },
    getMemberList() {},
    showEdit(row) {
      this.title = "请假审批";

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
