<template>
	<div id="data-show">
		<div class="menu">
			<Card class="sum">
				<p slot='title'>今日数据</p>
				<p v-for="(v,i) in columns">
					<span class="title">{{v.title}}</span>
					<span class="body">{{cityDataSum[i]}}</span>
				</p>
				<span slot="extra">
					<Dropdown style="margin-left: 20px" trigger="click" placement="bottom-end" @on-click='checkedCity'>
					<a href="javascript:void(0)">
						查看分公司
						<Icon type="arrow-down-b"></Icon>
					</a>
					<DropdownMenu slot="list">
						<DropdownItem v-for='v in cityList' :name='v.name' :key='v.name'>{{v.name}}</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				</span>
			</Card>
			<!--商品销量排名top5-->
			<Card class='goods-ranking'>
				<p slot='title'>今日销量Top5</p>
				<Table :columns="goodsRankingColumns" :data="chinaGoodsRankingData"></Table>
			</Card>
		</div>
		<div class="data-map">
			<!--搜索全国地图中的店东-->
			<div class="search-all-shop" :class='{"show-search-all-shop":searchOpenCloseStatus}'>
				<div class="title">
					<Icon type="search"></Icon>
					搜索
				</div>
				<div class="ipts">
					<DatePicker v-model='chinaMapShopDate' size="small" type="datetimerange" placement='bottom-start' split-panels placeholder="按日期搜索"></DatePicker>
					<Input v-model="chinaMapShopName" size="small" clearable placeholder="按店名搜索" @on-enter="searchAllShop"></Input>
					<Input v-model="chinaMapShopMaster" size="small" clearable placeholder="按店主搜索" @on-enter="searchAllShop"></Input>
					<Input v-model="chinaMapShopTel" size="small" clearable placeholder="按手机号搜索" @on-enter="searchAllShop"></Input>
				</div>
				<div class="btns">
					<Button type="primary" size="small" icon="ios-search" @click="searchAllShop">搜索</Button>
					<Button type="ghost" size="small" @click="resetSearchAllShop">重置</Button>
				</div>
			</div>
			<Card class='search-list' :class='{"show-search-list":showSearchList,"show-search-list-body":showSearchListBody}'>
				<div slot="title">
					<Icon type="search"></Icon>
					搜索结果（{{searchChinaData.length}}）
					<span class="arrow" @click='hideSearchListBody'>
					<Icon type="arrow-down-b"></Icon>
				</span>
					<span class='close' @click='hideSearchList'>
					<Icon type="close"></Icon>
				</span>
				</div>
				<div class="search-data">
					<div v-for="(v,i) in searchChinaData" @mouseover="overSearchData(i)" @click="clickSearchData(i)">
						<h5>{{v.shopName}}（{{v.city}}）</h5>
						<p><span>{{v.shopMaster}}</span>{{v.shopTel}}</p>
					</div>
				</div>
			</Card>
			<!--重置地图中心点和级别-->
			<div class='reset-map' @click='resetChinaMap' title="重置地图">
				<Icon type="arrow-shrink"></Icon>
			</div>
			<!--搜索栏开关按钮-->
			<div class='search-open-close' @click='searchOpenClose' title="点击开启搜索栏">
				<Icon type="search"></Icon>
			</div>
			<!--全国地图-->
			<china-map :chinaData='chinaData' :searchChinaData='searchChinaData' :chinaMapShopDate='chinaMapShopDate' :overDataIndex='overDataIndex' :clickDataIndex='clickDataIndex' :chinaMapZoom='chinaMapZoom' @showTrends='showTrends'></china-map>
		</div>
    <!-- 城市弹窗 -->
		<Modal v-model="modal" class-name="vertical-center-modal" width='1100'>
			<p slot='header'>{{cityName}}</p>
			<div id="city-data">
				<div class="menu">
					<Card class="city-data-sum">
						<p slot='title'>今日数据</p>
						<p v-for="v in cityDataList">
							<span class="title">{{v.name}}</span>
							<span class="body">{{v.value}}</span>
						</p>
					</Card>
					<!--商品销量排名top5-->
					<Card class='goods-ranking'>
						<p slot='title'>今日销量Top5</p>
						<Table :columns="goodsRankingColumns" :data="cityGoodsRankingData"></Table>
					</Card>
				</div>
				<Card class="city-map">
					<!--搜索城市地图中的店东-->
					<div class="search-city-shop" slot="title">
						<DatePicker v-model='cityMapShopDate' size="small" type="datetimerange" split-panels placeholder="按日期搜索"></DatePicker>
						<Input v-model="cityMapShopName" size="small" clearable placeholder="按店名搜索" @on-enter="searchCityShop"></Input>
						<Input v-model="cityMapShopMaster" size="small" clearable placeholder="按店主搜索" @on-enter="searchCityShop"></Input>
						<Input v-model="cityMapShopTel" size="small" clearable placeholder="按手机号搜索" @on-enter="searchCityShop"></Input>
						<Button type="primary" size="small" icon="ios-search" @click="searchCityShop">搜索</Button>
						<Button type="ghost" size="small" @click="resetSearchCityShop">重置</Button>
					</div>
					<!--城市地图-->
					<div class='reset-map' @click='resetCityMap'>
						<Icon type="arrow-shrink"></Icon>
					</div>
					<city-map :cityName='cityName' :cityPoint='cityPoint' :cityData='cityData' :searchCityData='searchCityData' :cityMapShopDate='cityMapShopDate' :cityMapZoom='cityMapZoom' @showTrends='showTrends'></city-map>
				</Card>
			</div>
			</Tabs>
		</Modal>
		<!--显示只搜索时间段的结果-->
		<!--全国-->
		<Modal v-model="chinaInfo" class-name="vertical-center-modal" width='1100'>
			<p slot='header'>
				{{chinaDateArr[0].toLocaleDateString()}}至{{chinaDateArr[1].toLocaleDateString()}}数据统计
			</p>
      <!-- 每一天的数据 -->
			<Table size="small" :columns="dataColumns" :data="chinaInfoData"></Table>
      <!-- 合计数据 -->
			<Table size="small" :columns="dataSumColumns" :data="chinaInfoDataSum" class="sum"></Table>
		</Modal>
		<!--城市-->
		<Modal v-model="cityInfo" class-name="vertical-center-modal" width='1100'>
			<p slot='header'>
				{{cityDateArr[0].toLocaleDateString()}}至{{cityDateArr[1].toLocaleDateString()}}数据统计
			</p>
      <!-- 每一天的数据 -->
			<Table size="small" :columns="dataColumns" :data="cityInfoData"></Table>
      <!-- 合计数据 -->
			<Table size="small" :columns="dataSumColumns" :data="cityInfoDataSum" class="sum"></Table>
		</Modal>
    <!--显示店东数据趋势-->
		<Modal v-model="trendInfo" class-name="vertical-center-modal show-trends" width='1100'>
			<p slot='header'>
				数据走势
			</p>
			<show-trends :shopDatas='shopDatas'></show-trends>
		</Modal>
		<!--显示特定日期内每日数据趋势-->
		<Modal v-model="shopTrendInfo" class-name="vertical-center-modal show-trends" width='1100'>
			<p slot='header'>
				数据走势
			</p>
			<shop-trends :shopTrendDatas='shopTrendDatas'></shop-trends>
		</Modal>
		<!--显示特定日期内每日销量Top5的商品-->
		<Modal v-model="showGoodsRanking" class-name="vertical-center-modal">
			<p slot='header'>
				销量Top5
			</p>
			<div class="goods-ranking">
				<Table :columns="goodsRankingColumns" :data="goodsRankingData"></Table>
			</div>
		</Modal>
	</div>
	<!--在index.html中添加：<script type="text/javascript" src="http://api.map.baidu.com/getscript?v=3.0&ak=wKHGkVNoB3i2H6aUtYE3CXt1mPbTtflm"></script>-->
</template>
<script>
import chinaMap from "./components/china-map.vue";
import cityMap from "./components/city-map.vue";
import showTrends from "./components/show-trends.vue";
import shopTrends from "./components/shop-trends.vue";
export default {
  name: "dataShow",
  components: {
    chinaMap,
    cityMap,
    showTrends,
    shopTrends
  },
  data() {
    return {
      columns: [
        {
          title: "订单数量",
          key: "orderNum"
        },
        {
          title: "交易金额",
          key: "orderMoney"
        },
        {
          title: "粉丝数量",
          key: "starNum"
        },
        {
          title: "分润",
          key: "profit"
        },
        {
          title: "店东数量",
          key: "shopNum"
        }
      ],
      dataColumns: [
        {
          title: "日期",
          key: "date"
        },
        {
          title: "店东数量",
          key: "shopNum"
        },
        {
          title: "订单数量",
          key: "orderNum"
        },
        {
          title: "交易金额",
          key: "orderMoney"
        },
        {
          title: "粉丝数量",
          key: "starNum"
        },
        {
          title: "分润",
          key: "profit"
        },
        {
          title: "操作",
          key: "action",
          render: fn => {
            return fn(
              "Span",
              {
                class: "span",
                on: {
                  click: e => {
                    console.log(
                      e.path[3].children[0].children[0].children[0].innerHTML
                    );
                    this.showGoodsRanking = true;
                  }
                }
              },
              "查看Top5"
            );
          }
        }
      ],
      dataSumColumns: [
        {
          title: "日期",
          key: "date"
        },
        {
          title: "店东数量",
          key: "shopNum"
        },
        {
          title: "订单数量",
          key: "orderNum"
        },
        {
          title: "交易金额",
          key: "orderMoney"
        },
        {
          title: "粉丝数量",
          key: "starNum"
        },
        {
          title: "分润",
          key: "profit"
        },
        {
          title: "操作",
          key: "action",
          render: fn => {
            return fn(
              "Span",
              {
                class: "span",
                on: {
                  click: () => {
                    this.showShopTrends();
                  }
                }
              },
              "查看数据走势"
            );
          }
        }
      ],
      cityDataSum: new Array(5),
      chinaData: [],
      searchChinaData: [],
      cityName: "",
      cityPoint: {},
      cityList: [
        {
          name: "青岛市",
          point: {
            lng: 120.366047,
            lat: 36.257078
          }
        },
        {
          name: "新乡市",
          point: {
            lng: 113.921815,
            lat: 35.306703
          }
        },
        {
          name: "乌鲁木齐市",
          point: {
            lng: 87.633046,
            lat: 43.826764
          }
        }
      ],
      modal: false,
      cityDataList: [],
      /*搜索栏状态*/
      searchOpenCloseStatus: false,
      showGoodsRanking: false,
      /*全国地图中搜索*/
      showSearchList: false,
      showSearchListBody: false,
      chinaMapShopName: "",
      chinaMapShopMaster: "",
      chinaMapShopTel: "",
      chinaMapShopDate: ["", ""],
      chinaDateCha: 0,
      chinaDateArr: [new Date(1900 / 1 / 1), new Date(1900 / 1 / 1)],
      chinaInfo: false,
      chinaInfoData: [],
      chinaInfoDataSum: [],
      overDataIndex: -1,
      clickDataIndex: -1,
      /*城市地图中搜索*/
      cityData: [],
      searchCityData: [],
      cityMapShopName: "",
      cityMapShopMaster: "",
      cityMapShopTel: "",
      cityMapShopDate: ["", ""],
      cityDateCha: 0,
      cityDateArr: [new Date(1900 / 1 / 1), new Date(1900 / 1 / 1)],
      cityInfo: false,
      cityInfoData: [],
      cityInfoDataSum: [],
      chinaMapZoom: true,
      cityMapZoom: true,
      /*显示趋势*/
      trendInfo: false,
      shopDatas: {},
      shopTrendInfo: false,
      shopTrendData: {},
      shopTrendDatas: {},
      /*商品销量排名top5*/
      goodsRankingColumns: [
        // 	{
        // 	title: '排名',
        // 	key: 'ranking',
        // 	className: 'ranking'
        // },
        {
          title: "商品名称",
          key: "goodsName",
          className: "goods-name"
        },
        {
          title: "销量",
          key: "salesNum",
          className: "sales-num"
        }
      ],
      chinaGoodsRankingData: [],
      cityGoodsRankingData: [
        {
          ranking: 1,
          goodsName: "【北海直供】烤海鸭蛋 10个/份",
          salesNum: 5
        },
        {
          ranking: 2,
          goodsName: "油 桃 2斤/份",
          salesNum: 4
        },
        {
          ranking: 3,
          goodsName: "金针菇 4斤/份",
          salesNum: 3
        },
        {
          ranking: 4,
          goodsName: "广西海鸭蛋 10枚/份",
          salesNum: 2
        },
        {
          ranking: 5,
          goodsName: "新鲜带壳花生 1kg/份",
          salesNum: 1
        }
      ],
      goodsRankingData: [
        {
          ranking: 1,
          goodsName: "【北海直供】烤海鸭蛋 10个/份",
          salesNum: 15
        },
        {
          ranking: 2,
          goodsName: "油 桃 2斤/份",
          salesNum: 14
        },
        {
          ranking: 3,
          goodsName: "金针菇 4斤/份",
          salesNum: 13
        },
        {
          ranking: 4,
          goodsName: "广西海鸭蛋 10枚/份",
          salesNum: 12
        },
        {
          ranking: 5,
          goodsName: "新鲜带壳花生 1kg/份",
          salesNum: 11
        }
      ]
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    cityName(val) {
      this.cityData = [];
      this.cityList.map(v => {
        if (val == v.name) {
          this.cityPoint = v.point;
        }
      });
      this.chinaData.map(v => {
        if (val == v.city) {
          this.cityData.push(v);
        }
      });
    },
    chinaMapShopDate(val) {
      if (val[0] == null || val[1] == null) {
        this.chinaMapShopDate = ["", ""];
      }
      this.chinaDateCha = new Date(val[1]) - new Date(val[0]);
      if (val[0] == "" || val[1] == "") {
        this.chinaDateArr = [new Date(1900 / 1 / 1), new Date(1900 / 1 / 1)];
      } else {
        this.chinaDateArr = val;
      }
      this.shopDatas = {};
    },
    cityMapShopDate(val) {
      if (val[0] == null || val[1] == null) {
        this.cityMapShopDate = ["", ""];
      }
      this.cityDateCha = new Date(val[1]) - new Date(val[0]);
      if (val[0] == "" || val[1] == "") {
        this.cityDateArr = [new Date(1900 / 1 / 1), new Date(1900 / 1 / 1)];
      } else {
        this.cityDateArr = val;
      }
      this.shopDatas = {};
    }
  },
  methods: {
    init() {
      this.chinaData = [];
      this.$http
        .get("citycmp/newhome")
        .then(res => {
          console.log(res.data);
          this.cityDataSum = res.data.today;
          this.chinaGoodsRankingData = res.data.goods;
          this.chinaData = res.data.shops;
        })
        .catch(err => {});
    },
    search(data, argumentObj) {
      let res = data;
      let dataClone = data;
      for (let argu in argumentObj) {
        if (argumentObj[argu].length > 0) {
          res = dataClone.filter(d => {
            return d[argu].indexOf(argumentObj[argu]) > -1;
          });
          dataClone = res;
        }
      }
      return res;
    },
    checkedCity(v) {
      this.resetSearchCityShop();
      this.cityName = v;
      this.modal = true;
    },
    searchAllShop() {
      this.chinaInfo = false; //隐藏弹窗
      this.chinaInfoData = [];
      this.chinaInfoDataSum = [];
      this.searchChinaData = [];
      this.showSearchList = false;
      this.overDataIndex = -1;
      this.clickDataIndex = -1;
      //搜索全国数据
      if (
        this.chinaMapShopName == "" &&
        this.chinaMapShopMaster == "" &&
        this.chinaMapShopTel == ""
      ) {
        if (this.chinaMapShopDate[0] == "" || this.chinaMapShopDate[1] == "") {
          this.$Message.info("搜索内容不能为空");
          return false; // 搜索条件全部未选时不进行搜索
        } else {
          //只选时间段不选店东时，计算所选时间段内所有店东数据之和（弹窗显示）
          let dateArr = this.getAllDate([
            this.chinaMapShopDate[0].toLocaleDateString(),
            this.chinaMapShopDate[1].toLocaleDateString()
          ]);
          dateArr.map(v => {
            this.chinaInfoData.push({
              date: v,
              shopNum: 76,
              orderNum: Math.round(Math.random() * 900 + 100),
              orderMoney: Math.round(Math.random() * 9000 + 1000),
              starNum: Math.round(Math.random() * 9000 + 1000),
              profit: Math.round(Math.random() * 9000 + 1000)
            });
          });
          this.chinaInfoDataSum.push({
            date: "合计",
            shopNum: 76,
            orderNum: Math.round(Math.random() * 900 + 100) * dateArr.length,
            orderMoney:
              Math.round(Math.random() * 9000 + 1000) * dateArr.length,
            starNum: Math.round(Math.random() * 9000 + 1000) * dateArr.length,
            profit: Math.round(Math.random() * 9000 + 1000) * dateArr.length
          });
          this.chinaInfo = true;
          this.shopTrendData = {
            dateArr: this.chinaMapShopDate,
            dates: dateArr,
            datas: this.chinaInfoData
          };
        }
      } else {
        let data = this.search(this.chinaData, {
          shopName: this.chinaMapShopName,
          shopMaster: this.chinaMapShopMaster,
          shopTel: this.chinaMapShopTel
        });
        if (data.length > 0) {
          if (
            this.chinaMapShopDate[0] == "" ||
            this.chinaMapShopDate[1] == ""
          ) {
            //不选时间段只选店东时，显示该店东今日数据
            this.searchChinaData = data;
          } else {
            //时间店东全都选时，计算该店东该时间段内数据之和
            // let dateCha = new Date(v.shopData.orderDate) - this.chinaMapShopDate[0];
            // if (dateCha >= 0 && dateCha <= this.chinaDateCha) {
            this.searchChinaData = data;
            // }
          }
        }
        if (this.searchChinaData.length > 0) {
          //显示搜索结果列表
          this.showSearchList = true;
          this.showSearchListBody = false;
        } else {
          this.searchChinaData = [];
          this.$Message.info("未搜索到数据");
        }
      }
    },
    resetSearchAllShop() {
      //重置
      this.chinaMapShopName = this.chinaMapShopMaster = this.chinaMapShopTel =
        "";
      this.chinaMapShopDate = ["", ""];
      this.searchChinaData = [];
      this.showSearchList = false;
      this.chinaInfo = false; //隐藏弹窗
      this.chinaInfoData = [];
      this.chinaInfoDataSum = [];
      this.overDataIndex = -1;
      this.clickDataIndex = -1;
    },
    hideSearchList() {
      //隐藏搜索结果
      this.showSearchList = false;
    },
    hideSearchListBody() {
      //隐藏搜索结果列表
      this.showSearchListBody = !this.showSearchListBody;
    },
    overSearchData(index) {
      //鼠标在搜索结果上的mouseover事件
      this.overDataIndex = index;
    },
    clickSearchData(index) {
      //鼠标在搜索结果上的click事件
      this.clickDataIndex = index;
    },
    showTrends(data) {
      //展示数据趋势
      this.shopDatas = data;
      this.trendInfo = true;
    },
    showShopTrends() {
      this.shopTrendDatas = this.shopTrendData;
      this.shopTrendInfo = true;
    },
    searchCityShop() {
      this.cityInfo = false; //隐藏弹窗
      this.cityInfoData = [];
      this.cityInfoDataSum = [];
      this.searchCityData = [];
      //打开城市弹框之后搜索城市数据
      if (
        this.cityMapShopName == "" &&
        this.cityMapShopMaster == "" &&
        this.cityMapShopTel == ""
      ) {
        if (this.cityMapShopDate[0] == "" || this.cityMapShopDate[1] == "") {
          this.$Message.info("搜索内容不能为空");
          return false; // 搜索条件全部未选时不进行搜索
        } else {
          //只选时间段不选店东时，计算所选时间段内所有店东数据之和（弹窗显示）
          let dateArr = this.getAllDate([
            this.cityMapShopDate[0].toLocaleDateString(),
            this.cityMapShopDate[1].toLocaleDateString()
          ]);
          dateArr.map(v => {
            this.cityInfoData.push({
              date: v,
              shopNum: 76,
              orderNum: Math.round(Math.random() * 900 + 100),
              orderMoney: Math.round(Math.random() * 9000 + 1000),
              starNum: Math.round(Math.random() * 9000 + 1000),
              profit: Math.round(Math.random() * 9000 + 1000)
            });
          });
          this.cityInfoDataSum.push({
            date: "合计",
            shopNum: 76,
            orderNum: Math.round(Math.random() * 900 + 100) * dateArr.length,
            orderMoney:
              Math.round(Math.random() * 9000 + 1000) * dateArr.length,
            starNum: Math.round(Math.random() * 9000 + 1000) * dateArr.length,
            profit: Math.round(Math.random() * 9000 + 1000) * dateArr.length
          });
          this.cityInfo = true;
          this.shopTrendData = {
            dateArr: this.cityMapShopDate,
            dates: dateArr,
            datas: this.cityInfoData
          };
        }
      } else {
        let data = this.search(this.cityData, {
          shopName: this.cityMapShopName,
          shopMaster: this.cityMapShopMaster,
          shopTel: this.cityMapShopTel
        });
        if (data.length > 0) {
          if (this.cityMapShopDate[0] == "" || this.cityMapShopDate[1] == "") {
            //不选时间段只选店东时，显示该店东今日数据
            this.searchCityData = data;
          } else {
            //时间店东全都选时，计算该店东该时间段内数据之和
            // let dateCha =
            //   new Date(v.shopData.orderDate) - this.cityMapShopDate[0];
            // if (dateCha >= 0 && dateCha <= this.cityDateCha) {
            this.searchCityData = data;
            // }
          }
        }
        if (this.searchCityData.length == 0) {
          this.$Message.info("未搜索到数据");
        }
      }
    },
    resetSearchCityShop() {
      //重置
      this.cityMapShopName = this.cityMapShopMaster = this.cityMapShopTel = "";
      this.cityMapShopDate = ["", ""];
      this.cityInfoDataSum = [];
      this.searchCityData = [];
    },
    searchOpenClose() {
      //搜索栏开关
      this.searchOpenCloseStatus = !this.searchOpenCloseStatus;
    },
    resetChinaMap() {
      //重置地图显示级别
      this.chinaMapZoom = !this.chinaMapZoom;
      this.overDataIndex = -1;
      this.clickDataIndex = -1;
    },
    resetCityMap() {
      //重置地图显示级别
      this.cityMapZoom = !this.cityMapZoom;
    },
    getAllDate(dataArr) {
      //获取开始日期和结束日期内所有的日期
      let ab = dataArr[0].split("/");
      let ae = dataArr[1].split("/");
      let db = new Date();
      db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
      let de = new Date();
      de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
      let unixDb = db.getTime();
      let unixDe = de.getTime();
      let dateArr = [];
      for (let k = unixDb; k <= unixDe; ) {
        dateArr.push(new Date(parseInt(k)).toLocaleDateString());
        k = k + 24 * 60 * 60 * 1000;
      }
      return dateArr;
    }
  }
};
</script>

<style lang="less">
@import "../../styles/common.less";
@import "./home.less";
</style>