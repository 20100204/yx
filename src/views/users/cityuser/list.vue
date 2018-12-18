<style lang="less">
	@import '../../../styles/common.less';
	@import '../components/table.less';
</style>

<template>
	<div style="width:1200px;">
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
		<Modal v-model="resetpasswd" title="重置密码" width="500">

			<Card>

				<Row style="margin-bottom:20px;">
					<Col span="4" offset="1"> 输入密码
					</Col>
					<Col span="14">

						<Input v-model.trim="passwd" :autofocus="autofocus"  type="password" style="width:260px;" @on-blur="inputpass" />

					</Col>

				</Row>
				<Row>
					<Col span="4" offset="1"> 确认密码
					</Col>
					<Col span="14">

							<Input v-model.trim="repasswd"   type="password" style="width:260px;"  @on-blur="repass" />

					</Col>

				</Row>
			</Card>
			<div slot="footer">
				<Row>
					<Col span="2" offset="9">
					<Button type="info" size="small" style="margin-right:30px;" @click="handleTijiao">确定</Button>
					</Col>
					<Col span="2" offset="2">
					<Button type="info" size="small" style="margin-right:20px;" @click="handleReset">重置</Button>
					</Col>
				</Row>

			</div>
		</Modal>
	</div>
</template>
<script>
	import * as table from '../data/goodslist';

	export default {
		name: 'cityuser',
		data() {
			return {
				enableEdit:true,//是否可以编辑
				userid:'',
				autofocus:true,
				passwd:'',
				repasswd:'',
				resetpasswd: false,
				enableAdd: false,
				enablePasswd: true,
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
			//inputpass 输入密码
			inputpass(){
				if(this.passwd.length<6){
						this.$Notice.error({
								title: '密码长度最低6位',
								desc: '密码长度最低6位',
								duration: 1
							});


				}

			},
			repass(){
					if(this.passwd!=this.repasswd){
					this.$Notice.error({
								title: '密码不一致',
								desc: '密码不一致',
								duration: 1
							});
					return;
				}
			},
			handleTijiao() {
				//设置密码
				if(!this.passwd){
					this.$Notice.error({
								title: '请输入密码',
								desc: '请输入密码',
								duration: 1
							});
					return;
				}
				if(this.passwd!=this.repasswd){
					this.$Notice.error({
								title: '密码不一致',
								desc: '密码不一致',
								duration: 1
							});
					return;
				}
				var rs ={
					id:this.userid,
					passwd:this.passwd
				};
				this.$http.post('citycmp/repasswd', rs).then((res)=>{
					if(res.data.rs=='true'){
							this.$Notice.success({
								title: '修改成功',
								desc: '修改成功',
								duration: 1
							});
							this.resetpasswd=false;
					}else{
							this.$Notice.error({
								title: '修改失败',
								desc: '修改失败',
								duration: 1
							});
					}
				}).catch((err)=>{
					console.log(err);
				});

			},
			handleReset() {
				//重新输入密码
				this.passwd='';
				this.repasswd='';
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
					name: 'citycmpuseradd'
				});
			},
			changePage(page) {
				this.currPage = page;
				this.rs = {
					username: this.searchConName1,
					realname: this.searchConName2,
					mobile: this.searchConName3,
					curpage: this.currPage
				};
				this.$http.post('citycmp/list', this.rs).then(
					(res) => {
						this.loading = false;
						//console.log(res.data);
						this.totalPage = parseInt(res.data.totalPage)
						this.pageSize = parseInt(res.data.pageSize)
						this.enableAdd = Boolean(res.data.auth.enableAdd);
						this.enableEdit = Boolean(res.data.auth.enableEdit);
						this.enablePasswd = Boolean(res.data.auth.enablePasswd);
						this.currPage= parseInt(res.data.currpage)
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
				this.$http.get('citycmp/list').then(
					(res) => {
						this.loading = false;
						//console.log(res.data);
						this.totalPage = parseInt(res.data.totalPage)
						//console.log(this.totalPage);
						this.pageSize = parseInt(res.data.pageSize)
						this.currPage = parseInt(res.data.currpage)
							this.enableAdd = Boolean(res.data.auth.enableAdd);
							this.enableEdit = Boolean(res.data.auth.enableEdit);
							this.enablePasswd = Boolean(res.data.auth.enablePasswd);
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
				this.$http.post('citycmp/list', this.rs).then(
					(res) => {
						this.loading = false;
						console.log(res.data);
						this.totalPage = parseInt(res.data.totalPage)
						this.pageSize = parseInt(res.data.pageSize)
						this.currPage = parseInt(res.data.currpage)
						this.enableAdd = Boolean(res.data.auth.enableAdd);
						this.enableEdit = Boolean(res.data.auth.enableEdit);
						this.enablePasswd = Boolean(res.data.auth.enablePasswd);
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
					key: 'operation',
					title: '操作',
					width: 130,
					render: (h, params) => {
						return h('span',[
						h('a', {
							on: {
								click: () => {
									this.userid = params.row.id;
									this.resetpasswd = true;
								}
							},
							attrs: {
								disabled: this.enablePasswd
							}
						}, '修改密码'),
						h('a',{
							attrs:{
								disabled:this.enableEdit,
								style:"margin-left:14px;"
							},
							on:{
								click:()=>{
									this.$router.push({
										path: '/usersmanager/citycmpuseredit/' + params.row.id
									});
								}
							}
						},'编辑')
						])
						return
					}
				},
				{
					key: 'id',
					sortable: true,
					width: 100,
					title: 'user_id'
				},
				{
					key: 'username',
                        tooltip:true,
					sortable: true,
					width: 110,
					title: 'account'
				},
                {
                	key:'role_name',
                	sortable: true,
                	width: 80,
					title: '角色'
                },
				{
					key: 'realname',
					sortable: true,
                    tooltip:true,
					width: 100,
					title: '姓名'
				},
				{
					key: 'company_name',
					sortable: true,
                    tooltip:true,
					width: 120,
					title: '城市'
				},
				{
					key: 'mobile',
					sortable: true,
					width: 120,
					title: 'mobile'
				},

				{
					key: 'created_at',
					sortable: true,
					width: 160,
					title: '创建时间'
				},
				{
					key: 'updated_at',
					sortable: true,
					width: 160,
					title: '更新时间'
				},

				{
					key: 'status',
					width: 80,
					title: '状态',
					sortable: true,
					render: (h, params) => {
						return h('span', {
							props: {
								type: 'text',
								size: 'small'
							},

						}, params.row.status == 1 ? "启用" : '禁用');
					}
				},

				/*	{
						key: 'operation',
						title: '操作',
						render: (h, params) => {
							return h('a', {
								props: {
									type: 'text',
									size: 'small'
								},
								on: {
									click: () => {
										let query = {
											id: params.row.id
										};
										this.$router.push({
											name: 'goodsedit',
											query: query
										});
									}
								}
							}, '编辑');
						}
					}*/
			];
		}
	};
</script>
