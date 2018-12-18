<style lang="less">
	@import '../../../styles/common.less';
	@import '../../../styles/table.less';
</style>

<template>
	<div style="width:1360px;">
		<Row :gutter="10">
			<Col span="24">
			<Card>
				<Row :gutter="4">
					<Col >
					<Input v-model="searchConName1" placeholder="请输入订单编号搜搜..." style="width: 200px" />

					<Input v-model="searchConName2" placeholder="请输入社区名称搜搜..." style="width: 200px" />
					<Select v-model="searchConName4" style="width:200px" placeholder="请选所属分公司">
						<Option v-for="(item,ind) in newcitylist" :value="item.company_name" :label="item.company_name">{{ item.company_name }}</Option>
					</Select>
					<Select v-model="searchConName3" placeholder="请选择审核状态搜搜..." style="width: 200px">
						<Option v-for="item in orderstatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
					<span @click="handleSearch1" style="margin: 0 10px;">
						<Button type="primary" icon="search">搜索</Button>
					</span>
					</Col>
				</Row>
			</Card>

			<Card>
				<Row class="margin-top-10 searchable-table-con1">
					<Table :columns="order.keys" :data="order.datas" :loading="order.loading" @on-selection-change="handleSelectChange">

					</Table>
					<div style="margin: 10px;overflow: hidden">
						<Row>
							<Col offset="6" span="2"> 总金额</Col>
							<Col span="1"> {{allamount}}</Col>
							<Col offset="1" span="2">提成金额 </Col>
							<Col span="1"> {{allprofitamount}}</Col>
							<Col offset="1" span="1">
							<Button type="info" size="small" @click="handleCheck">一键审核</Button> </Col>
						</Row>
					</div>
					<div style="margin: 10px;overflow: hidden" v-if="order.totalPage > 1">
						<div style="float: left;">
							<Page :total="order.totalPage" :current="order.currPage" :page-size="order.pageSize" show-total @on-change="changePage"></Page>
						</div>
					</div>
				</Row>
			</Card>
			</Col>
		</Row>
		<!--子订单-->
		<Modal v-model="suborder.show" :closable="suborder.closable" width="820">

			<Card>
				<div slot="header"></div>
				<Table :columns="suborder.keys" :data="suborder.datas" :loading="suborder.loading">
				</Table>
			</Card>

			<div slot="footer"></div>

		</Modal>
		<!--看图   -->
		<Modal v-model="suborder.picshow" :closable="suborder.closable">

			<Row>
				<Col span="24">
				<Card>
					<div slot="header"></div>
					<img :src="suborder.picshowurl">

				</Card>

				</Col>

			</Row>
			<div slot="footer"></div>
		</Modal>
	</div>
</template>
<script>

	import Accounting from "../tool/accounting.js";
	export default {
		name: 'ordercheck',
		data() {
			return {
				newcitylist: [],
				orderids: [],
				allamount: 0,
				allprofitamount: 0,
				orderstatus: [{
					value: '3',
					label: '全部'
				}, {
					value: '0',
					label: '未审核'
				}, {
					value: '1',
					label: '已审核'
				}, {
					value: '2',
					label: '订单已申请退货'
				}],
				suborder: {
					picshow: false,
					picshowurl: '',
					loading: true,
					show: false,
					closable: false,
					keys: [

						{
							key: 'pic',
							title: '商品首图',
							render: (h, params) => {
								return h('a', {
									on: {
										click: () => {

											this.suborder.picshowurl = params.row.pic;
											this.suborder.picshow = true;
										}
									}
								}, [h('img', {
									attrs: {
										style: "height:60px;width:60px",
										src: params.row.pic
									}
								})]);
							}
						},
						{
							key: 'order_detail_id',
							sortable: true,
                            tooltip:true,
							title: '子订单标号'
						},
						{
							key: 'title',
							sortable: true,
                            tooltip:true,
							title: '商品标题'
						},
						{
							key: 'price',
							sortable: true,
							title: '单价'
						},
						{
							key: 'quantity',
							sortable: true,
							title: '商品数量'
						},
						{
							key: 'payment',
							sortable: true,
							title: '支付金额'
						},
						{
							key: 'profit_rate_amount',
							sortable: true,
							title: '店东分润'
						}
					],
					datas: []

				},
				order: {

					loading: true,
					keys: [{
							type: 'selection',
							width: 60,
							align: 'center'
						},
						{
							key: 'looksuborder',
							title: '商品',
							width: 80,
							render: (h, params) => {
								return h('a', {
									on: {
										click: () => {

											this.$http.get('settlement/lookprofitdetail&id=' + params.row.id).then((res) => {
												//console.log(res);
												this.suborder.datas = res.data;
												this.suborder.show = true;
												this.suborder.loading = false;
											}).catch((err) => {
												console.log(err);
											});

											//alert('子订单详情');

										}
									}
								}, '查看');
							}
						},
						{
							key: 'city',
							sortable: true,
							title: '市公司',
							width: 110,
							ellipsis: true

						},
						{
							key: 'id',
							sortable: true,
							width: 100,
							title: '编号'
						},
						{
							key: 'order_id',
							sortable: true,
							width: 168,
							title: '订单编号',

						},

						{
							key: 'shop_name',
							sortable: true,
							title: '社区名称',
							width: 240,
							ellipsis: true

						},

						{
							key: 'payment',
							sortable: true,
								width: 110,
							title: '付款金额',

						},
						{
							key: 'profit_rate_amount',
							sortable: true,
								width: 110,
							title: '提成金额',

						},
						{
							key: 'status',
							title: '审核状态',
								width: 110,
								sortable: true
						},
						{
							key: 'checker',
							sortable: true,
								width: 100,
							title: '审核人'
						},
						{
							key: 'pickup_at',
							sortable: true,
							title: '提货时间',
							width: 150
						},

					],
					datas: [],
					totalPage: 0,
					pageSize: 1,
					currPage: 1
				},
				searchConName1: '',
				searchConName2: '',
				searchConName3: '',
				searchConName4:'',
				checkItem: []
			};
		},

		methods: {
			//审核：
			handleCheck() {
				if(!this.orderids.length) {
					this.$Message.error({
						content: '请选择待审核订单',
					});
					return;
				}
				if(!this.checkItem.length) {
					this.$Message.error({
						content: '请选择待审核订单',
					});
					return;
				}
				this.$http.post('settlement/dealcheck', this.orderids).then((res) => {
					console.log(res);
					if(res.data.rs == 'true') {
						this.$Message.success({
							content: "审批成功"
						});
						this.checkItem.forEach((item, k) => {
							this.order.datas.forEach((d, j) => {
								if(d.id == item.id) {
									this.$set(this.order.datas[j], 'status', '已审核');
									this.$set(this.order.datas[j], '_disabled', true);
									this.allamount = 0;
									this.allprofitamount = 0;

								}

							})

						});
					} else {
						this.$Message.error({
							content: res.data.msg
						});
					}
				}).catch((err) => {
					console.log(err);
				});

			},
			ok() {

			},
			handleSelectChange(selection) {
				this.allamount = 0;
				this.allprofitamount = 0;
				this.orderids = [];
				this.checkItem = [];
				if(selection.length) {
					selection.forEach((item) => {
						this.checkItem.push(item);
						this.orderids.push(item.id);
						this.allamount += parseFloat(item.payment);
						this.allprofitamount += parseFloat(item.profit_rate_amount);
					})
					this.allamount = Accounting.formatMoney(this.allamount, '¥', 2);
					this.allprofitamount = Accounting.formatMoney(this.allprofitamount, '¥', 2);
				}

			},

			changePage(page) {
				this.order.currPage = page;
				this.rs = {
					order_id: this.searchConName1,
					shop_name: this.searchConName2,
					status: this.searchConName3,
					curpage: this.order.currPage,
					city: this.searchConName4
				};
				this.$http.post('settlement/ordercheck', this.rs).then(
					(res) => {
						this.order.loading = false;
						//console.log(res.data);
						this.order.totalPage = parseInt(res.data.totalPage)
						this.order.pageSize = parseInt(res.data.pageSize)
						this.order.currPage = parseInt(res.data.currpage)
						// if(res.data.search) {
						// 	if(res.data.search.hasOwnProperty("order_id")) {
						// 		this.searchConName1 = res.data.search.order_id;
						// 	}
						// 	if(res.data.search.hasOwnProperty("shop_name")) {
						// 		this.searchConName2 = res.data.search.shop_name;
						// 	}
						// 	if(res.data.search.hasOwnProperty("status")) {
						// 		this.searchConName3 = res.data.search.status;
						// 	}
						// 	if(res.data.search.hasOwnProperty("city")) {
						// 		this.searchConName4 = res.data.search.city;
						// 	}
						// }
						//this.newcitylist = res.data.citys;
						this.order.datas = res.data.rs;

					}).catch((err) => {
					console.log(err);
				});

			},
			init() {
				this.$http.get('settlement/ordercheck').then(
					(res) => {

						this.order.loading = false;
						//console.log(res.data);
						this.order.totalPage = parseInt(res.data.totalPage)
						//console.log(this.totalPage);
						this.order.pageSize = parseInt(res.data.pageSize)
						this.order.currPage = parseInt(res.data.currpage)
						// if(res.data.search) {
						// 	if(res.data.search.hasOwnProperty("order_id")) {
						// 		this.searchConName1 = res.data.search.title;
						// 	}
						// 	if(res.data.search.hasOwnProperty("shop_name")) {
						// 		this.searchConName2 = res.data.search.barcode;
						// 	}
						// 	if(res.data.search.hasOwnProperty("status")) {
						// 		this.searchConName3 = res.data.search.bn;
						// 	}
						// 	if(res.data.search.hasOwnProperty("city")) {
						// 		this.searchConName4 = res.data.search.city;
						// 	}
						// }
						this.newcitylist = res.data.citys;
						this.order.datas = res.data.rs;

					}).catch((err) => {
					console.log(err);
				});
			},
			handleSearch1() {

				this.rs = {
					order_id: this.searchConName1,
					shop_name: this.searchConName2,
					status: this.searchConName3,
					city: this.searchConName4
				};
				this.$http.post('settlement/ordercheck', this.rs).then(
					(res) => {
						this.order.loading = false;
						//console.log(res.data);
						this.order.totalPage = res.data.totalPage
						this.order.pageSize = res.data.pageSize
						this.order.currPage = res.data.currpage
						// if(res.data.search) {
						// 	if(res.data.search.hasOwnProperty("order_id")) {
						// 		this.searchConName1 = res.data.search.order_id;
						// 	}
						// 	if(res.data.search.hasOwnProperty("shop_name")) {
						// 		this.searchConName2 = res.data.search.shop_name;
						// 	}
						// 	if(res.data.search.hasOwnProperty("status")) {
						// 		this.searchConName3 = res.data.search.status;
						// 	}
						// 	if(res.data.search.hasOwnProperty("city")) {
						// 		this.searchConName4 = res.data.search.city;
						// 	}
						// }
						this.order.datas = res.data.rs;
					}).catch((err) => {
					console.log(err);
				});
			}
		},
		mounted() {
			this.init();
		}
	};
</script>
