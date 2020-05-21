<template>
  <div class="table-container">
    <el-row :gutter="20">
      <el-col :span="14">
        <el-card class="box-card">
          <h3>商品选择</h3>
          <el-form ref="form" :model="queryForm" :inline="true" align="right">
            <el-form-item label="商品名称">
              <el-input v-model="queryForm.Name" placeholder="商品名称" />
            </el-form-item>
            <el-form-item label="商品种类">
              <el-select
                v-model="queryForm.Type"
                clearable
                placeholder="商品种类"
              >
                <el-option label="饮料" value="0"></el-option>
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
          <br />
          <!-- <div style="padding-bottom: 10px;">
            <el-button icon="el-icon-plus" type="primary" @click="handleAdd"
              >选择商品
            </el-button>
          </div> -->
          <el-table
            ref="tableSort"
            :data="goodsList"
            height="73vh"
            @row-click="goodsSelect"
          >
            <el-table-column label="商品图片" width="100">
              <template slot-scope="scope">
                <div style="width: 50px; height: 50px;">
                  <el-image
                    v-if="imgShow"
                    :preview-src-list="[scope.row.imgURL]"
                    :src="scope.row.imgURL"
                    style="width: 80px; height: 50px;"
                  ></el-image>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="商品名" prop="Name"></el-table-column>
            <el-table-column label="商品类型" prop="TypeName"></el-table-column>
            <el-table-column label="单价" prop="SalePrice"></el-table-column>
            <el-table-column label="库存数" prop="Number"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="box-card">
          <h3>已选商品</h3>
          <br />
          <el-table
            ref="tableSort"
            style="margin-top: 24px;"
            :data="GoodsOrderDtl"
            height="50vh"
          >
            <el-table-column label="商品名" prop="Name"></el-table-column>
            <el-table-column label="数量">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.BuyNumber"
                  style="width: 130px;"
                  controls-position="right"
                  :min="1"
                  :max="999"
                ></el-input-number>
                {{ scope.Unit }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="90">
              <template slot-scope="scope">
                <el-button type="text" @click="handleDelete(scope.$index)"
                  >移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

        <el-card class="box-card">
          <h3>结算</h3>
          <el-form label-width="auto">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="应付金额">
                  <el-input-number
                    v-model="GoodsOrder.FinalPrice"
                    autocomplete="off"
                    :controls="false"
                    :disabled="true"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="付款金额">
                  <el-input-number
                    v-model="GoodsOrder.PaidPrice"
                    autocomplete="off"
                    :controls="false"
                  ></el-input-number>
                </el-form-item>
                <el-button type="primary" native-type="submit"
                  >确定付款
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-form-item label="支付方式">
                  <el-select
                    v-model="paymentInfo.PaymentType"
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
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import checkPermission from "@/utils/permission";

export default {
  name: "Table",
  components: {},
  filters: {},
  data() {
    return {
      num: 1,
      imgShow: true,
      queryForm: {
        Name: "",
        Type: "",
      },
      goodsList: [
        {
          GoodsID: "1",
          Name: "红牛",
          Unit: "瓶",
          SalePrice: "5",
          Type: "1",
          TypeName: "饮料",
          Number: "20",
          imgURL: "https://i.picsum.photos/id/25/200/300.jpg?1",
        },
        {
          GoodsID: "2",
          Name: "初级吉他",
          Unit: "件",
          SalePrice: "1500",
          Type: "2",
          TypeName: "乐器",
          Number: "9",
          imgURL: "https://i.picsum.photos/id/29/200/300.jpg?2",
        },
      ],
      GoodsOrder: {
        GoodsOrderID: "",
        MemberID: "",
        BasePrice: "",
        FinalPrice: "",
        PaidPrice: "",
        Remark: "",
        ShopID: "",
        IsDeleted: "",
        upTime: "",
        upUser: "",
      },
      GoodsOrderDtl: [],
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
    ...mapGetters(["paymentTypeList"]),
  },
  watch: {
    GoodsOrderDtl: {
      //深度监听，可监听到对象、数组的变化
      handler(val) {
        let price = 0;
        this.GoodsOrderDtl.forEach(function (value) {
          price += value.BuyNumber * value.SalePrice;
        });
        this.GoodsOrder.FinalPrice = price;
        this.GoodsOrder.BasePrice = price;
      },
      deep: true, //true 深度监听
    },
  },
  created() {
    this.$store.dispatch("baseData/setPaymentTypeList");
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
    handleDelete(index, row) {
      this.GoodsOrderDtl.splice(index, 1);
    },
    goodsSelect(row) {
      let isFind = false;
      for (let i = 0; i < this.GoodsOrderDtl.length; i++) {
        if (this.GoodsOrderDtl[i].GoodsID == row.GoodsID) {
          this.GoodsOrderDtl[i].BuyNumber++;
          isFind = true;
          break;
        }
      }
      if (!isFind) {
        let temp = {
          GoodsOrderID: "",
          GoodsID: "",
          Name: "",
          BuyNumber: 1,
          SalePrice: "",
          ShopID: "",
          IsDeleted: "",
          upTime: "",
          upUser: "",
        };
        temp.GoodsID = row.GoodsID;
        temp.SalePrice = row.SalePrice;
        temp.Name = row.Name;
        this.GoodsOrderDtl.push(temp);
      }
    },
    handleAdd() {},
    handleEdit(row) {},
    checkPermission,
  },
};
</script>
<style>
.el-form-item__content {
  margin-left: 0px;
}
</style>
