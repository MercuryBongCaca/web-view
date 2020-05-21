<template>
  <div class="table-container">
    <el-tabs v-model="activeName" class="system_tabs">
      <el-tab-pane label="合同管理" name="first">
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <el-select
              v-model="queryForm.CourseID"
              filterable
              clearable
              placeholder="课程选择"
            >
              <el-option
                v-for="item in courseList"
                :key="item.CourseID"
                :label="item.Name"
                :value="item.CourseID"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="queryForm.EmployeeID"
              filterable
              clearable
              placeholder="上课老师"
            >
              <el-option
                v-for="item in employeeList"
                :key="item.EmployeeID"
                :label="item.Name"
                :value="item.EmployeeID"
              >
              </el-option>
            </el-select>
          </el-form-item>
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
            >添加
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
          <el-table-column label="余课数" prop="Number"></el-table-column>
          <el-table-column
            label="上课老师"
            prop="EmployeeName"
          ></el-table-column>
          <el-table-column class-name="status-col" label="合同状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.StatusName | statusFilter"
                >{{ scope.row.StatusName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="办理日期"
            prop="CreatetTime"
          ></el-table-column>
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
      </el-tab-pane>
      <el-tab-pane label="合同收款" name="second">
        <el-row :gutter="20">
          <el-col :span="14">
            <el-card class="box-card">
              <h3>待付款合同</h3>
              <br />
              <el-form :model="queryForm" :inline="true">
                <el-form-item label="办理日期">
                  <el-date-picker
                    v-model="queryPaymentForm.CreatetTime"
                    type="dates"
                    placeholder="选择一个或多个日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="课程名称">
                  <el-select
                    v-model="queryPaymentForm.CourseID"
                    clearable
                    placeholder="课程名称"
                  >
                    <el-option
                      v-for="item in courseList"
                      :key="item.CourseID"
                      :label="item.Name"
                      :value="item.CourseID"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button
                    icon="el-icon-search"
                    type="primary"
                    native-type="submit"
                    >查询
                  </el-button>
                </el-form-item>
              </el-form>
              <el-table
                ref="tableSort"
                v-loading="listLoading"
                :data="paymentList"
                :element-loading-text="elementLoadingText"
                :height="height"
                @current-change="paymentSelect"
              >
                <el-table-column label="姓名" prop="Name"></el-table-column>
                <el-table-column label="手机号" prop="Mobile"></el-table-column>
                <el-table-column
                  label="课程名称"
                  prop="CourseName"
                ></el-table-column>
                <el-table-column
                  label="合同编号"
                  prop="ContractNo"
                ></el-table-column>
                <el-table-column
                  label="应付金额"
                  prop="BasePrice"
                ></el-table-column>
                <el-table-column label="尚欠金额">
                  <template slot-scope="scope">
                    {{ scope.row.BasePrice - scope.row.PaidPrice }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="办理日期"
                  prop="CreatetTime"
                ></el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col :span="10">
            <el-card class="box-card">
              <h3>合同信息</h3>

              <div style="padding: 20px; height: 150px;">
                <table v-if="selectPayment.Mobile">
                  <tr>
                    <td>
                      <el-image
                        style="width: 100px; height: 100px;"
                        :src="selectPayment.imgURL"
                        :preview-src-list="[selectPayment.imgURL]"
                      >
                      </el-image>
                    </td>
                    <td style="padding-top: 60px; padding-left: 10px;">
                      <h3>
                        {{ selectPayment.Name }}
                        <i
                          :class="
                            selectPayment.Sex == 1
                              ? 'el-icon-male'
                              : 'el-icon-female'
                          "
                        ></i>
                      </h3>
                      <h4 style="padding-top: 10px;">
                        <i class="el-icon-phone"></i> {{ selectPayment.Mobile }}
                      </h4>
                    </td>
                  </tr>
                </table>
              </div>
              <el-form label-width="auto">
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="合同编号">
                      <el-input
                        v-model="selectPayment.ContractNo"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="合同状态">
                      <el-select
                        v-model="selectPayment.Status"
                        filterable
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in contractStatusList"
                          :key="item.Code"
                          :label="item.Name"
                          :value="item.Code"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="课程名称">
                      <el-select
                        v-model="selectPayment.CourseID"
                        filterable
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in courseList"
                          :key="item.CourseID"
                          :label="item.Name"
                          :value="item.CourseID"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="课程数量">
                      <el-input
                        v-model="selectPayment.Number"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="上课老师">
                      <el-select
                        v-model="selectPayment.EmployeeID"
                        filterable
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in employeeList"
                          :key="item.EmployeeID"
                          :label="item.Name"
                          :value="item.EmployeeID"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="销售人">
                      <el-select
                        v-model="selectPayment.SaleEmployeeID"
                        filterable
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in employeeList"
                          :key="item.EmployeeID"
                          :label="item.Name"
                          :value="item.EmployeeID"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="合同开始">
                      <el-input
                        v-model="selectPayment.StartTime"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="合同结束">
                      <el-input
                        v-model="selectPayment.EndTime"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="合同金额">
                      <el-input-number
                        v-model="selectPayment.BasePrice"
                        autocomplete="off"
                        :controls="false"
                        :disabled="true"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="已付金额">
                      <el-input-number
                        v-model="selectPayment.PaidPrice"
                        autocomplete="off"
                        :controls="false"
                        :disabled="true"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="尚欠金额">
                      <el-input-number
                        :value="
                          selectPayment.BasePrice - selectPayment.PaidPrice
                        "
                        autocomplete="off"
                        :controls="false"
                        :disabled="true"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>

            <el-card class="box-card">
              <h3>付款</h3>
              <br />
              <el-form label-width="auto">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="付款日">
                      <el-date-picker
                        v-model="paymentInfo.PaymentTime"
                        type="date"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="应付金额">
                      <el-input-number
                        :value="
                          selectPayment.BasePrice - selectPayment.PaidPrice
                        "
                        autocomplete="off"
                        :controls="false"
                        :disabled="true"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="本次付款">
                      <el-input-number
                        v-model="paymentInfo.PaidPrice"
                        autocomplete="off"
                        :controls="false"
                        :disabled="true"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="尚欠金额">
                      <el-input-number
                        :value="
                          selectPayment.BasePrice -
                          selectPayment.PaidPrice -
                          paymentInfo.PaidPrice
                        "
                        autocomplete="off"
                        :controls="false"
                        :disabled="true"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="支付方式">
                      <el-select
                        v-model="paymentInfo.PaymentMode"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in paymentTypeList"
                          :key="item.Code"
                          :label="item.Name"
                          :value="item.Code"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="付款金额">
                      <el-input-number
                        v-model="paymentInfo.PaidPrice"
                        autocomplete="off"
                        :controls="false"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="备注">
                      <el-input
                        v-model="paymentInfo.Remark"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4 }"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="primary" native-type="submit"
                      >确定付款
                    </el-button>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import { mapGetters } from "vuex";
import Edit from "./components/edit";

export default {
  name: "Table",
  components: {
    Edit,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        正常: "success",
        欠款: "gray",
        退款: "danger",
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
      selectRows: "",
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
          EmployeeID: "",
          Name: "张三",
          Mobile: "13035961201",
          ContractNo: "No1233001",
          CourseID: "1",
          CourseName: "初级吉他课",
          Number: "1",
          EmployeeName: "张老师",
          EmployeeID: "1",
          StatusName: "正常",
          CreatetTime: "2020-1-2",
        },
      ],
      paymentList: [
        {
          SaleEmployeeID: "1",
          Name: "张三",
          Status: "2",
          Sex: 1,
          Mobile: "13035961201",
          ContractNo: "No1233001",
          CourseID: "1",
          CourseName: "初级吉他课",
          Number: "1",
          EmployeeName: "张老师",
          EmployeeID: "2",
          BasePrice: 3000,
          PaidPrice: 100,
          CreatetTime: "2020-1-2",
          StartTime: "2020-1-2",
          EndTime: "2021-1-2",
          imgURL: "https://i.picsum.photos/id/25/200/300.jpg?2",
        },
        {
          SaleEmployeeID: "3",
          Name: "李四",
          Status: "2",
          Sex: 2,
          Mobile: "16035961201",
          ContractNo: "No1233009",
          CourseID: "2",
          CourseName: "架子鼓课",
          Number: "7",
          EmployeeName: "李老师",
          EmployeeID: "1",
          BasePrice: 2700,
          PaidPrice: 0,
          CreatetTime: "2020-2-6",
          StartTime: "2020-2-6",
          EndTime: "2021-2-6",
          imgURL: "https://i.picsum.photos/id/26/300/300.jpg?2",
        },
      ],
      selectPayment: {},
      paymentInfo: {
        PaymentID: "",
        ContractID: "",
        GoodsOrderID: "",
        PaidPrice: 0,
        PaymentMode: "",
        PaymentType: "",
        PaymentTime: new Date(),
        ShopID: "",
        IsDeleted: "",
        Remark: "",
        upTime: "",
        upUser: "",
      },
    };
  },

  computed: {
    ...mapGetters([
      "employeeList",
      "courseList",
      "contractStatusList",
      "paymentTypeList",
    ]),
  },
  created() {
    this.fetchData();
    this.height = this.$baseTableHeight(1);
    this.$store.dispatch("baseData/setEmployeeList");
    this.$store.dispatch("baseData/setCourseList");
    this.$store.dispatch("baseData/setContractStatusList");
    this.$store.dispatch("baseData/setPaymentTypeList");
  },
  beforeDestroy() {
    $("body").off("click");
  },
  mounted() {},
  methods: {
    paymentSelect(val) {
      this.selectPayment = val;
    },
    setSelectRows(val) {
      this.selectRows = val;
      this.paymentInfo.PaidPrice = 0;
      this.paymentInfo.PaymentTime = new Date();
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
