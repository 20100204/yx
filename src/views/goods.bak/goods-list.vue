<style lang="less">
	@import '../../styles/common.less';
	@import './components/table.less';
</style>

<template>
	<div>
		<Row :gutter="10">
			<Col span="24">
			<Card>
				<Row :gutter="4">
					<Col span="16">
					<Input v-model="searchConName1" placeholder="请输入商品标题搜搜..." style="width: 200px" />
					<Input v-model="searchConName2" placeholder="请输入barcode搜搜..." style="width: 200px" />
					<Input v-model="searchConName3" placeholder="请输入bn搜搜..." style="width: 200px" />
					<span @click="handleSearch1" style="margin: 0 10px;">
						<Button type="primary" icon="search">搜索</Button>
					</span>
					</Col>
				</Row>
			</Card>
			<Card :padding="2">
				<Row>
					<Col span="4">
					<span @click="handleAdd" style="margin:0px margin-left:4px;">
							 <Button type="info" size="small" icon="android-add" :disabled="auth.enableAdd">添加</Button>
						</span>
					</Col>
					<!--	<Col span="4">
					<span @click="handleUp" pull="2" style="margin:0 -140px ">
							 <Button type="info" size="small" icon="setting">上架</Button>
						</span>
					</Col>
					<Col span="4">
					<span @click="handleDown" pull="2" style="margin:0 -280px ">
							 <Button type="info" size="small" icon="setting">下架</Button>
						</span>
					</Col>-->
					<Col span="4">
					<span pull="2" style="margin:0 -420px ">
							 <Button type="warning" size="small" icon="android-delete" @click="handleDel">删除</Button>
						</span>
					</Col>
				</Row>

			</Card>
			<Card>
				<Row class="margin-top-10 searchable-table-con1">
					<Table :columns="columns1" :data="data1" :loading="loading" @on-selection-change="handleSelectChange">

					</Table>
					<div style="margin: 10px;overflow: hidden" v-if="totalPage > 1">
						<div style="float: right;">
							<Page :total="totalPage" :current="currPage" :page-size="pageSize" show-total @on-change="changePage"></Page>
						</div>
					</div>
				</Row>
			</Card>
			</Col>
		</Row>
		<Modal v-model="picshow" :closable="closable">

			<Row>
				<Col span="24">
				<Card>
					<div slot="header"></div>
					<img :src="picshowurl">

				</Card>

				</Col>

			</Row>
			<div slot="footer"></div>
		</Modal>
	</div>
</template>
<script>
	import * as table from './data/goodslist';

	import Cookies from 'js-cookie';
	export default {
		name: 'searchable-table-goods-list',
		data() {
			return {
				testStyle: {
					width: "10px",
					height: "10px"
				},
				auth:{}, //权限
				closable: false,
				picshow: false,
				picshowurl: '',
				loading: true,
				pageSize: 0,
				totalPage: 1,
				currPage: 1,
				searchConName1: '',
				searchConName2: '',
				searchConName3: '',
				rs: {},
				columns1: [],
				data1: [],
				initTable1: [],
				ids: [],
				tipDia: false
			};
		},

		methods: {
			ok() {

			},
			handleSelectChange(selection) {
				this.ids = [];
				selection.forEach((item) => {
					this.ids.push(item.id);
				})
			},
			handleDown() {
				if(this.ids.length) {
					var _this = this;
					console.log('tip');
					this.$Modal.confirm({
						title: "下架操作确认",
						content: "真得要下架么？",
						onOk: function() {
							_this.$http.post('item/down', _this.ids).then((res) => {
								console.log(res);

								_this.$Notice.success({
									title: 'delete',
									desc: '下架成功',
									duration: 1
								});
								_this.$router.go(0);
							}).catch((err) => {
								console.log(err);
							});
						}
					});

				} else {
					this.$Message.error('请选择要下架的数据');
				}
			},
			handleUp() {
				if(this.ids.length) {
					var _this = this;
					console.log('tip');
					this.$Modal.confirm({
						title: "上架操作确认",
						content: "真得要上架么？",
						onOk: function() {
							_this.$http.post('item/up', _this.ids).then((res) => {
								console.log(res);

								_this.$Notice.success({
									title: 'delete',
									desc: '上架成功',
									duration: 1
								});
								_this.$router.go(0);
							}).catch((err) => {
								console.log(err);
							});
						}
					});

				} else {
					this.$Message.error('请选择要上架的数据');
				}
			},
			handleDel() {
				console.log(this.ids.length);
				if(this.ids.length) {
					var _this = this;
					console.log('tip');
					this.$Modal.confirm({
						title: "删除操作确认",
						content: "真得要删除么？",
						onOk: function() {
							_this.$http.post('item/del', _this.ids).then((res) => {
								console.log(res);

								_this.$Notice.success({
									title: 'delete',
									desc: '删除成功',
									duration: 1
								});
								_this.$router.go('goodslist');

							}).catch((err) => {
								console.log(err);
							});
						}
					});

				} else {
					this.$Message.error('请选择要删除的数据');
				}

			},
			handleStatus() {
				this.$router.push({
					name: 'goodsadd'
				});
			},
			handleAdd() {
				this.$router.push({
					name: 'goodsadd'
				});
			},
			changePage(page) {
				this.currPage = page;
				this.rs = {
					title: this.searchConName1,
					barcode: this.searchConName2,
					bn: this.searchConName3,
					curpage: this.currPage
				};
				this.$http.post('tem/skus', this.rs).then(
					(res) => {
						this.loading = false;
						//console.log(res.data);
						this.totalPage = parseInt(res.data.totalPage)
						this.pageSize = parseInt(res.data.pageSize)
						this.currPage = parseInt(res.data.currpage)
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("title")) {
								this.searchConName1 = res.data.search.title;
							}
							if(res.data.search.hasOwnProperty("barcode")) {
								this.searchConName2 = res.data.search.barcode;
							}
							if(res.data.search.hasOwnProperty("bn")) {
								this.searchConName3 = res.data.search.bn;
							}
						}

						this.data1 = this.initTable1 = res.data.rs
						this.auth = res.data.auth;
					}
				).catch((err) => {
					console.log(err);
				});
				//console.log(page);

				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				//this.tableData1 = this.mockTableData1();
			},
			init() {

				this.$http.get('item/skus').then(
					(res) => {
						this.loading = false;
						//console.log(res.data);
						this.totalPage = parseInt(res.data.totalPage)
						//console.log(this.totalPage);
						this.pageSize = parseInt(res.data.pageSize)
						this.currPage = parseInt(res.data.currpage)
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("title")) {
								this.searchConName1 = res.data.search.title;
							}
							if(res.data.search.hasOwnProperty("barcode")) {
								this.searchConName2 = res.data.search.barcode;
							}
							if(res.data.search.hasOwnProperty("bn")) {
								this.searchConName3 = res.data.search.bn;
							}
						}

						//console.log(this.totalPage);
						this.data1 = this.initTable1 = res.data.rs;
						this.auth = res.data.auth;
					}
				).catch((err) => {
					console.log(err);
				});
			},
			handleSearch1() {

				this.rs = {
					title: this.searchConName1,
					barcode: this.searchConName2,
					bn: this.searchConName3
				};
				this.$http.post('item/skus', this.rs).then(
					(res) => {
						this.loading = false;
						console.log(res.data);
						this.totalPage = res.data.totalPage
						this.pageSize = res.data.pageSize
						this.currPage = res.data.currpage
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("title")) {
								this.searchConName1 = res.data.search.title;
							}
							if(res.data.search.hasOwnProperty("barcode")) {
								this.searchConName2 = res.data.search.barcode;
							}
							if(res.data.search.hasOwnProperty("bn")) {
								this.searchConName3 = res.data.search.bn;
							}
						}

						this.data1 = this.initTable1 = res.data.rs
						this.auth = res.data.auth;
					}
				).catch((err) => {
					console.log(err);
				});
				//this.data1 = this.initTable1;
			}
		},
		mounted() {
			var user = Cookies.get('user');
			if(user != 'admin') {
				var accesss = Cookies.get('auth');

			}

			this.init();
			//  this.handleSearch1();
			this.columns1 = [{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					key: 'pic',
					title: '首图',
					render: (h, params) => {
						return h('a', {
							on: {
								click: () => {
									this.picshowurl = params.row.pic;
									this.picshow = true;
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
					title: 'sku_id',
					sortable: true

				},
				{
					key: 'barcode',
					title: 'barcode',
					sortable: true
				},

				{
					key: 'bn',
					title: 'bn',
					sortable: true
				},
				{
					key: 'title',
					title: '商品标题',
					ellipsis: true,
					sortable: true
				},

				/*
				{
					key: 'moq',1
					title: '最小起订量'
				},
				{
					key: 'packing_qty',
					title: '箱包装数量'1
				},
				{
					key: 'packing_unit',个
					title: '箱包装单位'
				},*/
				/*{
					key: 'is_whole',
					title: '散卖',散
					render: (h, params) => {
						return h('span', {
							props: {
								type: 'text',
								size: 'small'
							},

						}, params.row.is_whole == 1? "整件" : '散卖');
					}

				},*/
				{
					key: 'price',
					title: '价格',
					sortable: true
				},
				/*	{
						key: 'quantity',
						title: '库存',
						sortable: true
					},
					{
						key: 'count',
						title: '销量',
						sortable: true
					},*/
				{
					key: 'sku_specs',
					title: '规格',
					sortable: true
				},
				{
					key: 'status',
					sortable: true,
					title: '上下架',
					render: (h, params) => {
						return h('span', {
							props: {
								type: 'text',
								size: 'small'
							},

						}, params.row.status == 1 ? "上架" : '下架');
					}

				},

				{
					key: 'operation',
					title: '操作',
					render: (h, params) => {
						return h('a', {
							attrs:{
								disabled:this.auth.enableEdit
							},
							on: {
								click: () => {
									this.$router.push({
										path: '/goods/goodsedit/' + params.row.id,
										//query: query
									});
								}
							}
						}, '编辑')

				  }
				}

		];
	}
	};
</script>
