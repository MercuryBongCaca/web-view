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
              v-model="queryForm.querycriteria[0].values"
              filterable
              clearable
              placeholder="课程选择"
            >
              <el-option
                v-for="item in courseList"
                :key="item.courseID"
                :label="item.courseName"
                :value="item.courseID"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="queryForm.querycriteria[1].values"
              filterable
              clearable
              placeholder="上课老师"
            >
              <el-option
                v-for="item in employeeList"
                :key="item.employeeID"
                :label="item.name"
                :value="item.employeeID"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="queryForm.querycriteria[2].values"
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
          <el-table-column label="姓名" prop="memberName"></el-table-column>
          <el-table-column label="手机号" prop="memberMobile"></el-table-column>
          <el-table-column label="课程名称" prop="courseName"></el-table-column>
          <el-table-column label="合同编号" prop="contractNo"></el-table-column>
          <el-table-column
            label="余课数"
            prop="purchaseNumber"
          ></el-table-column>
          <el-table-column
            label="上课老师"
            prop="employeeNameTeacher"
          ></el-table-column>
          <el-table-column class-name="status-col" label="合同状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.statusName | statusFilter"
                >{{ scope.row.statusName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="办理日期"
            prop="handlingTime"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEdit(scope)"
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
        <edit ref="edit" @resetSearch="handleQuery"></edit>
      </el-tab-pane>
      <el-tab-pane label="合同收款" name="second">
        <el-row :gutter="20">
          <el-col :span="14">
            <el-card class="box-card">
              <h3>待付款合同</h3>
              <br />
              <el-form :model="queryPaymentForm" :inline="true">
                <el-form-item label="办理日期">
                  <el-date-picker
                    v-model="queryPaymentForm.querycriteria[1].values"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="课程名称">
                  <el-select
                    v-model="queryPaymentForm.querycriteria[0].values"
                    clearable
                    placeholder="课程名称"
                  >
                    <el-option
                      v-for="item in courseList"
                      :key="item.courseID"
                      :label="item.courseName"
                      :value="item.courseID"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button
                    icon="el-icon-search"
                    type="primary"
                    native-type="submit"
                    @click="handlePaymentQuery"
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
                <el-table-column
                  label="姓名"
                  prop="memberName"
                ></el-table-column>
                <el-table-column
                  label="手机号"
                  prop="memberMobile"
                ></el-table-column>
                <el-table-column
                  label="课程名称"
                  prop="courseName"
                ></el-table-column>
                <el-table-column
                  label="合同编号"
                  prop="contractNo"
                ></el-table-column>
                <el-table-column
                  label="应付金额"
                  prop="amountPayable"
                ></el-table-column>
                <el-table-column label="尚欠金额">
                  <template slot-scope="scope">
                    {{ scope.row.amountPayable - scope.row.amountPaid }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="办理日期"
                  prop="handlingTime"
                ></el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col :span="10">
            <el-card class="box-card">
              <h3>合同信息</h3>

              <div style="padding: 20px; height: 150px;">
                <table v-if="selectPayment.memberMobile">
                  <tr>
                    <td>
                      <el-image
                        style="width: 100px; height: 100px;"
                        :src="imageUrl + selectPayment.memberPicturePath"
                        :preview-src-list="[
                          imageUrl + selectPayment.memberPicturePath,
                        ]"
                      >
                      </el-image>
                    </td>
                    <td style="padding-top: 60px; padding-left: 10px;">
                      <h3>
                        {{ selectPayment.memberName }}
                        <i
                          :class="
                            selectPayment.memberSex == 1
                              ? 'el-icon-male'
                              : 'el-icon-female'
                          "
                        ></i>
                      </h3>
                      <h4 style="padding-top: 10px;">
                        <i class="el-icon-phone"></i>
                        {{ selectPayment.memberMobile }}
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
                        v-model="selectPayment.contractNo"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="合同状态">
                      <el-select
                        v-model="selectPayment.status"
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
                        v-model="selectPayment.courseID"
                        filterable
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in courseList"
                          :key="item.courseID"
                          :label="item.courseName"
                          :value="item.courseID"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="课程数量">
                      <el-input
                        v-model="selectPayment.purchaseNumber"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="上课老师">
                      <el-select
                        v-model="selectPayment.employeeIDTeacher"
                        filterable
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in employeeList"
                          :key="item.employeeID"
                          :label="item.name"
                          :value="item.employeeID"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="销售人">
                      <el-select
                        v-model="selectPayment.employeeIDsale"
                        filterable
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in employeeList"
                          :key="item.employeeID"
                          :label="item.name"
                          :value="item.employeeID"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="合同开始">
                      <el-input
                        v-model="selectPayment.contractStartTime"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="合同结束">
                      <el-input
                        v-model="selectPayment.contractEndTime"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="合同金额">
                      <el-input-number
                        v-model="selectPayment.amountPayable"
                        autocomplete="off"
                        :controls="false"
                        :disabled="true"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="已付金额">
                      <el-input-number
                        v-model="selectPayment.amountPaid"
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
                          selectPayment.amountPayable - selectPayment.amountPaid
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
                        v-model="paymentInfo.paymentDate"
                        type="date"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="应付金额">
                      <el-input-number
                        :value="selectPayment.amountPayable"
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
                          selectPayment.amountPayable - selectPayment.amountPaid
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
                        v-model="paymentInfo.paymentMethod"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in paymentTypeList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="付款金额">
                      <el-input-number
                        v-model="paymentInfo.payMoney"
                        autocomplete="off"
                        :controls="false"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="备注">
                      <el-input
                        v-model="paymentInfo.remarks"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4 }"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-button
                      type="primary"
                      native-type="submit"
                      @click="savepayment()"
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
import {
  getContractList,
  deleteContract,
  getContractListPaymentList,
  ContractPayment,
} from "@/api/contract";
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
      imageUrl: process.env.VUE_APP_BASE_FILE,
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
        querycriteria: [
          {
            key: "courseID",
            values: "",
            type: "string",
            like: "0",
          },
          {
            key: "employeeIDTeacher",
            values: "",
            type: "string",
            like: "0",
          },
          {
            key: "memberName",
            values: "",
            type: "string",
            like: "0",
          },
        ],
      },
      queryPaymentForm: {
        pageNo: 1,
        pageSize: 10,
        querycriteria: [
          {
            key: "courseID",
            values: "",
            type: "string",
            like: "0",
          },
          {
            key: "handlingTime",
            values: "",
            type: "datetime",
            like: "0",
          },
          {
            key: "handlingTime",
            values: "",
            type: "datetime",
            like: "1",
          },
        ],
      },
      contractList: [],
      paymentList: [],
      selectPayment: {},
      paymentInfo: {},
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
    this.getContractList(this.queryForm);
    this.getContractListPaymentList(this.queryPaymentForm);
  },
  beforeDestroy() {
    $("body").off("click");
  },
  mounted() {},
  methods: {
    //绑定合同列表
    getContractList(page) {
      let selectwhere = {
        pageNo: page.pageNo,
        pageSize: page.pageSize,
        where: page.querycriteria,
      };
      return new Promise((resolve, reject) => {
        getContractList(selectwhere)
          .then((response) => {
            const { data } = response;
            this.contractList = response.data;
            this.total = Number(response.totalCount);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //删除合同列表
    deleteContract(contractID) {
      return new Promise((resolve, reject) => {
        deleteContract(contractID)
          .then((response) => {
            const { data } = response;
            this.$baseMessage("删除成功！", "success");
            this.getContractList(this.queryForm);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //绑定合同收款
    getContractListPaymentList(page) {
      let selectwhere = {
        pageNo: page.pageNo,
        pageSize: page.pageSize,
        where: page.querycriteria,
      };
      return new Promise((resolve, reject) => {
        getContractListPaymentList(selectwhere)
          .then((response) => {
            const { data } = response;
            this.paymentList = response.data;
            // this.total = Number(response.totalCount);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //合同付款
    ContractPayment(contractForm) {
      let that = this;
      return new Promise((resolve, reject) => {
        ContractPayment(contractForm)
          .then((response) => {
            const { data } = response;
            debugger;
            if (data == 1) {
              that.$baseMessage("付款成功", "success");
              that.paymentInfo = {};
              that.selectPayment = {};
            } else {
              that.$baseMessage("付款失败", "success");
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //付款
    savepayment() {
      let self = this;
      self.paymentInfo.contractID = self.selectPayment.contractID;
      self.paymentInfo.shopID = self.selectPayment.contractID;
      self.ContractPayment(self.paymentInfo);
    },
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
      let contract = row.row;
      this.$refs["edit"].showEdit(contract);
    },
    handleDelete() {
      if (this.selectRows.length === 0) {
        return this.$baseMessage("请至少选择一项", "error");
      }
      const contractID = this.selectRows.map((item) => item.contractID).join();
      this.$baseConfirm(
        "你确定要删除选中项吗",
        null,
        () => {
          this.deleteContract(contractID);
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
    //条件查询合同
    handleQuery() {
      this.getContractList(this.queryForm);
    },
    //条件查询收款合同
    handlePaymentQuery() {
      this.getContractListPaymentList(this.queryPaymentForm);
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
