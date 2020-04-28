<template>
  <div class="card-container">
    <el-row :gutter="20">
      <el-col :span="16"
        ><div class="grid-content bg-purple">
          <el-switch
            v-model="value2"
            style="display: block; float: left;"
            active-color="#ff4949"
            inactive-color="#13ce66"
            active-text="模板编辑"
            inactive-text="课表生成"
          >
          </el-switch
          ><el-select
            v-model="settingData.schedule"
            style="float: left; margin-left: 10px;"
            size="mini"
          >
            <el-option label="选择模板" value="0"></el-option>
            <el-option label="新闻动态" value="1"></el-option>
            <el-option label="实时热点" value="2"></el-option>
          </el-select></div
      ></el-col>
      <el-col :span="8"
        ><div class="grid-content bg-purple rowheader">
          <el-radio-group v-model="settingData.mode">
            <el-radio :label="1">按周</el-radio>
            <el-radio :label="2">按天</el-radio>
          </el-radio-group>
        </div></el-col
      >
    </el-row>

    <el-row class="rowheader">
      <el-tooltip
        disabled
        class="item"
        effect="dark"
        content="生成课表"
        placement="top-start"
      >
        <el-button v-if="!value2" icon="el-icon-edit" type="primary"
          >生成课表
        </el-button>
      </el-tooltip>
      <el-button v-if="value2" icon="el-icon-edit" type="primary"
        >模板保存
      </el-button>
      <el-button icon="el-icon-plus" type="primary" @click="listDataAdd"
        >加列
      </el-button>
      <el-button v-if="!value2" icon="el-icon-edit" type="primary"
        >存为新模板
      </el-button>
      <el-button v-if="value2" icon="el-icon-delete" type="danger"
        >删除模板
      </el-button>
    </el-row>
    <div style="width: 100%; min-height: 80vh; overflow-x: auto;">
      <el-row :gutter="10" style="min-width: 1100px;">
        <el-col
          v-for="(item, index) in weekDay()"
          :key="index"
          :xs="3"
          :sm="3"
          :md="3"
          :lg="3"
          :xl="3"
        >
          <el-tag
            :closable="settingData.mode == 2"
            :disable-transitions="false"
            :style="
              settingData.mode == 2
                ? 'width: 100%; text-align: right;'
                : 'width: 100%; text-align: center;'
            "
            @close="handleClose(index)"
          >
            <span :style="settingData.mode == 1 ? '' : 'margin-right: 22%;'">{{
              item.title
            }}</span>
          </el-tag>
          <el-card shadow="hover" body-style="padding:0px;text-align:center;">
            <div
              style="width: 100%; height: 50px; line-height: 50px;"
              @click="handleEdit(index, item.title, null, null)"
            >
              <byui-icon
                :icon="['fas', 'plus']"
                style="font-size: 20px;"
              ></byui-icon>
            </div>
          </el-card>
          <div v-for="(citem, cindex) in item.data" :key="cindex">
            <el-card shadow="hover" body-style="padding:8px">
              <div class="divcardbody">
                {{ citem.start + "-" + citem.end }}
                <div style="text-align: right; font-size: 0.7rem;">
                  {{ courseFilter(citem.course).minute }}min
                </div>
              </div>
              <img
                style="height: 60px; width: 100%;"
                src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3183730857,2780257894&fm=26&gp=0.jpg"
                class="image"
              />
              <div style="text-align: center; padding: 5px 0px;">
                {{ courseFilter(citem.course).name }}
              </div>
              <div style="text-align: right; padding: 0px 0px 5px 0px;">
                <el-link
                  type="primary"
                  style="color: #409eff; font-size: 0.8rem;"
                  >{{ employeeFilter(citem.teacher) }}</el-link
                >
              </div>
              <div class="divtag">
                <el-tag type="success" size="mini">{{
                  areaFilter(citem.area)
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
    <edit ref="edit" @transferUser="courseAdd"></edit>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import Edit from "./components/edit";
import { mapGetters } from "vuex";

export default {
  name: "Card",
  components: { Edit },
  filters: {},
  data() {
    return {
      value2: false,
      listData: [
        {
          title: "day1",
          data: [],
        },
      ],
      listWeekData: [
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
      ],
      settingData: { mode: 2, schedule: "0" },
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
    courseFilter(value) {
      let temp = this.courseList.find((item) => item.id == value);
      return temp;
    },
    areaFilter(value) {
      let temp = this.areaList.find((item) => item.id == value);
      return temp.name;
    },
    employeeFilter(value) {
      let temp = this.employeeList.find((item) => item.id == value);
      return temp.name;
    },
    listDataAdd() {
      let temp = {
        title: "day" + (this.listData.length + 1),
        data: [],
      };
      this.listData.push(temp);
    },
    courseAdd(index, value, cindex) {
      if (this.settingData.mode == 1) {
        if (cindex != null) {
          this.listWeekData[index].data.splice(cindex, 1, value);
        } else {
          this.listWeekData[index].data.push(value);
        }
      } else if (this.settingData.mode == 2) {
        if (cindex != null) {
          this.listData[index].data.splice(cindex, 1, value);
        } else {
          this.listData[index].data.push(value);
        }
      }
    },
    handleDelete(index, cindex) {
      if (this.settingData.mode == 1) {
        this.listWeekData[index].data.splice(index, 1);
      } else if (this.settingData.mode == 2) {
        this.listData[index].data.splice(index, 1);
      }
    },
    handleEdit(index, rowname, cindex, row) {
      this.$refs["edit"].showEdit(index, rowname, cindex, row);
    },
    weekDay() {
      if (this.settingData.mode == 1) return this.listWeekData;
      return this.listData;
    },
    handleClose(index) {
      this.listData.splice(index, 1);
    },
  },
};
</script>
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
  border-bottom: 1px solid #ebeef5;
}
.rowheader {
  text-align: right;
  padding: 5px;
}
.grid-content {
  border-radius: 4px;
}
</style>
