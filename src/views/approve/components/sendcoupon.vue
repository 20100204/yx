<template>
    <div>
        <h3 style="margin-left:320px;margin-bottom:10px;"> 审 批</h3>
        <Card>
            <Row>
                <Col span="2" offset="1">申请人</Col>
                <Col span ="4">{{datas.appler}}</Col>
                <Col span ="2" offset="1">申请时间</Col>
                <Col span ="10" offset="1">{{datas.appletime}}</Col>
            </Row>
            <Row style="margin-top:18px;">
                <Col span="2" offset="1">发送范围</Col>
                <Col span ="20" offset="1">{{datas.range}}</Col>
            </Row>
            <Row style="margin-top:18px;">
                <Col span="2" offset="1">发送对象</Col>
                <Col span ="20" offset="1">{{datas.rangedetail}}</Col>
            </Row>
            <Row style="margin-top:18px;">
                <Col span="2" offset="1">优惠券</Col>
                <Col span ="20" offset="1">{{datas.coupon_type}}--{{datas.coupon_title}}</Col>
            </Row>
            <Row style="margin-top:18px;">
                <Col span="2" offset="1">审批状态
                </Col>
                <Col span="16" offset="1">
                <RadioGroup  v-model="datas.checkstatus">
                    <Radio label="通过"   style="margin-right:30px;"></Radio>
                    <Radio label="拒绝" ></Radio>
                </RadioGroup>
                </Col>
            </Row>
            <Row style="margin-top:18px;" v-if="datas.checkstatus=='拒绝'">
                <Col span="23" offset="1">
                <Input type="textarea" placeholder="请填退回原因" v-model="datas.reject_reason"  />
                </Col>

            </Row>
            <Row  style="margin-top:18px;">
                <Col>
                <Button type="info" size="small" style="margin-left:350px;margin-bottom:10px;"    @click.once="handleCheck" :disabled="datas.enableCheck">审批</Button>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>
    export default {
        name: 'sendcouponcom',
        methods:{
            handleCheck(){
                if(!this.datas.checkstatus){
                    this.$Message.error("请选择审批状态");
                    return;
                }
                if(this.datas.checkstatus=="拒绝"&&!this.datas.reject_reason){
                    this.$Message.error("请填写拒绝理由");
                    return;
                }
                this.$http.get('approve/sendcouponcheck&log_id='+this.datas.event_id+'&status='+this.datas.checkstatus+"&reason="+this.datas.reject_reason).then((res)=>{
                    if(res.data.rs=='true'){
                        this.$router.go(0);
                    }else {
                        this.$Message.error(res.data.msg);
                    }
                }).catch((err)=>{

                });
            }
        },
        data(){
            return{
               datas:{
                   enableCheck:true,
               },
            }
        },
        props:["sendcoupon"],
        watch:{
            sendcoupon:function (v) {
                console.log(v);
                this.datas= v;
            }
        }
    };
</script>

<style scoped>

</style>
