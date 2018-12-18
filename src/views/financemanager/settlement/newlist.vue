<style lang="less">
	@import '../../../styles/common.less';
	@import '../../../styles/table.less';
</style>

<template>
	<div style="width:1436px;">
		<Row :gutter="10">
			<Col span="24">
			<Card>
				<Row :gutter="4">
					<Col span="16">
					<Input v-model="searchConName1" placeholder="请输入手机号搜搜..." style="width: 200px" />
					<Select v-model="searchConName2" placeholder="请选择审核状态搜搜..." style="width: 200px">
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
					<Table :columns="order.keys" :data="order.datas" :loading="order.loading">
					</Table>
					<div style="margin: 10px;overflow: hidden" v-if="order.totalPage > 1">
						<div style="float: left;">
							<Page :total="order.totalPage" :current="order.currPage" :page-size="order.pageSize" show-total @on-change="changePage"></Page>
						</div>
					</div>
				</Row>
			</Card>
			</Col>
		</Row>

		<!--审核  -->
		<Modal v-model="settlement.show" :closable="settlement.closable" width="700">

			<Row>
				<Col span="24">
				<Card>
					<div slot="header"></div>
					<Row style="margin-bottom:20px;">
						<Col span="3" offset="1">userId:</Col>
						<Col span="4">{{settlement.datas.user_id}}</Col>
						<Col span="3" offset="1">微信昵称:</Col>
						<Col span="4">{{settlement.datas.nickname}}</Col>
						<Col span="3" offset="1">账户类型:</Col>
						<Col span="4">{{settlement.datas.from}}</Col>
					</Row>
					<Row style="margin-bottom:20px;">
						<Col span="4" offset="1">申请提现金额:</Col>
						<Col span="4"> {{settlement.datas.amount}}
						</Col>
						<Col span="4">申请提现时间:</Col>
						<Col span="5">{{settlement.datas.created_at}}</Col>
					</Row>
					<Row style="margin-bottom:20px;">
						<Col span="3" offset="1">mobile</Col>
						<Col span="4">{{settlement.datas.mobile}}</Col>
						<Col span="4" offset="1">提现到账时间</Col>
						<Col span="6">{{settlement.datas.check_time}}</Col>

					</Row>

					<!--<Row style="margin-bottom:20px;">-->
						<!--<Col span="2" offset="1"><label>备注</label></Col>-->

						<!--<Col span="18" v-if="settlement.datas.status=='待审批'" >-->
						<!--<Input type="textarea" v-model="settlement.datas.note" placeholder="备注"></Input>-->
						<!--</Col>-->
						<!--<Col span="18" v-else>-->
								<!--<Input type="textarea" disabled  v-model="settlement.datas.note" placeholder="备注"></Input>-->
						<!--</Col>-->
					<!--</Row>-->

				</Card>

				</Col>

			</Row>
			<div slot="footer">
				<Row v-if="settlement.datas.status=='待审批'">
					<Col span="2" offset="8">
					<Button type="info" size="small" @click.once="handleCheck">确认</Button>
					</Col>
					<Col span="2" offset="1">
					<Button type="info" size="small" @click="handleReject">拒绝</Button>
					</Col>
					<Col span="2" offset="1">
					<Button type="info" size="small">取消</Button>
					</Col>
				</Row>
				<Row v-else>
					<Col span="2" offset="8">
					<Button type="info" size="small"  disabled >确认</Button>
					</Col>
					<Col span="2" offset="1">
					<Button type="info" size="small" disabled >拒绝</Button>
					</Col>
				</Row>

			</div>
		</Modal>
	</div>
</template>
<script>
	import Accounting from "../tool/accounting.js";
	export default {
		name: 'settlement',
		data() {
			return {
				orderids: [],
				orderstatus: [{
					value: '3',
					label: '全部'
				}, {
					value: '0',
					label: '待审批'
				}, {
					value: '1',
					label: '已审批'
				}, {
					value: '2',
					label: '已拒绝'
				}],
				settlement: {
					datas: {
                        user_id:'',
                        nickname:'',
                        mobile:'',
                        created_at:'',
						from:"小程序"

					},
					show: false,
					closable: false,
				},
				order: {
					loading: true,
					keys: [
					{
							key: 'operation',
						    width:100,
							title: '操作',
							render: (h, params) => {
								var rs = '审核';
								switch(params.row.status) {

									case '已审批':
										rs = "查看";
										break;
									case '已拒绝':
										rs = "查看";
										break;
								}
								return h('a', {

									on: {
										click: () => {
											this.settlement.datas = params.row;
											this.settlement.show = true;
										}
									}
								}, rs)
							}
						},
						{key:'openid',tooltip:true,title:'openid',width:236},
						{key:'city',tooltip:true,title:'市公司',width:110},
						{
							key: 'id',
							width: 90,
							align: 'center',
							title: '提现id'
						},
						{
							key: 'user_id',
							title: 'user_id',
							sortable: true,
							 width: 100,
							ellipsis: true
						},
						{
							key: 'nickname',
							title: '微信昵称',
                            tooltip:true,
							sortable: true,
							width: 130,
							ellipsis: true
						},
						{title:'mobile',key:"mobile",sortable:true,width:110},
						{
							key: 'amount',
							title: '申请提现金额',
							sortable: true,
							align: 'center',
							width: 130
						},

						{
							key: 'created_at',
							title: '申请提现时间',
							sortable: true,
							align: 'center',
							width: 150
						},
						{
							key: 'check_time',
							title: '审核提现时间',
							sortable: true,
							align: 'center',
							width: 150
						},
						{
							key: 'checker',
							sortable: true,
							width:90,
							title: '审核人'
						},
						{
							key: 'status',
								sortable: true,
							title: '审核状态',
							width:110
						}


					],
					datas: []
				},
				searchConName1: '',
				searchConName2: '',
			};
		},

		methods: {
			//拒绝
			handleReject() {
				//拒绝时必须填上原因
				// if(!this.settlement.datas.note){
				// 	this.$Message.error({content:"请填上拒绝原因"});
				// 	return;
				// }
				this.$http.get('settlement/newsettlementcheck&id='+this.settlement.datas.id+'&status=2').then((res)=>{
					if(res.data.rs=='true'){
						this.$Message.success({
							content:"操作成功"
						});
						this.settlement.datas.status='已拒绝';
						this.settlement.show=false;
					}else{
						this.$Message.error({content:res.data.msg});
					}
					this.$router.go(0);
					console.log(res);
				}).catch((err)=>{
					console.log(err);
				});
			},
			//审核：
			handleCheck() {
				//console.log(this.settlement.datas);

				this.$http.get('settlement/newsettlementcheck&id='+this.settlement.datas.id+'&status=1').then((res)=>{
					if(res.data.rs=='true'){
						this.$Message.success({
							content:"操作成功"
						});
						this.settlement.datas.status='已审批';
						this.settlement.show=false;

					}else{
						this.settlement.show=false;
						this.$Message.error({content:res.data.msg});
						//this.$router.go(0);
					}
					var _this = this;
					setTimeout(function(){
						_this.$router.go(0);
					},1000);
						//this.$router.go(0);
					console.log(res);
				}).catch((err)=>{
					console.log(err);
				});
			},

			changePage(page) {
				this.order.currPage = page;
				this.rs = {
                    mobile: this.searchConName1,
					curpage: this.order.currPage
				};
				this.$http.post('settlement/newsettlementlist', this.rs).then(
					(res) => {
						this.order.loading = false;
						//console.log(res.data);
						this.order.totalPage = parseInt(res.data.totalPage)
						this.order.pageSize = parseInt(res.data.pageSize)
						//this.order.currPage = parseInt(res.data.currpage)
						// if(res.data.search) {
						// 	if(res.data.search.hasOwnProperty("shop_name")) {
						// 		this.searchConName1 = res.data.search.shop_name;
						// 	}
						// 	if(res.data.search.hasOwnProperty("status")) {
						// 		this.searchConName2 = res.data.search.status;
						// 	}
						// }
						this.order.datas = res.data.rs;

					}).catch((err) => {
					console.log(err);
				});

			},
			init() {

				this.$http.get('settlement/newsettlementlist').then(
					(res) => {
						console.log(res);
						this.order.loading = false;
						//console.log(res.data);
						this.order.totalPage = parseInt(res.data.totalPage)
						//console.log(this.totalPage);
						this.order.pageSize = parseInt(res.data.pageSize)
						this.order.currPage = parseInt(res.data.currpage)
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("shop_name")) {
								this.searchConName1 = res.data.search.shop_name;
							}
							if(res.data.search.hasOwnProperty("staus")) {
								this.searchConName2 = res.data.search.staus;
							}


						}
						this.order.datas = res.data.rs;

					}).catch((err) => {
					console.log(err);
				});
			},
			handleSearch1() {
				this.rs = {
					mobile: this.searchConName1,
					status: this.searchConName2,
				};
				 	this.$http.post('settlement/newsettlementlist', this.rs).then(
						(res) => {
							this.order.loading = false;
							console.log(res.data);
							this.order.totalPage = parseInt(res.data.totalPage)
							this.order.pageSize = parseInt(res.data.pageSize)
							this.order.currPage = parseInt(res.data.currpage)
							// if(res.data.search) {
							// 	if(res.data.search.hasOwnProperty("shop_name")) {
							// 		this.searchConName1 = res.data.search.shop_name;
							// 	}
							// 	if(res.data.search.hasOwnProperty("status")) {
							// 		this.searchConName2 = res.data.search.status;
							// 	}
                            //
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
