<style lang="less">
	@import '../../../styles/common.less';
	@import '../article-publish.less';
</style>
<template>
	<div>
		<Row>
			<Col span="120">
			<Card>
				<Form :label-width="90" :model="preorder" :rules="ruleValidate" ref="preorder">
					<FormItem label="活动简介" :error="articleError" prop="description">
						<Input v-model="preorder.description" icon="android-list" style="width:600px;" />
					</FormItem>
					<FormItem label="选择商品">
						<Button type="primary" shape="circle" ico="ico-search" @click="handleSkus"> 选择预售商品</Button>
						<Modal v-model="modal1" title="请选择预售产品" width="800">
							<Card>
								<Row>
									<Col span="24">
									<Input v-model="searchConName1" placeholder="请输入商品标题搜搜..." style="width: 200px" />
									<Input v-model="searchConName2" placeholder="请输入barcode搜搜..." style="width: 140px" />
									<Input v-model="searchConName3" placeholder="请输入bn搜搜..." style="width: 140px" />
									<Cascader :data="category" v-model="searchConName4"  style="width:160px;display: inline-block"placeholder="请选择分类..."  ></Cascader>

									<span @click="handleSearch1" style="margin: 0 10px;">
										<Button type="primary" icon="search" size="small">搜索</Button>
									</span>
									</Col>
								</Row>
							</Card>
							<Card>
								<Table :columns="columns1" :loading="loadStatus" size="small" :data="data1.data" @on-current-change="handleSelectsku" highlight-row ref="currentRowTable"></Table>
								<div style="margin: 10px;overflow: hidden" v-if="data1.totalPage > 1">
									<div style="float: right;">
										<Page :total="data1.totalPage" :current="data1.currPage" :page-size="data1.pageSize" show-total @on-change="changePage"></Page>
									</div>
								</div>
							</Card>
						</Modal>
					</FormItem>
					<FormItem label="预售商品" v-if="preorder.sku_id">
						<Row>
							<Table :show-header="showHeader" :columns="columns1" :data="selectSku" :width="width" ref="currentSelectSkuTable"></Table>
						</Row>
					</FormItem>

					<FormItem label="选择活动标签">
						<Button type="info" shape="circle" ico="ico-search" @click="handleLabelSelect" size="small"> 选择活动标签</Button>
						<Button type="info" shape="circle" ico="ico-search" @click="handleLabelDel" size="small"   v-if="preorderLabel.label_name"> 删除活动标签</Button>
					</FormItem>

					<FormItem label="活动标签" v-if="preorderLabel.label_name">
						<Row>
							<Table :show-header="showHeader" width="600" :columns="preorderLabel.keys" :data="preorderLabel.label"  ref="currentSelectPreorderLabelTable"></Table>
						</Row>
					</FormItem>
					<FormItem label="原价格" :error="articleError" prop="origin_price">
						<InputNumber v-model="preorder.origin_price" placeholder="请填原价格" :max="10000" :min="0.01" :step="0.01"></InputNumber>
					</FormItem>
					<FormItem label="采购价格" :error="articleError" prop="caigou_price">
						<InputNumber v-model="preorder.caigou_price" placeholder="请填采购价格" :max="10000" :min="0.01" :step="0.01"></InputNumber>
					</FormItem>
					<FormItem label="预售价格" :error="articleError" prop="price">
						<InputNumber v-model="preorder.price" placeholder="请填预售售价" :max="10000" :min="0.01" :step="0.01"></InputNumber>
					</FormItem>
					<FormItem label="预售数量" :error="articleError" prop="limit_num">
						<InputNumber v-model="preorder.limit_num" placeholder="请填预售数量" :max="10000" :min="1" :step="1"></InputNumber>
					</FormItem>

					<FormItem label="每人限购次数" :error="articleError" prop="per_limit_count">
						<InputNumber v-model="preorder.per_limit_count" placeholder="请填每人限购次数" :min="0" :step="2"></InputNumber>
					</FormItem>
					<FormItem label="每次限购量" :error="articleError" prop="per_limit_num">
						<InputNumber v-model="preorder.per_limit_num" placeholder="请填每次限购量" :min="0" :step="2"></InputNumber>
					</FormItem>
					<FormItem label="营销销量" :error="articleError" prop="fake_sold_out">
						<InputNumber v-model="preorder.fake_sold_out" placeholder="请填营销销量" :min="0" :step="2"></InputNumber>
					</FormItem>
					<FormItem label="排序" :error="articleError" prop="rank">
						<InputNumber v-model="preorder.rank" placeholder="排序" :max="10000" :min="0" :step="1"></InputNumber>
					</FormItem>
					<FormItem label="店东分润百分比" :error="articleError" prop="profit_rate">
						<InputNumber v-model="preorder.profit_rate" placeholder="请填店东分润百分比" :max="100" :min="0" :step="0.1" @on-change="Handleshopprofitchange"	></InputNumber>
						<span style="color:darkred;margin-left:20px;font-size:16px;" v-if="shopprofitrateShow"> 注意：目前店东分润大于20%</span>
					</FormItem>
					<FormItem label="总部分润百分比" :error="articleError" prop="parentcompany_profit_rate">
						<InputNumber v-model="preorder.parentcompany_profit_rate" placeholder="请填总部分润百分比" :max="20" :min="0" :step="0.1"></InputNumber>
					</FormItem>
					<FormItem label="预告时间" :error="articleError" prop="notice_time">
						<DatePicker v-model="preorder.notice_time" @on-change="handleNoticechange" format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="请选择预告时间" style="width: 200px"></DatePicker>
					</FormItem>
					<FormItem label="预售时间" :error="articleError">
						<DatePicker type="datetimerange" @on-change="handlePreorderstartend" placeholder="请选择预售开始和结束时间" style="width: 300px"></DatePicker>
					</FormItem>
					<FormItem label="自提时间" :error="articleError">
						<DatePicker type="datetimerange" @on-change="handlePreorderpickstartend" placeholder="请选择自提开始和结束时间" style="width: 300px"></DatePicker>
					</FormItem>
					<FormItem label="注册时间" :error="articleError" prop="user_created_at">
						<DatePicker v-model="preorder.user_created_at" @on-change="handleUsercreatedat" format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="用户注册时间必须大于该时间才能购买(选填)" style="width: 280px"></DatePicker>
					</FormItem>
					<FormItem label="活动范围" :error="articleError" >
						<RadioGroup v-model="activeRange" @on-change="handleActiveRange" >
							<Radio label="全国"  :disabled="true"></Radio>
							<Radio label="市公司" ></Radio>
							<Radio label="店东或代理"  ></Radio>
						</RadioGroup>
					</FormItem>
					<FormItem label="选择排除社区">
						<Button type="info" shape="circle" ico="ico-search" @click="handleExcludeshops" size="small"> 选择排除社区</Button>

					</FormItem>
					<FormItem label="分享得券" :error="articleError" >

						<Select v-model="preorder.coupon_id" style="width:300px" placeholder="分享得券"  :clearable="true">
							<Option v-for="item in coupon.coupons" :value="item.id" :key="item.id">
								{{ item.title }}</Option>
						</Select>
					</FormItem>
					<FormItem label="参与得券" :error="articleError" >

						<Select v-model="preorder.buy_gift_coupon_id" style="width:300px" placeholder="参与得券"  :clearable="true">
							<Option v-for="item in coupon.coupons" :value="item.id" :key="item.id">
								{{ item.title }}</Option>
						</Select>
					</FormItem>
					<FormItem label="参与得券最大张数" :error="articleError" >
						<InputNumber v-model="preorder.per_buy_gift_coupon_num" placeholder="请填
					 参与得券最大数" :min="0" :step="2"></InputNumber>
						<span style="margin-left:20px;color:crimson">注:粉丝参与活动能获得优惠券张数的最大值,0表示不限制</span>
					</FormItem>
					<FormItem label="使用优惠券" :error="articleError" >
						<Select v-model="preorder.coupon_ids" style="width:300px" placeholder="使用优惠券" :multiple="true">
							<Option v-for="item in coupon.coupons" :value="item.id" :key="item.id">
								{{ item.title }}</Option>
						</Select>
					</FormItem>
					<FormItem label="是否推荐" :error="articleError">
						<i-switch v-model="preorder.is_recommend" true-value="1" false-value="0">
							<span slot="open">是</span>
							<span slot="close">否</span>
					</i-switch>
					</FormItem>

					<FormItem label="活动首图" prop="preorder_pic">
						<pic-upload @uploadpic="handlePicup" :picurl="preorder.preorder_pic"></pic-upload>
					</FormItem>
					<FormItem>

						<Button @click="handlePublish('preorder')" icon="ios-checkmark" style="width:90px; " type="primary">
								    提交
						</Button>
						<Button type="primary" @click="handleReset('preorder')" style="margin-left: 8px">
							 	 重置
						</Button>
					</FormItem>
				</Form>
			</Card>
			</Col>
		</Row>
		<Modal v-model="cityRange" title="请选择预售产品销售城市" width="380">
			<Table :columns="cityKey" :data="city"   :loading="cityRangeloadStatus" @on-selection-change="handleCityChange" ref="currentCityTable"></Table>
		</Modal>

		<Modal v-model="picshow" title="查看">

			<Row>
				<Col span="24">

				<img :src="picshowurl" style="width: 100%">
				</Col>
			</Row>

		</Modal>

		<Modal v-model="preorderLabel.show" title="请选择活动标签" width="620" :closable="preorderLabel.closable">
			<Table :columns="preorderLabel.keys" :data="preorderLabel.datas" :width="width" highlight-row  @on-current-change="handleLabelChange" ref="currentLabelTable"></Table>
		          	<div slot="footer">

		          	</div>
		</Modal>
		<!--社区-->
		<Modal v-model="newshopRange.show" title="请选择预售产品要绑定的店东或代理" width="760">
			<Row>
					<Col span="10">
						<Input v-model="newshopRange.search.shop_name" placeholder="请输入社区名称搜搜..."   />
					</Col>
					<Col span="4" offset="1">
						<Select v-model="newshopRange.search.shop_type_selected"   placeholder="请选社区类型">
							<Option v-for="(item,ind) in newshopRange.shop_type" :value="item.id" :label="item.val"> </Option>
						</Select>
					</Col>
					<Col span="4" offset="1">
						<Select v-model="newshopRange.search.city_selected"   placeholder="请选所属分公司">
							<Option v-for="(item,ind) in newshopRange.city" :value="item.company_name" :label="item.company_name"> </Option>
						</Select>
					</Col>
			</Row>
			<Row style="margin-top:10px;">
					<Col span="7">
						<Input v-model="newshopRange.search.realname" placeholder="请输入联系人搜搜..."   />
					</Col>
				 <Col span="6" offset="2">
						<Input v-model="newshopRange.search.mobile" placeholder="请输入手机号称搜搜..."   />
					</Col>
					<Col span="2" offset="2">
						     <Button type="info" icon="search" @click="handleSearchShops" >搜索</Button>
					</Col>
			</Row>
			<Row style=" margin-top:16px;">
				<Col>
					<Table :columns="newshopRange.keys" :data="newshopRange.datas"  :loading="newshopRange.loading" @on-selection-change="handleShopChange" ref="currentShopTable"></Table>

				</Col>
			</Row>

		</Modal>
		<!--排除社区-->
		<Modal v-model="excludeShops.show" title="请选择排除社区" width="760">
			<Row>
				<Col span="10">
				<Input v-model="excludeShops.search.shop_name" placeholder="请输入社区名称搜搜..."   />
				</Col>
				<Col span="4" offset="1">
				<Select v-model="excludeShops.search.shop_type_selected"   placeholder="请选社区类型">
					<Option v-for="(item,ind) in excludeShops.shop_type" :value="item.id" :label="item.val"> </Option>
				</Select>
				</Col>
				<Col span="4" offset="1">
				<Select v-model="excludeShops.search.city_selected"   placeholder="请选所属分公司">
					<Option v-for="(item,ind) in excludeShops.city" :value="item.company_name" :label="item.company_name"> </Option>
				</Select>
				</Col>
			</Row>
			<Row style="margin-top:10px;">
				<Col span="7">
				<Input v-model="excludeShops.search.realname" placeholder="请输入联系人搜搜..."   />
				</Col>
				<Col span="6" offset="2">
				<Input v-model="excludeShops.search.mobile" placeholder="请输入手机号称搜搜..."   />
				</Col>
				<Col span="2" offset="2">
				<Button type="info" icon="search" @click="handleSearchexcludeShops" >搜索</Button>
				</Col>
			</Row>
			<Row style=" margin-top:16px;">
				<Col>
				<Table :columns="excludeShops.keys" :data="excludeShops.datas"  :loading="excludeShops.loading" @on-selection-change="handleexcludeShopsChange" ref="excludeShops"></Table>

				</Col>
			</Row>
			<div slot="footer"></div>

		</Modal>
	</div>
</template>
<script>
	import picUpload from "../components/file-upload/file-upload.vue"
	export default {
		name: 'preorder-add',
		components: {
			picUpload
		},
		data() {
			return {
                excludeShops:{
                    search:{
                        shop_name:'',
                        shop_type_selected:'2',
                        city_selected:'',
                        realname:'',
                        mobile:''
                    },
                    shop_type:[
                        {id:'2',val:'全部'},
                        {id:'0',val:'店铺'},
                        {id:'1',val:'代理'},
                    ],
                    city:[],
                    show:false,
                    keys:[
                        {
                            type: 'selection',
                            width: 60,
                            align: 'center'
                        },
                        {key:'id',title:'社区id',sortable: true,width:90},
                        {key:'city',tooltip:true,title:'市公司',sortable: true,width:90},
                        {key:'shop_name',tooltip:true,title:'社区名称',sortable: true,width:160},
                        {key:'shop_type',title:'社区类型',sortable: true,width:110},
                        {key:'realname',title:' 联系人',sortable: true,width:90},
                        {key:'mobile',title:'mobile',sortable: true,width:110}

                    ],
                    datas:[],
                    loading:false

				},
                category:[],
			    coupon:{
                    coupons:[],
                },
			    shopprofitrateShow:false,
				newshopRange:{
							 search:{
								 shop_name:'',
								 shop_type_selected:'2',
								 city_selected:'',
								 realname:'',
								 mobile:''
							 },
							shop_type:[
								{id:'2',val:'全部'},
								{id:'0',val:'店铺'},
								{id:'1',val:'代理'},
							],
							city:[],
							show:false,
							keys:[
							 {
						type: 'selection',
						width: 60,
						align: 'center'
					},
								{key:'id',title:'社区id',sortable: true,width:90},
								{key:'city',tooltip:true,title:'市公司',sortable: true,width:90},
								{key:'shop_name',tooltip:true,title:'社区名称',sortable: true,width:160},
								{key:'shop_type',title:'社区类型',sortable: true,width:110},
								{key:'realname',title:' 联系人',sortable: true,width:90},
								{key:'mobile',title:'mobile',sortable: true,width:110}

							],
							datas:[],
							loading:false
				},
				preorderLabel:{
					closable:false,
					show:false,
					loading:true,
					label:[],
					label_name:'',
					keys:[
					/*	{key:'label_name',title:'英文标签',	sortable: true},*/
						{key:'title',title:'中文标签',                    tooltip:true,
                            sortable: true,width:110,align:'center'},
						{key:'description',title:'标签描述',                    tooltip:true,
                            sortable: true},
					],
					datas:[],
				},
				roleId: '',
				searchConName1: '',
				searchConName2: '',
				searchConName3: '',
                searchConName4:[],
				data1: {
					data: [],
					pageSize: 0,
					totalPage: 0,
					currPage: 1,
				},
				cityRangeloadStatus: true,
				picshow: false,
				picshowurl: '',
				loadStatus: true,
				selectSku: [],
				width: 100,
				showHeader: true,
				articleError: '',
				cityRange: false,
				shopRange: false,
				cityKey: [
				    {
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						key: 'company_name',
                        tooltip:true,
                        title: '市公司'
					}
				],
				city: [],
				shoper: [],
				shopKey: [{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						key: 'shop',
                        tooltip:true,
						title: '店东'
					},
					{
						key: 'addr',
                        tooltip:true,

                        title: '地址'
					},
					{
						key: 'shopname',
                        tooltip:true,

                        title: '店东姓名'
					},
					{
						key: 'mob',
                        tooltip:true,
						title: '手机'
					}
				],
				activeRange: '',
				width: '600',
				columns1: [{
						key: 'id',
						title: 'sku_id'
					},
					{
						key: 'title',
                        tooltip:true,
                        title: '商品标题'
					},
					{
						key: 'price',
						title: '价格'
					},
					{
						key: 'specs',
						title: '规格'
					},
					{
						key: 'pic',
						title: '图片',
						render: (h, params)=>{
							return h('a', {
								on: {
									click:() => {
										this.picshowurl = params.row.pic;
										this.picshow = true;

									}
								}
							}, [h('icon', {
								props: {
									type: 'ios-eye-outline',
									size: 20
								}
							})])
						}
					}
				],

				preorder: {
                    fake_sold_out:0,
                    exclude_shops:[],
                    is_recommend:"0",
					label_name:'',
					preorder_pic: '',
					sku_id: '',
					profit_rate: 0,
					parentcompany_profit_rate: 0,
					per_limit_num: 0,
					per_limit_count: 0,
					origin_price: 0,
					caigou_price: 0,
					price: 0,
					coupon_id:"",
                    per_buy_gift_coupon_num:0,
                    buy_gift_coupon_id:"",//参与得券
                    coupon_ids:[],
					notice_time: '',
					user_created_at:'',
					limit_num: 0,
					rank:0,
					begin_time: '',
					end_time: '',
					pickup_time: '',
					pickup_end_time: '',
					description: '',
					content: '',
					active_id: [],
					active_type: '',
					content: '',
				},
				cityRoleIds: [],
				modal1: false,
				ruleValidate: {
					description: [{
						required: true,
						message: '请输入预售标题',
					}],

					profit_rate: [{
						required: true,
						type: 'number',
						min: 0,
						message: '请输入店东分润百分比',
					}],
					parentcompany_profit_rate: [{
						required: true,
						min: 0,
						type: 'number',

						message: '请输入总部分润百分比',
					}],

					limit_num: [{
						required: true,
						type: 'integer',
						min: 1,
						message: '请填写预售数量',
					}],

					price: [{
						required: true,
						min: 0.01,
						type: 'number',
						message: '请输入预售价格',

					}],
					origin_price: [{
						required: true,
						min: 0.01,
						type: 'number',
						message: '请输入原价',

					}],
					caigou_price: [{
						required: true,
						min: 0.01,
						type: 'number',
						message: '请输入采购价格',

					}],
					notice_time: [{
						required: true,
						message: '请填预售通知时间',

					}]
				}

			};
		},
		mounted() {
			this.$http.get('preorder/add').then((res) => {
				//console.log(res);
				if(res.data.roleId == '2') {

					this.preorder.active_id = res.data.admin_id;
					//this.activeRange = '市公司';
					this.roleId = res.data.roleId;
					this.preorder.active_type = '2';
				}
                this.preorder.fake_sold_out =parseInt(res.data.fake_sold_out);
				//this.cityList = res.data.cityList;
				//this.user.city = res.data.companyName;
				//this.user.admin_id = res.data.admin_id;
				//this.roleId = res.data.roleId;

			}).catch((err) => {
				console.log(err);
			});
		},
		methods: {
		    //排除店东
            handleexcludeShopsChange(sel){
				this.preorder.exclude_shops = [];
				sel.forEach((v)=>{
				    this.preorder.exclude_shops.push(v.id);
				})

			},
            handleExcludeshops(){
                this.excludeShops.show = true;
                this.excludeShops.loading = true;
                //this.preorder.active_type = 3;
                this.$http.post('preorder/shops').then((res) => {
                    this.excludeShops.loading = false;
                    if(this.preorder.exclude_shops.length>0){
                        console.log(this.preorder.exclude_shops);
                        this.preorder.exclude_shops.forEach((v)=>{
							var len = res.data.shop.length;
							if(len>0){
							    for (let i=0;i<len;i++){
							        if(v==res.data.shop[i].id){
							            res.data.shop[i]._checked = true;
									  }
								}
							}

						})
					}
                    this.excludeShops.datas = res.data.shop;
                    this.excludeShops.city = res.data.city;
                }).catch((err) => {
                    console.log(err);
                });
			},
			//店东分润改变时触发
            Handleshopprofitchange(val){
                if(val>=20){
                    this.shopprofitrateShow = true;
				}else{
                    this.shopprofitrateShow = false;
				}

			},
			handleLabelDel(){
				//删除活动标签
				this.preorderLabel.label_name='';
				this.preorder.label_name = '';
				this.preorderLabel.label = [];

			},
			handleLabelSelect(){
				//单机选择标签时
				this.preorderLabel.show = true;
				this.$http.get('preorder/labels').then((res)=>{
					console.log(res.data);
					this.preorderLabel.datas = res.data;
				}).catch((err)=>{
					console.log(err);
				});

			},
			handleLabelChange(val){
				//标签选择时
				//alert('changelLabel');
				this.preorderLabel.label = [];
				this.preorderLabel.label.push(val);
				this.preorderLabel.label_name = val.label_name;
				this.preorder.label_name = val.label_name;
				this.preorderLabel.show = false;
			},
			//图片上传
			handlePicup(picurl) {
				console.log(picurl);
				this.preorder.preorder_pic = picurl;
			},
			//搜索
			handleSearch1() {
                this.loadStatus = true;
				this.rs = {
					title: this.searchConName1,
					barcode: this.searchConName2,
					bn: this.searchConName3,
					cat_id:this.searchConName4
				};
				this.$http.post('item/usesku', this.rs).then(
					(res) => {
                        this.loadStatus = false;
						//console.log(res.data);
						this.data1.totalPage = res.data.totalPage
						this.data1.pageSize = res.data.pageSize
						this.data1.currPage = res.data.currpage
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("title")) {
								this.searchConName1 = res.data.search.title;
							}
							if(res.data.search.hasOwnProperty("barcode")) {
								this.searchConName2 = res.data.search.barcode;
							}
							if(res.data.search.hasOwnProperty("bn")) {
								this.searchConName3 = res.data.search.bn;
							}
						}
						this.data1.data = this.initTable1 = res.data.rs
					}
				).catch((err) => {
					console.log(err);
				});
			},
			//活动详情
			handletextarea(val) {
				//this.preorder.content = val;
			},
			handlePreorderpickstartend(val) {
				//console.log(val);
				this.preorder.pickup_time = val[0];
				this.preorder.pickup_end_time = val[1];
				console.log(this.preorder);
			},
			handlePreorderstartend(val) {
				//console.log(val);
				this.preorder.begin_time = val[0];
				this.preorder.end_time = val[1];
			},
			//预告时间
			handleNoticechange(val) {
				//console.log(val);
				this.preorder.notice_time = val;
			},
			//用户注册时间必须大于该时间才能购买(选填)
			handleUsercreatedat(val) {
				this.preorder.user_created_at = val;
			},
			//产品
			changePage(page) {
                this.loadStatus = true;
				this.data1.currPage = page;
				this.rs = {
					title: this.searchConName1,
					barcode: this.searchConName2,
					bn: this.searchConName3,
					cat_id:this.searchConName4,
					curpage: this.data1.currPage
				};
				this.$http.post('item/usesku', this.rs).then(
					(res) => {
						this.loadStatus = false;
						//console.log(res.data);
						this.data1.totalPage = parseInt(res.data.totalPage)
						this.data1.pageSize = parseInt(res.data.pageSize)
						this.data1.currPage = parseInt(res.data.currpage)
						this.data1.data = this.initTable1 = res.data.rs
					}
				).catch((err) => {
					console.log(err);
				});

			},
			//产品
			handleSkus() {

                this.loadStatus = true;
				this.$http.get('item/usesku').then((res) => {
					this.loadStatus = false;
					this.data1.data = res.data.rs;
					this.data1.totalPage = parseInt(res.data.totalPage)
					this.data1.pageSize = parseInt(res.data.pageSize)
					this.data1.currPage = parseInt(res.data.currpage)
					this.category = res.data.category;
					this.modal1 = true;
				}).catch((err) => {
					console.log(err);
				});
			},
			//sku选择变化时
			handleSelectsku(val) {
				this.selectSku = [];
				this.selectSku.push(val);
				this.preorder.sku_id = val.id;
				this.modal1 = false;
			},
			handleShopChange(selection){
				//选择具体的店东时，发生；
				this.preorder.active_id = [];
				selection.forEach((item) => {
					this.preorder.active_id.push(item.id);
				})
				this.preorder.active_type = 3;
                //type1现金券2满减券
                var rs ={
                    scope:this.preorder.active_type,
                    select:this.preorder.active_id
                };
                this.$http.post('preorder/coupons',rs).then((res)=>{
                    //console.log(res);
                    this.coupon.coupons = res.data;
                }).catch((err)=>{});
				//console.log(this.preorder.active_id);
			},
			//活动范围市公司
			handleCityChange(selection) {
				this.preorder.active_id = [];
				selection.forEach((item) => {
					this.preorder.active_id.push(item.id);
				})
				this.preorder.active_type = 2;

                //type1现金券2满减券
                var rs ={
                    scope:this.preorder.active_type,
                    select:this.preorder.active_id
                };
                this.$http.post('preorder/coupons',rs).then((res)=>{
                    //console.log(res);
                    this.coupon.coupons = res.data;
                }).catch((err)=>{});
			},

			handleActiveRange(data1) {
				switch(data1) {
					case '市公司':
					    // if(this.roleId!=2){
						this.cityRange = true;
						this.$http.get('preorder/getcompanys').then((res) => {
							this.cityRangeloadStatus = false;
							this.city = res.data;
						}).catch((err) => {
							console.log(err);
						});
						// }

						break;
					case '全国':
						this.preorder.active_type = 1;
						break;
					case '店东或代理':
					   this.newshopRange.show = true;
						//this.preorder.active_type = 3;
						this.$http.post('preorder/shops').then((res) => {
							this.newshopRange.loading = false;
							this.newshopRange.datas = res.data.shop;
								this.newshopRange.city = res.data.city;
						}).catch((err) => {
							console.log(err);
						});

					break;

				}
				//console.log(data1);
				//console.log(data2);
			},
            handleSearchexcludeShops(){
                this.excludeShops.loading=true;
                this.$http.post('preorder/shops',{search:this.excludeShops.search}).then((res)=>{
                    this.excludeShops.loading=false;
                    this.excludeShops.datas= res.data.shop;
                }).catch((err)=>{
                    console.log(err);
                });
			},
			handleSearchShops(){
			//   console.log(Object.values(this.newshopRange.search));
			//   var arr = Object.values(this.newshopRange.search);
			//   var rs = arr.join("");
			//   console.log(rs);
			//   if(rs.length<1){
			// 	 this.$Notice.warning({
			// 		 title:"请输入搜索条件",
			// 		 duration:1
			// 	 })
			// 	  return;
			//   }
			 this.newshopRange.loading=true;
			  this.$http.post('preorder/shops',{search:this.newshopRange.search}).then((res)=>{
				 // console.log(res);
				 this.newshopRange.loading=false;
				 this.newshopRange.datas=[];
				this.newshopRange.datas= res.data.shop;
			  }).catch((err)=>{
				  console.log(err);
			  });

			},
			handlePublish(name) {

				this.preorder.price = parseFloat(this.preorder.price);
				this.preorder.origin_price = parseFloat(this.preorder.origin_price);
				this.preorder.parentcompany_profit_rate = parseFloat(this.preorder.parentcompany_profit_rate);
				this.preorder.profit_rate = parseFloat(this.preorder.profit_rate);
				this.preorder.limit_num = parseInt(this.preorder.limit_num);
				this.preorder.per_limit_count = parseInt(this.preorder.per_limit_count);
				this.preorder.per_limit_num = parseInt(this.preorder.per_limit_num);
				//console.log(this.preorder);
				this.$refs[name].validate((valid) => {
					if(valid) {
                        if(this.preorder.per_buy_gift_coupon_num>0){
                            if(!this.preorder.buy_gift_coupon_id){
                                this.$Message.error("请选择要送的优惠券");
                                return;
                            }
                        }
						if(!this.preorder.sku_id) {
							this.$Message.error("请选择预售产品");
							return;
						}
						if(!this.preorder.active_type) {
							this.$Message.error("请选择活动范围");
							return;
						}
						if(this.preorder.active_id.length<1) {
							this.$Message.error("请选择活动范围");
							return;
						}
						if(this.preorder.pickup_time <= this.preorder.begin_time) {
							this.$Message.error("提货时间要晚于活动开始时间");
							return;
						}
						if(this.preorder.begin_time <= this.preorder.notice_time) {
							this.$Message.error("活动开始时间要晚于活动通知时间");
							return;
						}
						if(this.preorder.begin_time >= this.preorder.end_time) {
							this.$Message.error("活动结束时间要晚于活动开始时间");
							return;
						}
						if(this.preorder.pickup_time >= this.preorder.pickup_end_time) {
							this.$Message.error("提货结束时间要晚于提货开始时间");
							return;
						}
						if(this.preorder.end_time >= this.preorder.pickup_end_time) {
							this.$Message.error("提货结束时间要晚于活动结束时间");
							return;
						}
						if(!this.preorder.preorder_pic) {
							this.$Message.error("请上传活动首图");
							return;
						}

						this.$http.post('preorder/add', {
							preorder: this.preorder
						}).then((res) => {
							console.log(res);
							if(res.data.rs == "true") {
								this.$router.push({
									name: 'activity_index'
								});
							} else {
								this.$Message.error(res.data.msg);
							}
						}).catch((error) => {

							console.log(error);
						});
					} else {
						this.$Message.error('请填入必填数据项');
					}

				});
			}
		}
	}
</script>
