<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="350px"
    @close="close"
  >
    <el-form label-width="80px">
      <el-form-item label="课程名称">
        <el-select
          v-model="form.CourseID"
          :disabled="true"
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="item in courseList"
            :key="item.CourseID"
            :label="item.Name"
            :value="item.CourseID"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上课数量">
        <el-input v-model="form.ReserveNumber" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="上课老师">
        <el-select
          v-model="form.ReserveEmployeeID"
          :disabled="flagType == 2"
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

      <el-form-item label="上课时间">
        <el-time-picker
          v-model="form.StartTime"
          format="HH:mm"
          :disabled="flagType == 2"
        >
        </el-time-picker>
      </el-form-item>
      <el-form-item v-if="flagType == 2" label="下课时间">
        <el-time-picker v-model="form.EndTime" format="HH:mm"> </el-time-picker>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="form.Remark"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button v-if="flagType == 1" type="primary" @click="save"
        >上 课</el-button
      >
      <el-button v-if="flagType == 2" type="primary" @click="save"
        >下 课</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ClassInfo",
  filters: {},
  data() {
    return {
      flagType: 1,
      form: {
        ReservationID: "",
        CourseID: "1",
        ContractID: "",
        ReserveTime: "",
        ReserveNumber: "1",
        FinalNumber: "",
        StillNumber: "",
        StartTime: "2020-6-10 20:30",
        EndTime: "",
        CancelTime: "",
        MemberID: "",
        ReserveEmployeeID: "1",
        FinalEmployeeID: "",
        Status: "",
        Remark: "",
        ShopID: "",
        IsDeleted: "",
        upTime: "",
        upUser: "",
      },
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
    showEdit(row, flag) {
      this.flagType = flag;
      if (flag == 1) {
        this.title = "课程上课";
      } else if (flag == 2) {
        this.title = "课程下课";
      }
      this.dialogFormVisible = true;
    },
    close() {
      this.dialogFormVisible = false;
    },
    save() {
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style></style>
