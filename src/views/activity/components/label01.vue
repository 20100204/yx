<template>
	<div class="label-main">
		<!-- <div class="links">
			<router-link class='link' to='/'>home</router-link>
			<router-link class='link' to='/label01'>打印面单-门店</router-link>
			<router-link class='link' to='/label02'>打印面单-社区代理</router-link>
		</div> -->
		<div class="print" id="print">
			<span @click='print'>打&nbsp;&nbsp;印</span>
		</div>
		<div id="label">
			<div class="box" v-for="v in labelData">
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
						<p>电&nbsp;&nbsp;话：<span class="phone">{{v.mobile}}</span></p>
					</div>
					<div class="otherinfo">
						<p>规格：<span class="size">{{v.specs}}</span></p>
						<p>数量：<span class="num">{{v.quantity}}</span></p>
					</div>
				</div>
				<div class="line"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'label01',
		props: {
			labelData:Array
		},
		data() {
			return {
				/*labelData: [{
					shop_name: '前桃林小区-健铭烟酒超市（洋河蓝色经典）前桃林小区-健铭烟酒超市（洋河蓝色经典）',
					sku_title: '【新人专享】中盐精制盐 专享秒杀.每人限购四袋！！！',
					receiver_name: '小邝',
					mobile: '17603037811',
					specs: '2KG',
					quantity: '1'
				}, {
					shop_name: '前桃林小区-健铭烟酒超市（洋河蓝色经典）',
					sku_title: '【新人专享】中盐精制盐 专享秒杀.每人限购',
					receiver_name: '小邝',
					mobile: '17603037811',
					specs: '2KG',
					quantity: '1'
				},{
					shop_name: '瑞麟公馆-瑞麟便利店',
					sku_title: '赣南鲜橙 2kg/份',
					receiver_name: '小邝',
					mobile: '17603037811',
					specs: '2KG',
					quantity: '1'
				}]*/
			}
		},
		methods: {
			print() {
				let height = document.querySelector('#label-print #label').clientHeight;
				document.querySelector('#label-print .ivu-modal-wrap').style.height = height +'px';
				document.querySelector('body').style.height = height*0.31 +'px';
				window.print();
			}
		}
	}
</script>

<style scoped>
	@import url("../assets/label01.css");
	.label-main {
		height: 100%;
		background: #cccccc;
		padding-bottom: 100px;
		overflow-y: auto;
		overflow-x: hidden;
	}

	@media print {
		.links {
			display: none;
		}
		.label-main {
			height: auto;
			background: white;
		}
		.print {
			display: none;
		}
		#label{
			transform: scale(0.31);
			transform-origin: top left;
		}
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
</style>
