<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    :width="dialogWidth"
    @close="close"
  >
    <el-form :model="courseForm" label-width="100px">
      <el-form-item label="名称">
        <el-input v-model="courseForm.courseName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="课程类型">
        <el-select
          v-model="courseForm.courseTypeID"
          style="width: 100%;"
          placeholder="请选择活动区域"
        >
          <el-option
            v-for="item in courseTypeForm"
            :key="item.courseTypeID"
            :label="item.courseTypeName"
            :value="item.courseTypeID"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程时长">
        <el-input v-model="courseForm.courseDuration" autocomplete="off">
          <template slot="append">分钟</template>
        </el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="courseForm.status"
          style="width: 100%;"
          placeholder="请选择状态"
        >
          <el-option :key="1" label="售卖" :value="1"></el-option>
          <el-option :key="2" label="展示" :value="2"></el-option>
          <el-option :key="3" label="禁售" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片上传">
        <el-upload
          action="string"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :http-request="handler"
          :on-success="handleSuccess"
          :on-change="handleChange"
          :on-error="handleError"
          :limit="1"
          :auto-upload="false"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">
            只能上传1张,如需修改请删除后上传。
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { InsertCourse, UpdateCourse, GetCourseTypeList } from "@/api/table";

export default {
  name: "TableEdit",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      dialogWidth: "340px",
      courseTypeForm: {
        courseTypeID: "",
        courseTypeName: "",
      },
      courseForm: {
        courseID: "",
        courseName: "",
        courseTypeID: "",
        courseTypeName: "",
        courseDuration: "",
        remarks: "",
        status: "",
        statusName: "",
        shopID: "945D66C8-ABB0-499B-A5A3-D4F1032C86BF",
        isDelete: "0",
        upTime: "",
        upUser: "admin",
        pictureUrl: "",
      },
      fileList: [],
      files: "",
      IsUpDadeImage: 0,
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
    showEdit(course) {
      if (!course) {
        this.title = "增加课程";
        this.courseForm = {
          courseID: "",
        };
      } else {
        this.title = "编辑课程";
        this.courseForm = JSON.parse(JSON.stringify(course));
        let obj = new Object();
        obj.url = process.env.VUE_APP_BASE_API2 + this.courseForm.pictureUrl;
        this.fileList[0] = obj;
      }
      this.GetCourseTypeList();
      this.dialogFormVisible = true;
    },
    close() {
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
    },
    save() {
      if (this.courseForm.courseID != "") {
        this.UpdateCourse(this.courseForm);
      } else {
        this.courseForm.courseTypeName = this.courseTypeForm.courseTypeName;
        this.courseForm.remarks = "";
        this.courseForm.statusName = "";
        this.courseForm.shopID = "945D66C8-ABB0-499B-A5A3-D4F1032C86BF";
        this.courseForm.isDelet = "0";
        this.courseForm.upTime = "2020-05-05";
        this.courseForm.upUser = "admin";
        this.courseForm.pictureUrl = "";
        this.InsertCourse(this.courseForm);
      }
      this.dialogFormVisible = false;
    },
    courseTypeChange(data) {
      console.log(data);
    },
    //添加课程
    InsertCourse(courseForm) {
      let that = this;
      let courseandimage = {
        course: courseForm,
        pictureStream: that.files,
        IsUpDadeImage: that.IsUpDadeImage,
      };
      return new Promise((resolve, reject) => {
        InsertCourse(courseandimage)
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
    //修改课程
    UpdateCourse(courseForm) {
      let that = this;
      let courseandimage = {
        course: courseForm,
        pictureStream: that.files,
        IsUpDadeImage: that.IsUpDadeImage,
      };
      return new Promise((resolve, reject) => {
        UpdateCourse(courseandimage)
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
    //获取课程类型下拉框
    GetCourseTypeList() {
      return new Promise((resolve, reject) => {
        GetCourseTypeList()
          .then((response) => {
            const { data } = response;
            // let obj = [];
            // response.data.map((item,index) => {
            //   obj.push({
            //     key: item.courseTypeID,
            //     label: item.courseTypeName,
            //     value: JSON.stringify(item)
            //   });
            // })
            // this.courseTypeForm = obj;
            this.courseTypeForm = response.data;
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    handler() {},
    handleChange(file, fileList) {
      let that = this;
      that.IsUpDadeImage = 1;
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function (e) {
        that.files = this.result;
      };
    },
    //文件移除时的钩子
    handleRemove(file, fileList) {
      this.files = "";
      this.IsUpDadeImage = 0;
      console.log(file, fileList);
    },
    //点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      this.$notify.success({
        title: "成功",
        message: "文件上传成功",
      });
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      this.$notify.error({
        title: "错误",
        message: "文件上传失败",
      });
    },
    setDialogWidth() {
      var val = document.body.clientWidth;
      if (val < 500) {
        this.dialogWidth = "95%";
      } else {
        this.dialogWidth = "500px";
      }
    },
  },
};
</script>

<style></style>
