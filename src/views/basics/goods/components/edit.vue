<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    :width="dialogWidth"
    @close="close"
  >
    <el-form :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.Name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="售卖类型">
        <el-select
          v-model="form.ShopType"
          style="width: 100%;"
          placeholder="请选择活动区域"
        >
          <el-option label="按天" value="1"></el-option>
          <el-option label="按节" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量">
        <el-input v-model="form.Number" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="form.Price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="form.Status"
          style="width: 100%;"
          placeholder="请选择状态"
        >
          <el-option label="售卖" value="1"></el-option>
          <el-option label="展示" value="2"></el-option>
          <el-option label="禁售" value="3"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :limit="1"
      list-type="picture"
    >
      <el-button size="small" type="primary">上传课程图片</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传1张,如需修改请删除后上传。
      </div>
    </el-upload>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "TableEdit",
  data() {
    return {
      dialogWidth: "340px",
      form: {
        GoodsID: null,
        Name: "",
        ShopType: "1",
        Number: "",
        Price: "",
        Status: "1",
      },
      fileList: [
        {
          name: "food.jpeg",
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
        this.title = "增加课程";
      } else {
        this.title = "编辑课程";
        this.form = row;
      }
      this.dialogFormVisible = true;
    },
    close() {
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
    },
    save() {
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
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

<style lang="scss" scoped></style>
