<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="370px"
    @close="close"
  >
    <el-form :model="form" label-width="80px">
      <el-form-item label="场地" prop="region">
        <el-select v-model="form.area" placeholder="请选择场地">
          <el-option
            v-for="(item, index) in areaList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程" prop="region">
        <el-select v-model="form.course" placeholder="请选择课程">
          <el-option
            v-for="(item, index) in courseList"
            :key="index"
            :label="item.name + '(' + item.minute + '分钟)'"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="老师" prop="region">
        <el-select v-model="form.teacher" placeholder="请选择老师">
          <el-option
            v-for="(item, index) in employeeList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始">
        <el-time-picker
          v-model="form.start"
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
      <el-form-item label="结束">
        <el-time-picker
          v-model="form.end"
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
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ScheduleEdit",
  data() {
    return {
      form: {
        start: "10:10",
        end: "11:10",
        area: "1",
        course: "1",
        teacher: "1",
        diff: 60,
      },
      listIndex: 0,
      cIndex: 0,
      title: "",
      dialogFormVisible: false,
    };
  },
  computed: {
    ...mapGetters(["employeeList", "areaList", "courseList"]),
  },
  created() {},
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
      let startTime = this.form.start;
      let endTime = this.form.end;
      let start1 = startTime.split(":");
      let startAll = parseInt(start1[0] * 60) + parseInt(start1[1]);

      let end1 = endTime.split(":");
      let endAll = parseInt(end1[0] * 60) + parseInt(end1[1]);
      this.form.diff = endAll - startAll;
    },
    close() {
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
    },
    save() {
      if (this.form.diff < 0) {
        return this.$baseMessage("时长不能小于0", "error");
      }
      this.dialogFormVisible = false;
      this.$emit(
        "transferUser",
        this.listIndex,
        JSON.parse(JSON.stringify(this.form)),
        this.cIndex
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
