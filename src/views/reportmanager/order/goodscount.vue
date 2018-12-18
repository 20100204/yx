<template>
    <div>
       <Card>
             <p slot="title" style="font-size:18px;">
                 <Row>
                     <Col offset="10">日商品销量统计</Col>
                 </Row>
             </p>
           <Row style="margin-top:4px;margin-bottom:8px;">
                       <Col span="2">选择日期:</Col>
                       <Col span="4" >
                            <DatePicker type="date" placeholder="选择日期"  size="small"
                                        v-model="searchtoday.today" @on-change="handleSearchToday" format="yyyy-MM-dd" style="margin-left:-26px;margin-top:-8px;"	>
                            </DatePicker>
                        </Col>
               <Col span="2">选择市公司:</Col>
                       <Col span="4" >
                       <Select v-model="searchtoday.city"   size="small" placeholder="市公司" style="margin-left:-26px;margin-top:-2px;" :disabled="isCity" >
                           <Option v-for="item in cityList" :value="item.area" :key="item.area">{{ item.city }}</Option>
                       </Select>
                       </Col>
                       <Col span="1"  >
                             <Button type="primary" shape="circle"   size="small" @click="handleSearchToday">搜索</Button>
                       </Col>
                       <Col span="1">
                       <Button type="success" shape="circle"   size="small" @click="handleDownToday" :disabled="!jintian.show">下载</Button>
                       </Col>
                       <Col span="1">
                             <Button type="info" shape="circle"   size="small" @click="todayShow('trend')">图显</Button>
                       </Col>
                       <Col span="1">
                       <Button type="success" shape="circle" size="small" @click="todayShow('grid')">表显</Button>
                       </Col>
                       <Col span="6">
                            <span style="margin-left:10px;color:palevioletred">
                             <Tag :closable="false" color="yellow">日总金额</Tag>{{jintian.todayInfo}}
                            </span>
                       </Col>

           </Row>
           <Card>

               <trend   ref="today" oid="todaycharts" :datas="todayData"  v-if="jintian.trend.show"></trend>
               <Table :columns="jintian.table.cols" size="small" :data="jintian.table.datas" v-if="jintian.show" ref="today"></Table>

           </Card>
       </Card>
        <Card>
            <p slot="title" style="font-size:18px;margin-top:20px;">
                <Row>
                    <Col offset="10">月商品销量统计</Col>
                </Row>
            </p>
            <Row style="margin-top:4px;">
                <Col span="2">选择日期:</Col>
                <Col span="4">
                <DatePicker type="month" placeholder="选择日期"  size="small"
                            v-model="searchmonth.month" @on-change="handleSearchMonth" format="yyyy-MM"	style="margin-left:-26px;margin-top:-8px;"></DatePicker>
                </Col>
                <Col span="2">选择市公司:</Col>
                <Col span="4" >
                <Select v-model="searchmonth.city"  filterable size="small" placeholder="市公司" style="margin-left:-26px;margin-top:-2px" :disabled="isCity" >
                    <Option v-for="item in cityList" :value="item.area" :key="item.area">{{ item.city }}</Option>
                </Select>
                </Col>
                <Col span="1">
                <Button type="primary" shape="circle"   size="small" @click="handleSearchMonth">搜索</Button>
                </Col>
                <Col span="1">
                <Button type="success" shape="circle"   size="small" @click="handleDownMonth">下载</Button>
                </Col>
                <Col span="1">
                <Button type="info" shape="circle"   size="small" @click="monthShow('trend')">图显</Button>
                </Col>
                <Col span="1">
                <Button type="success"  shape="circle"  size="small" @click="monthShow('grid')">表显</Button>
                </Col>
                <Col span="6">
                <span style="margin-left:10px;color:palevioletred">
                             <Tag :closable="false" color="yellow">月总金额</Tag>{{jintian.todayInfo}}
                            </span>
                </Col>

            </Row>
        </Card>
        <Card>
            <trend ref="yue" oid="monthcharts" :datas="monthData"   v-if="yue.trend.show" ></trend>
            <Table :columns="yue.table.cols" size="small" :data="yue.table.datas" v-if="yue.show" ref="month"></Table>
        </Card>
        <Modal v-model="detailInfo.show" :closable="false">
            <div slot="header"></div>
            <div>akaskfkdsaafafasfafsfasfasf</div>
            <div slot="footer"></div>
        </Modal>

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
                detailInfo:{
                    show:false,
                },
                todayData:{
                    title: {
                        text: '日数据趋势',
                        left: 'center'
                    },
                    tooltip: {
                        position: function (pos, params, dom, rect, size) {
                             return pos;
                        },
                        triggerOn:'click',
                        trigger: 'item',
                        axisPointer: {
                            type: 'cross'
                        },
                        enterable:true,
                        // formatter: '{a} <br/>{b} : {c}'
                        // formatter:function (p,t,callback) {
                        //      // this.detailInfo.show = true;
                        //       var rs = '';
                        //       if(p.dataIndex==0){
                        //           rs = '00:00~01:00间信息:'+p.value
                        //       }else if(p.dataIndex<10){
                        //           let a = p.dataIndex+1
                        //           rs = '0'+p.dataIndex+':00~'+'0'+a+':00间信息:'+p.value
                        //       }else{
                        //           let a = p.dataIndex+1
                        //           rs = p.dataIndex+':00~'+a+':00间信息:'+p.value
                        //       }
                        //      // return p.seriesName+'<br />'+rs+'<a  @click.native="t">查看详情</a>'
                        //
                        //
                        // }
                    },
                    // legend: {
                    //     left: 'center',
                    //     data: ['本年', '上年'],
                    //     bottom:0
                    // },
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
                        max:'dataMax',

                        //type: 'category',
                      //  name: 'y',
                      //  splitLine: {show: true},

                    },
                    series: [
                         {

                            type: 'line',
                             itemStyle:{
                                normal:{
                                    label:{show:true,color:'blue'}
                                }
                             },
                             data: [],
                             markPoint: {
                                 data: [
                                   //  {type: 'max', name: '最大值'},
                                  //   {type: 'min', name: '最小值'}
                                 ]
                             },

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
                        triggerOn:'click',
                        trigger: 'item',
                        axisPointer: {
                            type: 'cross'
                        },
                        enterable:true,
                        // formatter:function (p,t,callback) {
                        //
                        // }

                    },
                    // legend: {
                    //     left: 'center',
                    //     data: ['本年', '上年'],
                    //     bottom:0
                    // },
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


                searchtoday:{
                    today:'',
                    city:'全国',
                    shop_name:'',
                },
                searchmonth:{
                    month:'2018-7',
                    city:'',
                    shop_name:'',
                },
                monthDatastianshu:[], //每月的天数

                cityList:[],//市公司列表
                jintian:{
                    curItem:'订单金额',
                    trend:{
                        datas:{},
                        show:false,
                    },
                    todayInfo:" ",
                    show:false,
                    curToday:'',//今天日期
                    table:{
                        cols:[
                            {title:'时间',key:'time'},{key:'data',title:'数值'}
                        ],
                        datas:[
                            {time:'00:00',data:10},
                            {time:'01:00',data:40}, {time:'02:00',data:80},
                        ],
                    },

                },
                yue:{
                    everyDay:[],
                    trend:{
                        datas:{},
                        show:false,
                    },
                    show:false,
                    curMonth:'',
                    table:{
                        cols:[
                            {title:'时间',key:'time'},{key:'data',title:'数值'}
                        ],
                        datas:[
                        ],
                    },

                }

            }
        },
        methods:{
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
            todayShow(v){
                //时段数据显示方式
                if(v=='trend'){
                    this.jintian.trend.show = true;
                    this.jintian.show = false;
                }else{

                    this.jintian.trend.show = false;
                    this.jintian.show = true;
                }
            },
            monthShow(v){
                //this.monthDatastianshu = this.getDays();
                if(v=='trend'){
                    this.yue.trend.show = true;
                    this.yue.show = false;

                }else{
                    this.yue.trend.show = false;
                    this.yue.show = true;
                }

            },
            handleDownMonth(){
                //月下载
                this.$refs.month.exportCsv({
                    filename: 'month'
                });
            },
            handleDownToday(){
                //天下载
                this.$refs.today.exportCsv({
                    filename: 'file'
                });
            },
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
                //时段
                this.$http.post('citycmp/curtoday',this.searchtoday).then((res)=>{

                    this.todayData.title.text =  res.data.curToday+ this.jintian.curItem+'数据趋势';
                   // this.todayData.series[0].name =  this.todayData.title.text
                    this.jintian.table.datas = [];
                   // this.todayData.series[0].data = [];
                    res.data.rs.map((item,index)=>{
                        this.jintian.table.datas.push(
                            {time:this.todayData.xAxis.data[index],data:item}
                        );
                    });
                    this.todayData.series[0].data =  res.data.rs;
                    this.jintian.todayInfo = res.data.todayInfo;



                }).catch((err)=>{});

            },
            t(){
                alert("查看详情");
            },
            s(){
                this.detailInfo.show = true
            },
        },
        mounted(){

            this.$http.get('citycmp/curtoday').then((res)=>{
                this.isCity = Boolean(res.data.isCity);
                this.searchtoday.city = res.data.area;
                this.searchmonth.city = res.data.area;
                this.cityList  = res.data.citys;
                this.jintian.curToday = res.data.curToday;
                this.searchtoday.today = this.jintian.curToday

                this.todayData.title.text =  this.jintian.curToday+ this.todayData.title.text;



                this.todayData.series[0].name =  this.todayData.title.text
                // this.todayData.tooltip.formatter = '{a} <br/>{b} : {c}元';
                this.jintian.table.datas = [];
                res.data.rs.map((item,index)=>{
                    this.todayData.series[0].data.push(item);
                    this.jintian.table.datas.push(
                        {time:this.todayData.xAxis.data[index],data:item}
                    );
                });
                this.jintian.trend.show = true;
                //月数据
                this.yue.everyDay = this.getDays();
                this.monthData.series[0].data = [];
                res.data.monthOrder.map((item,index)=>{
                     this.monthData.series[0].data.push(item);
                      this.yue.table.datas.push(
                         {time:this.yue.everyDay[index],data:item}
                      )
                });
                this.jintian.todayInfo = res.data.todayInfo;
                var _this = this;
                this.todayData.tooltip.formatter = function (p,t,callback) {
                     _this.detailInfo.show = true;
                }
                this.yue.trend.show = true;
                this.yue.curMonth = this.curMonth();
                this.monthData.title.text =  this.yue.curMonth+ this.monthData.title.text;

            }).catch((err)=>{

            });




          // console.log('testestetes');
        },
    };
</script>

<style scoped>

</style>
