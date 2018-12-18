<template>
	<div :id="oid" style="height:460px;"></div>
</template>

<script>

	import echarts from 'echarts';
	export default {
		//name: 'showTrends',
		props:['oid','datas','curMonth','curToday'],
		data() {
			return {
			    chartGraph:null,

			}
		},
		watch: {
		    datas: {
               handler: function (v) {
                 console.log('ssss');
                //   console.log(v);
                 //  this.chartGraph.clear();
                    this.drawGraph(this.oid, v);
                },
                deep:true
            }
		},
		 mounted(){
		 	  this.drawGraph(this.oid,this.datas);

		 },
		methods: {
		    drawGraph(id,data){
		        let mychart = document.getElementById(id);
		        this.chartGraph  =echarts.init(mychart);
		        this.chartGraph.setOption(data);
                this.chartGraph.on("legendselectchanged",function (obj) {
                    console.log(obj);
                });
		        var _this = this;
                window.addEventListener('resize', function() {
                    _this.chartGraph.resize();
                });
            },
		    beforeDestroy(){
		        if(this.chartGraph){
		            this.chartGraph.clear();
                }
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
