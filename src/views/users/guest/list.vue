<style lang="less">
	@import '../../../styles/common.less';
	@import '../components/table.less';
</style>

<template>
	<div style="width:1180px;">
		<Row :gutter="10">
			<Col span="24">
			<Card>
				<Row :gutter="4">
					<Col span="24">
					<Input v-model="searchConName3" placeholder="请输入手机号搜搜..." style="width: 200px" />
					<Input v-model="searchConName4" placeholder="请输入微信昵称搜搜..." style="width: 200px" />
					<Input v-model="searchConName5" placeholder="请输入社区名称搜搜..." style="width: 200px" />
					<Select v-model="searchConName6" style="width:200px" placeholder="请选所属分公司">
						<Option v-for="(item,ind) in newcitylist" :value="item.area" :label="item.city">{{ item.city }}</Option>
					</Select>
					<span @click="handleSearch1" style="margin: 0 10px;">
						<Button type="primary" icon="search">搜索</Button>
					</span>
					</Col>
				</Row>
			</Card>
			<!--<Card :padding="2">
				<Row>
					<Col span="4">
					<span @click="handleAdd" style="margin:0px margin-left:4px;">
							 <Button type="info" size="small" icon="android-add">添加</Button>
						</span>
					</Col>
					<Col span="4">
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
					</Col>
				</Row>

			</Card>-->
			<Card>
				<Row class="margin-top-10 searchable-table-con1">
					<Table :columns="columns1" :data="data1" :loading="loadStatus"   @on-selection-change="handleSelectChange">

					</Table>
					<div style="margin: 10px;overflow: hidden" v-if="totalPage > 1">
						<div style="float: left;">
							<Page :total="totalPage" :current="currPage" :page-size="pageSize" :show-total="true" @on-change="changePage"></Page>
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

	export default {
		name: 'guest',
		data() {
			return {
				loading: true,
				pageSize: 0,
				totalPage: 0,
				currPage: 1,
				searchConName3: '',
				searchConName4: '',
				searchConName5: '',
				searchConName6: '',
				rs: {},
				columns1: [],
				data1: [],
				initTable1: [],
				ids: [],
				tipDia: false,
				newcitylist: [],
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

			handleDel() {
				console.log(this.ids.length);
				if(this.ids.length) {
					var _this = this;
					console.log('tip');
					this.$Modal.confirm({
						title: "删除操作确认",
						content: "真得要删除么？",
						onOk: function() {
							_this.$http.post('item/del',_this.ids).then((res)=>{
								console.log(res);

								_this.$Notice.success({
									title:'delete',
									desc:'删除成功',
									duration:1
								});
								_this.$router.go('goodslist');

							}).catch((err)=>{
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

			changePage(page) {
				this.loading=true;
				this.currPage = page;
				this.rs = {
					nickname: this.searchConName4,
					shop_name: this.searchConName5,
					mobile: this.searchConName3,
					company_name:this.searchConName6,
					curpage: this.currPage
				};
				this.$http.post('guests/list', this.rs).then(
					(res) => {
						this.loading = false;
						//console.log(res.data);
						this.totalPage = parseInt(res.data.totalPage)
						this.pageSize = parseInt(res.data.pageSize)
						this.currPage = parseInt(res.data.currpage)
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("nickname")) {
								this.searchConName4 = res.data.search.nickname;
							}
							if(res.data.search.hasOwnProperty("shop_name")) {
								this.searchConName5 = res.data.search.shop_name;
							}
							if(res.data.search.hasOwnProperty("mobile")) {
								this.searchConName3 = res.data.search.mobile;
							}
							if(res.data.search.hasOwnProperty("company_name")) {
								this.searchConName6 = res.data.search.company_name;
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
				this.$http.get('guests/list').then(
					(res) => {
						this.loading = false;
						//console.log(res.data);
						this.totalPage = parseInt(res.data.totalPage)
						this.pageSize = parseInt(res.data.pageSize)
						this.currPage = parseInt(res.data.currpage)
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("nickname")) {
								this.searchConName4 = res.data.search.nickname;
							}
							if(res.data.search.hasOwnProperty("shop_name")) {
								this.searchConName5 = res.data.search.shop_name;
							}
							if(res.data.search.hasOwnProperty("mobile")) {
								this.searchConName3 = res.data.search.mobile;
							}
						}
						this.newcitylist = res.data.citys;
						//console.log(this.totalPage);
						this.data1 = this.initTable1 = res.data.rs
					}
				).catch((err) => {
					console.log(err);
				});
			},
			handleSearch1() {
				this.loading=true;
				this.rs = {
					nickname: this.searchConName4,
					shop_name: this.searchConName5,
					mobile: this.searchConName3,
					company_name:this.searchConName6,
					mobile: this.searchConName3
				};
				this.$http.post('guests/list', this.rs).then(
					(res) => {
						this.loading = false;
						console.log(res.data);
						this.totalPage = parseInt(res.data.totalPage)
						this.pageSize = parseInt(res.data.pageSize)
						this.currPage = parseInt(res.data.currpage)
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("nickname")) {
								this.searchConName4 = res.data.search.nickname;
							}
							if(res.data.search.hasOwnProperty("shop_name")) {
								this.searchConName5 = res.data.search.shop_name;
							}
							if(res.data.search.hasOwnProperty("mobile")) {
								this.searchConName3 = res.data.search.mobile;
							}
							if(res.data.search.hasOwnProperty("company_name")) {
								this.searchConName6 = res.data.search.company_name;
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
			this.columns1 = [
				{
					key: 'id',
					sortable: true,
					width: 100,
					title: 'user_id'
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
                    width: 160,
                    title: '注册时间',

                },

				{
					key: 'shop_name',
					sortable: true,
                    tooltip:true,
					width: 200,
					title: '所属店东'
				},
				{
					key: 'company_name',
					sortable: true,
                    tooltip:true,
					title: '所属市公司',
					width: 160

				},{
                    key: 'nickname',
                    sortable: true,
                    tooltip:true,
                    width: 120,
                    title: '微信昵称'
                },
                {
                    key: 'addr',
                    sortable: true,
                    width: 260,
                    tooltip:true,
                    title: '店东地址',

                } ,
				/*{
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
