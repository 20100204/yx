<style lang="less">
	@import '../../../styles/common.less';
	@import '../../../styles/table.less';
</style>

<template>
	<div style="width:1520px;">
		<Row >
			<Col span="24">
			<Card>
				<Row :gutter="4">
					<Col span="20">
					<Input v-model="searchConName1" placeholder="请输入社区名字搜搜..." style="width: 200px" />
					<Input v-model="searchConName2" placeholder="请输入店主姓名搜搜..." style="width: 200px" />
					<Input v-model="searchConName3" placeholder="请输入手机号搜搜..." style="width: 200px" />
					<Select v-model="searchConName4" style="width:200px" placeholder="请选所属分公司">
						<Option v-for="(item,ind) in newcitylist" :value="item.company_name" :label="item.company_name">{{ item.company_name }}</Option>
					</Select>
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
					</Col>-->
					<!--<Col span="4">
					<span pull="2" style="margin:0 -420px ">
							 <Button type="warning" size="small" icon="android-delete" @click="handleDel">删除</Button>
						</span>
					</Col>-->
				</Row>

			</Card>
  			<Card>
				<Row  >
					<Col>
						<Table :columns="columns1" :data="data1" :loading="loading" @on-selection-change="handleSelectChange">
					</Table>
					<div style="margin: 10px;overflow: hidden" v-if="totalPage > 1">
						<div style="float: left;">
							<Page :total="totalPage" :current="currPage" :page-size="pageSize" show-total @on-change="changePage"></Page>
						</div>
					</div>
					</Col>

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

					<Input v-model.trim="passwd" :autofocus="autofocus" type="password" style="width:260px;" @on-blur="inputpass" />

					</Col>

				</Row>
				<Row>
					<Col span="4" offset="1"> 确认密码
					</Col>
					<Col span="14">

					<Input v-model.trim="repasswd" type="password" style="width:260px;" @on-blur="repass" />

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

		<Modal v-model="adduser.show" title="绑定用户" width="500">
			<Card>
				<Table :columns="adduser.keys" :data="adduser.datas" :loading="adduser.loading">
				</Table>
			</Card>

			<Card>

				<Row style="margin-left:10px;">
					<Col span="3"> 手机号
					</Col>
					<Col span="8">
					<Input v-model.trim="adduser.mobile" @on-blur="handleCheckmobile" :autofocus="autofocus" placeholder="作为登录账号" />
					</Col>
					<Col offset="2" span="2">
					<Button type="info" @click="handleUser">绑定</Button>
					</Col>
				</Row>

			</Card>
			<div slot="footer">
				<!--<Row>
					<Col span="2" offset="9">
					<Button type="info" size="small" style="margin-right:30px;" @click="handleUser">确定</Button>
					</Col>
					<Col span="2" offset="2">
					<Button type="info" size="small" style="margin-right:20px;" @click="handleUserReset">重置</Button>
					</Col>
				</Row>-->

			</div>
		</Modal>

		<Modal v-model="shequ.show" title="社区便民" width="500">
			<Card>
				<CheckboxGroup v-model="shequ.checked" @on-change="handleShefuwu">
					<Checkbox :label="child.desc" v-for="child in shequ.all" :key="child.id">

					</Checkbox>
				</CheckboxGroup>

			</Card>
			<Card>
				<Row>
					<Col span="4" offset="10">已选服务</Col>
				</Row>
				<Card v-for="item in shequ.checkedDatas" :key="item.service_name">
					<Row>
						<Col span="4">服务名称</Col>
						<Col span="5">{{item.service_name}}</Col>
						<Col span="3"> 联系人</Col>
						<Col span="3">{{item.name}}</Col>
						<Col span="3">电话</Col>
						<Col span="3">{{item.phone}}</Col>
					</Row>
					<Row>
						<Col span="3"> 地址</Col>
						<Col>{{item.address}}</Col>
					</Row>
					<Row>
						<Col span="3"> 简介</Col>
						<Col>{{item.description}}</Col>
					</Row>
				</Card>
			</Card>
			<div slot="footer">
				<!--<Row>
					<Col span="2" offset="9">
					<Button type="info" size="small" style="margin-right:30px;" @click="handleUser">确定</Button>
					</Col>
					<Col span="2" offset="2">
					<Button type="info" size="small" style="margin-right:20px;" @click="handleUserReset">重置</Button>
					</Col>
				</Row>-->

			</div>
		</Modal>

		<Modal v-model="shequ.addserver.show" title="添加便民服务" width="500" :mask-closable="shequ.makeclose" :closable="shequ.closeable" @on-visible-change="handleShowServer">

			<Card>
				<Row>
					<Col span="4"> 服务名称
					</Col>
					<Col span="4">
					<Input v-model.trim="shequ.addserver.service_name" disabled="disabled" />
					</Col>
					<Col span="3" offset="1"> 联系人
					</Col>
					<Col span="4">
					<Input v-model.trim="shequ.addserver.name" placeholder="联系人" />
					</Col>
					<Col span="2" offset="1"> 手机
					</Col>
					<Col span="5">
					<Input v-model.trim="shequ.addserver.phone" placeholder="电话" />
					</Col>
					<!--<Col offset="2" span="2">
					<Button type="info" @click="handleUser">绑定</Button>
					</Col>-->
				</Row>
				<Row style="margin-top:20px;">
					<Col span="4"> 地址
					</Col>
					<Col span="18">
					<Input v-model.trim="shequ.addserver.address" placeholder="地址，不用填省市区" />
					</Col>

				</Row>
				<Row style="margin-top:20px;">
					<Col span="4"> 简介
					</Col>
					<Col span="18">
					<Input type="textarea" v-model.trim="shequ.addserver.description" placeholder="简介，选填项" />
					</Col>

				</Row>
			</Card>
			<div slot="footer">
				<Row>
					<Col span="2" offset="9">
					<Button type="info" size="small" style="margin-right:30px;" @click="handleAddserver">确定</Button>
					</Col>
					<Col span="2" offset="2">
					<Button type="info" size="small" style="margin-right:20px;" @click="handleServerReset">重置</Button>
					</Col>
				</Row>

			</div>
		</Modal>

	</div>
</template>
<script>
	export default {
		name: 'shopuser',
		data() {
			return {
				enableShe: true,
				enableBang: true,
				shequ: {
					addServerStatus: false,
					makeclose: false,
					closeable: true,
					shop_id: '',
					addserver: {
						show: false,
						service_name: '',
						name: '',
						phone: '',
						address: '',
						description:''
					},
					show: false,
					loading: true,
					all: [{
							desc: '社区物业'
						},
						{
							desc: '社区超市'
						},
						{
							desc: '家政服务'
						},
						{
							desc: '送水服务'
						},
						{
							desc: '快递服务'
						},
						{
							desc: '开锁服务'
						},
						{
							desc: '通下水道'
						},
						{
							desc: '搬家服务'
						},
						{
							desc: '送气服务'
						},
						{
							desc: '家电维修'
						},
						{
							desc: '附近药店'
						},
						{
							desc: '附近美发'
						},
						{
							desc: '房产中介'
						},
						{
							desc: '货的服务'
						},
						{
							desc: '花店服务'
						},
						{
							desc: '充值服务'
						},
					],
					checked: [],
					checkedDatas: [
						/*{
													service_name: '社区物业',
													name: 'zs',
													phone: '13778961236',
													address: 'ssssssssssssssss'
												},
												{
													service_name: '社区超市',
													name: 'zs',
													phone: '13778961236',
													address: 'ssssssssssssssss'
												},*/
					]
				},
				adduser: {
					//添加多用户
					show: false,
					mobile: '',
					shop_id: '',
					keys: [{
							key: 'operation',
							title: '操作',
							render: (h, params) => {
								return h('a', {
									on: {
										click: () => {
											console.log(params);
											this.$http.get('shoper/delusers&user_id=' + params.row.user_id).then((res) => {
												//	console.log(res);

												if(res.data.rs == 'true') {
													this.adduser.datas.pop(params.row);
												}
											}).catch((err) => {
												console.log(err);
											});

										}
									},
								}, '删除')
							}
						},
						{
							key: 'user_id',
							title: '用户id'
						},
						{
							key: 'mobile',
							width: 120,
							title: '手机号'
						},
						{
							key: 'nickname',
							title: '昵称'
						},
						{
							key: 'headicon',
							title: '头像',
							render: (h, params) => {
								return h('img', {
									attrs: {
										src: params.row.headicon,
										style: 'width:60px;height:60px;'
									}
								}, '')
							}
						}
					],
					datas: []
				},
				totalPage: 0,
				pageSize: 1,
				currPage: 1,
				enableEdit: true,
				userid: '',
				autofocus: true,
				passwd: '',
				repasswd: '',
				resetpasswd: false,
				enableAdd: true,
				enablePasswd: true,
				loading: false,
				searchConName1: '',
				searchConName2: '',
				searchConName3: '',
				searchConName4: '',
				newcitylist: [],
				columns1: [],
				data1: [],
				ids: [],
			};
		},
		computed: {

		},
		methods: {
			handleShowServer(val) {
				//console.log(val);
				if(!val) {
					if(!this.shequ.addServerStatus) {
						this.shequ.checked.pop(this.shequ.checked[this.shequ.checked.lenght - 1]);
					}
				}
			},
			handleAddserver() {
				//添加服务
				if(!this.shequ.addserver.name) {
					this.$Notice.error({
						title: '请填写服务联系人',
						desc: '请填写服务联系人',
						duration: 1
					});
					return;
				}
				if(!this.shequ.addserver.phone) {
					this.$Notice.error({
						title: '请填写服务电话',
						desc: '请填写服务电话',
						duration: 1
					});
					return;
				}
				/*var reg = /^1[34578]\d{9}$/;
				if(!reg.test(this.shequ.addserver.phone)) {
					this.$Notice.error({
						title: '手机号码格式错误',
						desc: '手机号码格式错误',
						duration: 1
					});
					return;
				}*/
			/*	if(!this.shequ.addserver.address) {
					this.$Notice.error({
						title: '请填写服务地址',
						desc: '请填写服务地址',
						duration: 1
					});
					return;
				}*/
				this.shequ.addserver.shop_id = this.shequ.shop_id;
				this.$http.post('shoper/addserver', this.shequ.addserver).then((res) => {
					if(res.data.rs == 'true') {
						this.shequ.checkedDatas.push(this.shequ.addserver);
						this.shequ.addserver.show = false;
						this.shequ.addserver = {};
						this.$Notice.success({
							title: "添加成功",
							desc: "添加成功",
							duration: 1
						});
						this.shequ.addServerStatus = true;
					} else {
						this.$Notice.error({
							title: res.data.msg,
							desc: res.data.msg,
							duration: 1
						});
						this.shequ.addserver.show = false;
						this.shequ.addserver = {};
						this.shequ.checked.pop(this.shequ.addserver.service_name);
						return;
					}
				}).catch();

			},
			handleServerReset() {
				//充值服务添加
				this.shequ.addserver.address = "";
				this.shequ.addserver.phone = "";
				this.shequ.addserver.name = "";
			},
			handleShefuwu(val) {
				//便民服务变化时触发
				//	console.log(val);
				//console.log(this.shequ.checked);
				//console.log(this.shequ.checkedDatas);
				this.shequ.addServerStatus = false;
				var alen = this.shequ.checked.length;
				var blen = this.shequ.checkedDatas.length;
				//	alert(alen);
				//	alert(blen);
				if(alen > blen) {
					//添加
					//alert('more')
					//alert(this.shequ.checked[alen - 1]);
					this.shequ.addserver.service_name = this.shequ.checked[alen - 1];
					this.shequ.addserver.show = true;
				} else {
					//减少
					//alert('less');
					var all = [];

					var rs = {
						all: this.shequ.checked,
						shop_id: this.shequ.shop_id
					};
					this.$http.post('shoper/delserver', rs).then((res) => {
						if(res.data.rs == 'true') {
							this.shequ.checked.forEach((item) => {
								this.shequ.checkedDatas.forEach((child) => {
									if(item == child.service_name) {
										if(all.findIndex(function(val, index, arr) {
												return val == child
											}) == -1) {
											all.push(child);
										}
									}
								});
							});
							this.shequ.checkedDatas = all;
							this.$Notice.success({
								title: "删除成功",
								desc: "删除成功",
								duration: 1
							});
						} else {
							this.$Notice.error({
								title: res.data.msg,
								desc: res.data.msg,
								duration: 1
							});
						}

					}).catch((err) => {

					});

				}
			},
			handleCheckmobile() {
				if(!this.adduser.mobile) {
					this.$Notice.error({
						title: '请填写mobile',
						desc: '请填写mobile',
						duration: 1
					});
					return;
				}

				var reg = /^1[3456789]\d{9}$/;
				if(!reg.test(this.adduser.mobile)) {
					this.$Notice.error({
						title: '手机号码格式错误',
						desc: '手机号码格式错误',
						duration: 1
					});
					return;
				}

			},
			handleUserReset() {
				this.adduser.mobile = "";
			},
			handleUser() {
				if(!this.adduser.mobile) {
					this.$Notice.error({
						title: '请填写mobile',
						desc: '请填写mobile',
						duration: 1
					});
					return;
				}

				var reg = /^1[3456789]\d{9}$/;
				if(!reg.test(this.adduser.mobile)) {
					this.$Notice.error({
						title: '手机号码格式错误',
						desc: '手机号码格式错误',
						duration: 1
					});
					return;
				}
				//console.log();
				this.$http.post('shoper/addshoper', this.adduser).then((res) => {
					//console.log(res);
					//
					if(res.data.rs == 'true') {
						this.$Notice.success({
							title: '添加成功',
							desc: '添加成功',
							duration: 1
						});
						//	this.adduser.show = false;
						this.adduser.mobile = "";
						this.adduser.datas.push(res.data.datas);
					} else {
						this.$Notice.error({
							title: res.data.msg,
							desc: res.data.msg,
							duration: 1
						});
					}

				}).catch((err) => {
					console.log(err);
				});
			},
			checkpass() {
				if(this.adduser.passwd.length < 6) {
					this.$Notice.error({
						title: '密码长度最低6位',
						desc: '密码长度最低6位',
						duration: 1
					});

				}

			},
			//inputpass 输入密码
			inputpass() {
				if(this.passwd.length < 6) {
					this.$Notice.error({
						title: '密码长度最低6位',
						desc: '密码长度最低6位',
						duration: 1
					});

				}

			},
			repass() {
				if(this.passwd != this.repasswd) {
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
				if(!this.passwd) {
					this.$Notice.error({
						title: '请输入密码',
						desc: '请输入密码',
						duration: 1
					});
					return;
				}
				if(this.passwd != this.repasswd) {
					this.$Notice.error({
						title: '密码不一致',
						desc: '密码不一致',
						duration: 1
					});
					return;
				}
				var rs = {
					id: this.userid,
					passwd: this.passwd
				};
				this.$http.post('shoper/repasswd', rs).then((res) => {
					if(res.data.rs == 'true') {
						this.$Notice.success({
							title: '修改成功',
							desc: '修改成功',
							duration: 1
						});
						this.resetpasswd = false;
					} else {
						this.$Notice.error({
							title: '修改失败',
							desc: '修改失败',
							duration: 1
						});
					}
				}).catch((err) => {
					console.log(err);
				});

			},
			handleReset() {
				//重新输入密码
				this.passwd = '';
				this.repasswd = '';
			},

			handleSelectChange(selection) {
				this.ids = [];
				selection.forEach((item) => {
					this.ids.push(item.id);
				})
			},

			handleAdd() {
				this.$router.push({
					name: 'addshopers'
				});
			},
			changePage(page) {
				this.currPage = page;
				this.rs = {
					shop_name: this.searchConName1,
					realname: this.searchConName2,
					mobile: this.searchConName3,
					curpage: this.currPage,
					city: this.searchConName4
				};
				this.$http.post('shoper/list', this.rs).then(
					(res) => {
						this.loading = false;
						console.log(res.data);
						this.totalPage = parseInt(res.data.totalPage)
						this.pageSize = parseInt(res.data.pageSize)
						this.currPage = parseInt(res.data.currpage)
						this.enableEdit = Boolean(res.data.auth.enableEdit);
						this.enableAdd = Boolean(res.data.auth.enableAdd);
						this.enablePasswd = Boolean(res.data.auth.enablePasswd);
						this.enableShe = Boolean(res.data.auth.enableShe);
						this.enableBang = Boolean(res.data.auth.enableBang);


						this.data1 = this.initTable1 = res.data.rs
					}
				).catch((err) => {
					console.log(err);
				});

			},
			init() {
				this.$http.get('shoper/list').then(
					(res) => {
						//consolo.log(res);
						this.loading = false;
						//console.log(res.data);
						this.totalPage = parseInt(res.data.totalPage)
						//console.log(this.totalPage);
						this.pageSize = parseInt(res.data.pageSize)
						this.currPage = parseInt(res.data.currpage)
						this.enableEdit = Boolean(res.data.auth.enableEdit);
						this.enableAdd = Boolean(res.data.auth.enableAdd);
						this.enablePasswd = Boolean(res.data.auth.enablePasswd);
						this.enableShe = Boolean(res.data.auth.enableShe);
						this.enableBang = Boolean(res.data.auth.enableBang);

						this.newcitylist = res.data.citys;
						//console.log(this.totalPage);
						this.data1 = this.initTable1 = res.data.rs
					}
				).catch((err) => {
					console.log(err);
				});
			},
			handleSearch1() {

				this.rs = {
					shop_name: this.searchConName1,
					realname: this.searchConName2,
					mobile: this.searchConName3,
					curpage: this.currPage,
					city: this.searchConName4
				};
				this.$http.post('shoper/list', this.rs).then(
					(res) => {
						this.loading = false;
						console.log(res.data);
						this.totalPage = parseInt(res.data.totalPage)
						this.pageSize = parseInt(res.data.pageSize)
						this.currPage = parseInt(res.data.currpage)
						this.enableEdit = Boolean(res.data.auth.enableEdit);
						this.enableAdd = Boolean(res.data.auth.enableAdd);
						this.enablePasswd = Boolean(res.data.auth.enablePasswd);
						this.enableShe = Boolean(res.data.auth.enableShe);
						this.enableBang = Boolean(res.data.auth.enableBang);


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
					sortable: true,
					width: 150,
					title: '操作',
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
										let query = {
											id: params.row.user_id
										};
										this.$router.push({
											path: '/usersmanager/editshopers/' + params.row.id,
											//query: query
										});
									}
								}
							}, '编辑'),
							h('a', {
								attrs: {
									style: "margin-left:34px;",
									disabled: this.enablePasswd
								},
								props: {
									type: 'text',
									size: 'small'
								},
								on: {
									click: () => {
										console.log(params.row);
										this.userid = params.row.user_id;
										this.resetpasswd = true;
									}
								}
							}, '修改密码'),
							h('a', {
								props: {
									type: 'text',
									size: 'small',

								},
								attrs: {
									disabled: this.enableBang
								},
								on: {
									click: () => {
										this.adduser.shop_id = params.row.id;
										//this.adduser.area = params.row.area;
										this.adduser.show = true;
										this.$http.get('shoper/getmulitusers&shop_id=' + params.row.id).then((res) => {
											this.adduser.datas = res.data;
											//console.log(res);
										}).catch((err) => {
											console.log(err);
										});

									}
								}
							}, '绑定用户'),
							h('a', {
								attrs: {
									style: "margin-left:10px;",
									disabled: this.enableShe
								},
								on: {
									click: () => {
										this.shequ.addServer = false;
										this.shequ.show = true
										this.shequ.shop_id = params.row.id;
										this.$http.get('shoper/getserver&shop_id=' + params.row.id).then((res) => {
											this.shequ.checked = res.data.checked;
											this.shequ.checkedDatas = res.data.list;
										}).catch((err) => {
											console.log(err);
										});
										//	alert("社区便民");
									}
								}
							}, '社区便民')

						]);

					}
				},
				/*{
					key: 'id',
					width: 60,
					sortable: true,
					title: 'id'
				},
				{
					key: 'shop_code',
					width: 110,
					sortable: true,
					title: 'shop_code'
				},*/
				{
					key: 'realname',
					width: 80,
					sortable: true,
					title: '姓名',
                    tooltip:true,
					ellipsis: true,
					render: (h, params) => {
						return h('div', {}, [
							h('Tooltip', {

								props: {
									content: params.row.realname,
									placement: "top-start"
								}
							}, params.row.realname)

						]);

					}
				},
				{
					key: 'city',
					sortable: true,
                    tooltip:true,
					width: 90,
					title: '市公司'
				},
				{
					key: 'shop_type',
					sortable: true,
					width: 110,
					title: '社区类型'
				},
				{
					key: 'shop_name',
					sortable: true,
                    tooltip:true,
					width: 190,
					ellipsis: true,
					render: (h, params) => {
						return h('div', {}, [
							h('Tooltip', {
								props: {
									content: params.row.shop_name,
									placement: "top-start"
								}
							}, params.row.shop_name)

						]);

					},
					title: '社区名称'
				},
				{
					key: 'mobile',
					sortable: true,
					width: 110,
					title: 'mobile'
				},

				{
					key: 'profit_rate',
					sortable: true,
					width: 100,
					title: '分成',
					render: (h, params) => {
						return h('span', {
							props: {
								type: 'text',
								size: 'small'
							},

						}, params.row.profit_rate + '%');
					}
				},

				{
					key: 'status',
					sortable: true,
					width: 80,
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
					key: 'address',
					sortable: true,
					width: 260,
                    tooltip:true,
					title: '地址'
					/*	render:(h,params)=>{
							return h('div', [
										h('Tooltip',
											{

												props:{
													content:params.row.address,
													placement:"top-start"
												}
											},params.row.address
										)

									]
							 );

					    }*/

				},
				{
				    key:"home_delivery",
					title:"取货上门",
					width:100,
					render:(h,p)=>{
				        return h('span',p.row.home_delivery=="1"?"送货上门":"门店自取")
					}
				},
				{
					key: 'updated_at',
					width: 150,
					sortable: true,
					title: '更新时间'
				}

			];
		}
	};
</script>
