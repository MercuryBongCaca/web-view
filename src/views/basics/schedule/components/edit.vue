<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="370px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="场地" prop="AreaID">
        <el-select v-model="form.AreaID" placeholder="请选择场地">
          <el-option
            v-for="(item, index) in areaList"
            :key="index"
            :label="item.Name"
            :value="item.AreaID"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程" prop="CourseID">
        <el-select v-model="form.CourseID" placeholder="请选择课程">
          <el-option
            v-for="(item, index) in courseList"
            :key="index"
            :label="item.Name + '(' + item.Min + '分钟)'"
            :value="item.CourseID"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="老师" prop="EmployeeID">
        <el-select v-model="form.EmployeeID" placeholder="请选择老师">
          <el-option
            v-for="(item, index) in employeeList"
            :key="index"
            :label="item.Name"
            :value="item.EmployeeID"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始" prop="StartTime">
        <el-time-picker
          v-model="form.StartTime"
          style="width: 100%; max-width: 190px;"
          format="HH:mm"
          value-format="HH:mm"
          :picker-options="{
            selectableRange: '1:00:00 - 23:59:00',
          }"
          placeholder="开始时间"
          @change="timeDifference"
        >
        </el-time-picker>
      </el-form-item>
      <el-form-item label="结束" prop="EndTime">
        <el-time-picker
          v-model="form.EndTime"
          style="width: 100%; max-width: 190px;"
          format="HH:mm"
          value-format="HH:mm"
          :picker-options="{
            selectableRange: '1:00:00 - 23:59:00',
          }"
          placeholder="结束时间"
          @change="timeDifference"
        >
        </el-time-picker>
      </el-form-item>
    </el-form>
    <div style="text-align: right; font-size: 0.7rem;">
      时长:{{ form.diff }}分钟
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ScheduleEdit",
  data() {
    return {
      form: {},
      listIndex: 0,
      cIndex: 0,
      title: "",
      dialogFormVisible: false,
      rules: {
        AreaID: [
          {
            required: true,
            message: "请选择场地",
            trigger: "change",
          },
        ],
        CourseID: [
          {
            required: true,
            message: "请选择课程",
            trigger: "change",
          },
        ],
        EmployeeID: [
          {
            required: true,
            message: "请选择老师",
            trigger: "change",
          },
        ],
        StartTime: [
          {
            required: true,
            message: "请选择开始时间",
            trigger: "change",
          },
        ],
        EndTime: [
          {
            required: true,
            message: "请选择结束时间",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["employeeList", "areaList", "courseList"]),
  },
  created() {
    this.form = {
      StartTime: "",
      EndTime: "",
      AreaID: "",
      CourseID: "",
      EmployeeID: "",
      diff: 0,
    };
  },
  methods: {
    showEdit(index, rowName, cindex, row) {
      this.listIndex = index;
      this.cIndex = cindex;
      if (!row) {
        this.title = "新增 " + rowName + "课程";
      } else {
        this.title = "编辑 " + rowName + "课程";
        this.form = row;
      }
      this.dialogFormVisible = true;
    },
    timeDifference() {
      if (this.form.StartTime && this.form.EndTime) {
        let startTime = this.form.StartTime;
        let endTime = this.form.EndTime;
        let start1 = startTime.split(":");
        let startAll = parseInt(start1[0] * 60) + parseInt(start1[1]);

        let end1 = endTime.split(":");
        let endAll = parseInt(end1[0] * 60) + parseInt(end1[1]);
        this.form.diff = endAll - startAll;
      }
    },
    close() {
      this.$refs["form"].resetFields();
      this.dialogFormVisible = false;
    },
    save(formName) {
      let self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          if (self.form.diff < 0) {
            return self.$baseMessage("时长不能小于0", "error");
          }
          self.dialogFormVisible = false;
          self.$emit(
            "transferUser",
            self.listIndex,
            JSON.parse(JSON.stringify(self.form)),
            self.cIndex
          );
          self.$refs[formName].resetFields();
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
