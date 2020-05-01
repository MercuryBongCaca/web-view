<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    :width="dialogWidth"
    @close="close"
  >
    <el-form :model="courseForm" label-width="100px">
      <el-form-item label="课程名称">
        <el-select
          v-model="courseForm.Type"
          style="width: 100%;"
          placeholder="请选择活动区域"
        >
          <el-option label="吉他课" value="1"></el-option>
          <el-option label="架子鼓" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计费方式">
        <el-radio v-model="priceType" label="1">按节</el-radio>
        <el-radio v-model="priceType" label="2">按天</el-radio>
      </el-form-item>
      <el-form-item label="数量区间">
        <el-input
          v-model="courseForm.Min"
          autocomplete="off"
          style="width: 80px;"
        >
        </el-input
        >至
        <el-input
          v-model="courseForm.Min"
          autocomplete="off"
          style="width: 80px;"
        >
        </el-input>
        {{ priceType == "1" ? "节" : "天" }}
      </el-form-item>
      <el-form-item label="课程单价">
        <el-input v-model="courseForm.Min" autocomplete="off"> </el-input>
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
export default {
  name: "PriceEdit",
  data() {
    return {
      priceType: "1",
      dialogImageUrl: "",
      dialogVisible: false,
      dialogWidth: "340px",
      courseForm: {},

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
    showPriceEdit(row) {
      if (!row) {
        this.title = "价格设定";
        this.courseForm = {};
      } else {
        this.title = "价格设定";
        this.courseForm = JSON.parse(JSON.stringify(row));
      }
      this.dialogFormVisible = true;
    },
    close() {
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
    },
    save() {
      console.log(this.courseForm);
      this.dialogFormVisible = false;
    },
    setDialogWidth() {
      console.log(document.body.clientWidth);
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
