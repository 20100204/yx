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
						查看城市
						<Icon type="arrow-down-b"></Icon>
					</a>
					<DropdownMenu slot="list">
						<DropdownItem v-for='v in cityData' :name='v.name' :key='v.name'>{{v.name}}</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				</span>
			</Card>
			<!--搜索全国地图中的店东-->
			<Card class="search-all-shop">
				<div slot="title">
					<Icon type="search"></Icon>
					搜索
				</div>
				<div class="ipts">
					<DatePicker v-model='chinaMapShopDate' type="daterange" format="yyyy/MM/dd" placement='top-start' split-panels placeholder="按日期搜索" @on-enter="searchCityShop"></DatePicker>
					<Input v-model="chinaMapShopName" clearable placeholder="按店名搜索" @on-enter="searchAllShop"></Input>
					<Input v-model="chinaMapShopMaster" clearable placeholder="按店主搜索" @on-enter="searchAllShop"></Input>
					<Input v-model="chinaMapShopTel" clearable placeholder="按手机号搜索" @on-enter="searchAllShop"></Input>
					<Button type="primary" icon="ios-search" @click="searchAllShop">搜索</Button>
					<Button type="primary" @click="resetSearchAllShop">重置</Button>
				</div>
			</Card>
		</div>
		<div class="data-map">
			<!--全国地图-->
			<div class='reset-map' @click='resetChinaMap'>
				<Icon type="arrow-shrink"></Icon>
			</div>
			<china-map :chinaData='chinaData' :searchChinaData='searchChinaData' :overDataIndex='overDataIndex' :clickDataIndex='clickDataIndex' :chinaMapZoom='chinaMapZoom'></china-map>
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
				<div v-for="(v,i) in chinaInfoShopData" @mouseover="overSearchData(i)" @click="clickSearchData(i)">
					<h5>{{v.shopName}}（{{v.name}}）</h5>
					<p><span>{{v.shopMaster}}</span>{{v.shopTel}}</p>
				</div>
			</div>
		</Card>
		<Modal v-model="modal" class-name="vertical-center-modal" width='1000'>
			<p slot='header'>{{checkedCityName}}</p>
			<div id="city-data">
				<Card class="city-data-sum">
					<p slot='title'>今日数据</p>
					<Card v-for="(v,i) in cityDataList" :key='i'>
						<p slot="title">{{v.name}}</p>
						<p>{{v.value}}</p>
					</Card>
				</Card>
				<Card class="city-map">
					<!--搜索城市地图中的店东-->
					<div class="search-city-shop" slot="title">
						<DatePicker v-model='cityMapShopDate' size="small" type="daterange" format="yyyy/MM/dd" split-panels placeholder="按日期搜索" @on-enter="searchCityShop"></DatePicker>
						<Input v-model="cityMapShopName" size="small" clearable placeholder="按店名搜索" @on-enter="searchCityShop"></Input>
						<Input v-model="cityMapShopMaster" size="small" clearable placeholder="按店主搜索" @on-enter="searchCityShop"></Input>
						<Input v-model="cityMapShopTel" size="small" clearable placeholder="按手机号搜索" @on-enter="searchCityShop"></Input>
						<Button type="primary" size="small" icon="ios-search" @click="searchCityShop">搜索</Button>
						<Button type="primary" size="small" @click="resetSearchCityShop">重置</Button>
					</div>
					<!--城市地图-->
					<div class='reset-map' @click='resetCityMap'>
						<Icon type="arrow-shrink"></Icon>
					</div>
					<city-map :cityName='cityName' :cityPoint='cityPoint' :shopData='shopData' :searchShopData='searchShopData' :cityMapZoom='cityMapZoom'></city-map>
				</Card>
			</div>
			</Tabs>
		</Modal>
		<!--显示搜索结果-->
		<Modal v-model="chinaInfo" class-name="vertical-center-modal">
			<p slot='header'>
				{{chinaDateArr[0]}}至{{chinaDateArr[chinaDateArr.length-1]}}数据统计
			</p>
			<Table border size="small" :columns="columns" :data="chinaInfoData"></Table>
		</Modal>
		<Modal v-model="cityInfo" class-name="vertical-center-modal">
			<p slot='header'>
				{{cityDateArr[0]}}至{{cityDateArr[cityDateArr.length-1]}}数据统计
			</p>
			<Table border size="small" :columns="columns" :data="cityInfoData"></Table>
		</Modal>
	</div>
	<!--在index.html中添加：<script type="text/javascript" src="http://api.map.baidu.com/getscript?v=3.0&ak=wKHGkVNoB3i2H6aUtYE3CXt1mPbTtflm"></script>-->
</template>
<script>
	import cityData from './data/city-data.js';
	import chinaMap from './components/china-map.vue';
	import cityMap from './components/city-map.vue';
	export default {
		name: 'anaylsindex',
		components: {
			chinaMap,
			cityMap
		},
		data() {
			return {
				columns: [{
						title: '店东数量',
						key: 'shopNum'
					}, {
						title: '订单数量',
						key: 'orderNum'
					},
					{
						title: '交易金额',
						key: 'orderMoney'
					},
					{
						title: '粉丝数量',
						key: 'starNum'
					},
					{
						title: '分润',
						key: 'profit'
					}
				],
				cityDataSum: new Array(5),
				cityData: cityData,
				chinaData: cityData,
				searchChinaData: [],
				cityName: '',
				cityPoint: {},
				modal: false,
				checkedCityName: '',
				cityDataList: [],
				/*全国地图中搜索*/
				showSearchList: false,
				showSearchListBody: false,
				chinaMapShopName: '',
				chinaMapShopMaster: '',
				chinaMapShopTel: '',
				chinaMapShopDate: ['', ''],
				chinaDateArr: [],
				chinaInfo: false,
				chinaInfoData: [],
				chinaInfoShopData: [],
				overDataIndex: -1,
				clickDataIndex: -1,
				/*城市地图中搜索*/
				shopData: [],
				searchShopData: [],
				cityMapShopName: '',
				cityMapShopMaster: '',
				cityMapShopTel: '',
				cityMapShopDate: ['', ''],
				cityDateArr: [],
				cityInfo: false,
				cityInfoData: [],
				chinaMapZoom: true,
				cityMapZoom: true
			}
		},
		mounted() {
			this.init();
		},
		watch: {
			checkedCityName(val) {
				this.cityData.map((v) => {
					if(v.name == val) {
						this.cityDataList = v.value;
						this.shopData = v.shop;
						this.cityPoint = v.point;
					}
				})
			},
			cityMapShopDate(val) {
				let startDate, endDate;
				if(this.cityMapShopDate[0] !== '' || this.cityMapShopDate[1] !== '') {
					startDate = val[0].toLocaleDateString();
					endDate = val[1].toLocaleDateString();
					this.cityDateArr = this.getAllDate(startDate, endDate);
				} else {
					this.cityDateArr = [];
				}
			},
			chinaMapShopDate(val) {
				let startDate, endDate;
				if(this.chinaMapShopDate[0] !== '' || this.chinaMapShopDate[1] !== '') {
					startDate = val[0].toLocaleDateString();
					endDate = val[1].toLocaleDateString();
					this.chinaDateArr = this.getAllDate(startDate, endDate);
				} else {
					this.chinaDateArr = [];
				}
			}
		},
		methods: {
			init() {
				this.chinaData = this.cityData;
				this.cityDataSum = [0, 0, 0, 0, 0];
				cityData.map((item, index) => {
					item.value.map((v, i) => {
						this.cityDataSum[i] += v.value;

					})
				});
			},
			search(data, argumentObj) {
				let res = data;
				let dataClone = data;
				for(let argu in argumentObj) {
					if(argumentObj[argu].length > 0) {
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
				this.cityName = this.checkedCityName = v;
				this.modal = true;
			},
			show(index) {
				this.searchShopData = [];
				this.searchShopData.push(this.chinaInfoShopData[index].data);
				this.checkedCity(this.chinaInfoShopData[index].name);
			},
			searchAllShop() {
				this.chinaInfo = false; //隐藏弹窗
				this.chinaInfoData = [];
				this.chinaInfoShopData = [];
				this.searchChinaData = [];
				this.showSearchList = false;
				//搜索全国数据
				if(this.chinaMapShopName == '' && this.chinaMapShopMaster == '' && this.chinaMapShopTel == '') {
					if(this.chinaMapShopDate[0] == '' || this.chinaMapShopDate[1] == '') {
						this.$Message.info('搜索内容不能为空');
						return false; // 搜索条件全部未选时不进行搜索
					} else {
						//只选时间段不选店东时，计算所选时间段内所有店东数据之和（弹窗显示）
						let sum = [0, 0, 0, 0, 0]
						this.cityData.map((city) => {
							this.chinaDateArr.map((v) => {
								city.shop.map((item) => {
									if(v == item.shopData.orderDate) {
										sum[0]++;
										sum[1] += item.shopData.orderNum;
										sum[2] += item.shopData.orderMoney;
										sum[3] += item.shopData.starNum;
										sum[4] += item.shopData.profit;
									}
								})
							});
						})
						this.chinaInfoData.push({
							shopNum: sum[0],
							orderNum: sum[1],
							orderMoney: sum[2],
							starNum: sum[3],
							profit: sum[4]
						})
						this.chinaInfo = true;
					}
				} else {
					this.cityData.map((city) => {
						let data = this.search(city.shop, {
							shopName: this.chinaMapShopName,
							shopMaster: this.chinaMapShopMaster,
							shopTel: this.chinaMapShopTel
						});
						if(data.length > 0) {
							let cityData = {};
							for(let k in city) {
								if(city.hasOwnProperty(k)) {
									cityData[k] = city[k];
								}
							}
							cityData.shop = data;
							cityData.shop.map((v) => {
								let pushed = {
									name: cityData.name,
									shopName: v.shopName,
									shopMaster: v.shopMaster,
									shopTel: v.shopTel,
									shopAddress: v.shopAddress,
									orderNum: v.shopData.orderNum,
									orderMoney: v.shopData.orderMoney,
									starNum: v.shopData.starNum,
									profit: v.shopData.profit,
									orderDate: v.shopData.orderDate,
									data: v
								};
								if(this.chinaMapShopDate[0] == '' && this.chinaMapShopDate[1] == '') {
									//不选时间段只选店东时，显示该店东今日数据
									this.chinaInfoShopData.push(pushed);
								} else {
									//时间店东全都选时，计算该店东该时间段内数据之和
									this.chinaDateArr.map((d) => {
										if(v.shopData.orderDate == d) {
											this.chinaInfoShopData.push(pushed);
										}
									});
								}
							});
							data.map((v) => {
								v.chinaDateArr = this.chinaMapShopDate;
								if(this.chinaMapShopDate[0] == '' && this.chinaMapShopDate[1] == '') {
									//不选时间段只选店东时，显示该店东今日数据
									this.searchChinaData.push(v);
								} else {
									//时间店东全都选时，计算该店东该时间段内数据之和
									this.chinaDateArr.map((d) => {
										if(v.shopData.orderDate == d) {
											this.searchChinaData.push(v);
										}
									});
								}
							})
						}
					});
					if(this.chinaInfoShopData.length > 0) {
						this.showSearchList = true;
						this.showSearchListBody = false;
					} else {
						this.searchChinaData = [];
						this.$Message.info('未搜索到数据');
					}
				}
			},
			resetSearchAllShop() {
				//重置
				this.chinaMapShopName = this.chinaMapShopMaster = this.chinaMapShopTel = '';
				this.chinaMapShopDate = ['', ''];
				this.searchChinaData = [];
				this.showSearchList = false;
				this.chinaInfo = false; //隐藏弹窗
				this.chinaInfoData = [];
				this.chinaInfoShopData = [];
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
			searchCityShop() {
				this.cityInfo = false; //隐藏弹窗
				this.cityInfoData = [];
				this.searchShopData = [];
				//打开城市弹框之后搜索城市数据
				if(this.cityMapShopName == '' && this.cityMapShopMaster == '' && this.cityMapShopTel == '') {
					if(this.cityMapShopDate[0] == '' || this.cityMapShopDate[1] == '') {
						this.$Message.info('搜索内容不能为空');
						return false; // 搜索条件全部未选时不进行搜索
					} else {
						//只选时间段不选店东时，计算所选时间段内所有店东数据之和（弹窗显示）
						let sum = [0, 0, 0, 0, 0]
						this.cityDateArr.map((v) => {
							this.shopData.map((item) => {
								if(v == item.shopData.orderDate) {
									sum[0]++;
									sum[1] += item.shopData.orderNum;
									sum[2] += item.shopData.orderMoney;
									sum[3] += item.shopData.starNum;
									sum[4] += item.shopData.profit;
								}
							})
						})
						this.cityInfoData.push({
							shopNum: sum[0],
							orderNum: sum[1],
							orderMoney: sum[2],
							starNum: sum[3],
							profit: sum[4]
						})
						this.cityInfo = true;
					}
				} else {
					let data = this.search(this.shopData, {
						shopName: this.cityMapShopName,
						shopMaster: this.cityMapShopMaster,
						shopTel: this.cityMapShopTel
					});
					if(data.length > 0) {
						data.map((v) => {
							v.cityDateArr = this.cityMapShopDate;
							if(this.cityMapShopDate[0] == '' && this.cityMapShopDate[1] == '') {
								//不选时间段只选店东时，显示该店东今日数据
								this.searchShopData.push(v);
							} else {
								//时间店东全都选时，计算该店东该时间段内数据之和
								this.cityDateArr.map((d) => {
									if(d == v.shopData.orderDate) {
										this.searchShopData.push(v);
									}
								})
							}
						});
						if(this.searchShopData.length == 0) {
							this.$Message.info('未搜索到数据');
						}
					} else {
						this.$Message.info('未搜索到数据');
					}
				}
			},
			resetSearchCityShop() {
				//重置
				this.cityMapShopName = this.cityMapShopMaster = this.cityMapShopTel = '';
				this.cityMapShopDate = ['', ''];
				this.searchShopData = [];
			},
			resetChinaMap() {
				//重置地图显示级别
				this.chinaMapZoom = !this.chinaMapZoom;
			},
			resetCityMap() {
				//重置地图显示级别
				this.cityMapZoom = !this.cityMapZoom;
			},
			getAllDate(start, end) {
				let ab = start.split("/");
				let ae = end.split("/");
				let db = new Date();
				db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
				let de = new Date();
				de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
				let unixDb = db.getTime();
				let unixDe = de.getTime();
				let dateArr = [];
				for(let k = unixDb; k <= unixDe;) {
					dateArr.push(new Date(parseInt(k)).toLocaleDateString());
					k = k + 24 * 60 * 60 * 1000;
				}
				return dateArr;
			}
		}
	}
</script>

<style lang="less">
	@import '../../styles/common.less';
	@import './data-show.less';
</style>
