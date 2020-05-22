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
      :data="memberList"
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
              :preview-src-list="[imageUrl + scope.row.picturePath]"
              :src="imageUrl + scope.row.picturePath"
              style="width: 80px; height: 50px;"
            ></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="name" width="110"></el-table-column>
      <el-table-column label="性别" prop="sex" width="110"></el-table-column>
      <el-table-column label="手机号" prop="mobile"></el-table-column>
      <el-table-column label="录入时间" prop="enteredByTime"></el-table-column>
      <el-table-column label="录入人" prop="enteredBy"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope)">编辑 </el-button>
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
    <edit ref="edit" @resetSearch="selectmember"></edit>
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import { getMemberList, deleteMember } from "@/api/member";
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
      imageUrl: process.env.VUE_APP_BASE_FILE,
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
      memberList: [],
    };
  },
  created() {
    this.fetchData();
    this.height = this.$baseTableHeight(1);
    this.getMemberList(this.queryForm);
  },
  beforeDestroy() {
    $("body").off("click");
  },
  mounted() {},
  methods: {
    selectmember() {
      this.getMemberList(this.queryForm);
    },
    //绑定会员列表
    getMemberList(page) {
      const { pageNo, pageSize, name } = page;
      return new Promise((resolve, reject) => {
        getMemberList({ pageNo, pageSize, name })
          .then((response) => {
            const { data } = response;
            this.memberList = response.data;
            this.total = Number(response.totalCount);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //删除会员列表
    deleteMember(memberID) {
      return new Promise((resolve, reject) => {
        deleteMember(memberID)
          .then((response) => {
            const { data } = response;
            this.$baseMessage("删除成功！", "success");
            this.getMemberList(this.queryForm);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setSelectRows(val) {
      this.selectRows = val;
    },
    handleAdd() {
      this.$refs["edit"].showEdit();
    },
    handleEdit(row) {
      let member = row.row;
      this.$refs["edit"].showEdit(member);
    },
    handleDelete() {
      if (this.selectRows.length === 0) {
        return this.$baseMessage("请至少选择一项", "error");
      }
      const memberID = this.selectRows.map((item) => item.memberID).join();
      this.$baseConfirm(
        "你确定要删除选中项吗",
        null,
        () => {
          this.deleteMember(memberID);
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
