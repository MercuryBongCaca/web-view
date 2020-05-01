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
                @click="courseQuery"
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
                  :preview-src-list="[scope.row.imgURL]"
                  :src="scope.row.imgURL"
                  style="width: 80px; height: 50px;"
                ></el-image>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="课程名称" prop="Name"></el-table-column>
          <el-table-column
            label="课程类型"
            prop="TypeName"
            width="110"
          ></el-table-column>
          <el-table-column
            label="时长"
            prop="Min"
            width="110"
          ></el-table-column>
          <el-table-column class-name="status-col" label="售卖状态" width="110">
            <template slot-scope="scope">
              <el-tag :type="scope.row.Status | statusFilter"
                >{{ scope.row.StatusName }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="courseEdit(scope.row)"
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
        <edit ref="edit"></edit>
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
                @click="priceQuery"
                >查询
              </el-button>
            </el-form-item>
          </el-form>
        </byui-query-form>
        <div style="text-align: right; padding-bottom: 10px;">
          <el-button icon="el-icon-plus" type="primary" @click="priceAdd"
            >添加
          </el-button>
          <el-button icon="el-icon-delete" type="danger" @click="courseDelete"
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
                  :preview-src-list="[scope.row.imgURL]"
                  :src="scope.row.imgURL"
                  style="width: 80px; height: 50px;"
                ></el-image>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="课程名称" prop="CourseName"></el-table-column>
          <el-table-column
            label="课程类型"
            prop="CourseTypeName"
            width="110"
          ></el-table-column>
          <el-table-column
            label="课程单价"
            prop="Price"
            width="110"
          ></el-table-column>
          <el-table-column label="数量" width="200">
            <template slot-scope="scope">
              {{ scope.row.Num1 + "-" + scope.row.Num2 }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="priceEdit(scope.row)"
                >编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :background="background"
          :current-page="priceQueryForm.pageNo"
          :layout="layout"
          :page-size="priceQueryForm.pageSize"
          :total="total"
          @current-change="priceCurrentChange"
          @size-change="priceSizeChange"
        ></el-pagination>
        <price-edit ref="priceedit"></price-edit>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import { getList } from "@/api/table";
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
      courseList: [
        {
          CourseID: "C1",
          Name: "吉他初级",
          Type: "1",
          TypeName: "吉他",
          Min: "30",
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
      coursePriceList: [
        {
          CourseName: "吉他初级",
          CourseTypeName: "乐器",
          CoursePriceID: "c1",
          CourseID: "d1",
          Type: "1",
          Num1: "1",
          Num2: "100",
          Price: "60",
          ShopID: "",
          IsDeleted: "",
          upTime: "",
          upUser: "",
          imgURL:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3183730857,2780257894&fm=26&gp=0.jpg",
        },
      ],
      imgShow: true,
      list: [],
      imageList: [],
      listLoading: false,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
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
      this.$refs["edit"].showEdit(row);
    },
    priceAdd() {
      this.$refs["priceedit"].showPriceEdit();
    },
    priceEdit(row) {
      this.$refs["priceedit"].showPriceEdit(row);
    },
    courseDelete() {
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
    courseSizeChange(val) {
      this.courseQueryForm.pageSize = val;
    },
    courseCurrentChange(val) {
      this.courseQueryForm.pageNo = val;
    },
    courseQuery() {
      this.courseQueryForm.pageNo = 1;
    },
    priceSizeChange(val) {
      this.priceQueryForm.pageSize = val;
    },
    priceCurrentChange(val) {
      this.priceQueryForm.pageNo = val;
    },
    priceQuery() {
      this.priceQueryForm.pageNo = 1;
    },
    checkPermission,
  },
};
</script>
<style lang="scss" scoped></style>
