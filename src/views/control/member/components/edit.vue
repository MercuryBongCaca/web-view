<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    style="min-width: 300px;"
    :width="dialogWidth"
    @close="close"
  >
    <el-form ref="baseform" :model="form" :rules="formRules" label-width="auto">
      <el-row :gutter="20">
        <el-col :xs="24" :span="12">
          <el-form-item label="名称" prop="Name">
            <el-input v-model="form.Name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="手机号" prop="Mobile">
            <el-input v-model="form.Mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :span="12">
          <el-form-item label="性别">
            <el-radio-group v-model="form.Sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="出生日">
            <el-date-picker
              v-model="form.Birthday"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="证件号">
            <el-input v-model="form.IDCard" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="登录密码">
            <el-input
              v-model="form.PassWord"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="住址">
            <el-input v-model="form.IDCard" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="推荐人">
            <el-input v-model="form.Referrer" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="推荐人手机">
            <el-input
              v-model="form.ReferrerMobile"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="录入人" prop="EmployeeID">
            <el-select v-model="form.EmployeeID" placeholder="前选择录入人">
              <el-option label="张老师" value="1"></el-option>
              <el-option label="李老师" value="2"></el-option>
              <el-option label="王老师" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input
              v-model="form.Remark"
              type="textarea"
              :rows="2"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="头像上传">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :limit="1"
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
      <el-button type="primary" @click="save('baseform')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "TableEdit",
  data() {
    return {
      dialogWidth: "50%",
      form: {
        MemberID: "",
        Name: "",
        Sex: 1,
        Birthday: "",
        IDCard: "",
        Mobile: "",
        Remark: "",
        Password: "123123",
        Referrer: "",
        ReferrerMobile: "",
        Address: "",
        EmployeeID: "",
        CreateTime: "",
        UID: "",
        ShopID: "",
        IsDeleted: "",
        upTime: "",
        upUser: "",
        imgURL: "",
      },
      formRules: {
        Name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        Mobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
        ],
        EmployeeID: [
          {
            required: true,
            message: "请选择录入人",
            trigger: "blur",
          },
        ],
      },
      fileList: [
        {
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
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
    showEdit(row) {
      if (!row) {
        this.title = "增加会员";
      } else {
        this.title = "编辑会员";
        this.form = row;
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
          self.form = self.$options.data().form;
          self.dialogFormVisible = false;
        }
      });
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
