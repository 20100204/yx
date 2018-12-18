<template>
	<div id="shop-trends"></div>
</template>

<script>
	import echarts from 'echarts';
	export default {
		name: 'shoTrends',
		props: {
			shopTrendDatas: Object
		},
		data() {
			return {
				dateArr: [],
				dates: [],
				datas: []
			}
		},
		/*mounted() {
			if(this.shopTrendDatas.hasOwnProperty('dateArr')) {
				this.init();
			}
		},*/
		watch: {
			shopTrendDatas(data) {
				if(data.hasOwnProperty('dateArr')) {
					this.init();
				}
			}
		},
		methods: {
			init() {
				this.dateArr = this.shopTrendDatas.dateArr;
				this.dates = this.shopTrendDatas.dates;
				this.datas = this.shopTrendDatas.datas;
				this.creatEcharts();
			},
			creatEcharts() {
				let txt;
				if(this.shopTrendDatas.hasOwnProperty('dateArr')) {
					txt = this.dateArr[0].toLocaleDateString() + '至' + this.dateArr[1].toLocaleDateString();
				} else {
					txt = '';
				}
				let shopTrends = echarts.init(document.getElementById('shop-trends'));
				const option = {
					title: {
						/*text: this.shopDatas.shopName,
						subtext: this.dateArr[0].toLocaleDateString() + '至' + this.dateArr[1].toLocaleDateString()*/
						text: txt,
						textStyle: {
							color: '#333333',
							fontFamily: 'Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif'
						},
					},
					color: ['#2D8CF0', '#64D572', '#FFD572', '#F25E43'],
					legend: {
						data: ['订单数量', '交易金额', '粉丝数量', '分润'],
						width: '50%',
						top: '5%',
						right: 'right'
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					barGap: '20%',
					grid: {
						top: '15%',
						left: '0%',
						right: '3%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						data: this.dates
					}],
					yAxis: [{
						type: 'value',
						boundaryGap: [0, 0.01]
					}],
					series: [{
							name: '订单数量',
							type: 'line',
							smooth: false,
							/*stack: '总量',*/
							label: {
								normal: {
									show: false,
									color: '#000',
								}
							},
							data: this.getData('orderNum')
						},
						{
							name: '交易金额',
							type: 'line',
							smooth: false,
							/*stack: '总量',*/
							label: {
								normal: {
									show: false,
									color: '#000',
								}
							},
							data: this.getData('orderMoney')
						},
						{
							name: '粉丝数量',
							type: 'line',
							smooth: false,
							/*stack: '总量',*/
							label: {
								normal: {
									show: false,
									color: '#000',
								}
							},
							data: this.getData('starNum')
						},
						{
							name: '分润',
							type: 'line',
							smooth: false,
							/*stack: '总量',*/
							label: {
								normal: {
									show: true,
									color: '#000',
								}
							},
							data: this.getData('profit')
						}
					]
				};
				shopTrends.setOption(option);
				window.addEventListener('resize', function() {
					shopTrends.resize();
				});
			},
			getData(name) {
				let arr = [];
				this.datas.map((v) => {
					arr.push(v[name]);
				});
				return arr;
			}
		}
	}
</script>

<style lang="less">
	#shop-trends {
		width: 100%;
		height: 460px;
	}
</style>