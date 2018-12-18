<template>
	<div class="label-main">
		<div class="printlabel" id="printlabel">
			<span @click='printLabel'>打&nbsp;&nbsp;印</span>
		</div>
		<div id="labelbox">
			<div class="label01">
				<div class="box" v-for="v in labelData01">
					<div class="title">
						<img src="../assets/logo.png" class="logo" />
						<div class="titlename">
							<p class="zn">配运单</p>
							<p class="en">order</p>
						</div>
					</div>
					<div class="line"></div>
					<div class="userinfo" :class="{gt_userinfo:v.shop_name.length>15,lt_userinfo:v.shop_name.length<=15,lg_userinfo:v.shop_name.length>23}">{{v.shop_name}}</div>
					<div class="product" :class="{gt_product:v.sku_title.length>12,lt_product:v.sku_title.length<=12,lg_product:v.sku_title.length>22}">
						<span class="productname">{{v.sku_title}}</span>
					</div>
					<div class="other">
						<div class="contact">
							<p>联系人：<span class="name">{{v.receiver_name}}</span></p>
							<p>电&nbsp;&nbsp;话：<span class="phone">{{v.mask_mobile}}</span></p>
						</div>
						<div class="otherinfo">
							<p>规格：<span class="size">{{v.specs}}</span></p>
							<p>数量：<span class="num">{{v.quantity}}</span></p>
						</div>
					</div>
					<div class="line"></div>
				</div>
			</div>
			<div class="label02" :class="{label02_margin:labelData01.length>0}">
				<div class="box" v-for="v in labelData02">
					<div class="title">
						<img src="../assets/logo.png" class="logo" />
						<div class="titlename">
							<p class="zn">配运单</p>
							<p class="en">order</p>
						</div>
					</div>
					<div class="line"></div>
					<div class="userinfo" :class="{gt_userinfo:v.shop_name.length>13,lt_userinfo:v.shop_name.length<=13,lg_userinfo:v.shop_name.length>22}">{{v.shop_name}}</div>
					<div class="product">
						<span class="productname" :class="{gt_productname:v.sku_title.length>8,lt_productname:v.sku_title.length<=8,lg_productname:v.sku_title.length>14}">{{v.sku_title}}</span>
						<div class="productinfo">
							<p>规格：<span class="size">{{v.specs}}</span></p>
							<p>数量：<span class="num">{{v.quantity}}</span></p>
						</div>
					</div>
					<div class="other">
						<div class="contact">
							<p>收货人：<span class="name">{{v.receiver_name}}</span></p>
							<p>电&nbsp;&nbsp;话：<span class="phone">{{v.mask_mobile}}</span></p>
						</div>
						<div class="otherinfo">
							<p :class="{gt_p:v.address.length>6,lg_p:v.address.length>9}">{{v.address}}</p>
							<!-- <p>{{v.unit}}</p>
							<p>{{v.number}}</p> -->
						</div>
					</div>
					<div class="line"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'labelPrint',
		props: {
			  labelData:{
				  type:Array
			  }
		},
		mounted () {
			//this.init();
		},
		watch:{
			labelData:function(labelData,oldLabelData){
				// console.log(labelData);
                    this.newLableData =[];
                    this.labelData01=[];
                    this.labelData02 = [];
					this.newLableData = labelData;
					this.newLableData.map((v)=>{
						if(v.shop_type=='1'||v.home_delivery=='1'){
                            this.labelData02.push(v);
						}else if(v.shop_type=='0'){
                            this.labelData01.push(v);

						}
					})
			//	console.log(this.labelData01);
			//	console.log(this.labelData02);
			//	console.log(this.labelData);
			}
		},
		data() {
			return {
				newLableData:[],
				// labelData: [{
				// 	shop_type:1,
				// 	shop_name: '前桃林小区-健铭烟酒超市（洋河蓝色经典）前桃林小区-健铭烟酒超市（洋河蓝色经典）',
				// 	sku_title: '【新人专享】中盐精制盐 专享秒杀.每人限购四袋！！！',
				// 	receiver_name: '小邝',
				// 	mobile: '17603037811',
				// 	specs: '2KG',
				// 	quantity: '1'
				// },{
				// 	shop_type:0,
				// 	shop_name: '前桃林小区-健铭烟酒超市（洋河蓝色经典）前桃林小区-健铭烟酒超市（洋河蓝色经典）',
				// 	sku_title: '【新人专享】中盐精制盐 专享秒杀.每人限购四袋！！！',
				// 	name: '小邝',
				// 	phone: '17603037811',
				// 	specs: '2KG',
				// 	quantity: '1',
				// 	unit: '9单元',
				// 	number: '501'
				// }, {
				// 	shop_type:1,
				// 	shop_name: '前桃林小区-健铭烟酒超市（洋河蓝色经典）',
				// 	sku_title: '【新人专享】中盐精制盐 专享秒杀.每人限购',
				// 	receiver_name: '小邝',
				// 	mobile: '17603037811',
				// 	specs: '2KG',
				// 	quantity: '1'
				// },{
				// 	shop_type:1,
				// 	shop_name: '瑞麟公馆-瑞麟便利店',
				// 	sku_title: '赣南鲜橙 2kg/份',
				// 	receiver_name: '小邝',
				// 	mobile: '17603037811',
				// 	specs: '2KG',
				// 	quantity: '1'
				// },{
				// 	shop_type:0,
				// 	shop_name: '前桃林小区-健铭烟酒超市（洋河蓝色经典）前桃林小区-健铭烟酒超市（洋河蓝色经典）',
				// 	sku_title: '【新人专享】中盐精制盐 专享秒杀.每人限购四袋！！！',
				// 	name: '小邝',
				// 	phone: '17603037811',
				// 	specs: '2KG',
				// 	quantity: '1',
				// 	unit: '9单元',
				// 	number: '501'
				// },{
				// 	shop_type:0,
				// 	shop_name: '前桃林小区-健铭烟酒超市（洋河蓝色经典）',
				// 	sku_title: '【新人专享】中盐精制盐 专享秒杀.',
				// 	name: '小邝',
				// 	phone: '17603037811',
				// 	specs: '2KG',
				// 	quantity: '1',
				// 	unit: '9单元',
				// 	number: '501'
				// }, {
				// 	shop_type:0,
				// 	shop_name: '瑞麟公馆-邓荣光',
				// 	sku_title: '赣南鲜橙 2kg/份',
				// 	name: '小邝',
				// 	phone: '17603037811',
				// 	specs: '2KG',
				// 	quantity: '1',
				// 	unit: '9单元',
				// 	number: '501'
				// }],
				labelData01: [],
				labelData02: []
			}
		},
		methods: {
			// init(){
			// 	// console.log(this.labelData);
			// 	this.labelData.map((v)=>{
			// 		if(v.shop_type==1){
			// 			this.labelData01.push(v);
			// 		}else if(v.shop_type==0){
			// 			this.labelData02.push(v);
			// 		}
			// 	})
			// },
			printLabel() {
				let height = document.querySelector('#labelbox').clientHeight;
				document.querySelector('#labels-print .ivu-modal-wrap').style.height = height +'px';
				document.querySelector('body').style.height = height*0.33 +'px';
				window.print();
				// setTimeout(function(){
				// 	document.querySelector('#labels-print .ivu-modal-wrap').style.height = '100%';
				// },1000);
               // console.log(height)
			}
		}
	}
</script>

<style scoped lang='less'>
	@import url("../assets/labelPrint.less");
	.label-main {
		height: 100%;
		background: #cccccc;
		padding-bottom: 100px;
		overflow-y: auto;
		overflow-x: hidden;
	}

	@media print {
		.label-main {
			height: auto;
			background: white;
		}
		.printlabel {
			display: none;
		}
		#labelbox{
			transform: scale(0.31);
			transform-origin: top left;
		}
		.label01{
			.box{
				margin-top: 33.9px;
				padding: 0px;
			}
			.box:first-of-type{
				margin-top: 0px;
			}
			.box .line{
				width: 620px;
			}
			.box .line:last-of-type{
				bottom: 33px;
				margin-left: -310px;
			}
			.box .userinfo{
				width: 100%;
				top: 18%;
			}
			.box .lg_userinfo {
				line-height: 1.1;
			}
			.box .product{
				width: 100%;
				top: 31%;
			}
			.box .other{
				width: 100%;
				top: 60%;
			}
		}
		.label02_margin{
			margin-top: 33.9px;
		}
		.label02{
			.box{
				margin-top: 33.9px;
				padding: 0px;
			}
			.box:first-of-type{
				margin-top: 0px;
			}
			.box .line{
				width: 620px;
			}
			.box .line:last-of-type{
				bottom: 25px;
				margin-left: -310px;
			}
			.box .userinfo{
				width: 100%;
				top: 18%;
			}
			.box .lg_userinfo {
				line-height: 1.1;
			}
			.box .product{
				width: 100%;
			}
			.box .other{
				width: 100%;
				top: 63%;
			}
		}
	}
</style>
