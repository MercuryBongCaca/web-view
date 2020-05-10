<template>
  <div class="table-container">
    <el-form
      ref="form"
      :model="queryForm"
      :inline="true"
      @submit.native.prevent
    >
      <el-form-item>
        <el-input v-model="queryForm.name" placeholder="姓名/手机号" />
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
    <div style="text-align: right; padding-bottom: 10px;">
      <el-button icon="el-icon-plus" type="primary" @click="handleAdd"
        >添加
      </el-button>
      <el-button icon="el-icon-delete" type="danger" @click="handleDelete"
        >删除
      </el-button>
    </div>
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="employeeList"
      :element-loading-text="elementLoadingText"
      :height="height"
      @selection-change="setSelectRows"
    >
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column label="头像" width="100">
        <template slot-scope="scope">
          <div style="width: 50px; height: 50px;">
            <el-image
              v-if="imgShow"
              :preview-src-list="[scope.row.imgURL]"
              :src="scope.row.imgURL"
              style="width: 80px; height: 50px;"
            ></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="Name" width="110"></el-table-column>
      <el-table-column
        label="性别"
        prop="SexName"
        width="110"
      ></el-table-column>
      <el-table-column label="手机号" prop="Mobile"></el-table-column>
      <el-table-column label="录入时间" prop="CreateTime"></el-table-column>
      <el-table-column label="录入人" prop="EmployeeName"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)"
            >编辑
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
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import { getList } from "@/api/table";
import Edit from "./components/edit";

export default {
  name: "Table",
  components: {
    Edit,
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
        name: "",
        status: "0",
      },
      employeeList: [
        {
          MemberID: "",
          Name: "张三",
          Sex: "1",
          SexName: "男",
          Mobile: "13035961201",
          Remark: "备注aaa",
          LoginName: "admin",
          PassWord: "11",
          ShopID: "",
          IsDeleted: "",
          CreateTime: "2020-1-12",
          upTime: "",
          upUser: "",
          Referrer: "张三",
          ReferrerMobile: "15635961764",
          EmployeeID: "1",
          EmployeeName: "李老师",
          CreateDate: "2020-1-3",
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
  mounted() {},
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
      this.listLoading = false;
    },
    checkPermission,
  },
};
</script>
<style lang="scss" scoped></style>
