<template>
  <div class="table-container">
    <el-tabs v-model="activeName" class="system_tabs" @tab-click="handleClick">
      <el-tab-pane label="一对一课程" name="second">
        <el-form ref="form" :model="queryForm" :inline="true">
          <el-form-item label="预约日期">
            <el-date-picker v-model="value2" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button icon="el-icon-search" type="primary" native-type="submit"
              >查询
            </el-button>
          </el-form-item>
        </el-form>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button
              icon="el-icon-plus"
              size="mini"
              type="primary"
              @click="handleEdit"
              >预约上课
            </el-button>
            <el-button
              icon="el-icon-edit"
              size="mini"
              type="primary"
              @click="cancelReservation"
              >取消预约
            </el-button>
          </el-col>
          <el-col style="text-align: right;" :span="12">
            <el-button
              icon="el-icon-edit"
              size="mini"
              type="primary"
              @click="beginClass(1)"
              >上课
            </el-button>
            <el-button
              icon="el-icon-edit"
              size="mini"
              type="primary"
              @click="beginClass(2)"
              >下课
            </el-button>
          </el-col>
        </el-row>
        <br />
        <el-table
          ref="tableSort"
          :data="reservationList"
          height="73vh"
          @selection-change="setSelectRows"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="会员姓名" prop="Name"></el-table-column>
          <el-table-column label="手机号" prop="Mobile"></el-table-column>
          <el-table-column
            label="约课时间"
            prop="ReservationTime"
          ></el-table-column>
          <el-table-column label="预约课程" prop="CourseName"></el-table-column>
          <el-table-column class-name="status-col" label="课程状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.Status | statusFilter"
                >{{ scope.row.StatusName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="上课老师"
            prop="FinalEmployeeName"
          ></el-table-column>
          <el-table-column label="上课时间" prop="StartTime"></el-table-column>
          <el-table-column label="下课时间" prop="EndTime"></el-table-column>
          <el-table-column
            label="上课节数"
            prop="FinalNumber"
          ></el-table-column>
          <el-table-column
            label="剩余节数"
            prop="StillNumber"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="一对多课程" name="third">
        <el-row :gutter="20">
          <el-col :xs="15" :sm="15" :md="17" :xl="19">
            <el-card class="box-card" style="height: 80vh;">
              <el-row :gutter="20">
                <el-col :span="12">
                  <h2>
                    初级吉他
                    <span style="color: #1890ff; font-size: 0.9rem;"
                      >10:10-11:10</span
                    >
                  </h2>
                </el-col>
                <el-col :span="12" align="right">
                  当前人数
                  <span style="color: #1890ff; font-size: 0.9rem;">10</span> 人
                </el-col>
              </el-row>
              <br />
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-button icon="el-icon-edit" size="mini" type="primary"
                    >到场
                  </el-button></el-col
                >
              </el-row>
              <br />
              <el-table ref="tableSort" :data="reservationList" height="60vh">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="会员姓名" prop="Name"></el-table-column>
                <el-table-column label="手机号" prop="Mobile"></el-table-column>
                <el-table-column class-name="status-col" label="状态">
                  <template slot-scope="scope">
                    <el-tag :type="scope.row.Status | statusFilter"
                      >{{ scope.row.StatusName }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  label="剩余节数"
                  prop="StillNumber"
                ></el-table-column>
              </el-table>
              <br />
              <el-form
                ref="form"
                :model="queryForm"
                :inline="true"
                align="right"
                @submit.native.prevent
              >
                <el-form-item label="上课老师">
                  <el-select v-model="queryForm.status" style="width: 100%;">
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
                  <el-button icon="el-icon-edit" size="mini" type="primary"
                    >下课
                  </el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :xs="9" :sm="9" :md="7" :xl="5">
            <el-card class="box-card" style="height: 80vh;">
              <el-row :gutter="24">
                <el-form label-width="auto">
                  <el-col :xs="23" :sm="24" :md="20" :xl="18">
                    <el-form-item label="日期选择">
                      <el-date-picker
                        v-model="searchData.StartDate"
                        :clearable="false"
                        :editable="false"
                        type="date"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="23" :sm="24" :md="20" :xl="18">
                    <el-form-item label="场地选择">
                      <el-select
                        v-model="searchData.AreaID"
                        clearable
                        placeholder="所有场地"
                      >
                        <el-option
                          v-for="(item, index) in areaList"
                          :key="index"
                          :label="item.Name"
                          :value="item.AreaID"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="20" :sm="16" :md="10" :xl="4">
                    <el-button
                      icon="el-icon-search"
                      type="primary"
                      native-type="submit"
                      >查询
                    </el-button></el-col
                  >
                </el-form>
              </el-row>

              <h3>当天课表</h3>
              <br />
              <el-row
                v-for="(citem, cindex) in listData[0].data"
                :key="cindex"
                :gutter="20"
                class="classList"
                @click.native="rowClick($event)"
              >
                <el-col :span="13">
                  <a>
                    <h2 style="text-align: left; color: rgba(0, 0, 0, 0.6);">
                      吉他初级
                    </h2>
                    {{ citem.start + "-" + citem.end }}</a
                  >
                  <br />

                  {{ citem.area.name }}
                  <br />
                  <br />
                  <el-link type="primary">{{ citem.teacher.name }}</el-link>
                </el-col>
                <el-col :span="10">
                  <img
                    style="height: 100px; width: 100%;"
                    src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3183730857,2780257894&fm=26&gp=0.jpg"
                /></el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <edit ref="edit"></edit>
    <class-info ref="classInfo"></class-info>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Edit from "./components/edit";
import ClassInfo from "./components/classInfo";

export default {
  name: "Card",
  components: {
    Edit,
    ClassInfo,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "success",
        2: "gray",
        3: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      searchData: { AreaID: "1", StartDate: new Date() },
      value2: "",
      value3: "",
      activeName: "second",
      selectRows: [],
      reservationList: [
        {
          Name: "张三",
          Mobile: "13035961201",
          ReservationID: "1",
          ContractID: "1",
          ReservationTime: "2020-5-27 10:00",
          ReserveNumber: "1",
          FinalNumber: "2",
          StillNumber: "3",
          StartTime: "10:00",
          EndTime: "11:00",
          MemberID: "1",
          CourseName: "课程名称",
          ReserveEmployeeName: "李老师",
          FinalEmployeeName: "李老师",
          ReserveEmployeeID: "1",
          FinalEmployeeID: "1",
          Status: "1",
          StatusName: "等待上课",
          Remark: "学生预约",
          ShopID: "1",
          IsDeleted: "1",
          upTime: "2020-1-2",
          upUser: "李四",
        },
      ],
      listData: [
        {
          title: "day1",
          data: [
            {
              start: "10:10",
              end: "11:10",
              area: { name: "教室A", id: "1" },
              course: { name: "吉他", id: "1", minute: 70 },
              teacher: { name: "李老师A", id: "1" },
              diff: 60,
            },
            {
              start: "10:10",
              end: "11:10",
              area: { name: "教室A", id: "1" },
              course: { name: "吉他", id: "1", minute: 70 },
              teacher: { name: "李老师A", id: "1" },
              diff: 60,
            },
          ],
        },
      ],

      queryForm: {
        pageNo: 1,
        pageSize: 10,
        title: "",
      },
    };
  },
  computed: {
    ...mapGetters(["employeeList", "areaList", "courseList"]),
  },
  created() {
    this.$store.dispatch("baseData/setEmployeeList");
    this.$store.dispatch("baseData/setAreaList");
    this.$store.dispatch("baseData/setCourseList");
  },
  methods: {
    setSelectRows(val) {
      this.selectRows = val;
    },
    cancelReservation() {
      if (this.selectRows.length === 0) {
        return this.$baseMessage("请选择要取消的课程", "error");
      }
      const courseID = this.selectRows.map((item) => item.courseID).join();
      this.$baseConfirm(
        "你确定取消预约吗",
        null,
        () => {
          alert("点击了确定");
        },
        () => {
          alert("点击了取消");
        }
      );
    },
    handleEdit() {
      this.$refs["edit"].showEdit();
    },
    beginClass(flag) {
      this.$refs["classInfo"].showEdit(null, flag);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    rowClick(element) {
      let obj = document.getElementsByClassName("classList");
      for (var i = 0; i < obj.length; i++) {
        obj[i].style.backgroundColor = "white";
      }
      element.currentTarget.style.backgroundColor = "#f0f9eb";
    },
  },
};
</script>
<style lang="scss" scoped>
.selectCol {
  background-color: #f0f9eb;
}
.classList {
  padding: 20px;
  border-bottom: 1px solid rgba(194, 194, 194, 0.43);
}
</style>
