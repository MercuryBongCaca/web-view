<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    style="min-width: 300px;"
    :width="dialogWidth"
    @close="close"
  >
    <el-form
      ref="employeeform"
      :model="employeeform"
      :rules="formRules"
      label-width="auto"
    >
      <el-row :gutter="20">
        <el-col :xs="24" :span="12">
          <el-form-item label="名称" prop="name">
            <el-input v-model="employeeform.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="手机号" prop="mobile">
            <el-input
              v-model="employeeform.mobile"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :span="12">
          <el-form-item label="性别">
            <el-radio-group v-model="employeeform.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="证件号">
            <el-input
              v-model="employeeform.idCard"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="登录名">
            <el-input
              v-model="employeeform.userName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="密码">
            <el-input
              v-model="employeeform.passWord"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="职位">
            <el-select
              v-model="employeeform.nickName"
              collapse-tags
              placeholder="请选择职位状态"
            >
              <el-option :key="管理员" label="管理员" :value="1"></el-option>
              <el-option :key="老师" label="老师" :value="2"></el-option>
              <el-option :key="前台" label="前台" :value="3"></el-option>
              <el-option :key="财务" label="财务" :value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="职务状态">
            <el-select
              v-model="employeeform.status"
              placeholder="请选择职务状态"
            >
              <el-option :key="1" label="在职" :value="1"></el-option>
              <el-option :key="2" label="离职" :value="2"></el-option>
              <el-option :key="3" label="实习" :value="3"></el-option>
              <el-option :key="4" label="兼职" :value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="入职日期">
            <el-date-picker
              v-model="employeeform.entryData"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="离职日期">
            <el-date-picker
              v-model="employeeform.quitData"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="备注">
            <el-input
              v-model="employeeform.remark"
              type="textarea"
              :rows="2"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="头像上传">
            <el-upload
              action="string"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :http-request="handler"
              :on-change="handleChange"
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
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save('employeeform')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { InsertEmployee, UpdateEmployee } from "@/api/employee";

export default {
  name: "TableEdit",
  data() {
    return {
      dialogWidth: "50%",
      employeeform: {},
      formRules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
        ],
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
    showEdit(employee) {
      if (!employee) {
        this.title = "增加员工";
        this.employeeform = {
          employeeID: "",
        };
      } else {
        this.title = "编辑员工";
        this.employeeform = JSON.parse(JSON.stringify(employee));
        this.employeeform.upUser = "admin";
        //绑定图片
        let obj = new Object();
        obj.url = process.env.VUE_APP_BASE_API2 + this.employeeform.headImgUrl;
        this.fileList[0] = obj;
      }
      this.dialogFormVisible = true;
    },
    close() {
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
    },
    save(formName) {
      let self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          if (self.employeeform.employeeID != "") {
            self.UpdateEmployee(self.employeeform);
          } else {
            self.InsertEmployee(self.employeeform);
          }
          // self.form = self.$options.data().form;
          self.dialogFormVisible = false;
        }
      });
    },
    //添加员工
    InsertEmployee(employeeForm) {
      let that = this;
      let employeeandimage = {
        employee: employeeForm,
        pictureStream: that.files,
        IsUpDadeImage: that.IsUpDadeImage,
      };
      return new Promise((resolve, reject) => {
        InsertEmployee(employeeandimage)
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
    //修改员工
    UpdateEmployee(employeeForm) {
      let that = this;
      let employeeandimage = {
        employee: employeeForm,
        pictureStream: that.files,
        IsUpDadeImage: that.IsUpDadeImage,
      };
      return new Promise((resolve, reject) => {
        UpdateEmployee(employeeandimage)
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    setDialogWidth() {
      console.log(document.body.clientWidth);
      var val = document.body.clientWidth;
      if (val < 700) {
        this.dialogWidth = "95%";
      } else {
        this.dialogWidth = "50%";
      }
    },
  },
};
</script>

<style lang="scss">
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
