<template>
  <div class="table-container">
    <el-tabs v-model="activeName" class="system_tabs">
      <el-tab-pane label="生成课表" name="schedule">
        <div class="block" style="width: 98%;">
          <el-row :gutter="20">
            <el-col :span="12">
              <span class="demonstration">模板选择</span>
              <el-select
                v-model="settingData.TemplateID"
                class="zq_m_c"
                @change="templateChangeA"
              >
                <el-option label="选择模板" value="0"></el-option>
                <el-option
                  v-for="item in templateList"
                  :key="item.TemplateID"
                  :label="item.Name"
                  :value="item.TemplateID"
                ></el-option>
              </el-select>
              <el-button
                v-show="settingData.Type == 2"
                icon="el-icon-plus"
                type="primary"
                @click="listDataAdd"
                >加列
              </el-button>
            </el-col>
            <el-col :span="12" align="right">
              <el-switch v-model="settingData.editShow" active-text="启动编辑">
              </el-switch>
            </el-col>
          </el-row>
        </div>
        <class-tempalte ref="classtempalte"></class-tempalte>
        <el-row :gutter="20">
          <el-col :span="24" align="right">
            <span class="demonstration">生成日期</span>
            <el-date-picker
              v-model="timeRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="zq_m_c"
            >
            </el-date-picker>
            <el-button icon="el-icon-edit" type="primary">生成课表 </el-button>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="模板设定" name="template">
        <div class="block" style="width: 98%;">
          <el-row :gutter="20">
            <el-col :span="15">
              <span v-show="settingData2.templateAdd" class="demonstration"
                >模板选择</span
              >
              <el-select
                v-show="settingData2.templateAdd"
                v-model="settingData2.TemplateID"
                class="zq_m_c"
                @change="templateChangeB"
              >
                <el-option label="选择模板" value="0"></el-option>
                <el-option
                  v-for="item in templateList"
                  :key="item.TemplateID"
                  :label="item.Name"
                  :value="item.TemplateID"
                ></el-option>
              </el-select>
              <span class="demonstration">编课方式</span>
              <el-select
                v-model="settingData2.Type"
                :disabled="settingData2.templateAdd"
                class="zq_m_c"
                @click.native="open1"
              >
                <el-option label="按周编课" :value="1"></el-option>
                <el-option label="按天编课" :value="2"></el-option>
              </el-select>
              <el-button
                v-show="settingData2.Type == 2"
                icon="el-icon-plus"
                type="primary"
                @click="listDataAdd"
                >加列
              </el-button>
            </el-col>
            <el-col align="right" :span="9">
              <el-switch
                v-model="settingData2.templateAdd"
                active-color="#ff4949"
                inactive-color="#13ce66"
                active-text="修改原模板"
                inactive-text="新增新模板"
              >
              </el-switch
            ></el-col>
          </el-row>
        </div>
        <class-tempalte ref="classtempalte2"></class-tempalte>
        <el-row class="rowheader">
          <el-input
            v-model="templateName"
            placeholder="模板名称"
            style="width: 13rem;"
            maxlength="15"
            class="zq_m_c"
          />
          <el-button icon="el-icon-edit" type="primary" @click="templateSave"
            >保存模板
          </el-button>
          <el-button
            v-show="settingData2.templateAdd && eidtBtnShow"
            icon="el-icon-edit"
            type="primary"
            @click="templateSave"
            >存为新模板
          </el-button>
          <el-button
            v-show="settingData2.templateAdd && eidtBtnShow"
            icon="el-icon-delete"
            type="danger"
            @click="templateDelete"
            >删除模板
          </el-button>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="样式设定" name="templateStyle">
        <el-switch
          v-model="cardStyle.showImg"
          active-text="显示课程图片"
          class="zq_m_c"
          @change="cardStyleChange"
        >
        </el-switch>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getTemplateList } from "@/api/base";
import ClassTempalte from "./components/classtempalte";
import { mapGetters } from "vuex";

export default {
  name: "Card",
  components: { ClassTempalte },
  filters: {},
  data() {
    return {
      activeName: "schedule",
      buidingForm: {
        startDate: "2020-1-9",
        endDate: "2020-3-9",
      },
      timeRange: "",
      templateName: "",
      templateList: [],
      settingData: {},
      settingData2: {},
      cardStyle: {},
      eidtBtnShow: false,
    };
  },
  computed: {
    ...mapGetters(["employeeList", "areaList", "courseList"]),
  },
  watch: {
    settingData: {
      //深度监听，可监听到对象、数组的变化
      handler(val) {
        if (val.TemplateID == "0") {
          this.$refs["classtempalte"].listDataLoad("clear");
          return;
        }
        this.$refs["classtempalte"].settingDataChange(val);
        this.$refs["classtempalte"].listDataLoad();
      },
      deep: true, //true 深度监听
    },
    settingData2: {
      handler(val) {
        if (val.TemplateID == "0") {
          this.$refs["classtempalte2"].listDataLoad("clear");
          this.eidtBtnShow = false;
          return;
        }
        this.eidtBtnShow = true;
        this.$refs["classtempalte2"].settingDataChange(val);
        this.$refs["classtempalte2"].listDataLoad();
      },
      deep: true,
    },
  },
  created() {
    let self = this;
    //初始化 更新下拉菜单数据
    self.$store.dispatch("baseData/setEmployeeList");
    self.$store.dispatch("baseData/setAreaList");
    self.$store.dispatch("baseData/setCourseList");
    //初始化 卡片样式  settingData:schedule  settingData2:template
    self.cardStyle = {
      type: 1,
      showImg: false,
    };
    self.settingData = {
      Type: 2,
      TemplateID: "0",
      editShow: false,
      cardType: self.cardStyle.type,
      templateAdd: false,
    };
    self.settingData2 = {
      Type: 2,
      TemplateID: "0",
      editShow: true,
      cardType: self.cardStyle.type,
      templateAdd: false,
    };

    getTemplateList().then((res) => {
      self.templateList = res.data;
    });
  },
  methods: {
    getTemplateID2() {
      if (this.settingData2.TemplateID && this.settingData2.TemplateID != "0") {
        return this.settingData2.TemplateID;
      }
      return null;
    },
    templateDelete() {
      let id = this.getTemplateID2();
      if (id) {
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
      } else {
        this.$baseMessage("请选中要删除的模板！", "error");
      }
    },
    open1() {
      if (this.settingData2.templateAdd) {
        this.$notify.info({
          title: "提示",
          message: "模板保存后不可以再次修改编课方式,请新建新模板。",
          type: "warning",
        });
      }
    },
    templateChangeA() {
      let self = this;
      let value;
      if (self.settingData.TemplateID == "0") {
        return;
      }
      value = self.templateList.find(
        (item) => item.TemplateID == self.settingData.TemplateID
      );
      self.$refs["classtempalte"].templateChange(value);
      self.settingData.Type = value.Type;
    },
    templateChangeB() {
      let self = this;
      let value;
      if (self.settingData2.TemplateID == "0") {
        return;
      }
      value = self.templateList.find(
        (item) => item.TemplateID == self.settingData2.TemplateID
      );
      self.$refs["classtempalte2"].templateChange(value);
      self.settingData2.Type = value.Type;
    },
    listDataAdd() {
      if (this.activeName == "schedule") {
        this.$refs["classtempalte"].listDataAdd();
      } else if (this.activeName == "template") {
        this.$refs["classtempalte2"].listDataAdd();
      }
    },
    templateSave() {
      //需要保存的值
      let temp = this.$refs["classtempalte2"].getListData();
      console.log(temp);
    },
    cardStyleChange() {
      let self = this;
      if (self.cardStyle.showImg) {
        self.cardStyle.type = 2;
      } else {
        self.cardStyle.type = 1;
      }
      self.settingData.cardType = self.cardStyle.type;
      self.settingData2.cardType = self.cardStyle.type;
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
  border-bottom: 1px solid #ebeef5;
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
