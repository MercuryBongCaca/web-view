<template>
  <div class="table-container">
    <el-form
      ref="form"
      :model="queryForm"
      :inline="true"
      @submit.native.prevent
    >
      <el-form-item>
        <el-select v-model="queryForm.status" style="width: 100%;">
          <el-option label="职位" value="0"></el-option>
          <el-option label="店长" value="1"></el-option>
          <el-option label="吉他老师" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="queryForm.status" style="width: 100%;">
          <el-option label="在职状态" value="0"></el-option>
          <el-option label="在职" value="1"></el-option>
          <el-option label="离职" value="2"></el-option>
          <el-option label="实习" value="3"></el-option>
          <el-option label="兼职" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryForm.name" placeholder="姓名/手机号" />
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-search"
          type="primary"
          native-type="submit"
          @click="selectemployee"
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
              :preview-src-list="[imageUrl + scope.row.headImgUrl]"
              :src="imageUrl + scope.row.imgURL"
              style="width: 80px; height: 50px;"
            ></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="name" width="110"></el-table-column>
      <el-table-column label="性别" prop="sex" width="110"></el-table-column>
      <el-table-column
        label="职位"
        prop="nickName"
        width="110"
      ></el-table-column>
      <el-table-column
        label="手机号"
        prop="mobile"
        width="110"
      ></el-table-column>
      <el-table-column class-name="status-col" label="员工状态" width="110">
        <template slot-scope="scope">
          <el-tooltip
            :content="scope.row.status"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="scope.row.Status | statusFilter"
              >{{ scope.row.statusName }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="入职日期"
        prop="entryData"
        width="200"
      ></el-table-column>
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
    <edit ref="edit" @resetSearch="selectemployee"></edit>
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import { getEmployeeList, deleteEmployee } from "@/api/employee";
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
      imageUrl: process.env.VUE_APP_BASE_API2,
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
      employeeList: [],
    };
  },
  created() {
    this.fetchData(this.priceQueryForm);
    this.height = this.$baseTableHeight(1);
    this.getEmployeeList(this.queryForm);
  },
  beforeDestroy() {
    $("body").off("click");
  },
  mounted() {},
  methods: {
    selectemployee() {
      this.getEmployeeList(this.queryForm);
    },
    //绑定员工列表
    getEmployeeList(page) {
      const { pageNo, pageSize, name } = page;
      return new Promise((resolve, reject) => {
        getEmployeeList({ pageNo, pageSize, name })
          .then((response) => {
            const { data } = response;
            this.employeeList = response.data;
            this.total = Number(response.totalCount);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //删除员工列表
    deleteEmployee(employeeID) {
      return new Promise((resolve, reject) => {
        deleteEmployee(employeeID)
          .then((response) => {
            const { data } = response;
            this.$baseMessage("删除成功！", "success");
            this.getCourseList(this.courseQueryForm);
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
      let employee = row.row;
      this.$refs["edit"].showEdit(employee);
    },
    handleDelete() {
      if (this.selectRows.length === 0) {
        return this.$baseMessage("请至少选择一项", "error");
      }
      const employeeID = this.selectRows.map((item) => item.employeeID).join();
      this.$baseConfirm(
        "你确定要删除选中项吗",
        null,
        () => {
          this.deleteEmployee(employeeID);
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
    fetchData() {
      this.listLoading = true;
      this.listLoading = false;
    },
    checkPermission,
  },
};
</script>
<style lang="scss" scoped></style>
