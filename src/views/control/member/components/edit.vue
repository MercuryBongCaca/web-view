<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    style="min-width: 300px;"
    :width="dialogWidth"
    @close="close"
  >
    <el-form
      ref="memberform"
      :model="memberform"
      :rules="formRules"
      label-width="auto"
    >
      <el-row :gutter="20">
        <el-col :xs="24" :span="12">
          <el-form-item label="名称" prop="name">
            <el-input v-model="memberform.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="memberform.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :span="12">
          <el-form-item label="性别">
            <el-radio-group v-model="memberform.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="出生日">
            <el-date-picker
              v-model="memberform.birthday"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="证件号">
            <el-input v-model="memberform.idCard" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="登录密码">
            <el-input
              v-model="memberform.password"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="住址">
            <el-input
              v-model="memberform.address"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="推荐人">
            <el-input
              v-model="memberform.promoter"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="推荐人手机">
            <el-input
              v-model="memberform.promoterTel"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="录入人" prop="enteredBy">
            <el-select
              v-model="memberform.enteredBy"
              placeholder="前选择录入人"
            >
              <el-option :key="1" label="张老师" :value="1"></el-option>
              <el-option :key="2" label="李老师" :value="2"></el-option>
              <el-option :key="3" label="王老师" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input
              v-model="memberform.remark"
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
      <el-button type="primary" @click="save('memberform')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { InsertMember, UpdateMember } from "@/api/member";

export default {
  name: "TableEdit",
  data() {
    return {
      dialogWidth: "50%",
      memberform: {},
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
        enteredBy: [
          {
            required: true,
            message: "请选择录入人",
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
    showEdit(member) {
      if (!member) {
        this.title = "增加会员";
        this.memberform = {
          memberID: "",
        };
      } else {
        this.title = "编辑会员";
        this.memberform = JSON.parse(JSON.stringify(member));
        //绑定图片
        let obj = new Object();
        obj.url = process.env.VUE_APP_BASE_API2 + this.memberform.picturePath;
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
          if (self.memberform.memberID != "") {
            self.UpdateMember(self.memberform);
          } else {
            self.InsertMember(self.memberform);
          }
          self.dialogFormVisible = false;
        }
      });
    },
    //添加会员
    InsertMember(memberForm) {
      let that = this;
      let memberandimage = {
        member: memberForm,
        pictureStream: that.files,
        IsUpDadeImage: that.IsUpDadeImage,
      };
      return new Promise((resolve, reject) => {
        InsertMember(memberandimage)
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
    //修改会员
    UpdateMember(memberForm) {
      let that = this;
      let memberandimage = {
        member: memberForm,
        pictureStream: that.files,
        IsUpDadeImage: that.IsUpDadeImage,
      };
      return new Promise((resolve, reject) => {
        UpdateMember(memberandimage)
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
