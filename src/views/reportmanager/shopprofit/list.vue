 <style lang="less">
	@import '../../../styles/common.less';
	@import '../../../styles/table.less';
</style>

<template>
	<div style="width:1200px">
		<Row :gutter="10">
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
			<Card>
				<Row class="margin-top-10 searchable-table-con1">
					<Table :columns="columns1" :data="data1" :loading="loading"   >

					</Table>
					<div style="margin: 10px;overflow: hidden" v-if="totalPage > 1">
						<div style="float: left;">
							<Page :total="totalPage" :current="currPage" show-total  :page-size="pageSize" @on-change="changePage"></Page>
						</div>
					</div>
				</Row>
			</Card>
			</Col>
		</Row>
	</div>
</template>
<script>


	export default {
		name: 'searchable-table-goods-list',
		data() {
			return {
				loading: true,
				pageSize: 0,
				totalPage: 0,
				currPage: 1,
				searchConName1: '',
				searchConName2: '',
				searchConName3: '',
				searchConName4: '',
				newcitylist: [],
				columns1: [],
				data1: []
			};
		},

		methods: {
			changePage(page) {
				this.currPage = page;
				this.rs = {
					shop_name: this.searchConName1,
					realname: this.searchConName2,
					mobile: this.searchConName3,
					curpage: this.currPage,
					city: this.searchConName4
				};
				this.$http.post('report/profit' + page, this.rs).then(
					(res) => {
						this.loading = false;
						//console.log(res.data);
						this.totalPage = parseInt(res.data.totalPage)
						this.pageSize = parseInt(res.data.pageSize)
						//this.currPage.res.data.currpage
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("shop_name")) {
								this.searchConName1 = res.data.search.shop_name;
							}
							if(res.data.search.hasOwnProperty("realname")) {
								this.searchConName2 = res.data.search.realname;
							}
							if(res.data.search.hasOwnProperty("mobile")) {
								this.searchConName3 = res.data.search.mobile;
							}
							if(res.data.search.hasOwnProperty("city")) {
								this.searchConName4 = res.data.search.city;
							}
						}

						this.data1 = this.initTable1 = res.data.rs
					}
				).catch((err) => {
					console.log(err);
				});

			},
			init() {
				this.$http.get('report/profit').then(
					(res) => {
						this.loading = false;
						//console.log(res.data);
						this.totalPage = parseInt(res.data.totalPage)
						//console.log(this.totalPage);
						this.pageSize = parseInt(res.data.pageSize)
						this.currPage = parseInt(res.data.currpage)
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("shop_name")) {
								this.searchConName1 = res.data.search.shop_name;
							}
							if(res.data.search.hasOwnProperty("realname")) {
								this.searchConName2 = res.data.search.realname;
							}
							if(res.data.search.hasOwnProperty("mobile")) {
								this.searchConName3 = res.data.search.mobile;
							}
							if(res.data.search.hasOwnProperty("city")) {
								this.searchConName4 = res.data.search.city;
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

				this.rs = {

					shop_name: this.searchConName1,
					realname: this.searchConName2,
					mobile: this.searchConName3,
					curpage: this.currPage,
					city: this.searchConName4
				};
				this.$http.post('report/profit', this.rs).then(
					(res) => {
						this.loading = false;
						console.log(res.data);
						this.totalPage = parseInt(res.data.totalPage)
						this.pageSize = parseInt(res.data.pageSize)
						this.currPage = parseInt(res.data.currpage)
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("shop_name")) {
								this.searchConName1 = res.data.search.shop_name;
							}
							if(res.data.search.hasOwnProperty("realname")) {
								this.searchConName2 = res.data.search.realname;
							}
							if(res.data.search.hasOwnProperty("mobile")) {
								this.searchConName3 = res.data.search.mobile;
							}
							if(res.data.search.hasOwnProperty("city")) {
								this.searchConName4 = res.data.search.city;
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
                        type: 'index',
                        width: 80,
						align: 'center',
						title:'排名'
					},
					{
					key: 'amount',
					sortable: true,
					width:110,
					title: '分润金额'
				},
					{
					key: 'city',
					sortable: true,
				    width:140,
                        tooltip:true,
					title: '所属市公司'
				},
				{
					key: 'shop_name',
					sortable: true,
					width:360,
                    tooltip:true,
					title: '社区名'
				},
				{
					key: 'realname',
					sortable: true,
                    tooltip:true,
					width:110,
					title: '店东名'
				},
                 	{
					key: 'mobile',
					width:150,
					sortable: true,
					title: '店东手机号'
				},





			];
		}
	};
</script>
