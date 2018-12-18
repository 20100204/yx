<template>
	<div class="label-main">
		<!-- <div class="links">
			<router-link class='link' to='/'>home</router-link>
			<router-link class='link' to='/label01'>打印面单-门店</router-link>
			<router-link class='link' to='/label02'>打印面单-社区代理</router-link>
		</div> -->
		<div class="print" id="print">
			<span @click="print">打&nbsp;&nbsp;印</span>
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
				<div class="userinfo" :class="{gt_userinfo:v.userInfo.length>15,lt_userinfo:v.userInfo.length<=15,lg_userinfo:v.userInfo.length>23}">{{v.userInfo}}</div>
				<div class="product">
					<span class="productname" :class="{gt_productname:v.productName.length>10,lt_productname:v.productName.length<=10,lg_productname:v.productName.length>21}">{{v.productName}}</span>
					<div class="productinfo">
						<p>规格：<span class="size">{{v.size}}</span></p>
						<p>数量：<span class="num">{{v.num}}</span></p>
					</div>
				</div>
				<div class="other">
					<div class="contact">
						<p>收货人：<span class="name">{{v.name}}</span></p>
						<p>电&nbsp;&nbsp;话：<span class="phone">{{v.phone}}</span></p>
					</div>
					<div class="otherinfo">
						<p>{{v.unit}}</p>
						<p>{{v.number}}</p>
					</div>
				</div>
				<div class="line"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'label02',
		props: {
			// labelData:Array
		},
		data() {
			return {
				labelData: [{
					userInfo: '前桃林小区-健铭烟酒超市（洋河蓝色经典）前桃林小区-健铭烟酒超市（洋河蓝色经典）',
					productName: '【新人专享】中盐精制盐 专享秒杀.每人限购四袋！！！',
					name: '小邝',
					phone: '17603037811',
					size: '2KG',
					num: '1',
					unit: '9单元',
					number: '501'
				},{
					userInfo: '前桃林小区-健铭烟酒超市（洋河蓝色经典）',
					productName: '【新人专享】中盐精制盐 专享秒杀.',
					name: '小邝',
					phone: '17603037811',
					size: '2KG',
					num: '1',
					unit: '9单元',
					number: '501'
				}, {
					userInfo: '瑞麟公馆-邓荣光',
					productName: '赣南鲜橙 2kg/份',
					name: '小邝',
					phone: '17603037811',
					size: '2KG',
					num: '1',
					unit: '9单元',
					number: '501'
				}]
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
	@import url("../assets/label02.css");
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
</style>
