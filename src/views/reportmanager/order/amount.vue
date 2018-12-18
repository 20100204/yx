<template>
    <div>
       <Card>
             <p slot="title" style="font-size:18px;">
                 <Row>
                     <Col offset="10">日订单趋势</Col>
                 </Row>
             </p>
           <Row style="margin-top:4px;margin-bottom:8px;"  v-if="today.todayshow">
                       <Col span="2">选择日期:</Col>
                       <Col span="4" >
                            <DatePicker type="date" placeholder="选择日期"  size="small"
                                        v-model="today.search.day"  format="yyyy-MM-dd" style="margin-left:-26px;margin-top:-8px;"	>
                            </DatePicker>
                        </Col>
                       <Col span="2" v-if="!isCity">选择市公司:</Col>
                       <Col span="4" v-if="!isCity">
                       <Select v-model="today.search.area"   size="small" placeholder="市公司" style="margin-left:-26px;margin-top:-2px;"   >
                           <Option v-for="item in citys" :value="item.area" :key="item.area">{{ item.city }}</Option>
                       </Select>
                       </Col>
                       <Col span="1"  >
                             <Button type="primary" shape="circle"   size="small" @click="handleSearchToday">搜索
                             </Button>
                       </Col>

           </Row>
           <Card>
               <trend   ref="todays" oid="todaycharts" :datas="todayData"   v-if="today.todayshow"></trend>
               <Row style="margin-left:60px;"  v-if="today.todayshow">
                   <Col span="4">
                       <span>订单总金额为:{{today.order.all_amount}}</span>
                   </Col>
                   <Col span="4">
                   <span>微信支付金额:{{today.order.wechat_amount}}</span>
                   </Col>
                   <Col span="3">
                        <span>零钱支付金额:{{today.order.balance_amount}}</span>
                   </Col>
                   <Col span="4">
                   <span>预售订单金额:{{today.order.preorder_amount}}</span>
                   </Col>
                   <Col span="3">
                         <span>团购订单金额:{{today.order.groupon_amount}}</span>
                   </Col>
                   <Col span="4">
                         <span>未支付预售订单金额:{{today.order.unpaid_preorder_amount}}</span>
                   </Col>

               </Row>
               <Row style="margin-left:60px;margin-top:4px"  v-if="today.todayshow">
                   <Col span="3">
                   <span>订单总数量为:{{today.order.all_count}}</span>
                   </Col>
                   <Col span="3">
                     <span>预售订单数量为:{{today.order.preorder_count}}</span>
                   </Col>
                   <Col span="3">
                         <span>团购订单数量:{{today.order.groupon_count}}</span>
                   </Col>
                   <Col span="4">
                   <span>未付预售订单数量为:{{today.order.unpaid_preorder_count}}</span>
                   </Col>
                   <Col span="4">
                   <span>未支付团购订单数量为:{{today.order.unpaid_groupon_count}}</span>
                   </Col>
                   <Col span="3">
                   <span>未付团购订单金额:{{today.order.unpaid_groupon_amount}}</span>
                   </Col>
                   <Col span="2" >
                   <Button type="text" size="small" @click="handleMore">更多<Icon type="ios-arrow-down" /></Button>
                   </Col>
               </Row>
               <Row style="margin-left:60px;margin-top:14px" v-if="cancelaftershow" >
                   <Col span="4">
                   <span>取消订单总金额:{{today.cancelOrder.all_amount}}</span>
                   </Col>
                   <Col span="4">
                   <span>用户取消订单金额:{{today.cancelOrder.user_amount}}</span>
                   </Col>
                   <Col span="4">
                   <span>系统取消订单金额:{{today.cancelOrder.system_amount}}</span>
                   </Col>
                   <Col span="4">
                   <span>预售取消订单总金额:{{today.cancelOrder.preorder_amount}}</span>
                   </Col>
                   <Col span="4">
                   <span>团购取消订单总金额:{{today.cancelOrder.groupon_amount}}</span>
                   </Col>
               </Row>
               <Row style="margin-left:60px;margin-top:4px" v-if="cancelaftershow">
                   <Col span="4">
                   <span> 取消订单总数量:{{today.cancelOrder.all_count}}</span>
                   </Col>
                   <Col span="4">
                   <span>用户取消订单数量:{{today.cancelOrder.user_count}}</span>
                   </Col>
                   <Col span="4">
                   <span>系统取消订单数量:{{today.cancelOrder.system_count}}</span>
                   </Col>

                   <Col span="4">
                   <span>预售取消订单数量:{{today.cancelOrder.preorder_count}}</span>
                   </Col>
                   <Col span="4">
                   <span>团购取消订单数量:{{today.cancelOrder.groupon_count}}</span>
                   </Col>
               </Row>
               <Row style="margin-left:60px;margin-top:14px" v-if="cancelaftershow">
                   <Col span="4">
                   <span>退货订单总金额:{{today.aftersales.all_amount}}</span>
                   </Col>
                   <Col span="4">
                    <span>退货订单总数量:{{today.aftersales.all_count}}</span>
                   </Col>
                   <Col span="4">
                   <span>预售退货订单金额:{{today.aftersales.preorder_amount}}</span>
                   </Col>
                   <Col span="4">
                   <span>团购退货订单金额:{{today.aftersales.groupon_amount}}</span>
                   </Col>

                   <Col span="3">
                   <span>预售退货订单数量:{{today.aftersales.preorder_count}}</span>
                   </Col>
                   <Col span="3">
                   <span>团购退货订单数量:{{today.aftersales.groupon_count}}</span>
                   </Col>
               </Row>
               <!--<Row style="margin-top:20px;"  v-if="today.todayshow">-->
                   <!--<Col span="3" offset="9">-->
                          <!--<Button type="info" >更多</Button>-->
                   <!--</Col>-->
                   <!--<Col span="3">-->
                         <!--<Button type="info" > 月统计</Button>-->
                   <!--</Col>-->
               <!--</Row>-->
           </Card>
       </Card>
        <!--<Card  v-if="month.show">-->
            <!--<p slot="title" style="font-size:18px;margin-top:20px;">-->
                <!--<Row>-->
                    <!--<Col offset="10">月订单金额统计</Col>-->
                <!--</Row>-->
            <!--</p>-->
            <!--<Row style="margin-top:4px;">-->
                <!--<Col span="2">选择日期:</Col>-->
                <!--<Col span="4">-->
                <!--<DatePicker type="month" placeholder="选择日期"  size="small"-->
                              <!--format="yyyy-MM"	style="margin-left:-26px;margin-top:-8px;"></DatePicker>-->
                <!--</Col>-->
                <!--<Col span="2">选择市公司:</Col>-->
                <!--<Col span="4" >-->
                <!--<Select    filterable size="small" placeholder="市公司" style="margin-left:-26px;margin-top:-2px" :disabled="isCity" >-->
                    <!--<Option v-for="item in citys" :value="item.area" :key="item.area">{{ item.city }}</Option>-->
                <!--</Select>-->
                <!--</Col>-->
                <!--<Col span="1">-->
                <!--<Button type="primary" shape="circle"   size="small" @click="handleSearchMonth">搜索</Button>-->
                <!--</Col>-->

                <!--<Col span="6">-->
                <!--<span style="margin-left:10px;color:palevioletred">-->
                             <!--<Tag :closable="false" color="yellow">月总金额</Tag>-->
                <!--</span>-->
                <!--</Col>-->

            <!--</Row>-->
        <!--</Card>-->
        <!--<Card>-->
            <!--<trend ref="yue" oid="monthcharts" :datas="monthData" v-if="monthshow"  ></trend>-->

        <!--</Card>-->
    </div>
</template>

<script>
    import trend from '../../home/components/show-trends';
    export default {
        name: 'orderamount',
        components:{
            trend,
        },
        data(){
            return {
                isCity:true,
                cancelaftershow:false,
                monthshow:false,
                todayData:{
                    // title: {
                    //     text:'日数据趋势',
                    //     left: 'center'
                    // },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        },
                        enterable:true,
                    },
                    legend: {
                         right: '280',
                         top:'10',
                         data: ['订单金额', '订单数量'],
                         bottom:0,
                         selected:{"订单金额":true,'订单数量':false}
                    },
                    xAxis: {
                        type: 'category',
                        name: 'x',
                        boundaryGap: false,
                        splitLine: {show: false},
                        data: ['01:00',
                            '02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'],
                    },
                    grid: {
                        left: '1%',
                        right: '2%',
                        bottom: '8%',
                        containLabel: true
                    },
                    yAxis: {
                        min:0,
                        max:'dataMax'

                    },
                    series: [
                         {
                            type: 'line',
                             name:"订单金额",
                             itemStyle:{
                                normal:{
                                    label:{show:true,color:'blue'}
                                }
                             },
                             data: [],
                         },
                        {

                            type: 'line',
                            name:"订单数量",
                            itemStyle:{
                                normal:{
                                    label:{show:true,color:"red"}
                                }
                            },
                          //  data: [11,21,31,41,51,61,71,81,91,101,2,3,4,5,6,7,8,9,0,1,12,13,14,15],
                        }
                    ]
                },
                monthData:{
                    title: {
                        text: '月数据趋势',
                        left: 'center'
                    },
                    tooltip: {
                        position: function (pos, params, dom, rect, size) {
                            return pos;
                        },
                       // triggerOn:'click',
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        },
                        enterable:true,
                    },
                    legend: {
                        left: 'right',
                        data: ['总金额', '预售金额','团购金额','已支付订单金额','取消订单金额','退货订单金额'],
                        bottom:0,
                        selected:{"总金额":true,'预售金额':false,'团购金额':false,'已支付订单金额':false,'取消订单金额':false,'退货订单金额':false}
                    },
                    xAxis: {
                        type: 'category',
                        axisTick:{
                            interval:0
                        },
                        axisLabel:{
                            interval:0,
                            rotate:65,
                            color:'black'
                        },
                        name: 'x',
                        boundaryGap: false,
                        splitLine: {show: false},
                        data: this.getDays()
                    },
                    grid: {
                        left: '1%',
                        right: '2%',
                        bottom: '8%',
                        containLabel: true
                    },
                    yAxis: {
                        min:0,
                        max:'dataMax',
                        //splitLine: {show: true}

                    },
                    series: [
                        {

                            itemStyle : {
                                normal : {
                                    label:{show:true},
                                    // color:'green',
                                    // lineStyle:{
                                    //     color:'black'
                                    // }
                                }
                            },
                            type: 'line',
                           // data: [0.8, 0.98, 0.96, 0.27, 0.81, 0.47, 0.74, 0.23, .69, 0.25, 0.36, 0.56]
                        }
                    ]
                },
                citys:[],
                today:{
                    todayshow:false,
                    search:{
                        day:"",
                        area:"",
                    },
                    curday:"",//当前选择日期
                    order:{
                        all_count:0,

                    },
                    cancelOrder:{},
                    aftersales:{}
                },
                month:{
                    show:false
                },
            }
        },
        methods:{
            handleMore(){
                //更多时触发
                if(this.cancelaftershow){
                    this.cancelaftershow = false;
                    return;
                }
                this.$http.post('statictics/moreca',{day:this.today.search.day,area:this.today.search.area}).then((res)=>{
                    this.today.cancelOrder = res.data.cancel;
                    this.today.aftersales = res.data.after;
                    this.cancelaftershow = true;
                }).catch((err)=>{

                });
            },
            curDay(){
                //当前日期
                let  date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                if(month<10){
                    month = String(0)+String(month)
                }
                let d =date.getDate();
                if(d<10){
                    d=String(0)+String(d);
                }
               return String(year)+"-"+String(month)+"-"+String(d);
            },
            curMonth(){
                //当前月
                let  date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                if(month<10){
                    month = String(0)+String(month)
                }
                return String(year)+"-"+String(month)
            },

            getDays(m){
                let date = {};
                //m = '2018-02'
                if(m){
                    date = new Date(m);
                }else{
                    date = new Date();
                }
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                if(month<10){
                    month = String(0)+String(month)
                }
                let d = new Date(year, month, 0);
                let days = d.getDate();
                let rs = [];
                let j =0;
                for (let i=1;i<=days;i++){
                    if(i<10){
                        j=String(0)+String(i);
                    }else{
                        j = String(i);
                    }
                    rs.push(String(year)+'-'+month+'-'+j)
                }
                 return rs;
            },
            // todayShow(v){
            //     //时段数据显示方式
            //     if(v=='trend'){
            //         this.jintian.trend.show = true;
            //         this.jintian.show = false;
            //     }else{
            //
            //         this.jintian.trend.show = false;
            //         this.jintian.show = true;
            //     }
            // },
            // monthShow(v){
            //     //this.monthDatastianshu = this.getDays();
            //     if(v=='trend'){
            //         this.yue.trend.show = true;
            //         this.yue.show = false;
            //
            //     }else{
            //         this.yue.trend.show = false;
            //         this.yue.show = true;
            //     }
            //
            // },

            todayChange(t){
                //天变化
            },
            monthChange(m){
                //月变化
            },
            handleSearchMonth(m){
                //月变化

            },
            handleSearchToday(t){
                //时段搜索
                this.cancelaftershow = false;
                this.todayData.series[0].data=[];
                this.today.order={};
                this.$http.post('statictics/orderamount',this.today.search).then((res)=>{
                    this.todayData.series[0].data= res.data.trend;
                    this.todayData.series[1].data= res.data.count;
                    this.today.order = res.data.order;


                }).catch((err)=>{});
            },

        },
        mounted(){
            this.today.todayshow = true;
            this.$http.get('statictics/orderamount').then((res)=>{

                this.isCity = Boolean(res.data.isCity);
                if(this.isCity){
                    this.today.search.area = res.data.city[0];
                }else{
                    this.citys= res.data.city;
                }
                this.todayData.series[0].data= res.data.trend;
                this.todayData.series[1].data= res.data.count;
                this.today.order = res.data.order;

                this.today.search.day = res.data.today;

              //  this.searchtoday.city = res.data.area;
              //  this.searchmonth.city = res.data.area;
               // this.cityList  = res.data.citys;
               // this.jintian.curToday = res.data.curToday;
                //this.searchtoday.today = this.jintian.curToday

             //   this.todayData.title.text =  this.jintian.curToday+ this.todayData.title.text;



               // this.todayData.series[0].name =  this.todayData.title.text
                // this.todayData.tooltip.formatter = '{a} <br/>{b} : {c}元';
               // this.jintian.table.datas = [];
               //  res.data.rs.map((item,index)=>{
               //    //  this.todayData.series[0].data.push(item);
               //  //    this.jintian.table.datas.push(
               //        //  {time:this.todayData.xAxis.data[index],data:item}
               //    //  );
               //  });
                // this.jintian.trend.show = true;
                // //月数据
                // this.yue.everyDay = this.getDays();
                // this.monthData.series[0].data = [];
                // res.data.monthOrder.map((item,index)=>{
                //      this.monthData.series[0].data.push(item);
                //       this.yue.table.datas.push(
                //          {time:this.yue.everyDay[index],data:item}
                //       )
                // });
               // this.jintian.todayInfo = res.data.todayInfo;
                //var _this = this;
                // this.todayData.tooltip.formatter = function (p,t,callback) {
                //      _this.detailInfo.show = true;
                // }
                // this.yue.trend.show = true;
                // this.yue.curMonth = this.curMonth();
                // this.monthData.title.text =  this.yue.curMonth+ this.monthData.title.text;

            }).catch((err)=>{

            });

        },
    };
</script>

<style scoped>
    .top{
        padding: 10px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
</style>
