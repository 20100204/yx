 <style lang="less">

</style>

<template>
	<div style="width:2000px">
		<Row :gutter="10">
			<Col span="24">
				<Card>
				<Row :gutter="4">
					<Col span="20">
					<Input v-model="search.one" placeholder="请输入粉丝手机号搜搜..." style="width: 200px" />
					<Input v-model="search.two" placeholder="请输入社区名称搜搜..." style="width: 200px" />
					<Input v-model="search.three" placeholder="请输入订单号搜搜..." style="width: 200px" />
					<Select v-model="search.four" style="width:200px" placeholder="请选所属分公司">
						<Option v-for="(item,ind) in newcitylist" :value="item.company_name" :label="item.company_name">{{ item.company_name }}</Option>
					</Select>
                    <Select v-model="search.five" style="width:200px" placeholder="请选审核状态">
						<Option v-for="(item,ind) in status" :value="item.id" :label="item.val"></Option>
					</Select>
					<span @click="handleSearch1" style="margin: 0 10px;">
						<Button type="primary" icon="search">搜索</Button>
					</span>
					</Col>
				</Row>
			</Card>
			<Card>
				<Row  >
					<Col>
						<Table :columns="columns1" :data="data1" :loading="loading"   >

						</Table>
					</Col>
				</Row>
				<Row>
					<Col>
					<div style="margin: 10px;overflow: hidden" v-if="totalPage > 1">
						<div style="float: left;">
							<Page :total="totalPage" :current="currPage" show-total  :page-size="pageSize" @on-change="changePage"></Page>
						</div>
					</div>
					</Col>
				</Row>
			</Card>
			</Col>
		</Row>
<!--退款  -->
		<Modal v-model="settlement.show" :closable="false" width="700">

			<Row>
				<Col span="24">
				<Card>
					<div slot="header"></div>
					<Row style="margin-bottom:20px;">
						<Col span="3" offset="1">社区名称:</Col>
						<Col span="4">{{settlement.datas.shop_name}}</Col>
						<Col span="2" offset="1">联系人:</Col>
						<Col span="2">{{settlement.datas.realname}}</Col>
						<Col offset="1" span="2">mobile:</Col>
						<Col span="2">{{settlement.datas.mobile}}</Col>
					</Row>
					<Row style="margin-bottom:20px;">
						<Col span="4" offset="1">申请退款金额:</Col>
						<Col span="4"> {{settlement.datas.amount}}
						</Col>
						<Col span="4">申请退款时间:</Col>
						<Col span="5">{{settlement.datas.created_at}}</Col>
					</Row>
					<Row style="margin-bottom:20px;">
						<Col span="3" offset="1">OPENID:</Col>
						<Col span="8"  >{{settlement.datas.openid}}</Col>
						<Col span="3" offset="1">商户单号</Col>
							<Col span="6"  >{{settlement.datas.payment_id}}</Col>
					</Row>
					<Row style="margin-bottom:20px;">
						<Col span="2" offset="1"><label>备注</label></Col>
						<Col span="18"   >
						    <Input type="textarea" v-model="settlement.datas.remark" placeholder="备注"></Input>
						</Col>
					</Row>
				</Card>

				</Col>

			</Row>
			<div slot="footer">
				<Row>
					<Col span="2" offset="8">
					<Button type="info" size="small" @click="handleCheck">确认</Button>
					</Col>
					<Col span="2" offset="1">
					<Button type="info" size="small" @click="handleReject">拒绝</Button>
					</Col>
					<Col span="2" offset="1">
					<Button type="info" size="small">取消</Button>
					</Col>
				</Row>


			</div>
		</Modal>
	</div>
</template>
<script>
export default {
		name: 'cancelorderrefund',
		data() {
			return {
				enableCheck:true,
                pics:{
                    show:false,
                    list:[]
				},
                search:{
                    one:'',
                    two:'',
                    three:'',
                    four:'全国',
                    five:3
                },
                settlement: {
					datas: {

					},
					show: false,

				},
                status:[
					{id:3,val:'全部'},
                    {id:0,val:'未退款'},
                    {id:1,val:'已退款'},
                    {id:2,val:'已拒绝'},
                ],
				loading: true,
				pageSize: 0,
				totalPage: 0,
				currPage: 1,
				newcitylist: [],
				columns1: [],
				data1: []
			};
		},

		methods: {
            handleCheck(){
                //确认退款

				this.$http.post('aftersales/cancelorderrefundcheck',{id:this.settlement.datas.id,status:1}).then((res)=>{
                    if(res.data.rs=='true'){
                        this.settlement.datas.status='已退款'
                        this.settlement.show=false;
						this.$Message.success({
							content:"审核成功"
                        });
					}else{
						this.$Message.error({content:res.data.msg});
					}
				}).catch((err)=>{
					console.log(err);
				});
            },
            handleReject(){
                //拒绝
                	//拒绝时必须填上原因
				if(!this.settlement.datas.remark){
					this.$Message.error({content:"请填上拒绝原因"});
					return;
				}
				this.$http.post('aftersales/cancelorderrefundcheck',{id:this.settlement.datas.id,'remark':this.settlement.datas.remark,status:2}
				).then((res)=>{

					if(res.data.rs=='true'){
                        this.settlement.datas.status='已拒绝';
						this.settlement.show=false;
						this.$Message.success({
							content:"操作成功"
						});

					}else{
						this.$Message.error({content:res.data.msg});
					}

				}).catch((err)=>{
					console.log(err);
				});
            },
			changePage(page) {
				this.currPage = page;
				this.rs = {
					mobile: this.search.one,
					shop_name: this.search.two,
					order_id: this.search.three,
					curpage: this.currPage,
                    city: this.search.four,
                    status:this.search.five
				};
				this.$http.post('aftersales/cancelorderrefund', this.rs).then(
					(res) => {
						this.loading = false;
						this.totalPage = parseInt(res.data.totalPage)
						this.pageSize = parseInt(res.data.pageSize)
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("mobile")) {
								this.search.one = res.data.search.mobile;
							}
							if(res.data.search.hasOwnProperty("shop_name")) {
								this.search.two = res.data.search.shop_name;
							}
							if(res.data.search.hasOwnProperty("order_id")) {
								this.search.three = res.data.search.order_id;
							}
							if(res.data.search.hasOwnProperty("city")) {
								this.search.four = res.data.search.city;
                            }
                            if(res.data.search.hasOwnProperty("status")) {
								this.search.five = res.data.search.status;
							}
						}

						this.data1 =  res.data.rs
					}
				).catch((err) => {
					console.log(err);
				});

			},
			init() {
				this.$http.get('aftersales/cancelorderrefund').then(
					(res) => {
						this.loading = false;
						this.totalPage = parseInt(res.data.totalPage)
						this.pageSize = parseInt(res.data.pageSize)
						this.currPage = parseInt(res.data.currpage)
						this.enableCheck = Boolean(res.data.enableCheck)
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("mobile")) {
								this.search.one = res.data.search.mobile;
							}
							if(res.data.search.hasOwnProperty("shop_name")) {
								this.search.two = res.data.search.shop_name;
							}
							if(res.data.search.hasOwnProperty("order_id")) {
								this.search.three = res.data.search.order_id;
							}
							if(res.data.search.hasOwnProperty("city")) {
								this.search.four = res.data.search.city;
                            }
                            if(res.data.search.hasOwnProperty("status")) {
								this.search.five = res.data.search.status;
							}
						}
                        this.newcitylist = res.data.citys;
						this.data1  = res.data.rs
					}
				).catch((err) => {
					console.log(err);
				});
			},
			handleSearch1() {

				this.rs = {
				    mobile: this.search.one,
					shop_name: this.search.two,
					order_id: this.search.three,
					curpage: this.currPage,
                    city: this.search.four,
                    status:this.search.five
				};
				this.$http.post('aftersales/cancelorderrefund', this.rs).then(
					(res) => {
						this.loading = false;
						this.totalPage = parseInt(res.data.totalPage)
						this.pageSize = parseInt(res.data.pageSize)
						this.currPage = parseInt(res.data.currpage)
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("mobile")) {
								this.search.one = res.data.search.mobile;
							}
							if(res.data.search.hasOwnProperty("shop_name")) {
								this.search.two = res.data.search.shop_name;
							}
							if(res.data.search.hasOwnProperty("order_id")) {
								this.search.three = res.data.search.order_id;
							}
							if(res.data.search.hasOwnProperty("city")) {
								this.search.four = res.data.search.city;
                            }
                            if(res.data.search.hasOwnProperty("status")) {
								this.search.five = res.data.search.status;
							}
						}

						this.data1   = res.data.rs
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
			this.columns1 = [

				 {
                  	key: 'operation',
					width:130,
					sortable: true,
					title: '操作',
					render:(h,params)=>{
						return h('a',{
							attrs:{
								disabled:this.enableCheck||params.row.status!="未退款"
							},
							on:{
								click:()=>{
                               // console.log(params.row);
                                    this.settlement.show = false;
                                    this.$http.get('aftersales/openid&user_id='+params.row.user_id).then((res)=>{

											if(res.data.rs=='true'){
                                        	 this.settlement.datas = params.row;
                                        	this.settlement.datas.amount = parseFloat( this.settlement.datas.amount);
											this.settlement.datas.openid = res.data.openid.openid;
                                         	this.settlement.show = true;
											 }else{
												this.$Notice.error({
											 			title: res.data.msg,
											 			desc: res.data.msg,
											 			duration: 1
											 		});
											 	return;
											 }

                                    }).catch((err)=>{});
								}
							}
						},params.row.status)
					}
                },
				{
					key: 'reason',
					sortable: true,
				    width:160,
                    tooltip:true,
					title: '取消订单原因'
				},

                  {
					key: 'amount',
					sortable: true,
					width:86,
					title: '申请售后金额'
				 },

                {
                    key: 'order_id',
					width:170,
                    tooltip:true,
					sortable: true,
					title: '订单编号'
				} ,
				{
                    key: 'order_no',
					width:230,
                    tooltip:true,
					sortable: true,
					title: '微信单号'
				} ,
				{
                    key: 'payment_id',
					width:170,
                    tooltip:true,
					sortable: true,
					title: '商户单号'
                } ,
				{
					key: 'city',
					sortable: true,
					width:110,
                    tooltip:true,
					title: '市公司'
				},
				{
					key: 'shop_name',
					sortable: true,
					width:220,
                    tooltip:true,
					title: '社区名称'
                },
                {
                    key: 'mobile',
					sortable: true,
					width:130,
					title: '粉丝手机号'
                },

                {
                  	key: 'status',
					width:110,
					sortable: true,
					title: '处理进度'
                }, {
                    key: 'created_at',
					width:150,
					sortable: true,
					title: '申请时间'
                },
                {
                    key: 'username',
					width:150,
					sortable: true,
					title: '审核人'
                },
                {
                    key: 'audited_at',
					width:150,
					sortable: true,
					title: '审核时间'
                }

			];
		}
	};
</script>
