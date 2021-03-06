<template>
  <div class="table-container">
    <byui-query-form>
      <el-form
        ref="form"
        :model="queryForm"
        :inline="true"
        @submit.native.prevent
      >
        <el-form-item>
          <el-input v-model="queryForm.title" placeholder="商品名称" />
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-search"
            type="primary"
            native-type="submit"
            @click="handleQuery"
            >查询
          </el-button>
        </el-form-item>
      </el-form>
    </byui-query-form>
    <div style="text-align: right; padding-bottom: 10px;">
      <el-button icon="el-icon-plus" type="primary" @click="handleAdd"
        >添加
      </el-button>
      <el-button icon="el-icon-delete" type="danger" @click="handleDelete"
        >删除
      </el-button>
      <el-button v-if="checkPermission(['超级管理员'])" type="primary"
        >按钮级权限
      </el-button>
    </div>
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="goodsList"
      :element-loading-text="elementLoadingText"
      :height="height"
      @selection-change="setSelectRows"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="商品图片" width="80">
        <template slot-scope="scope">
          <div style="width: 80px; height: 50px;">
            <el-image
              v-if="imgShow"
              :preview-src-list="[scope.row.imgURL]"
              :src="scope.row.imgURL"
              style="width: 80px; height: 50px;"
            ></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="Name"></el-table-column>
      <el-table-column label="类型" prop="TypeName"></el-table-column>
      <el-table-column label="库存" prop="Number"></el-table-column>
      <el-table-column label="销售单价" prop="SalePrice"></el-table-column>
      <el-table-column class-name="status-col" label="状态">
        <template slot-scope="scope">
          <el-tooltip
            :content="scope.row.status"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="scope.row.Status | statusFilter"
              >{{ scope.row.StatusName }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="210">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)"
            >编辑
          </el-button>
          <el-button type="text" @click="inventoryEdit(scope.row)"
            >库存
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :background="background"
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <edit ref="edit"></edit>
    <inventory ref="iedit"></inventory>
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import Edit from "./components/edit";
import Inventory from "./components/inventory";

export default {
  name: "Table",
  components: {
    Edit,
    Inventory,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      imgShow: true,
      imageList: [],
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      background: true,
      height: 0,
      selectRows: "",
      elementLoadingText: "正在加载...",
      queryForm: {
        pageNo: 1,
        pageSize: 10,
        title: "",
      },
      goodsList: [
        {
          GoodsID: "",
          Name: "红牛",
          Unit: "瓶",
          CostPrice: "1.5",
          SalePrice: "2.5",
          Type: "1",
          TypeName: "饮料",
          Number: "99",
          Remark: "",
          Status: "1",
          StatusName: "售卖",
          ShopID: "",
          IsDeleted: "",
          upTime: "",
          upUser: "",
          imgURL:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3183730857,2780257894&fm=26&gp=0.jpg",
        },
      ],
    };
  },
  created() {
    this.fetchData();
    this.height = this.$baseTableHeight(1);
  },
  beforeDestroy() {
    $("body").off("click");
  },
  mounted() {
    //修复大图查看器存在的bug
    $("body").on("click", ".el-image-viewer__close", () => {
      this.imgShow = false;
      setTimeout(() => {
        this.imgShow = true;
      }, 0);
    });
  },
  methods: {
    setSelectRows(val) {
      this.selectRows = val;
    },
    handleAdd() {
      this.$refs["edit"].showEdit();
    },
    handleEdit(row) {
      this.$refs["edit"].showEdit(row);
    },
    inventoryEdit(row) {
      this.$refs["iedit"].showEdit(row);
    },
    handleDelete() {
      if (this.selectRows.length === 0) {
        return this.$baseMessage("请至少选择一项", "error");
      }
      const ids = this.selectRows.map((item) => item.id).join();
      this.$baseConfirm(
        "你确定要删除选中项吗",
        null,
        () => {
          this.$baseMessage("删除成功！", "success");
        },
        () => {
          alert("点击了取消");
        }
      );
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.queryForm.pageNo = val;
      this.fetchData();
    },
    handleQuery() {
      this.queryForm.pageNo = 1;
      this.fetchData();
    },
    fetchData() {
      this.listLoading = true;
      //获取数据后 加载动画取消
      this.listLoading = false;
    },
    checkPermission,
  },
};
</script>
<style lang="scss" scoped></style>
