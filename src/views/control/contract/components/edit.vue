<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="660px"
    @close="close"
  >
    <el-tabs :tab-position="tabPosition" style="min-height: 350px;">
      <el-tab-pane label="学员选择">
        <el-divider content-position="left">
          <h4>选择合同办理学员</h4></el-divider
        >
        <el-row :gutter="24" style="padding-bottom: 20px;">
          <el-col :span="13">
            <el-input
              v-model="form.Name"
              autocomplete="off"
              placeholder="姓名/手机号"
            ></el-input
          ></el-col>
          <el-col :span="8">
            <el-button type="primary" @click="next">搜索</el-button></el-col
          >
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-table
              ref="tableSort"
              v-loading="listLoading"
              :data="list"
              :element-loading-text="elementLoadingText"
              height="250"
              @selection-change="setSelectRows"
              @sort-change="tableSortChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column label="头像" width="100">
                <template slot-scope="scope">
                  <div style="width: 50px; height: 50px;">
                    <el-image
                      v-if="imgShow"
                      :preview-src-list="imageList"
                      :src="scope.row.img"
                      style="width: 50px; height: 50px;"
                    ></el-image>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="姓名" prop="author"></el-table-column>
              <el-table-column
                label="手机号"
                prop="sex"
              ></el-table-column> </el-table
          ></el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="合同信息">
        <el-divider content-position="left"> <h4>合同基本信息</h4></el-divider>
        <el-form label-width="80px">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="学员姓名">
                <el-input :disabled="true" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同编号">
                <el-input autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="课程名称">
                <el-select filterable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上课老师">
                <el-select filterable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="课程数量">
                <el-input autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="应付金额">
                <el-input-number
                  autocomplete="off"
                  :controls="false"
                  :disabled="true"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同开始">
                <el-input autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同结束">
                <el-input autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="left"> <h4>支付</h4></el-divider>
          <el-row :gutter="24">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="支付方式">
                  <el-select placeholder="商品种类">
                    <el-option label="微信付款" value="0"></el-option>
                    <el-option
                      v-for="(item, index) in areaList"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="付款金额">
                  <el-input-number
                    autocomplete="off"
                    :controls="false"
                  ></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="付款记录">
        <el-divider content-position="left"> <h4>合同收费记录</h4></el-divider>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp"
          >
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </el-tab-pane>
      <el-tab-pane label="变更记录">
        <el-divider content-position="left"> <h4>合同更改记录</h4></el-divider>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp"
          >
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </el-tab-pane>
    </el-tabs>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { getList } from "@/api/table";
export default {
  name: "ContractEdit",
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
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value2: 5,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      activities: [
        {
          content: "支持使用图标",
          timestamp: "2018-04-12",
          size: "large",
          type: "primary",
          icon: "el-icon-more",
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87",
        },
        {
          content:
            "修改课程【吉他课=>架子鼓】\n课程【吉他课=>架子鼓】 课程【吉他课=>架子鼓】课程【吉他课=>架子鼓】",
          timestamp: "2018-04-03 20:46",
          size: "large",
        },
        {
          content: "创建课表",
          timestamp: "2018-04-03 20:46",
        },
      ],
      imgShow: true,
      elementLoadingText: "正在加载...",
      listLoading: true,
      list: [],
      imageList: [],
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ],
      tabPosition: "left",
      form: {
        start: "10:10",
        end: "11:10",
        area: "1",
        course: "1",
        teacher: "1",
        diff: 60,
        Status: 1,
      },
      cIndex: 0,
      title: "",
      dialogFormVisible: false,
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
    this.fetchData();
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
    fetchData() {
      this.listLoading = true;
      getList(this.queryForm).then((res) => {
        this.list = res.data;
        const imageList = [];
        res.data.forEach((item, index) => {
          imageList.push(item.img);
        });
        this.imageList = imageList;
        this.total = res.totalCount;
        setTimeout(() => {
          this.listLoading = false;
        }, 500);
      });
    },
    tableSortChange() {
      const imageList = [];
      this.$refs.tableSort.tableData.forEach((item, index) => {
        imageList.push(item.img);
      });
      this.imageList = imageList;
    },
    showEdit(cindex, row) {
      this.cIndex = cindex;
      if (!row) {
        this.title = "新增课程";
      } else {
        this.title = "课程详情";
        this.form = row;
      }
      this.dialogFormVisible = true;
    },
    timeDifference() {
      let startTime = this.form.start;
      let endTime = this.form.end;
      let start1 = startTime.split(":");
      let startAll = parseInt(start1[0] * 60) + parseInt(start1[1]);

      let end1 = endTime.split(":");
      let endAll = parseInt(end1[0] * 60) + parseInt(end1[1]);
      this.form.diff = endAll - startAll;
    },
    close() {
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    save() {
      if (this.form.diff < 0) {
        return this.$baseMessage("时长不能小于0", "error");
      }
      this.dialogFormVisible = false;
      this.$emit(
        "transferUser",
        JSON.parse(JSON.stringify(this.form)),
        this.cIndex
      );
    },
  },
};
</script>

<style>
.title1 {
  text-align: right;
  font-size: 0.7rem;
  padding: 10px;
}
h4 {
  color: #67abd8;
}
.div1 {
  display: table-cell;
  vertical-align: bottom;
  width: 100%;
  height: 85px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
