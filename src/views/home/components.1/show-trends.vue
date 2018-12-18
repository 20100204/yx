<template>
	<div id="show-trends"></div>
</template>

<script>
	import echarts from 'echarts';
	export default {
		name: 'showTrends',
		props: {
			shopDatas: Object
		},
		data() {
			return {
				dateArr: [],
				dates: [],
				datas: []
			}
		},
		watch: {
			shopDatas(data) {
				if(data.hasOwnProperty('shopDatas')) {
					this.init();
				}
			}
		},
		/*mounted() {
			if(this.shopDatas.hasOwnProperty('shopDatas')) {
				this.init();
			}
		},*/
		methods: {
			init() {
				this.dateArr = [];
				this.dates = [];
				this.datas = [];
				this.shopDatas.shopDatas.dates.map((dateItem, index) => {
					let dateChaOld, dateChaNew;
					if(this.shopDatas.hasOwnProperty('chinaDateArr')) {
						dateChaOld = this.shopDatas.chinaDateArr[1] - this.shopDatas.chinaDateArr[0];
						dateChaNew = new Date(dateItem) - this.shopDatas.chinaDateArr[0];
						this.dateArr.push(this.shopDatas.chinaDateArr[0]);
						this.dateArr.push(this.shopDatas.chinaDateArr[1]);
					} else if(this.shopDatas.hasOwnProperty('cityDateArr')) {
						dateChaOld = this.shopDatas.cityDateArr[1] - this.shopDatas.cityDateArr[0];
						dateChaNew = new Date(dateItem) - this.shopDatas.cityDateArr[0];
						this.dateArr.push(this.shopDatas.cityDateArr[0]);
						this.dateArr.push(this.shopDatas.cityDateArr[1]);
					}
					if(dateChaNew >= 0 && dateChaNew <= dateChaOld) {
						this.dates.push(dateItem);
						this.datas.push(this.shopDatas.shopDatas.datas[index]);
					}
				});
				this.creatEcharts();
			},
			creatEcharts() {
				let showTrends = echarts.init(document.getElementById('show-trends'));
				const option = {
					title: {
						text: this.shopDatas.shopName,
						textStyle: {
							color: '#333333',
							fontFamily: 'Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif'
						},
						subtext: this.dateArr[0].toLocaleDateString() + '至' + this.dateArr[1].toLocaleDateString()
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
				showTrends.setOption(option);
				window.addEventListener('resize', function() {
					showTrends.resize();
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
	#show-trends {
		width: 100%;
		height: 460px;
	}
</style>