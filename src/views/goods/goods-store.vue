<style lang="less">
	@import '../../styles/common.less';
	@import './components/table.less';
</style>
<template>
	<div style="width:1200px;">
		<Row :gutter="10">

			<Col span="100">
			<Card>
				<Row>
					<Input v-model="searchConName1" placeholder="请输入商品标题搜搜..." style="width: 200px" />
					<Input v-model="searchConName2" placeholder="请输入barcode搜搜..." style="width: 200px" />
					<span @click="handleSearch1" style="margin: 0 10px;">
                        <Button type="primary"
                                icon="ios-search" size="small">搜索
                        </Button>
                    </span>
                    <span style="margin-left:10px;">
                    	  <Button type="primary" @click="handleAddsku" size="small" :disabled="endableTosku">加入产品表
                        </Button>
                    </span>
				</Row>

				<Row class="margin-top-10 searchable-table-con1">
					<Table :columns="columns1" :data="data1" :loading="loading" @on-selection-change="handleSelectChange"></Table>
				</Row>
				<div style="margin: 10px;overflow: hidden" v-if="totalPage > 1">
					<div style="float: left;">
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
					<img :src="picshowurl" style="width:100%">

				</Card>
				</Col>
			</Row>
			<div slot="footer"></div>
		</Modal>
	</div>
</template>

<script>

	export default {
		name: 'goods_index',
		data() {
			return {
				ids:[],
				endableTosku:true,
				pageSize: 0,
				totalPage: 1,
				currPage: 1,
				loading: true,
				picshowurl: '',
				picshow: false,
				closable: false,
				searchConName1: '',
				searchConName2: '',
				columns1: [
				     {
								type: 'selection',
								width: 60,
								align: 'center'
					},
				     {
						key: 'pic',
						title: '首图',
						width:100,
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
						width:150,
						sortable: true,
                        tooltip:true,
						title: 'barcode'
					},
					{
						key: 'title',
						width:200,
							sortable: true,
                        tooltip:true,
						title: '商品标题'
					},
					{
						key: 'unit',
							sortable: true,
						title: '最小销售包装单位'
					},
					{
						key: 'is_self_build',
							sortable: true,
						title: '临时产品'
					},

					{
						key: 'updated_at',
						width:150,
							sortable: true,
						title: '修改时间'
					}
				],
				data1: [],

			};
		},
		methods: {
			handleSelectChange(selection) {
				this.ids = selection;
			},
			handleAddsku(){
				//加入到产品表
				//活动复用
				if(!(this.ids.length)) {
						this.$Notice.error({
							title: '请选择要添加的产品',
							desc: '请选择要添加的产品',
							duration: 1
						});
						return;
					}
				this.$http.post('item/addtosku',this.ids).then((res)=>{
					console.log(res);
					if(res.data.rs=='true'){
						this.$Notice.success({
							title: "添加产品成功",
							desc:  "添加产品成功",
							duration: 1
						});
						this.$router.push('/goods/goodslist');
						this.$router.go(0);
					}else{
						this.$Notice.error({
							title: res.data.msg,
							desc: res.data.msg,
							duration: 1
						});
						return;
					}
				}).catch((err)=>{

				});
			},
			init() {
					this.$http.get('item/storelist').then((res) => {
					this.loading = false;
					this.totalPage = parseInt(res.data.totalPage)
					//console.log(this.totalPage);
					this.pageSize = parseInt(res.data.pageSize)
					this.currPage = parseInt(res.data.currpage)
					this.endableTosku = Boolean(res.data.auth.enableTosku);

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
				this.$http.post('item/storelist',this.rs).then((res) => {
					this.loading = false;
					this.totalPage = parseInt(res.data.totalPage)
					//console.log(this.totalPage);
					this.pageSize = parseInt(res.data.pageSize)
					this.currPage = parseInt(res.data.currpage)
					this.endableTosku = Boolean(res.data.auth.endableTosku);
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
	this.$http.post('item/storelist',this.rs).then((res) => {
					this.loading = false;
					this.totalPage = parseInt(res.data.totalPage)
					//console.log(this.totalPage);
					this.pageSize = parseInt(res.data.pageSize)
					this.currPage = parseInt(res.data.currpage)
					this.endableTosku = Boolean(res.data.auth.endableTosku);
					console.log(this.endableTosku);
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
