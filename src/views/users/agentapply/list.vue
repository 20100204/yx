<style lang="less">
	@import '../../../styles/common.less';
	@import '../../../styles/table.less';
</style>

<template>
	<div style="width:1500px;">
		<Row :gutter="10">
			<Col span="24">
			<Card>
				<Row :gutter="4">
					<Col span="20">

					<Input v-model="searchConName2" placeholder="请输入代理姓名搜搜..." style="width: 200px" />
					<Input v-model="searchConName3" placeholder="请输入手机号搜搜..." style="width: 200px" />
					<Select v-model="searchConName4" style="width:200px" placeholder="请选所属分公司">
						<Option v-for="(item,ind) in newcitylist" :value="item.area" :label="item.city">{{ item.city }}</Option>
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
						<span @click="handleCheck" style="margin:0px margin-left:4px;">
							 <Button type="info" size="small"   :disabled="enableCheck">审核</Button>
						</span>
					</Col>

				</Row>
	<Row class="margin-top-10 searchable-table-con1">
					<Table :columns="columns1" :data="data1"  :loading="loading" @on-selection-change="handleSelectChange">
					</Table>
					<div style="margin: 10px;overflow: hidden" v-if="totalPage > 1">
						<div style="float: left;">
							<Page :total="totalPage" :current="currPage" :page-size="pageSize" show-total @on-change="changePage"></Page>
						</div>
					</div>
				</Row>
			</Card>

			</Col>
		</Row>
			<Modal v-model="applycheck.show" title="审核" width="500" :closable="applycheck.closable" @on-visible-change="handleShow" >
			<Card>

				<Row style="margin-left:10px;">
					 <Col span="2" offset="9" >
						<Button type="info" size="small" style="margin-right:30px;" @click="handleAgree(1)">同意</Button>
					</Col>
					<Col span="2" offset="2">
						<Button type="info" size="small" style="margin-right:20px;" @click="handleAgree(2)">拒绝</Button>
					</Col>
				</Row>

			</Card>
			<div slot="footer">

			</div>
		</Modal>
		<Modal v-model="pics.show" title="资质图片" width="600"  >


				<Row style="margin-left:10px;"  >
					<Col span="8"   v-for="(item,ind) in pics.datas"  >
					 		<img :src="item" style="width:100%"  @click="picshow(item)"/>
					</Col>

				</Row>

			<div slot="footer">

			</div>
		</Modal>
		<Modal v-model="pics.urlshow" title="资质图片" width="400"  >

 				<img  :src="pics.url" style="width:100%" />

			<div slot="footer">

			</div>
		</Modal>
	</div>
</template>
<script>
	export default {
		name: 'agentapply',
		data() {
			return {
			    pics:{
			        show:false,
					datas:[],
					url:"",
					urlshow:false,
				},
				newcitylist:[],
				applycheck:{
					closable:false,
					show:false,
				},
				ids: [],
				columns1: [],
				data1: [],
				loading: true,
				searchConName1: '',
				searchConName2: '',
				searchConName3: '',
				searchConName4: '',
				curpage: 1,
				totalPage: 1,
				pageSize: 100,
				enableCheck: true,
			}

		},
		computed: {

		},
		methods: {
            picshow(url){
               // console.log(url);
				this.pics.url = url;
				this.pics.urlshow = true;
			},
			handleShow(val){

			},
			handleAgree(type){
				console.log(type);
				if(!(this.ids.length)) {
					this.$Notice.error({
						title: '请选择要审核的代理',
						desc: '请选择要审核的代理',
						duration: 1
					});
					return;
				}
				this.$http.post('shoper/agentcheck',{ids:this.ids,type:type}).then((res)=>{
							if(res.data.rs=='true'){
									this.$Notice.success({
									title: '审核成功',
									desc: '审核成功',
									duration: 1
									});
									this.applycheck.show = false;
									this.$router.go(0);
							}else{
								this.$Notice.error({
									title: res.data.msg,
									desc: res.data.msg,
									duration: 1
									});
							}
				}).catch((err)=>{
					console.log(err);
				});

			},

			handleCheck(){
				//批量审核和审核
				if(!(this.ids.length)) {
					this.$Notice.error({
						title: '请选择要审核的代理',
						desc: '请选择要审核的代理',
						duration: 1
					});
					return;
				}
				this.applycheck.show = true;
			/*	this.$http.post('shoper/agentcheck',this.ids).then((res)=>{

				}).catch((err)=>{
					console.log(err);
				});*/

			},
			handleSelectChange(sel) {
				this.ids = [];
				//console.log(sel);
				if(!sel.length){
					this.data1.forEach((a)=>{
							a._checked=false;
					});
					//alert(123);
				}
				sel.forEach((item) => {
					this.data1.forEach((a)=>{
						//item._checked
						if(a.id==item.id){
							a._checked=true;
						}
					});
					this.ids.push(item.id);
				})
				//console.log(this.data1);

			},
			changePage(page) {
				this.currPage = page;
				this.rs = {
				//	shop_name: this.searchConName1,
					realname: this.searchConName2,
					mobile: this.searchConName3,
					city:this.this.searchConName4,
					curpage: this.currPage,
					//city: this.searchConName4
				};
				this.$http.post('shoper/agentapply', this.rs).then(
					(res) => {
						this.loading = false;
						this.totalPage = parseInt(res.data.totalPage)
						this.pageSize = parseInt(res.data.pageSize)
						this.currPage = parseInt(res.data.currpage)
						this.enableCheck = Boolean(res.data.auth.enableCheck);
						this.data1 =   res.data.rs
					}
				).catch((err) => {
					console.log(err);
				});

			},
			init() {
				this.$http.get('shoper/agentapply').then(
					(res) => {
						this.loading = false;
						this.totalPage = parseInt(res.data.totalPage)
						this.pageSize = parseInt(res.data.pageSize)
						this.currPage = parseInt(res.data.currpage)
						this.enableCheck = Boolean(res.data.auth.enableCheck);
					 	this.newcitylist = res.data.citys;
						//console.log(this.totalPage);
						this.data1 =  res.data.rs
					}
				).catch((err) => {
					console.log(err);
				});
			},
			handleSearch1() {

				this.rs = {
				//	shop_name: this.searchConName1,
					realname: this.searchConName2,
					mobile: this.searchConName3,
					curpage: this.currPage,
					 city: this.searchConName4
				};
				this.$http.post('shoper/agentapply', this.rs).then(
					(res) => {
						this.loading = false;
						this.totalPage = parseInt(res.data.totalPage)
						this.pageSize = parseInt(res.data.pageSize)
						this.currPage = parseInt(res.data.currpage)
						this.enableCheck = Boolean(res.data.auth.enableCheck);
						this.data1 =   res.data.rs
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
					align: 'center',
				},
				 /*{
					key: 'operation',
					sortable: true,
					width: 80,
					title: '操作',
					render: (h, params) => {
						return h('span', [
							h('a', {
								attrs: {
									disabled: this.enableCheck||params.row.status==1||params.row.status==2
								},
								on: {
									click: () => {
										console.log(params.row);
										this.applycheck.show = true;
										params.row._checked=false;
										this.ids=[];
										this.ids.push(params.row.id);
										console.log(params.row);
										this.data1.forEach((a)=>{
												a.__checked=false;
										});


									}
								}
							}, '审核')

						]);

					}
				}, */
				{
					key: 'id',
					width: 90,
					sortable: true,
					title: '申请id'
				},
				{
					key: 'realname',
					width: 90,
					sortable: true,
                    tooltip:true,
					title: '姓名',
				},
				{
					key: 'city',
					sortable: true,
					width: 90,
                    tooltip:true,
					title: '市公司'
				},
				{
					key: 'shop_name',
					sortable: true,
					width: 160,
                    tooltip:true,
					title: '超市名称'
				},
				{
					key: 'status',
					sortable: true,
					width: 110,
					title: '审核状态',
					render: (h, params) => {
						return h('span', {
							props: {
								type: 'text',
								size: 'small'
							},

						}, params.row.status == '1' ? "已审核" : (params.row.status == '2' ? '未通过' : '未审核'));
					}
				},
				{
					key: 'mobile',
					sortable: true,
					width: 110,
                    tooltip:true,
					title: 'mobile'
				},
                {
                    key: 'pics',
                    width: 100,
                    title: '资质图片',
					render:(h,p)=>{
                        if(p.row.pics.length>0){
                            var _this = this;
                            return h('a',{
                                on:{
                                    click:function () {
										_this.pics.show = true;
										_this.pics.datas = p.row.pics;
										console.log(_this.pics.datas);
                                    }
								},
							},'查看')
						}else {
                            return h('span','无')
						}
					}
                },
				{
					key: 'address',
					sortable: true,
                    tooltip:true,
					width: 260,
					title: '地址'

				},
                {
                    key: 'business_scope',
                    tooltip:true,
                    width: 260,
                    title: '经营范围'
                },
				{
					key:'created_at',
					sortable:true,
					width:150,
					title:'申请时间'
				},



			];
		}
	};
</script>
