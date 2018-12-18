<style lang="less">
	@import '../../../styles/common.less';
	@import '../../../styles/table.less';
</style>

<template>
	<div style="width:1350px;">
		<Row :gutter="10">
			<Col span="24">
			<Card>
				<Row :gutter="4">
					<Col span="4">
					<Input v-model="searchConName1" placeholder="请输入广告标题搜搜..."   /></Col>
					<Col span="2">
					<Select v-model="searchConName3"   placeholder="请选广告状态"  >
						<Option v-for="(item,ind) in status" :value="item.val">{{ item.name }}</Option>
					</Select>
					</Col>
					<Col span="4" v-if="!isCity">
					<Select v-model="searchConName2"   placeholder="请选市公司"  >
						<Option v-for="(item,ind) in city" :value="item.area">{{ item.city }}</Option>
					</Select>
					</Col>
					<Col span="3">
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
							 <Button type="info" size="small" icon="android-add" :disabled="this.add">添加</Button>
						</span>
					</Col>
					<Col span="4">
					<!--<span pull="2" style="margin:0 -140px ">
							 <Button type="warning" size="small" icon="android-delete" @click="handleDel">删除</Button>
					</span>-->
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

				</Row>

			</Card>
			<Card>
				<Row class="margin-top-10 searchable-table-con1">
					<Table :columns="columns1" :data="data1" :loading="loading" @on-selection-change="handleSelectChange">

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
		<Modal v-model="picshow" :closable="closable" width="750">

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

	import Cookies from 'js-cookie';
	export default {
		name: 'searchable-table-goods-list',
		data() {
			return {
			    isCity:false,
				city:[],
				check:true,
				edit:true,
				add:true,
				status:[
					{val:"1",name:"启用"},
					{val:"2",name:"禁用"},
				],
				searchConName1:'',
                searchConName2:'',
                searchConName3:'',
				columns1:[],
				data1:[],
				loading:true,
				testStyle: {
					width: "10px",
					height: "10px"
				},
				auth:{
					//enableAdd:false,
				}, //权限
				picshow:false,
				closable:true,
				picshowurl:'',
				totalPage:0,
				currPage:1,
				pageSize:1,
			};
		},

		methods: {

			handleSelectChange(selection) {
				this.ids = [];
				selection.forEach((item) => {
					this.ids.push(item.id);
				})
			},
			handleAdd() {
				this.$router.push({
					name: 'advertiseadd'
				});
			},
			changePage(page) {
				this.currPage = page;
				this.rs = {
					title: this.searchConName1,
                    area:this.searchConName2,
                    status:this.searchConName3,
                    curpage: this.currPage
				};
				this.$http.post('advertise/list', this.rs).then(
					(res) => {
						this.loading = false;
						//console.log(res.data);
						this.totalPage = parseInt(res.data.totalPage)
						this.pageSize = parseInt(res.data.pageSize)
						this.currPage = parseInt(res.data.currpage)
						this.data1 = this.initTable1 = res.data.rs
						this.auth = res.data.auth;
					}
				).catch((err) => {
					console.log(err);
				});

			},
			init() {
				this.$http.get('advertise/list').then(
					(res) => {
						this.loading = false;
						this.add = Boolean(res.data.add);
						this.edit = Boolean(res.data.edit);
						this.check = Boolean(res.data.check);
						this.isCity = Boolean(res.data.isCity);
						if(!this.isCity){
						    this.city = res.data.city;
						}
						//console.log(res.data);
						this.totalPage = parseInt(res.data.totalPage)
						this.pageSize = parseInt(res.data.pageSize)
						this.currPage = parseInt(res.data.currpage)


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
					area:this.searchConName2,
					status:this.searchConName3
				};
				this.$http.post('advertise/list', this.rs).then(
					(res) => {
						this.loading = false;
						console.log(res.data);
						this.totalPage = parseInt(res.data.totalPage)
						this.pageSize = parseInt(res.data.pageSize)
						this.currPage = parseInt(res.data.currpage)
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
			this.columns1 = [
                {
                    key: 'operation',
                    title: '操作',
                    width:120,
                    render: (h, params) => {
                        var canEdit = true;
                        if(this.isCity){
                            if(params.row.area=="全国"){
                                canEdit =true;
							}else{
                                //canEdit = false;
								if(this.edit){
								    canEdit = true;
								}else{
								    canEdit=false;
								}
							}
						}else {
                          //非分部
							if(this.edit){
							    canEdit = true;
							}else{
							    canEdit = false;
							}
						}

                        return h('a', {

                              attrs:{
                                 disabled:(params.row.status=='1'?true:false)||canEdit

                            },
                            on: {
                                click: () => {
                                    this.$router.push({
                                        path: '/advertisemanager/advertiseedit/' + params.row.id,
                                    });
                                }
                            }
                        }, '编辑')

                    }
                },
				{
					key: 'content',
					width:90,
					title: '广告图',
					render: (h, params) => {
						return h('a', {
							on: {
								click: () => {
									this.picshowurl = params.row.content;
									this.picshow = true;
								}
							}
						}, [h('img', {
							attrs: {
								style: "height:60px;width:60px",
								src: params.row.content
							}
						})]);
					}
				},
				{
				    key:'type',
					width:120,
					title:'广告类型',
					sortable:true,
				},

				{
				    key:'status',
					title:'状态',
                    sortable: true,
					width:110,
					render:(h,p)=>{
				        return h("a",{
				            attrs:{
				                disabled:this.check,
							},
							on:{
				                click:()=>{
				                   this.$Modal.confirm({
									   title:p.row.status=='1'?"禁用该广告":"启用该广告",
									   content:p.row.status=='1'?"禁用该广告":"启用该广告",
                                       onOk:()=>{
									       let status = p.row.status=='1'?2:1;
									       this.$http.get('advertise/status&id='+p.row.id+'&status='+status).then((res)=>{
									           if(res.data.rs=='true'){
									              this.$Message.success("操作成功!");
									              this.$router.go(0);
											   }else{
									               this.$Message.error(res.data.msg);
											   }
										   }).catch((e)=>{})
									       //alert("ok");
									   },
                                       onCancel:()=>{}
								   });
								}
							},
						},p.row.status=='1'?"启用":"禁用");
					}
				},

				{
					key: 'id',
					title: 'id',
					width:100,
					sortable: true
				},
				{
				    key:'area',
					title:'投放范围',
                    tooltip:true,
					width:160,
				},
				{
					key: 'title',
					title: '广告标题',
					width:200,
                    tooltip:true,
					sortable: true
				},

				{
					key: 'pos',
					title: '广告位置',
                    width:120,
                    tooltip:true,
					sortable: true
				},
				{
					key: 'updated_at',
					title: '更新时间',
					width:160,
                    tooltip:true,
					ellipsis: true,
					sortable: true
				},
				{
				    key:'value',
					title:"广告链接id",
					width:120,
				},



		];
	}
	};
</script>
