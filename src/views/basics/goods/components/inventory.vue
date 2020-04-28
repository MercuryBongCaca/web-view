<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="370px"
    @close="close"
  >
    <el-form :model="form" label-width="80px">
      <el-form-item label="商品名称">
        <el-input
          v-model="form.Name"
          :disabled="true"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="当前数量">
        <el-input
          v-model="form.Number"
          :disabled="true"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="添加数量">
        <el-input-number
          v-model="form.AddNumber"
          :min="-99999"
          :max="99999"
          label="描述文字"
          style="width: 100%;"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <div style="text-align: right; font-size: 0.7rem;">
      更改后库存:{{ form.AddNumber + form.Number }}
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "InventoryEdit",
  data() {
    return {
      form: {
        GoodsID: null,
        Name: "吉他",
        Number: 99,
        AddNumber: 0,
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
  created() {},
  methods: {
    showEdit(row) {
      this.title = "库存调整";
      if (row) {
        // this.form = row;
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
  },
};
</script>

<style lang="scss" scoped></style>
