<style lang="less">
	@import '../../../styles/common.less';
	@import '../../../styles/table.less';
</style>

<template>
	<div style="width:1650px">
		<Row :gutter="10">
			<Col>
					<Card>
						<Row :gutter="4">
							<Col>
									<Input v-model="searchConName1" placeholder="请输入订单编号搜搜..." style="width: 200px" />
									<Input v-model="searchConName8" placeholder="请输入商品名称搜搜..." style="width: 200px" />
									<Input v-model="searchConName2" placeholder="请输入消费者账号搜搜..." style="width: 100px" />
									<Input v-model="searchConName3" placeholder="请输入社区名称搜搜..." style="width: 200px" />
									<Select v-model="searchConName4" placeholder="请选择审核状态搜搜..." style="width: 120px">
										<Option v-for="item in orderstatus" :value="item.value" :key="item.value">{{ item.title }}</Option>
									</Select>

									<DatePicker type="datetimerange" v-model="searchConName5" placeholder="请选择时间范围" style="width: 300px"></DatePicker>
									<span @click="handleSearch1" style="margin: 0 10px;">
										<Button type="primary" >搜索</Button>
									</span>
									<span @click="handleExport" style="margin: 0 10px;">
										<Button type="primary"  >导出</Button>
									</span>
							</Col>
						</Row>
					</Card>

					<Card>

								<Table :columns="order.keys" :data="order.datas" :loading="order.loading" @on-selection-change="handleSelectChange" ref="orderlist">
								</Table>

					</Card>
					<Card>

							<Page :total="order.totalPage" :current="order.currPage" :page-size="order.pageSize" show-sizer show-total @on-change="changePage" :page-size-opts="pagesizeopts" placement="top" @on-page-size-change="changePagesize"></Page>


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
		<Modal v-model="suborder.picshow" :closable="suborder.closable" width="750">

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
	export default {
		name: 'orderslist',
		data() {
			return {
				exportOrders: [], //导出订单
				pagesizeopts: [40, 80, 100, 200, 400, 800, 1600, 3200],
				orderstatus: [{
						value: '',
						title: '全部'
					},
					{
						value: 'WAIT_PAY',
						title: '待付款'
					}, {
						value: 'PAID',
						title: '已付款'
					}, {
						value: 'SHIPPED',
						title: '已发货'
					}, {
						value: 'IN_SHOP',
						title: '商品到店'
					}, {
						value: 'FINISHED',
						title: '订单完成'
					}, {
						value: 'CANCEL_BY_SYSTEM',
						title: '系统取消订单'
					}, {
						value: 'CANCEL_BY_USER',
						title: '用户取消订单'
					}
				],
				suborder: {
					picshow: false,
					picshowurl: '',
					loading: true,
					show: false,
					closable: false,
					keys: [{
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
							key: 'id',
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
							key: 'amount',
							sortable: true,
							title: '总金额'
						},
						{
							key: 'discount',
							sortable: true,
							title: '优惠金额'
						},
						{
							key: 'payment',
							sortable: true,
							title: '支付金额'
						},
						{
							key: 'profit_rate',
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
							align: 'left'
						},
						{
							key: 'looksuborder',
							width: 60,
							title: '子订单',
							render: (h, params) => {
								return h('a', {
									on: {
										click: () => {
											//alert('子订单详情');
											this.$http.get('report/suborders&id=' + params.row.id).then((res) => {
												console.log(res);
												this.suborder.show = true;
												this.suborder.loading = false;
												this.suborder.datas = res.data;

											}).catch((err) => {
												console.log(err);
											});

										}
									}
								}, '查看');
							}
						},
						{
							key: 'city',
							sortable: true,
                            tooltip:true,
							width:100,
							title: '市公司'
						},
						{
							key: 'id',
							sortable: true,
                            tooltip:true,
							width: 164,
							title: '订单编号'
						},

						{
							key: 'shop_name',
							sortable: true,
                            tooltip:true,
								width: 164,
							title: '社区名称'
						},
						{
							key: 'title',
							sortable: true,
                            tooltip:true,
								width: 164,
							title: '商品名称'
						},
						{
							key: 'quantity',
							sortable: true,
								width: 80,
							title: '商品数量'
						},

						{
							key: 'payment',
							sortable: true,
								width: 90,
							title: '订单金额'
						},
						{
							key: 'status',
							sortable: true,
								width: 90,
                            tooltip:true,
							title: '订单状态'
						},

						{
							key: 'receiver_name',
							sortable: true,
                            tooltip:true,
								width: 100,
							title: '收货人'
						},
						{
							key: 'mobile',
							sortable: true,
							width: 122,
							title: '收货人mobile'
						}
						,
						{
							key: 'created_at',
							sortable: true,
							width: 148,
							title: '下单时间'
						},
						{
							key: 'remark',
							sortable: true,
                            tooltip:true,
								width: 100,
							title: '备注'
						},

						{
							key: 'profit_rate_amount',
							sortable: true,
								width: 90,
							title: '分润金额'
						},
						{
							key: 'orderCheck',
							sortable: true,
								width: 80,
							title: '订单审核'
						}

					],
					datas: [],
					totalPage: 6,
					pageSize: 100,
					currPage: 1
				},

				searchConName1: '',
				searchConName2: '',
				searchConName3: '',
				searchConName4: '',
				searchConName5: '',
				searchConName8: '',

				rs: {},

				ids: [],
				tipDia: false
			};
		},

		methods: {
			changePagesize(pageSize) {
				this.order.loading = true;
				this.order.datas = [];
				//console.log(pageSize);
				this.rs = {
					id: this.searchConName1,
					receiver_name: this.searchConName2,
					shop_name: this.searchConName3,
					status: this.searchConName4,
					start_time: this.searchConName5,
					ordertitle: this.searchConName8,
					pagesize:pageSize

				};
				this.$http.post('report/orders',this.rs).then((res) => {
					this.order.loading = false;
					this.order.totalPage = parseInt(res.data.totalPage)
					this.order.pageSize = parseInt(res.data.pageSize)
					this.order.currPage = parseInt(res.data.currpage)
					if(res.data.search) {
						if(res.data.search.hasOwnProperty("id")) {
							this.searchConName1 = res.data.search.id;
						}
						if(res.data.search.hasOwnProperty("receiver_name")) {
							this.searchConName2 = res.data.search.username;
						}
						if(res.data.search.hasOwnProperty("shop_name")) {
							this.searchConName3 = res.data.search.shop_name;
						}
						if(res.data.search.hasOwnProperty("status")) {
							this.searchConName4 = res.data.search.status;
						}
						if(res.data.search.hasOwnProperty("start_time")) {
							this.searchConName5 = res.data.search.start_time;
						}
					}
					this.order.datas = res.data.rs;
				}).catch((err) => {
					console.log(err);
				});
			},
			handleExport() {
				//订单导出
				if(!this.exportOrders.length) {
					this.$Message.error("请选择要导出的订单数据");
				} else {
					this.$refs.orderlist.exportCsv({
						fileName: "订单数据",
						columns: [
							{
							key: 'city',
							sortable: true,
							title: '市公司'
						},
						{
							key: 'id',
							sortable: true,
							width: 164,
							title: '订单编号'
						},

						{
							key: 'shop_name',
							sortable: true,
							title: '社区名称'
						},
						{
							key: 'title',
							sortable: true,
							title: '商品名称'
						},
						{
							key: 'quantity',
							sortable: true,
							title: '商品数量'
						},

						{
							key: 'payment',
							sortable: true,
							title: '订单金额'
						},
						{
							key: 'status',
							sortable: true,
							title: '订单状态'
						},
						{
							key: 'profit_rate_amount',
							sortable: true,
							title: '分润金额'
						},
						{
							key: 'orderCheck',
							sortable: true,
							title: '订单审核'
						},
						{
							key: 'receiver_name',
							sortable: true,
							title: '收货人'
						},
						{
							key: 'mobile',
							sortable: true,
							width: 122,
							title: '收货人mobile'
						},

						{
							key: 'created_at',
							width: 122,
							sortable: true,
							title: '下单时间'
						},

						{
							key: 'remark',
							sortable: true,
							title: '备注'
						}
						],
						data: this.exportOrders
					});
					//this.exportOrders = [];
					this.order.datas.forEach((item) => {
						   item._checked= false;
							//this.exportOrders.push(item);
					})
				}
			},
			handlePreorderstartend(val) {
				//@on-change="handlePreorderstartend"
				//	this.searchConName5 = val;
				//console.log(this.searchConName5[1]);

			},
			ok() {

			},
			handleSelectChange(selection) {
				this.exportOrders = [];
				selection.forEach((item) => {
					this.exportOrders.push(item);
				})
			},

			changePage(page) {
				this.order.currPage = page;
				this.rs = {
					id: this.searchConName1,
					receiver_name: this.searchConName2,
					shop_name: this.searchConName3,
					status: this.searchConName4,
					curpage: this.order.currPage,
					start_time: this.searchConName5,
					ordertitle: this.searchConName8,
					pagesize:this.order.pageSize
				};
				this.$http.post('report/orders', this.rs).then(
					(res) => {
						this.order.loading = false;

						this.order.totalPage = parseInt(res.data.totalPage)
						this.order.pageSize = parseInt(res.data.pageSize)
						this.order.currPage = parseInt(res.data.currpage)
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("id")) {
								this.searchConName1 = res.data.search.id;
							}
							if(res.data.search.hasOwnProperty("receiver_name")) {
								this.searchConName2 = res.data.search.username;
							}
							if(res.data.search.hasOwnProperty("shop_name")) {
								this.searchConName3 = res.data.search.shop_name;
							}
							if(res.data.search.hasOwnProperty("status")) {
								this.searchConName4 = res.data.search.status;
							}
							if(res.data.search.hasOwnProperty("start_time")) {
								this.searchConName5 = res.data.search.start_time;
							}
							if(res.data.search.hasOwnProperty("ordertitle")) {
								this.searchConName8 = res.data.search.ordertitle;
							}
						}
						this.order.datas = res.data.rs;

					}).catch((err) => {
					console.log(err);
				});

			},
			init() {

				this.$http.get('report/orders').then(
					(res) => {
						this.order.loading = false;
						//console.log(res.data);
						this.order.totalPage = parseInt(res.data.totalPage)
						//console.log(this.totalPage);
						this.order.pageSize = parseInt(res.data.pageSize)
						this.order.currPage = parseInt(res.data.currpage)
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("id")) {
								this.searchConName1 = res.data.search.id;
							}
							if(res.data.search.hasOwnProperty("receiver_name")) {
								this.searchConName2 = res.data.search.username;
							}
							if(res.data.search.hasOwnProperty("shop_name")) {
								this.searchConName3 = res.data.search.shop_name;
							}
							if(res.data.search.hasOwnProperty("status")) {
								this.searchConName4 = res.data.search.status;
							}
							if(res.data.search.hasOwnProperty("start_time")) {
								this.searchConName5 = res.data.search.start_time;
							}
							if(res.data.search.hasOwnProperty("ordertitle")) {
								this.searchConName8 = res.data.search.ordertitle;
							}
						}
						this.order.datas = res.data.rs;

					}).catch((err) => {
					console.log(err);
				});
			},
			handleSearch1() {

				this.rs = {
					id: this.searchConName1,
					receiver_name: this.searchConName2,
					shop_name: this.searchConName3,
					status: this.searchConName4,
					start_time: this.searchConName5,
					ordertitle: this.searchConName8,
					pagesize:this.order.pageSize

				};
				this.$http.post('report/orders', this.rs).then(
					(res) => {
						this.order.loading = false;
						console.log(res.data);
						this.order.totalPage = res.data.totalPage
						this.order.pageSize = res.data.pageSize
						this.order.currPage = res.data.currpage
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("id")) {
								this.searchConName1 = res.data.search.id;
							}
							if(res.data.search.hasOwnProperty("receiver_name")) {
								this.searchConName2 = res.data.search.username;
							}
							if(res.data.search.hasOwnProperty("shop_name")) {
								this.searchConName3 = res.data.search.shop_name;
							}
							if(res.data.search.hasOwnProperty("status")) {
								this.searchConName4 = res.data.search.status;
							}
							if(res.data.search.hasOwnProperty("start_time")) {
								this.searchConName5 = res.data.search.start_time;
							}
							if(res.data.search.hasOwnProperty("ordertitle")) {
								this.searchConName8 = res.data.search.ordertitle;
							}
						}

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
