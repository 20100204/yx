<style lang="less">
	@import '../../styles/common.less';
	@import './components/table.less';
</style>
<template>
	<div>
		<Row :gutter="10">

			<Col span="100">
			<Card>
				<Row>
					<Input v-model="searchConName1" placeholder="请输入商品标题搜搜..." style="width: 200px" />
					<Input v-model="searchConName2" placeholder="请输入barcode搜搜..." style="width: 200px" />
					<span @click="handleSearch1" style="margin: 0 10px;">
                        <Button type="primary"
                                icon="search">搜索
                        </Button>
                    </span>
				</Row>

				<Row class="margin-top-10 searchable-table-con1">
					<Table :columns="columns1" :data="data1" :loading="loading"></Table>
				</Row>
				<div style="margin: 10px;overflow: hidden" v-if="totalPage > 1">
					<div style="float: right;">
						<Page :total="totalPage" :current="currPage" :page-size="pageSize" show-total @on-change="changePage"></Page>
					</div>
				</div>
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
	import Axios from 'axios';
	export default {
		name: 'searchable-table-goods',
		data() {
			return {
				pageSize: 0,
				totalPage: 1,
				currPage: 1,
				loading: true,
				picshowurl: '',
				picshow: false,
				closable: false,
				searchConName1: '',
				searchConName2: '',
				columns1: [{
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
						key: 'barcode',
						title: 'barcode'
					},
					{
						key: 'title',
						title: '商品标题'
					},
					{
						key: 'unit',
						title: '最小销售包装单位'
					},
					{
						key: 'is_self_build',
						title: '临时产品'
					},
					 
					{
						key: 'updated_at',
						title: '修改时间'
					}
				],
				data1: [],

			};
		},
		methods: {
		 
			init() {
					Axios.get(this.$store.state.ycypurl + '?r=item/storelist').then((res) => {
					this.loading = false;
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
						 
					}
					this.data1 = res.data.rs
				}).catch((err) => {
						console.log(err);
				});	

			},
			handleSearch1() {
				this.rs = {
					title: this.searchConName1,
					barcode: this.searchConName2
				};
				Axios.post(this.$store.state.ycypurl + '?r=item/storelist',this.rs).then((res) => {
					this.loading = false;
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
						 
					}
					this.data1 = res.data.rs
				}).catch((err) => {
						console.log(err);
				});	
			},
			changePage(page){
				this.currPage = page;
				this.rs = {
					title: this.searchConName1,
					barcode: this.searchConName2,
					curpage: this.currPage
				};
	Axios.post(this.$store.state.ycypurl + '?r=item/storelist',this.rs).then((res) => {
					this.loading = false;
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
					}
					this.data1 = res.data.rs
				}).catch((err) => {
						console.log(err);
				});				}
			
		},
		mounted() {
			this.init();
		}
	};
</script>