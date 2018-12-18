<template>
    <div  style="width:100%;height:200px;" id="request_con" ></div>
    
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'Requests',
    mounted () {
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            grid: {
                top: '3%',
                left: '1.2%',
                right: '1%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['每日', '每周', '每月', '总数']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '快递/电商',
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {normal: {
                        color: '#398DBF'
                    }},
                    data: [820, 645, 546, 745, 872, 624, 258]
                },
               {
                    name: '快递/电商',
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: false,
                            position: 'bottom'
                        }
                    },
                    data: [379, 268, 354, 269, 310, 478, 358]
                },
                  {
                    name: '快递/电商',
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: false,
                            position: 'top'
                        }
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                  {
                    name: '快递/电商',
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: false,
                            position: 'top'
                        }
                    },
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                  {
                    name: '快递/电商',
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: false,
                            position: 'top'
                        }
                    },
                    data:[379, 268, 354, 269, 310, 478, 358]
                } 
            ]
        };
        const serviceRequestCharts = echarts.init(document.getElementById('request_con'));
        serviceRequestCharts.setOption(option);

        window.addEventListener('resize', function () {
            serviceRequestCharts.resize();
        });
    }
};
</script>