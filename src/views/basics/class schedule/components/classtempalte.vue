<template>
  <div class="table-container">
    <div class="tempalte_body">
      <div class="tempalte_center">
        <div style="heigh: 150px;">
          <el-row>
            <el-col
              v-for="(item, index) in listData"
              :key="index"
              class="tempalte_card"
            >
              <el-tag
                :closable="settingData.editShow && settingData.Type == 2"
                :disable-transitions="false"
                :style="tagstyle()"
                @close="handleClose(index)"
              >
                <span :style="spanstyle()">{{
                  item.title.indexOf("Day") > -1
                    ? item.title + "_" + (index + 1)
                    : item.title
                }}</span>
              </el-tag>
              <el-card
                v-show="settingData.editShow"
                shadow="hover"
                body-style="padding:0px;text-align:center;"
              >
                <div
                  style="width: 100%; height: 50px; line-height: 50px;"
                  @click="handleEdit(index, item.title, null, null)"
                >
                  <byui-icon
                    :icon="['fas', 'plus']"
                    style="font-size: 20px;"
                  ></byui-icon>
                </div>
              </el-card> </el-col
          ></el-row>
        </div>
        <div class="tempalte_card_div2">
          <el-row>
            <el-col
              v-for="(item, index) in listData"
              :key="index"
              class="tempalte_card"
            >
              <div v-if="settingData.cardType == 1">
                <el-card
                  v-for="(citem, cindex) in item.data"
                  :key="cindex"
                  shadow="hover"
                  body-style="padding:8px"
                >
                  <div class="divcardbody">
                    <div align="left" style="font-size: 0.7rem;">
                      {{ citem.StartTime + "-" + citem.EndTime }}
                    </div>
                    <div
                      align="center"
                      style="padding: 8px 0; font-size: 0.9rem;"
                    >
                      {{ courseFilter(citem.CourseID) }}
                    </div>
                    <div align="right">
                      <el-link
                        :underline="false"
                        type="primary"
                        style="color: #409eff; font-size: 0.7rem; padding: 5px;"
                        >{{ employeeFilter(citem.EmployeeID) }}</el-link
                      >
                    </div>
                  </div>

                  <div
                    v-show="settingData.editShow"
                    style="text-align: right; border-top: 1px solid #ebeef5;"
                  >
                    <el-button
                      style="padding: 3px 8px;"
                      type="text"
                      @click="handleDelete(index, cindex)"
                      >删除</el-button
                    >
                    <el-button
                      style="padding: 3px 0;"
                      type="text"
                      @click="
                        handleEdit(
                          index,
                          item.title,
                          cindex,
                          JSON.parse(JSON.stringify(citem))
                        )
                      "
                      >编辑</el-button
                    >
                  </div>
                </el-card>
              </div>
              <div v-if="settingData.cardType == 2">
                <el-card
                  v-for="(citem, cindex) in item.data"
                  :key="cindex"
                  shadow="hover"
                  body-style="padding:8px"
                >
                  <div class="divcardbody">
                    {{ citem.StartTime + "-" + citem.EndTime }}
                    <div style="text-align: right; font-size: 0.7rem;">
                      {{ citem.diff }}min
                    </div>
                  </div>
                  <img
                    style="height: 80px; width: 100%;"
                    src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3183730857,2780257894&fm=26&gp=0.jpg"
                    class="image"
                  />
                  <div style="text-align: center; padding: 5px 0px;">
                    {{ courseFilter(citem.CourseID) }}
                  </div>
                  <div style="text-align: right; padding: 0px 0px 5px 0px;">
                    <el-link
                      type="primary"
                      style="color: #409eff; font-size: 0.8rem;"
                      >{{ employeeFilter(citem.EmployeeID) }}</el-link
                    >
                  </div>
                  <div class="divtag">
                    <el-tag type="success" size="mini">{{
                      areaFilter(citem.AreaID)
                    }}</el-tag>
                  </div>
                  <div style="text-align: right;">
                    <el-button
                      type="primary"
                      icon="el-icon-edit"
                      circle
                      @click="
                        handleEdit(
                          index,
                          item.title,
                          cindex,
                          JSON.parse(JSON.stringify(citem))
                        )
                      "
                    ></el-button>
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      circle
                      @click="handleDelete(index, cindex)"
                    ></el-button>
                  </div>
                </el-card></div
            ></el-col>
          </el-row>
        </div>
      </div>
    </div>

    <edit ref="edit" @transferUser="courseAdd"></edit>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import Edit from "./edit";
import { mapGetters } from "vuex";

export default {
  name: "Card",
  components: { Edit },
  filters: {},
  data() {
    return {
      listData: [],
      tempData: null,
      settingData: {
        Type: 2, //1按周2按天
        editShow: false,
        minCard: false,
        templateAdd: true,
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
    this.listDataLoad();
  },
  methods: {
    templateChange(item) {
      if ("Type" in item) {
        this.tempData = JSON.parse(item.TemplateData);
      } else {
        this.tempData = null;
      }
    },
    tagstyle() {
      let _style;
      if (this.settingData.Type == 2) {
        if (this.settingData.editShow) {
          _style = "width: 100%; text-align: right;";
        } else {
          _style = "width: 100%; text-align: center;";
        }
      } else {
        _style = "width: 100%; text-align: center;";
      }
      return _style;
    },
    listDataLoad(flg) {
      if (flg && flg == "clear") {
        this.listData = [];
        this.tempData = null;
        return;
      }
      if (this.tempData) {
        this.listData = this.tempData;
      } else {
        if (this.settingData.Type == 2) {
          this.listData = [];
        } else {
          this.listData = [
            {
              title: "星期一",
              data: [],
            },
            {
              title: "星期二",
              data: [],
            },
            {
              title: "星期三",
              data: [],
            },
            {
              title: "星期四",
              data: [],
            },
            {
              title: "星期五",
              data: [],
            },
            {
              title: "星期六",
              data: [],
            },
            {
              title: "星期日",
              data: [],
            },
          ];
        }
      }
    },
    cardTitle(value, index) {
      return this.settingData.Type == 2 ? value + "_" + (index + 1) : value;
    },
    spanstyle() {
      let _style;
      if (this.settingData.Type == 2 && this.settingData.editShow) {
        _style = "margin-right: 22%;";
      }
      return _style;
    },
    settingDataChange(value) {
      this.settingData = JSON.parse(JSON.stringify(value));
    },
    courseFilter(value) {
      let temp = this.courseList.find((item) => item.CourseID == value);
      return temp.Name;
    },
    areaFilter(value) {
      let temp = this.areaList.find((item) => item.AreaID == value);
      return temp.Name;
    },
    employeeFilter(value) {
      let temp = this.employeeList.find((item) => item.EmployeeID == value);
      return temp.Name;
    },
    getListData() {
      return JSON.parse(JSON.stringify(this.listData));
    },
    listDataAdd() {
      let temp = {
        title: "Day",
        index: this.listData.length,
        data: [],
      };
      this.listData.push(temp);
    },
    courseAdd(index, value, cindex) {
      if (cindex != null) {
        this.listData[index].data.splice(cindex, 1, value);
      } else {
        this.listData[index].data.push(value);
      }
    },
    handleDelete(index, cindex) {
      this.listData[index].data.splice(index, 1);
    },
    handleEdit(index, rowname, cindex, row) {
      let _rowname =
        rowname.indexOf("Day") > -1 ? rowname + "_" + (index + 1) : rowname;

      this.$refs["edit"].showEdit(index, _rowname, cindex, row);
    },
    handleClose(index) {
      this.listData.splice(index, 1);
    },
  },
};
</script>
<style lang="scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
<style lang="scss" scoped>
.divtag {
  text-align: left;
  padding: 0px 0px 5px 0px;
  font-size: 0.8rem;
}
.divcardbody {
  text-align: right;
  font-size: 0.9rem;
  margin-bottom: 3px;
}
.rowheader {
  text-align: right;
  padding: 5px;
}
.grid-content {
  border-radius: 4px;
}
.tempalte_body {
  border: 1px solid #c0c4cc;
  padding: 5px;
  margin: 8px 0px;
}
.tempalte_center {
  min-width: 900px;
  height: calc(50vh + 125px);
}
.tempalte_center {
  min-width: 900px;
  height: calc(50vh + 125px);
}
.tempalte_card_div2 {
  height: 50vh;
  overflow-x: auto;
}
.tempalte_card {
  margin-right: 10px;
  width: 13%;
  max-width: 150px;
}
</style>
