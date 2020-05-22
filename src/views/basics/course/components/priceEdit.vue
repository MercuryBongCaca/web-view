<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    :width="dialogWidth"
    @close="close"
  >
    <el-form :model="coursePriceForm" label-width="100px">
      <el-form-item label="课程名称">
        <el-select
          v-model="coursePriceForm.courseID"
          style="width: 100%;"
          placeholder="请选择活动区域"
        >
          <el-option
            v-for="item in courseForm"
            :key="item.courseID"
            :label="item.courseName"
            :value="item.courseID"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计费方式">
        <el-radio v-model="coursePriceForm.saleType" :label="1">按节</el-radio>
        <el-radio v-model="coursePriceForm.saleType" :label="2">按天</el-radio>
      </el-form-item>
      <el-form-item label="数量区间">
        <el-input
          v-model="coursePriceForm.saleNumStart"
          autocomplete="off"
          style="width: 80px;"
        >
        </el-input
        >至
        <el-input
          v-model="coursePriceForm.saleNumEnd"
          autocomplete="off"
          style="width: 80px;"
        >
        </el-input>
        {{ coursePriceForm.saleType == "1" ? "节" : "天" }}
      </el-form-item>
      <el-form-item label="课程单价">
        <el-input v-model="coursePriceForm.unitPrice" autocomplete="off">
        </el-input>
      </el-form-item>
    </el-form>
    <div class="div_msg">
      *购买课程时如出现区间一样的设定，默认按最高单价计算
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  InsertCoursePrice,
  UpdateCoursePrice,
  GetCourseList,
} from "@/api/table";

export default {
  name: "PriceEdit",
  data() {
    return {
      priceType: "1",
      dialogImageUrl: "",
      dialogVisible: false,
      dialogWidth: "340px",
      courseForm: [],
      coursePriceForm: [],
      title: "",
      dialogFormVisible: false,
    };
  },
  created() {
    this.setDialogWidth();
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.setDialogWidth();
      })();
    };
  },
  methods: {
    showPriceEdit(coursePrice) {
      if (!coursePrice) {
        this.title = "价格设定";
        this.coursePriceForm = {
          coursePriceID: "",
        };
      } else {
        this.title = "价格设定";
        this.coursePriceForm = JSON.parse(JSON.stringify(coursePrice));
        //给单选框赋值
        console.log(this.coursePriceForm);
      }
      this.GetCourseList();
      this.dialogFormVisible = true;
    },
    close() {
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
    },
    save() {
      if (this.coursePriceForm.coursePriceID != "") {
        this.UpdateCoursePrice(this.coursePriceForm);
      } else {
        this.coursePriceForm.shopID = "945D66C8-ABB0-499B-A5A3-D4F1032C86BF";
        this.coursePriceForm.isDelet = "0";
        this.coursePriceForm.upTime = "2020-05-05";
        this.coursePriceForm.upUser = "admin";
        this.InsertCoursePrice(this.coursePriceForm);
      }
      this.dialogFormVisible = false;
    },
    setDialogWidth() {
      var val = document.body.clientWidth;
      if (val < 500) {
        this.dialogWidth = "95%";
      } else {
        this.dialogWidth = "500px";
      }
    },
    //获取课程名称
    GetCourseList() {
      return new Promise((resolve, reject) => {
        GetCourseList()
          .then((response) => {
            const { data } = response;
            this.courseForm = response.data;
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //添加课程价格
    InsertCoursePrice(coursePriceForm) {
      debugger;
      let that = this;
      return new Promise((resolve, reject) => {
        InsertCoursePrice(coursePriceForm)
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
    //修改课程价格
    UpdateCoursePrice(coursePriceForm) {
      let that = this;
      return new Promise((resolve, reject) => {
        UpdateCoursePrice(coursePriceForm)
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

<style></style>
