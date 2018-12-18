<style lang="less">
	@import '../../../styles/common.less';
	@import '../components/table.less';
</style>

<template>
	<div>
		<Row :gutter="10">
			<Col span="24">
			<Card>
				<Row :gutter="4">
					<Col span="16">
					<Input v-model="searchConName1" placeholder="请输入登录账户搜搜..." style="width: 200px" />
					<Input v-model="searchConName2" placeholder="请输入用户姓名搜搜..." style="width: 200px" />
					<Input v-model="searchConName3" placeholder="请输入手机号搜搜..." style="width: 200px" />
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
							 <Button type="info" size="small" icon="android-add" :disabled="enableAdd">添加</Button>
						</span>
					</Col>
					<!--<Col span="4">
					<span @click="handleUp" pull="2" style="margin:0 -140px ">
							 <Button type="info" size="small" icon="setting">启用</Button>
						</span>
					</Col>
					<Col span="4">
					<span @click="handleDown" pull="2"  style="margin-left:-280px">
							 <Button type="info" size="small" icon="setting">禁用</Button>
						</span>
					</Col>
					<Col span="4">
					<span pull="2" style="margin:0 -420px ">
							 <Button type="warning" size="small" icon="android-delete" @click="handleDel">删除</Button>
						</span>
					</Col>-->
				</Row>

			</Card>
			<Card>
				<Row class="margin-top-10 searchable-table-con1">
					<Table :columns="columns1" :data="data1" :loading="loadStatus" @on-selection-change="handleSelectChange">

					</Table>
					<div style="margin: 10px;overflow: hidden" v-if="totalPage > 1">
						<div style="float: left;">
							<Page :total="totalPage" :current="currPage" :page-size="pageSize" @on-change="changePage"></Page>
						</div>
					</div>
				</Row>
			</Card>
			</Col>
		</Row>
	</div>
</template>
<script>
	import * as table from '../data/goodslist';
	import Axios from 'axios';
	export default {
		name: 'headquarter',
		data() {
			return {
				enableEdit: true,
				enableAdd: true,
				loading: true,
				pageSize: 0,
				totalPage: 0,
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
		computed: {
			loadStatus() {
				return this.loading;
			}
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
				/*this.$router.push({
					name: 'goodsadd'
				});*/
			},

			handleAdd() {
				this.$router.push({
					name: 'headquarteradd'
				});
			},
			changePage(page) {
				this.currPage = page;
				this.rs = {
					username: this.searchConName1,
					realname: this.searchConName2,
					mobile: this.searchConName3
				};
				this.$http.post('citycmp/head&curpage=' + page, this.rs).then(
					(res) => {
						this.loading = false;
						//console.log(res.data);
						this.totalPage = res.data.totalPage
						this.pageSize = res.data.pageSize
						this.enableAdd = Boolean(res.data.auth.enableAdd);
							this.enableEdit = Boolean(res.data.auth.enableEdit);
						//this.currPage.res.data.currpage
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("username")) {
								this.searchConName1 = res.data.search.username;
							}
							if(res.data.search.hasOwnProperty("realname")) {
								this.searchConName2 = res.data.search.realname;
							}
							if(res.data.search.hasOwnProperty("mobile")) {
								this.searchConName3 = res.data.search.mobile;
							}
						}

						this.data1 = this.initTable1 = res.data.rs
					}
				).catch((err) => {
					console.log(err);
				});
				//console.log(page);

				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				//this.tableData1 = this.mockTableData1();
			},
			init() {
				this.$http.get('citycmp/head').then(
					(res) => {
						this.loading = false;
						//console.log(res.data);
						this.totalPage = res.data.totalPage
						//console.log(this.totalPage);
						this.pageSize = res.data.pageSize
						this.currPage = res.data.currpage
						this.enableAdd = Boolean(res.data.auth.enableAdd);
							this.enableEdit = Boolean(res.data.auth.enableEdit);
							console.log(this.enableEdit);
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("username")) {
								this.searchConName1 = res.data.search.username;
							}
							if(res.data.search.hasOwnProperty("realname")) {
								this.searchConName2 = res.data.search.realname;
							}
							if(res.data.search.hasOwnProperty("mobile")) {
								this.searchConName3 = res.data.search.mobile;
							}
						}

						//console.log(this.totalPage);
						this.data1 = this.initTable1 = res.data.rs
					}
				).catch((err) => {
					console.log(err);
				});
			},
			handleSearch1() {

				this.rs = {
					username: this.searchConName1,
					realname: this.searchConName2,
					mobile: this.searchConName3
				};
				this.$http.post('citycmp/head', this.rs).then(
					(res) => {
						this.loading = false;
						console.log(res.data);
						this.totalPage = res.data.totalPage
						this.pageSize = res.data.pageSize
						this.currPage = res.data.currpage
						this.enableAdd = Boolean(res.data.auth.enableAdd);
						this.enableEdit = Boolean(res.data.auth.enableEdit);
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("username")) {
								this.searchConName1 = res.data.search.username;
							}
							if(res.data.search.hasOwnProperty("realname")) {
								this.searchConName2 = res.data.search.realname;
							}
							if(res.data.search.hasOwnProperty("mobile")) {
								this.searchConName3 = res.data.search.mobile;
							}
						}

						this.data1 = this.initTable1 = res.data.rs
					}
				).catch((err) => {
					console.log(err);
				});
				//this.data1 = this.initTable1;
			}
		},
		mounted() {

			this.init();
			//  this.handleSearch1();
			this.columns1 = [{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					key: 'id',
					sortable: true,
					width: 90,
					title: 'user_id'
				},
				{
					key: 'username',
					sortable: true,
                    tooltip:true,
					width: 100,
					title: 'account'
				},
				{
					key: 'role_name',
					sortable: true,
					width: 90,
					title: '角色'
				},
				{
					key: 'realname',
					sortable: true,
					width: 100,
					title: '姓名'
				},
				{
					key: 'company_name',
					sortable: true,
                    tooltip:true,
					width: 90,
					title: '城市'
				},
				{
					key: 'mobile',
					sortable: true,
					width: 150,
					title: 'mobile'
				},
				{
					key: 'created_at',
					sortable: true,
					width: 150,
					title: '创建时间'
				},
				{
					key: 'updated_at',
					sortable: true,
					width: 150,
					title: '更新时间'
				},
				{
					key: 'status',
					sortable: true,
					width: 90,
					title: '状态',
					render: (h, params) => {
						return h('span', {
							props: {
								type: 'text',
								size: 'small'
							},

						}, params.row.status == 1 ? "启用" : '禁用');
					}
				},

				{
					key: 'operation',
					title: '操作',
					width: 90,
					render: (h, params) => {
						return h('span', [
							h('a', {
								attrs: {
									disabled: this.enableEdit
								},
								props: {
									type: 'text',
									size: 'small'
								},
								on: {
									click: () => {
										this.$router.push({
											path: '/usersmanager/headquarteredit/' + params.row.id
										});

									}
								}
							}, '编辑')
						])

					}
				}
			];
		}
	};
</script>
