<template>
    <div>

            <Row>
                <Card>
                    <h3 style="margin-left:300px;">活动内容</h3>
                    <Card :bordered="false">
                        <Row style="margin-bottom:6px;">
                            <Col span="6" offset="1"> 活动标题
                            </Col>
                            <Col span="17"> {{lookactivedata.description}}
                            </Col>
                        </Row>
                        <Row>
                            <Col span="6" offset="1"> 发 起 人
                            </Col>
                            <Col span="4"> {{lookactivedata.active_sender}}
                            </Col>
                            <Col span="6" offset="2"> 发起时间
                            </Col>
                            <Col span="5"> {{lookactivedata.created_at}}
                            </Col>
                        </Row>
                    </Card>
                    <Card>
                        <Row style="margin-bottom:8px;">
                            <Col span="4" offset="1"> 预售价
                            </Col>
                            <Col span="2" offset="1"> {{lookactivedata.price}}
                            </Col>
                            <Col span="2" offset="1"> 采购价
                            </Col>
                            <Col span="2" offset="1"> {{lookactivedata.caigou_price}}
                            </Col>
                            <Col span="2" offset="1"> 规格
                            </Col>
                            <Col span="3" offset="1"> {{lookactivedata.spec}}
                            </Col>
                        </Row>
                        <Row>

                            <Col span="2" offset="1"> 限售</Col>
                            <Col span="1" offset="1"> {{lookactivedata.limit_num}}</Col>
                            <Col span="3" offset="1"> 每人限量</Col>
                            <Col span="1" offset="1"> {{lookactivedata.per_limit_num}}</Col>
                            <Col span="4" offset="1"> 每人限购次数</Col>
                            <Col span="1" offset="1"> {{lookactivedata.per_limit_count}}</Col>
                        </Row>
                        <Row style="margin-top:10px;">
                            <Col span="2" offset="1"> 详情图
                            </Col>
                            <Col span="4">
                            <img :src="lookactivedata.preorder_pic"   style="height:70px;width:70px " />
                            </Col>
                            <Col span="3">产品名称</Col>
                            <Col span="14">{{lookactivedata.sku_title}}</Col>
                        </Row>
                        <Row style="margin-top:10px;">
                            <Col span="3" offset="1"> 销售范围
                            </Col>
                            <Col span="20">
                            {{lookactivedata.active_type}}
                            </Col>
                        </Row>
                    </Card>
                    <Card :bordered="false">
                        <Row style="margin-bottom:6px;">
                            <Col span="4" offset="1"> 预告开始时间
                            </Col>
                            <Col span="6" offset="1"> {{lookactivedata.notice_time}}
                            </Col>
                            <Col span="4" offset="1"> 预售结束时间
                            </Col>
                            <Col span="6" offset="1"> {{lookactivedata.end_time}}
                            </Col>
                        </Row>
                        <Row style="margin-bottom:6px;">
                            <Col span="4" offset="1"> 预售开始时间
                            </Col>
                            <Col span="6" offset="1"> {{lookactivedata.begin_time}}
                            </Col>
                            <Col span="4" offset="1"> 自提开始时间
                            </Col>
                            <Col span="6" offset="1"> {{lookactivedata.pickup_time}}
                            </Col>
                        </Row>
                        <Row style="margin-bottom:6px;">
                            <Col span="4" offset="1"> 分润比
                            </Col>
                            <Col span="6" offset="1"> {{lookactivedata.profit_rate}}
                            </Col>
                            <Col span="4" offset="1"> 自提结束时间
                            </Col>
                            <Col span="6" offset="1"> {{lookactivedata.pickup_end_time}}
                            </Col>
                        </Row>
                        <Row>
                            <Col span="10" offset="1"> 用户注册时间必须大于该时间才能购买(选填)
                            </Col>
                            <Col span="6" offset="1"> {{lookactivedata.user_created_at}}
                            </Col>
                        </Row>
                    </Card>
                    <Card v-if="lookactivedata.shareCoupon.id||lookactivedata.takecoupon.id||lookactivedata.coupons.length>0">
                        <h3 style="margin-left:290px;margin-bottom:10px;">优 惠 券</h3>
                        <Row style="margin-bottom:18px;maring-top:10px;" v-if="lookactivedata.shareCoupon.id">
                            <Col span="4"  offset="1" >分享得券
                            </Col>
                            <Col span="18"  >
                            {{lookactivedata.shareCoupon.coupon_type=="cash"?"现金券":"满减券"}} ----- {{lookactivedata.shareCoupon.title}}
                            <!-- -&#45;&#45;&#45;&#45; {{lookactivedata.shareCoupon.city?lookactivedata.shareCoupon.city:"总部"}}-->
                            </Col>
                        </Row>
                        <Row style="maring-top:10px;" v-if="lookactivedata.takecoupon.id">
                            <Col span="4"  offset="1" >参与得券
                            </Col>
                        </Row>
                        <Row  v-if="lookactivedata.takecoupon.id" style="margin-bottom:18px;">
                            <Col offset="2"  >
                            {{lookactivedata.takecoupon.coupon_type=="cash"?"现金券":"满减券"}} ----- {{lookactivedata.takecoupon.title}}--{{lookactivedata.takecoupon.msg}}

                            </Col>
                        </Row>
                        <Row style="margin-bottom:6px;" v-if="lookactivedata.coupons.length>0">
                            <Col span="4" offset="1">活动可用券
                            </Col>
                        </Row>
                        <Row v-for="item in lookactivedata.coupons" :key="item.id" v-if="lookactivedata.coupons.length>0">
                            <Col offset="2">
                            {{item.coupon_type=="cash"?"现金券":"满减券"}}-----{{item.title}}
                            <span style="margin-left:20px;color:palevioletred">{{item.msg}}</span>
                            </Col>
                        </Row>
                        <Row v-if="lookactivedata.coupons.length>0" style="margin-top:16px;">
                            <Col offset="1" style="color:darksalmon">注:毛利率未减店东分润</Col>
                        </Row>
                    </Card>

                    <Card>
                        <h3 style="margin-left:290px;margin-bottom:10px;">活 动 审 批</h3>

                        <Row style="margin-bottom:6px;">
                            <Col span="4" offset="1">审批状态
                            </Col>
                            <Col span="16" offset="1">
                            <RadioGroup v-model="lookactivedata.preorder_status"  >
                                <Radio label="通过" :disabled="lookactivedata.enableRadio" style="margin-right:30px;"></Radio>
                                <Radio label="拒绝" :disabled="lookactivedata.enableRadio"></Radio>
                            </RadioGroup>
                            </Col>

                        </Row>

                        <Row v-if="lookactivedata.preorder_status=='拒绝'">
                            <Col span="23" offset="1">
                            <Input type="textarea" placeholder="请填退回原因" v-model="lookactivedata.reason" />
                            </Col>

                        </Row>
                        <Row v-if="!lookactivedata.enableRadio" style="margin-top:18px;">
                            <Col>
                            <Button type="info" size="small" style="margin-left:350px;margin-bottom:10px;"   :disabled="lookactivedata.enableCheck" @click.once="handlerCheck">审批</Button>
                            </Col>
                        </Row>
                    </Card>
                    <Card>
                        <h3 style="margin-left:290px;margin-bottom:10px;">市公司审核</h3>
                        <Row style="margin-bottom:6px;">
                            <Col span="4" offset="1">审批时间
                            </Col>
                            <Col span="6" offset="1"> {{lookactivedata.check_time}}
                            </Col>
                            <Col span="4" offset="1"> 审批人
                            </Col>
                            <Col span="6"> {{lookactivedata.checker}}
                            </Col>
                        </Row>
                    </Card>

                </Card>
            </Row>
    </div>
</template>

<script>
    export default {
        name: 'preordercomponents',
        methods:{
            handlerCheck() {
               // console.log(this.lookactivedata);
                if(!this.lookactivedata.preorder_status){
                    this.$Message.error("请选择审批状态");
                    return;
                }
                if(this.lookactivedata.preorder_status=="拒绝"&&!this.lookactivedata.reason){
                    this.$Message.error("请填写拒绝理由");
                    return;
                }
                this.$http.get('approve/check&preorder_id='+this.lookactivedata.id+'&preorder_status='+this.lookactivedata.preorder_status+"&reason="+this.lookactivedata.reason).then((res)=>{
                    if(res.data.rs=='true'){
                        this.$router.go(0);
                    }else {
                        this.$Message.error(res.data.msg);
                    }
                }).catch((err)=>{

                });


            },

        },

        data(){
            return {
                lookactivedata:{
                    enableCheck:true,
                    active_type:'',//销售范围
                    shareCoupon:[],//分享得券
                    coupons:[],//优惠券
                    enableTextarea: false,
                    id: 0,
                    per_limit_num: '', //每人限量
                    per_limit_count: '', //限购次数
                    caigou_price: 0, //采购价格
                    enableRadio: false,
                    active_title: '',
                    active_sender: '',
                    active_created_time: '',
                    user_created_at: '',
                    price: 0,
                    spec: '',
                    preorder_pic: '',
                    limit_num: 0,
                    notice_time: '',
                    end_time: '',
                    begin_time: '',
                    pickup_time: '',
                    profit_rate: '',
                    pickup_end_time: '',
                    check_time: '',
                    checker: 'admin',
                    preorder_status: '',
                    flow_status:1, //当前进度状态
                    flow_show:false,//是否显示进度信息
                    reason: '',
                    sold_out: 40,
                    amount: 126,
                    orderstatus: '已发货',
                    sku_title:"",
                    logs: []
                },
            }
        },
        watch: {
            datas:function(val){
               // console.log(val);
                this.lookactivedata = val;
            }
        },
        props:['datas'],
    };
</script>

<style scoped>

</style>
