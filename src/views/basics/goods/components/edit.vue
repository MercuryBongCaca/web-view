<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    :width="dialogWidth"
    @close="close"
  >
    <el-row :gutter="20">
      <el-form :rules="goodsRules" :model="form" label-width="auto">
        <el-col :span="12">
          <el-form-item label="商品类型">
            <el-select
              v-model="form.Type"
              style="width: 100%;"
              placeholder="请选择类型"
            >
              <el-option label="饮料" value="1"></el-option>
              <el-option label="乐器" value="2"></el-option>
              <el-option label="书籍" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="售卖状态">
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
        </el-col>
        <el-col :span="15">
          <el-form-item label="商品名" prop="Name">
            <el-input v-model="form.Name"></el-input>
          </el-form-item> </el-col
        ><el-col :span="9">
          <el-form-item label="单位">
            <el-input
              v-model="form.Price"
              placeholder="件"
              maxlength="3"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="成本价">
            <el-input v-model="form.CostPrice">
              <template slot="append">元</template></el-input
            >
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="售卖价">
            <el-input v-model="form.SalePrice"
              ><template slot="append">元</template></el-input
            >
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="form.Remark" type="textarea"></el-input>
          </el-form-item>

          <el-form-item label="图片上传">
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
      </el-form>
    </el-row>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
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
      dialogImageUrl: "",
      dialogVisible: false,
      dialogWidth: "340px",
      form: {
        GoodsID: null,
        Name: "",
        Unit: "",
        CostPrice: "1",
        SalePrice: "",
        Type: "1",
        Status: "1",
      },
      fileList: [
        {
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
      title: "",
      dialogFormVisible: false,
      goodsRules: {
        Name: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "blur",
          },
        ],
      },
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
        this.title = "增加商品";
      } else {
        this.title = "编辑商品";
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
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
