<style lang="less" scoped>
	.layout {
		border: 1px solid #d7dde4;
		background: #f5f7f9;
		position: relative;
		border-radius: 4px;
		overflow: hidden;
	}

	.layout-logo {
		width: 100px;
		height: 30px;
		background: #5b6270;
		border-radius: 3px;
		float: left;
		position: relative;
		top: 15px;
		left: 20px;
	}

	.layout-nav {
		width: 420px;
		margin: 0 auto;
		margin-right: 20px;
	}

	.layout-footer-center {
		text-align: center;
	}

	.ivu-card-body p {
		margin-left: 20px;
		line-height: 100px;
		color: #5cadff;
		font-size: 16px;
		font-family: "微软雅黑";
	}
	.serach{
		float: right;
	}
	.title {
		font-size: 20px;
		margin-left: 20px;
	}
	.data{
		margin-left:100px;
	}
   @import './home.less';
</style>
<template>
	<div class="layout">
		<Layout>
			<Content :style="{padding: '0 3%'}" >
				<Breadcrumb :style="{margin: '20px 0'}">
					<Select v-model="model1" style="width:100px" :disabled="roleid==2?true:false" class="city">
						<Option v-for="item in cityList" :value="item.value">{{item.label}}</Option>
					</Select>
			<DatePicker  type="datetimerange"  v-model="value1" :options="options2"  @on-change="handleChange"    class="data" placement="bottom-end" placeholder="选择查询日期" style="width:280px"></DatePicker>

                  <Button class="serach"   type="primary" icon="ios-search" @click="handleSearch" >搜索</Button>
                  <Button  class="goback" type="primary" icon="ios-search" @click="goback" v-if="!status">回看</Button>

				</Breadcrumb>
				<Table :columns="columns1" :data="data1" v-if="!status" :loading="loading"></Table>
				<Card  v-if="status">
					<div>
						<Row :gutter="20">
							<Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
							<infor-card id-name="user_created_count" :end-val="boss.createUser" iconType="android-person-add" color="#2d8cf0" intro-text="今日买家订单数量"></infor-card>
							</Col>
							<Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
							<infor-card id-name="user_created_user_amount" :end-val="amount.createUser" decimals="2" iconType="ios-eye" color="#64d572" intro-text="今日交易金额"></infor-card>
							</Col>
							<Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
							<infor-card id-name="user_created_boss_guest" :end-val="count.createUser" iconType="upload" color="#ffd572" intro-text="今日新增买家"></infor-card>
							</Col>
							<Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
							<infor-card id-name="user_created_user_profit" :end-val="nums.createUser" decimals="2" iconType="shuffle" color="#f25e43" intro-text="今日店东分润"></infor-card>
							</Col>
							<!-- <Col :xs="24" :sm="5" :md="5" :style="{marginBottom: '10px'}">
							<infor-card id-name="user_created_boss_shop" :end-val="user.createUser" iconType="android-person-add" color="#2d8cf0" intro-text="今日新增店东"></infor-card>
							</Col> -->
							<!-- <Col :xs="24" :sm="5" :md="5" :style="{marginBottom: '10px'}">
							<infor-card id-name="visit_count" :end-val="boss.visit" iconType="ios-eye" color="#64d572" :iconSize="50" intro-text="本周买家订单数量"></infor-card>
							</Col> -->
							<!-- <Col :xs="24" :sm="5" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="collection_count" :end-val="boss.collection" iconType="upload" color="#ffd572" intro-text="本月买家订单数量"></infor-card>
							</Col>
							<Col :xs="24" :sm="5" :md="5" :style="{marginBottom: '10px'}">
							<infor-card id-name="transfer_count" :end-val="boss.transfer" iconType="shuffle" color="#f25e43" intro-text="买家订单总数量"></infor-card>
							</Col>
							<Col :xs="24" :sm="5" :md="5" :style="{marginBottom: '10px'}">
							<infor-card id-name="transfer_count" :end-val="boss.transfer" iconType="shuffle" color="#f25e43" intro-text="买家订单总数量"></infor-card>
							</Col> -->
						</Row>
					</div>
				</Card>
			</Content>
			 <Content :style="{padding: '0 3%'}" v-if="status">
				 <Breadcrumb :style="{margin: '20px 0'}" >
				<!--	<Select v-model="model2" size="small" style="width:100px" @on-change="changeuser(2)" :disabled="roleid==2?true:false">
						<Option v-for="item in cityList" :value="item.value">{{item.label}}</Option>
					</Select>-->
					 	<Breadcrumb :style="{margin: '20px 0'}">
					<span class="title" style="color:red">今日销量Top5</span>
				</Breadcrumb>
				</Breadcrumb>
				<Card >
					<div>
						<Row :gutter="20">
							<!-- <Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
							<infor-card id-name="user_created_user_amount" :end-val="amount.createUser" decimals="2" iconType="android-person-add" color="#2d8cf0" intro-text="今日交易金额"></infor-card>
							</Col>
							<Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
							<infor-card id-name="visit_user_amount" :end-val="amount.visit" decimals="2" iconType="ios-eye" color="#64d572" :iconSize="50" intro-text="本周交易金额"></infor-card>
							</Col>
							<Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
							<infor-card id-name="collection_user_amount" :end-val="amount.collection" decimals="2" iconType="upload" color="#ffd572" intro-text="本月交易金额"></infor-card>
							</Col>
							<Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
							<infor-card id-name="transfer_user_amount" :end-val="amount.transfer"  decimals="2" iconType="shuffle" color="#f25e43" intro-text="交易总金额"></infor-card>
							</Col> -->
						<Col :xs="24" :sm="5" :md="5" :style="{marginBottom: '10px'}">
							<infor-card id-name="createUser_user[0]" :end-val="bosslist.todayTop[0].num" iconType="bag" color="#2d8cf0" :intro-text="bosslist.todayTop[0].title"></infor-card>
							</Col>
							<Col :xs="24" :sm="5" :md="5" :style="{marginBottom: '10px'}">
							<infor-card id-name="createUser_user[1]" :end-val="bosslist.todayTop[1].num" iconType="ios-eye" color="#64d572" :intro-text="bosslist.todayTop[1].title"></infor-card>
							</Col>
							<Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="createUser_user[2]" :end-val="bosslist.todayTop[2].num" iconType="upload" color="#ffd572" :intro-text="bosslist.todayTop[2].title"></infor-card>
							</Col>
							<Col :xs="24" :sm="5" :md="5" :style="{marginBottom: '10px'}">
							<infor-card id-name="createUser_user[3]" :end-val="bosslist.todayTop[3].num" iconType="shuffle" color="#f25e43" :intro-text="bosslist.todayTop[3].title"></infor-card>
							</Col>
							<Col :xs="24" :sm="5" :md="5" :style="{marginBottom: '10px'}">
							<infor-card id-name="createUser_user[4]" :end-val="bosslist.todayTop[4].num" iconType="ios-eye" color="#EE8262" :intro-text="bosslist.todayTop[4].title"></infor-card>
							</Col>
						</Row>
					</div>
				</Card>
			</Content>
			<!-- <Content :style="{padding: '0 3%'}" v-if="status">
				<Breadcrumb :style="{margin: '20px 0'}">

			</Breadcrumb>
				<Card >
					<div>
						<Row :gutter="20">
							<Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
							<infor-card id-name="user_created_boss_guest" :end-val="count.createUser" iconType="android-person-add" color="#2d8cf0" intro-text="今日新增买家"></infor-card>
							</Col>
							<Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
							<infor-card id-name="visit_boss__guest" :end-val="count.visit" iconType="ios-eye" color="#64d572" :iconSize="50" intro-text="本周新增买家"></infor-card>
							</Col>
							<Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
							<infor-card id-name="collection_boss__guest" :end-val="count.collection" iconType="upload" color="#ffd572" intro-text="本月新增买家"></infor-card>
							</Col>
							<Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
							<infor-card id-name="transfer_boss__guest" :end-val="count.transfer" iconType="shuffle" color="#f25e43" intro-text="买家总量"></infor-card>
							</Col>
						</Row>
					</div>
				</Card>
			</Content> -->
			<!-- <Content :style="{padding: '0 3%'}" v-if="status">
				<Breadcrumb :style="{margin: '20px 0'}" >
				</Breadcrumb>
				<Card v-if="status">
					<div>
						<Row :gutter="20">
							<Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
							<infor-card id-name="user_created_user_profit" :end-val="nums.createUser" decimals="2" iconType="android-person-add" color="#2d8cf0" intro-text="今日店东分润"></infor-card>
							</Col>
							<Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
							<infor-card id-name="visit_user_profit" :end-val="nums.visit" iconType="ios-eye" decimals="2" color="#64d572" :iconSize="50" intro-text="本周店东分润"></infor-card>
							</Col>
							<Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
							<infor-card id-name="collection_user_profit" :end-val="nums.collection" decimals="2" iconType="upload" color="#ffd572" intro-text="本月店东分润"></infor-card>
							</Col>
							<Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
							<infor-card id-name="transfer_user_profit" :end-val="nums.transfer" decimals="2" iconType="shuffle" color="#f25e43" intro-text="店东总分润"></infor-card>
							</Col>
						</Row>
					</div>
				</Card>
			</Content> -->

			<!-- <Content :style="{padding: '0 3%'}" v-if="status">
				<Breadcrumb :style="{margin: '20px 0'}">
				</Breadcrumb>
				<Card >
					<div>
						<Row :gutter="20">
							<Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
							<infor-card id-name="user_created_boss_shop" :end-val="user.createUser" iconType="android-person-add" color="#2d8cf0" intro-text="今日新增店东"></infor-card>
							</Col>
							<Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
							<infor-card id-name="visit_boss_shoop" :end-val="user.visit" iconType="ios-eye" color="#64d572" :iconSize="50" intro-text="本周新增店东"></infor-card>
							</Col>
							<Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
							<infor-card id-name="collection_boss_shop" :end-val="user.collection" iconType="upload" color="#ffd572" intro-text="本月新增店东"></infor-card>
							</Col>
							<Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
							<infor-card id-name="transfer_boss_shop" :end-val="user.transfer" iconType="shuffle" color="#f25e43" intro-text="店东总数"></infor-card>
							</Col>
						</Row>
					</div>
				</Card>
			</Content> -->
			<!-- <Content :style="{padding: '0 3%'}" v-if="status">
				<Breadcrumb :style="{margin: '20px 0'}">
					<span class="title" style="color:red">销量Top5</span>
				</Breadcrumb>
				<Card>
					<div>
						<Row :gutter="20">
							<Col :xs="24" :sm="3" :md="3" :style="{marginBottom: '10px'}">
							<p>今日商品</p>
							</Col>
							<Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="createUser_user[0]" :end-val="bosslist.todayTop[0].num" iconType="bag" color="#2d8cf0" :intro-text="bosslist.todayTop[0].title"></infor-card>
							</Col>
							<Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="createUser_user[1]" :end-val="bosslist.todayTop[1].num" iconType="bag" color="#64d572" :intro-text="bosslist.todayTop[1].title"></infor-card>
							</Col>
							<Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="createUser_user[2]" :end-val="bosslist.todayTop[2].num" iconType="bag" color="#ffd572" :intro-text="bosslist.todayTop[2].title"></infor-card>
							</Col>
							<Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="createUser_user[3]" :end-val="bosslist.todayTop[3].num" iconType="bag" color="#f25e43" :intro-text="bosslist.todayTop[3].title"></infor-card>
							</Col>
							<Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="createUser_user[4]" :end-val="bosslist.todayTop[4].num" iconType="bag" color="#EE8262" :intro-text="bosslist.todayTop[4].title"></infor-card>
							</Col>

						</Row>
						 <Row :gutter="20">
							<Col :xs="24" :sm="3" :md="3" :style="{marginBottom: '10px'}">
							<p>本周商品</p>
							</Col>
							<Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="inforCard_user[0]" :end-val="bosslist.weekTop[0].num" iconType="bag" color="#2d8cf0" :intro-text="bosslist.weekTop[0].title"></infor-card>
							</Col>
							<Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="inforCard_user[1]" :end-val="bosslist.weekTop[1].num" iconType="bag" color="#64d572" :intro-text="bosslist.weekTop[1].title"></infor-card>
							</Col>
							<Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="inforCard_user[2]" :end-val="bosslist.weekTop[2].num" iconType="bag" color="#ffd572" :intro-text="bosslist.weekTop[2].title"></infor-card>
							</Col>
							<Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="inforCard_user[3]" :end-val="bosslist.weekTop[3].num" iconType="bag" color="#f25e43" :intro-text="bosslist.weekTop[3].title"></infor-card>
							</Col>
							<Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="inforCard_user[4]" :end-val="bosslist.weekTop[4].num" iconType="bag" color="#EE8262" :intro-text="bosslist.weekTop[4].title"></infor-card>
							</Col>

						</Row>
						<Row :gutter="20">
							<Col :xs="24" :sm="3" :md="3" :style="{marginBottom: '10px'}">
							<p>本月商品</p>
							</Col>
							<Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="transfer_user[0]" :end-val="bosslist.monthTop[0].num" iconType="bag" color="#2d8cf0" :intro-text="bosslist.monthTop[0].title"></infor-card>
							</Col>
							<Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="transfer_user[1]" :end-val="bosslist.monthTop[1].num" iconType="bag" color="#64d572" :intro-text="bosslist.monthTop[1].title"></infor-card>
							</Col>
							<Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="transfer_user[2]" :end-val="bosslist.monthTop[2].num" iconType="bag" color="#ffd572" :intro-text="bosslist.monthTop[2].title"></infor-card>
							</Col>
							<Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="transfer_user[3]" :end-val="bosslist.monthTop[3].num" iconType="bag" color="#f25e43" :intro-text="bosslist.monthTop[3].title"></infor-card>
							</Col>
							<Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="transfer_user[4]" :end-val="bosslist.monthTop[4].num" iconType="bag" color="#EE8262" :intro-text="bosslist.monthTop[4].title"></infor-card>
							</Col>

						</Row>
						<Row :gutter="20">
							<Col :xs="24" :sm="3" :md="3" :style="{marginBottom: '10px'}">
							<p>销售商品总数</p>
							</Col>
							<Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="collection_user[0]" :end-val="bosslist.all[0].num" iconType="bag" color="#2d8cf0" :intro-text="bosslist.all[0].title"></infor-card>
							</Col>
							<Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="collection_user[1]" :end-val="bosslist.all[1].num" iconType="bag" color="#64d572" :intro-text="bosslist.all[1].title"></infor-card>
							</Col>
							<Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="collection_user[2]" :end-val="bosslist.all[2].num" iconType="bag" color="#ffd572" :intro-text="bosslist.all[2].title"></infor-card>
							</Col>
							<Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="collection_user[3]" :end-val="bosslist.all[3].num" iconType="bag" color="#f25e43" :intro-text="bosslist.all[3].title"></infor-card>
							</Col>
							<Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
							<infor-card id-name="collection_user[4]" :end-val="bosslist.all[4].num" iconType="bag" color="#EE8262" :intro-text="bosslist.all[4].title"></infor-card>
							</Col>

						</Row>
					</div>
				</Card>
			</Content> -->
			<Footer class="layout-footer-center"></Footer>
		</Layout>
	</div>
</template>
<script>
	import Requests from './components/Requests.vue';
	import cityData from './map-data/get-city-value.js';
	import homeMap from './components/map.vue';
	import dataSourcePie from './components/dataSourcePie.vue';
	import visiteVolume from './components/visiteVolume.vue';
	import serviceRequests from './components/serviceRequests.vue';
	import userFlow from './components/userFlow.vue';
	import countUp from './components/countUp.vue';
	import inforCard from './components/inforCard.vue';
	import mapDataTable from './components/mapDataTable.vue';
	import toDoListItem from './components/toDoListItem.vue';

	export default {
		name: 'home',
		components: {
			Requests,
			homeMap,
			dataSourcePie,
			visiteVolume,
			serviceRequests,
			userFlow,
			countUp,
			inforCard,
			mapDataTable,
			toDoListItem
		},
		data() {
			return {
				 open:true,
				value1:[],
				status:true,
				roleid: '',
				count: {
					createUser: 496,
					visit: 3434,
					collection: 3535,
					transfer: 3535,
				},
				amount:{
					createUser: 1000,
					visit: 10000,
					collection: 10000,
					transfer: 10000,
				},
				user: {
					createUser: 1000,
					visit: 10000,
					collection: 10000,
					transfer: 10000,
					inforCard: 10000,
				},
				boss: {
					createUser: 496,
					visit: 3434,
					collection: 3535,
					transfer: 3535,
				},
				nums: {
					createUser: 496,
					visit: 3434,
					collection: 3535,
					transfer: 3535,
				},
				last: {
					createUser: 496,
					visit: 3434,
					collection: 3535,
					transfer: 3535,
				},
				bosslist: [
					/*   todayTop:[],
					    weekTop:[],
					    monthTop:[],
					    all:[]*/
				],
				loading:true,
				cityList: [],
				model1: '',
				model2: '',
				model3: '',
				model4: '',
				model5: '',
				 columns1: [
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '数量',
                        key: 'nums'
                    },
                    {
                        title: '商品销量TOP5',
                        key: 'shop'
                    },
                      {
                        title: '商品銷量',
                        key: 'title'
                    }
                ],
                data1: [
                   /* {
                        type: '买家订单',
                        nums: '1111',
                        shop: '苹果',
                        title: '1111',
                    },
                      {
                        type: '交易金额',
                        nums: '1111',
                        shop: '苹果',
                         title: '1111',

                    },
                      {
                        type: '新增買家',
                        nums: '1111',
                        shop: '苹果',
                        title: '1111',
                    },
                      {
                        type: '新增店東',
                        nums: '1111',
                        shop: '苹果',
                        title: '1111',

                    },
                     {
                        type: '店东分润',
                        nums: '1111',
                        shop: '苹果',
                        title: '1111',

                    },
                     */

                ],
                options2: {

                    shortcuts: [
                        {
                            text: '最近一周',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近三个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
                }
			}
		},
		methods: {
			  handleChange(date) {
				this.value1 = date;

				// if(this.value1[1].split(' ')[0]===this.getNowFormatDate()){
				//   this.value1[1]=this.getNowtime();
				// }
			},
		 getNowtime() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
         },
			  getNowFormatDate() {
               var date = new Date();
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                 var strDate = date.getDate();
              if (month >= 1 && month <= 9) {
                  month = "0" + month;
             }
              if (strDate >= 0 && strDate <= 9) {
                  strDate = "0" + strDate;
                }
                var currentdate = year + seperator1 + month + seperator1 + strDate;
                  return currentdate;
               },
			goback(){
				this.status=true;
				this.value1='';
			},
			handleSearch(){
				     this.loading=true;
						//搜索
						console.log(this.model1,this.value1)
					if(this.model1||this.value1){
                	this.$http.post('citycmp/searchcitydate',{city:this.model1,times:this.value1}).then((res)=>{
                		//console.log(res);
                	  this.loading=false;
                		if(res.data.rs=='true'){
                			   	this.status=false;
                		  	    this.data1= res.data.shu;
                		  	     // this.loading=true;

                		}else{
                			this.$Notice.error({
						title: res.data.msg,
						desc: res.data.msg,
						duration: 1
					});
					return;
                		}
                	}).catch((err)=>{
                		console.log(err);
                	});
				}else{

				}
            },
			serach(){
				this.status=false;
			},
			changeuser(type) {
				var area = '';

				switch(type) {
					case 1:
						area = this.model1;
						break;
					case 2:
						area = this.model2;
						break;
					case 3:
						area = this.model3;
						break;
					case 4:
						area = this.model4;
						break;
					case 5:
						area = this.model5;
						break;
				}

				this.$http.post('citycmp/selectcity', {
					type: type,
					area: area
				}).then((res) => {
					console.log(res);
					switch(type) {
						case 1:
							this.count.createUser = parseInt(res.data.rs.todayGuest);
							this.count.visit = parseInt(res.data.rs.weekGuest);
							this.count.collection = parseInt(res.data.rs.monthGuest);
							this.count.transfer = parseInt(res.data.rs.allGuest);

							break;
						case 2:
							this.user.createUser = parseInt(res.data.rs.todayShoper);
							this.user.visit = parseInt(res.data.rs.weekShoper);
							this.user.collection = parseInt(res.data.rs.monthShoper);
							this.user.transfer = parseInt(res.data.rs.allShoper);

							break;
						case 3:
							this.boss.createUser = parseInt(res.data.rs.todayOrder);
							this.boss.visit = parseInt(res.data.rs.weekOrder);
							this.boss.collection = parseInt(res.data.rs.monthOrder);
							this.boss.transfer = parseInt(res.data.rs.allOrder);
							break;
						case 4:
							this.nums.createUser = parseFloat(res.data.rs.todayProfitrate);
							this.nums.visit = parseFloat(res.data.rs.weekProfitrate);
							this.nums.collection = parseFloat(res.data.rs.monthProfitrate);
							this.nums.transfer = parseFloat(res.data.rs.allProfitrate);
							break;
						case 5:
							this.bosslist = res.data.rs;
							console.log(this.bosslist);
							break;
					}
				}).catch();

			}

		},
		mounted() {

			this.$http.get('citycmp/newhome').then((res) => {
				//订单
				this.boss.createUser = res.data.order.todayOrder?parseInt(res.data.order.todayOrder):0;
				//this.boss.visit = res.data.order.weekOrder?parseInt(res.data.order.weekOrder):0;
			//	this.boss.collection = res.data.order.monthOrder?parseInt(res.data.order.monthOrder):0;
			//	this.boss.transfer = res.data.order.allOrder?parseInt(res.data.order.allOrder):0;

				//金额
				this.amount.createUser = res.data.amount.todayAmount?parseFloat(res.data.amount.todayAmount):0;
				//this.amount.visit = res.data.amount.weekAmount?parseInt(res.data.amount.weekAmount):0;
			//	this.amount.collection = res.data.amount.monthAmount?parseInt(res.data.amount.monthAmount):0;
			//	this.amount.transfer = res.data.amount.allAmount?parseInt(res.data.amount.allAmount):0;

					//买家
				this.count.createUser = res.data.guest.todayGuest?parseInt(res.data.guest.todayGuest):0;
			//	this.count.visit = res.data.guest.weekGuest?parseInt(res.data.guest.weekGuest):0;
			//	this.count.collection = res.data.guest.monthGuest?parseInt(res.data.guest.monthGuest):0;
			//	this.count.transfer = res.data.guest.allGuest?parseInt(res.data.guest.allGuest):0;
					//分润
				this.nums.createUser = res.data.profit.todayProfitrate?parseFloat(res.data.profit.todayProfitrate):0;
			//	this.nums.visit = res.data.profit.weekProfitrate?parseFloat(res.data.profit.weekProfitrate):0;
			//	this.nums.collection = res.data.profit.monthProfitrate?parseFloat(res.data.profit.monthProfitrate):0;
			//	this.nums.transfer = res.data.profit.allProfitrate?parseFloat(res.data.profit.allProfitrate):0;
					//店东
				console.log(this.count);
				//this.user.createUser = res.data.shoper.todayShoper?parseInt(res.data.shoper.todayShoper):0;
			//	this.user.visit = res.data.shoper.weekShoper?parseInt(res.data.shoper.weekShoper):0;
			//	this.user.collection = res.data.shoper.monthShoper?parseInt(res.data.shoper.monthShoper):0;
				//this.user.transfer = res.data.shoper.allShoper?parseInt(res.data.shoper.allShoper):0;
                this.bosslist = res.data.goods;

				this.bosslist.todayTop[0].num = parseInt(this.bosslist.todayTop[0].num);
				this.bosslist.todayTop[1].num = parseInt(this.bosslist.todayTop[1].num);
				this.bosslist.todayTop[2].num = parseInt(this.bosslist.todayTop[2].num);
				this.bosslist.todayTop[3].num = parseInt(this.bosslist.todayTop[3].num);
				this.bosslist.todayTop[4].num = parseInt(this.bosslist.todayTop[4].num);
				//this.bosslist.weekTop[0].num = parseInt(this.bosslist.weekTop[0].num);
				//this.bosslist.weekTop[1].num = parseInt(this.bosslist.weekTop[1].num);
				//this.bosslist.weekTop[2].num = parseInt(this.bosslist.weekTop[2].num);
				//this.bosslist.weekTop[3].num = parseInt(this.bosslist.weekTop[3].num);
				//this.bosslist.weekTop[4].num = parseInt(this.bosslist.weekTop[4].num);
				//this.bosslist.monthTop[0].num= parseInt(this.bosslist.monthTop[0].num);
				//this.bosslist.monthTop[1].num= parseInt(this.bosslist.monthTop[1].num);
			//	this.bosslist.monthTop[2].num= parseInt(this.bosslist.monthTop[2].num);
				//this.bosslist.monthTop[3].num= parseInt(this.bosslist.monthTop[3].num);
				//this.bosslist.monthTop[4].num= parseInt(this.bosslist.monthTop[4].num);
				//this.bosslist.all[0].num= parseInt(this.bosslist.all[0].num);
			//	this.bosslist.all[1].num= parseInt(this.bosslist.all[1].num);
			//	this.bosslist.all[2].num= parseInt(this.bosslist.all[2].num);
			//	this.bosslist.all[3].num= parseInt(this.bosslist.all[3].num);
			//	this.bosslist.all[4].num= parseInt(this.bosslist.all[4].num);

				this.roleid = res.data.roleId;
				console.log(this.bosslist);
				this.cityList = res.data.citys;
				if(this.roleid==2){
					this.model1=res.data.area;
				}
				//this.count = res.data;
			}).catch((err) => {
				console.log(err)
			});
		},
		beforeUpdate() {
			var result = window.matchMedia('(max-width: 500px)');
			var selectdata=document.querySelector('.ivu-date-picker .ivu-select-dropdown')
			var ivucard = document.querySelectorAll(".ivu-card");

			for(var i = 0; i < ivucard.length; i++) {
				ivucard[i].style.fontSize = "17px"
			}
        	  if(result.matches){
				//  data.style.width="170px"
              selectdata.style.width="280px"
            selectdata.style.overflow='auto'
            }
		}
	}
</script>
