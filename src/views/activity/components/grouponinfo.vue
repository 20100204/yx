<template>
    <div >
        <Card >
            <Row>
                <Col span="3">活动描述</Col>
                <Col span="20">{{activeInfo.description}}</Col>
            </Row>
            <Row style="margin-top:10px;">
                <Col span="3">开团时间</Col>
                <Col span="6">{{activeInfo.begin_time}}</Col>
                <Col span="3">结束时间</Col>
                <Col span="6">{{activeInfo.end_time}}</Col>
            </Row>
            <Row style="margin-top:10px;">
                <Col span="3">预告时间</Col>
                <Col span="6">{{activeInfo.notice_time}}</Col>
                <Col span="2">总销量</Col>
                <Col span="2">{{activeInfo.sold_out}}</Col>
                <Col span="2">限量</Col>
                <Col span="2">{{activeInfo.limit_num}}</Col>
            </Row>
            <Row style="margin-top:10px;">
                <Col span="3">
                   采购价格
                </Col>
                <Col span="20">
                    {{activeInfo.purchase_price}}
                </Col>
            </Row>
        </Card>
        <Card>
            <Table :columns="cols" :data="activeInfo.exclude_shops"
                   size="small" refs="t">

            </Table>
        </Card>
        <Card>
            <Row>
            <Col span="3">
                 活动图片
                </Col>
             <Col span="3">
                <a @click="handleShowImg(activeInfo.pic)">
                    <img :src="activeInfo.pic" style="width:70px;height:70px;"/>
                </a>
             </Col>
                <Col span="3" v-for="item in activeInfo.sku_id" :key ="item">
                <a  @click="handleShowImg(item)">
                    <img :src="item" style="width:70px;height:70px;" />

                </a>

                </Col>
            </Row>
        </Card>
        <Card>
            <Row>
                <Col>活动详情</Col>
            </Row>
            <Row>
                <Col>

                      <p v-html="activeInfo.rank"></p>

                </Col>
            </Row>
        </Card>
        <Modal v-model="pics.show" width="600" :closable="false">
            <div slot="header"></div>
            <img :src="pics.url" />
            <div slot="footer"></div>
        </Modal>
        <Modal v-model="price.show"   :closable="false" >
            <div slot="header"></div>

            <Table :columns="price.cols" :data="price.datas"
                   size="small" refs="b">

            </Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'grouponinfo',
        props:{
            activeb:Object,

        },
        watch:{
            activeb(v){
                this.activeInfo = v;
            },

        },
        methods:{

            handleShowImg(v){
                 this.pics.show = true;
                 this.pics.url = v;
            },
        },
        data(){
            return {
                styleObj:{
                    zIndex:1000
                },
                activeInfo:{},
                pics:{
                    show:false,
                    url:'',
                },
                price:{
                    cols:[
                        {title:"成团数量",key:'groupon_num',sortable:true},
                        {title:"价格",key:'price',sortable:true},
                    ],
                    datas:[],
                    show:false,
                },
                cols:[
                    {title:"销售区域",key:'area',width:100},
                    {title:"原价",key:'origin_price',sortable:true},
                    {title:"售价",key:'tiered_prices',
                        render:(h,p)=>{
                             let len = p.row.tiered_prices.length;

                            return h('a',{
                                on:{
                                    click:()=>{
                                        this.styleObj.styleObj=1000
                                        this.price.datas = [];
                                        this.price.show = true;
                                        this.price.datas = p.row.tiered_prices;

                                    }
                                }
                            },'查看')
                        }
                    },
                    {title:"分润",key:'profit_rate'},
                    {title:"销量",key:'deleted_at',sortable:true},
                    {title:"审核状态",key:'status'}
                ],
            }
    }
    };
</script>

<style lang="less" scoped>

</style>
