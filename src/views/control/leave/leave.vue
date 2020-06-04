<template>
  <div class="table-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input
              v-model="queryForm.NameMobile"
              placeholder="会员姓名/手机号"
            />
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
            >新增请假
          </el-button>
          <el-button icon="el-icon-delete" type="danger" @click="handleDelete"
            >删除
          </el-button>
        </div>
        <el-table
          ref="tableSort"
          v-loading="listLoading"
          :data="contractList"
          :element-loading-text="elementLoadingText"
          :height="height"
          @selection-change="setSelectRows"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="姓名" prop="Name"></el-table-column>
          <el-table-column label="手机号" prop="Mobile"></el-table-column>
          <el-table-column label="课程名称" prop="CourseName"></el-table-column>
          <el-table-column label="合同编号" prop="ContractNo"></el-table-column>
          <el-table-column
            label="请假开始日"
            prop="StartTime"
          ></el-table-column>
          <el-table-column label="请假结束日" prop="EndTime"></el-table-column>
          <el-table-column label="请假天数" prop="Number"></el-table-column>
          <el-table-column class-name="status-col" label="请假状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.StatusName | statusFilter"
                >{{ scope.row.StatusName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleApproval(scope.row)"
                >审批
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
        <leave-info ref="leaveinfo"></leave-info>
        <edit ref="edit"></edit> </el-col
    ></el-row>
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import Edit from "./components/edit";
import LeaveInfo from "./components/leaveInfo";

export default {
  name: "Table",
  components: {
    Edit,
    LeaveInfo,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        请假中: "success",
        等待审批: "gray",
        已完成: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      value4: "",
      activeName: "first",
      imgShow: true,
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      background: true,
      height: 0,
      selectRows: [],
      elementLoadingText: "正在加载...",
      queryForm: {
        pageNo: 1,
        pageSize: 10,
        CourseID: "",
        EmployeeID: "",
        NameMobile: "",
      },
      queryPaymentForm: {
        CreatetTime: [new Date()],
        CourseID: "",
      },
      contractList: [
        {
          LeaveID: "",
          Status: "",
          StartTime: "2020-1-2",
          EndTime: "2020-3-2",
          Name: "张三",
          Mobile: "13035961201",
          ContractNo: "No1233001",
          CourseID: "1",
          CourseName: "初级吉他课",
          Number: "1",
          EmployeeName: "张老师",
          EmployeeID: "1",
          StatusName: "请假中",
          CreatetTime: "2020-1-2",
        },
      ],
    };
  },

  computed: {},
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
    handleApproval(row) {
      this.$refs["leaveinfo"].showEdit(row);
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
<style lang="scss" scoped>
.el-icon-male {
  font-size: 13px;
  color: blue;
  font-weight: 600;
}
.el-icon-female {
  font-size: 13px;
  color: red;
  font-weight: 600;
}
</style>
