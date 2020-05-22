<template>
  <div class="table-container">
    <el-tabs v-model="activeName" class="system_tabs" @tab-click="handleClick">
      <el-tab-pane label="课程设定" name="first">
        <byui-query-form>
          <el-form
            ref="form"
            :model="courseQueryForm"
            :inline="true"
            @submit.native.prevent
          >
            <el-form-item>
              <el-input v-model="courseQueryForm.name" placeholder="课程名称" />
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-search"
                type="primary"
                native-type="submit"
                @click="selectCourse"
                >查询
              </el-button>
            </el-form-item>
          </el-form>
        </byui-query-form>
        <div style="text-align: right; padding-bottom: 10px;">
          <el-button icon="el-icon-plus" type="primary" @click="courseAdd"
            >添加
          </el-button>
          <el-button icon="el-icon-delete" type="danger" @click="courseDelete"
            >删除
          </el-button>
        </div>
        <el-table
          ref="tableSort"
          v-loading="listLoading"
          :data="courseList"
          :element-loading-text="elementLoadingText"
          :height="height"
          @selection-change="setSelectRows"
          @sort-change="tableSortChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="课程图片" width="80">
            <template slot-scope="scope">
              <div style="width: 80px; height: 50px;">
                <el-image
                  v-if="imgShow"
                  :preview-src-list="[imageUrl + scope.row.pictureUrl]"
                  :src="imageUrl + scope.row.pictureUrl"
                  style="width: 80px; height: 50px;"
                ></el-image>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="课程图片" width="80">
            <template slot-scope="scope">
              <div style="width: 80px; height: 50px;">
                
                <img :src="'http://localhost:8002'+scope.row.pictureUrl" alt="">
              </div>
            </template>
          </el-table-column> -->
          <el-table-column label="课程名称" prop="courseName"></el-table-column>
          <el-table-column
            label="课程类型"
            prop="courseTypeName"
            width="110"
          ></el-table-column>
          <el-table-column
            label="时长"
            prop="courseDuration"
            width="110"
          ></el-table-column>
          <el-table-column class-name="status-col" label="售卖状态" width="110">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status | statusFilter"
                >{{ scope.row.statusName }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="courseEdit(scope)"
                >编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :background="background"
          :current-page="courseQueryForm.pageNo"
          :layout="layout"
          :page-size="courseQueryForm.pageSize"
          :total="total"
          @current-change="courseCurrentChange"
          @size-change="courseSizeChange"
        ></el-pagination>
        <edit ref="edit" @resetSearch="selectCourse"></edit>
      </el-tab-pane>
      <el-tab-pane label="价格设定" name="second">
        <byui-query-form>
          <el-form
            ref="form"
            :model="priceQueryForm"
            :inline="true"
            @submit.native.prevent
          >
            <el-form-item>
              <el-input v-model="priceQueryForm.name" placeholder="课程名称" />
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-search"
                type="primary"
                native-type="submit"
                @click="selectCoursePrice"
                >查询
              </el-button>
            </el-form-item>
          </el-form>
        </byui-query-form>
        <div style="text-align: right; padding-bottom: 10px;">
          <el-button icon="el-icon-plus" type="primary" @click="priceAdd"
            >添加
          </el-button>
          <el-button
            icon="el-icon-delete"
            type="danger"
            @click="coursePriceDelete"
            >删除
          </el-button>
        </div>
        <el-table
          ref="tableSort"
          v-loading="listLoading"
          :data="coursePriceList"
          :element-loading-text="elementLoadingText"
          :height="height"
          @selection-change="setSelectPriceRows"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="课程图片" width="80">
            <template slot-scope="scope">
              <div style="width: 80px; height: 50px;">
                <el-image
                  v-if="imgShow"
                  :preview-src-list="[imageUrl + scope.row.pictureUrl]"
                  :src="imageUrl + scope.row.pictureUrl"
                  style="width: 80px; height: 50px;"
                ></el-image>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="课程名称" prop="courseName"></el-table-column>
          <el-table-column
            label="课程类型"
            prop="courseTypeName"
            width="110"
          ></el-table-column>
          <el-table-column
            label="课程单价"
            prop="unitPrice"
            width="110"
          ></el-table-column>
          <el-table-column label="数量" width="200">
            <template slot-scope="scope">
              {{ scope.row.saleNumStart + "-" + scope.row.saleNumEnd }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="priceEdit(scope)">编辑 </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :background="background"
          :current-page="priceQueryForm.pageNo"
          :layout="layout"
          :page-size="priceQueryForm.pageSize"
          :total="totalPrice"
          @current-change="priceCurrentChange"
          @size-change="priceSizeChange"
        ></el-pagination>
        <price-edit
          ref="priceedit"
          @resetSearch="selectCoursePrice"
        ></price-edit>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import {
  getList,
  getCourseList,
  deleteCourse,
  getCoursePriceList,
  deleteCoursePrice,
} from "@/api/table";
import Edit from "./components/edit";
import PriceEdit from "./components/priceEdit";

export default {
  name: "Table",
  components: {
    Edit,
    PriceEdit,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        "1": "success",
        "2": "gray",
        "3": "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      activeName: "first",
      imageUrl: process.env.VUE_APP_BASE_API2,
      courseList: [],
      coursePriceList: [],
      imgShow: true,
      list: [],
      imageList: [],
      listLoading: false,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      totalPrice: 0,
      background: true,
      height: 0,
      selectRows: "",
      selectPriceRows: "",
      elementLoadingText: "正在加载...",
      courseQueryForm: {
        pageNo: 1,
        pageSize: 10,
        name: "",
      },
      priceQueryForm: {
        pageNo: 1,
        pageSize: 10,
        name: "",
      },
    };
  },
  created() {
    this.height = this.$baseTableHeight(1);
    this.getCourseList(this.courseQueryForm);
    this.getCoursePriceList(this.priceQueryForm);
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
    getCourseList(page) {
      const { pageNo, pageSize, name } = page;
      return new Promise((resolve, reject) => {
        getCourseList({ pageNo, pageSize, name })
          .then((response) => {
            const { data } = response;
            this.courseList = response.data;
            this.total = Number(response.totalCount);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    selectCourse() {
      this.getCourseList(this.courseQueryForm);
    },
    selectCoursePrice() {
      this.getCoursePriceList(this.priceQueryForm);
    },
    deleteCourse(CourseID) {
      return new Promise((resolve, reject) => {
        deleteCourse(CourseID)
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
    deleteCoursePrice(CoursePriceID) {
      let self = this;
      return new Promise((resolve, reject) => {
        deleteCoursePrice(CoursePriceID)
          .then((response) => {
            const { data } = response;
            this.$baseMessage("删除成功！", "success");
            this.getCoursePriceList(this.priceQueryForm);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getCoursePriceList(page) {
      const { pageNo, pageSize, name } = page;
      return new Promise((resolve, reject) => {
        getCoursePriceList({ pageNo, pageSize, name })
          .then((response) => {
            const { data } = response;
            console.log(response.data);
            this.coursePriceList = response.data;
            this.totalPrice = Number(response.totalCount);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    handleClick() {},
    tableSortChange() {
      const imageList = [];
      this.$refs.tableSort.tableData.forEach((item, index) => {
        imageList.push(item.img);
      });
      this.imageList = imageList;
    },
    setSelectRows(val) {
      this.selectRows = val;
    },
    setSelectPriceRows(val) {
      this.selectPriceRows = val;
    },
    courseAdd() {
      this.$refs["edit"].showEdit();
    },
    courseEdit(row) {
      let course = row.row;
      this.$refs["edit"].showEdit(course);
    },
    priceAdd() {
      this.$refs["priceedit"].showPriceEdit();
    },
    priceEdit(row) {
      let coursePrice = row.row;
      this.$refs["priceedit"].showPriceEdit(coursePrice);
    },
    courseDelete() {
      if (this.selectRows.length === 0) {
        return this.$baseMessage("请至少选择一项", "error");
      }
      const courseID = this.selectRows.map((item) => item.courseID).join();
      this.$baseConfirm(
        "你确定要删除选中项吗",
        null,
        () => {
          this.deleteCourse(courseID);
        },
        () => {
          alert("点击了取消");
        }
      );
    },
    coursePriceDelete() {
      if (this.selectPriceRows.length === 0) {
        return this.$baseMessage("请至少选择一项", "error");
      }
      const coursePriceID = this.selectPriceRows
        .map((item) => item.coursePriceID)
        .join();
      this.$baseConfirm(
        "你确定要删除选中项吗",
        null,
        () => {
          this.deleteCoursePrice(coursePriceID);
        },
        () => {
          alert("点击了取消");
        }
      );
    },
    courseSizeChange(val) {
      this.courseQueryForm.pageSize = val;
    },
    courseCurrentChange(val) {
      this.courseQueryForm.pageNo = val;
      this.getCourseList(this.courseQueryForm);
    },
    courseQuery() {
      this.courseQueryForm.pageNo = 1;
    },
    priceSizeChange(val) {
      this.priceQueryForm.pageSize = val;
    },
    priceCurrentChange(val) {
      this.priceQueryForm.pageNo = val;
      this.getCoursePriceList(this.priceQueryForm);
    },
    priceQuery() {
      this.priceQueryForm.pageNo = 1;
    },
    checkPermission,
  },
};
</script>
<style lang="scss" scoped></style>
