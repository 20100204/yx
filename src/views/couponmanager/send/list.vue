<template>
<div style="width:1100px">
        <Card>
            <p slot="title">优惠券发送</p>
            <Row>
                <Col span="2">发送范围:</Col>
                <Col span="18">
                    <RadioGroup v-model="scope.range" @on-change="handleActiveRange">
                        <Radio label="全国" :disabled="true">
                        </Radio>
                        <Radio label="市公司" >
                        </Radio>
                        <Radio label="社区" >
                        </Radio>
                        <Radio label="个人">
                        </Radio>
                    </RadioGroup> <span style="font-size:12px;color:darkred;margin-left:20px;">个人:请输入用户手机号</span>
                </Col>

            </Row>
            <Row v-if="scope.range=='市公司'&&!isCity" style="margin-top:20px;" >
                <Col span="2">选择市公司:
                </Col>
                <Select  v-model="scope.citySelect" style="width:200px"
                        placeholder="选择市公司" >
                    <Option v-for="item in citys" :value="item.area" :key="item.area">
                        {{ item.city }}</Option>
                </Select>

            </Row>
            <Row v-if="scope.range=='社区'" style="margin-top:20px;" >
                <Col span="2" >选择社区:
                </Col>
                <Select  v-model="scope.citySelect" style="width:200px"
                         placeholder="选择市公司" @on-change="handleCityChange" v-if="!isCity">
                    <Option v-for="item in citys" :value="item.area" :key="item.area">
                        {{ item.city }}</Option>
                </Select>
                <Select  v-model="scope.shopSelect" style="width:200px"
                         placeholder="选择社区" >
                    <Option v-for="item in shops" :value="item.id" :key="item.id">
                        {{ item.shop_name }}</Option>
                </Select>

            </Row>
            <Row v-if="scope.range=='个人'" style="margin-top:20px;">
                <Col span="14">
                  <Input   v-model="scope.userSelect" @on-blur="userSelect"  placeholder="请输入用户手机号"  />
                </Col>
            </Row>
            <Row style="margin-top:20px;">
                <Col span="2">选择优惠券:

                </Col>

                <Select v-model="scope.couponType" style="width:100px"
                        placeholder="优惠券类别" @on-change="coupontypeselect">
                    <Option v-for="item in coupon_type" :value="item.val" :key="item.val">
                        {{ item.name }}</Option>
                </Select>
                <Select v-model="scope.couponType2" style="width:260px" placeholder="优惠券">
                    <Option v-for="item in coupons" :value="item.id" :key="item.id">
                        {{ item.title }}</Option>
                </Select>
            </Row>
            <Row style="margin-top:20px;">
                <Col offset="1"><Button type="info" @click="Handlesend" :disabled="enableSend">发送</Button></Col>
            </Row>
        </Card>
</div>
</template>

<script>
    export default {
        name: 'couponsend',
        data(){
            return {
                enableSend:true,
                coupon_type:[
                    {val:'1',name:"现金券"},
                    {val:'2',name:"满减券"},
                    {val:'3',name:"请选择"},
                ],
                citys:[

                ],
                shops:[],
                isCity:false,
                coupons:[],
                scope:{
                    shopSelect:"",
                    userSelect:"",
                    citySelect:"",
                    range:"",
                    couponType:'3',
                    couponType2:"",
                    show:true,
                    loading:false,

                },
            }
        },
        mounted(){
            this.$http.get("coupon/index").then((res)=>{
                this.isCity = Boolean(res.data.isCity);
                this.citys =  res.data.city;
                this.enableSend = Boolean(res.data.enableSend);
                if(this.isCity){
                    this.scope.citySelect = this.citys[0];
                }

            }).catch((err)=>{
                console.log(err);
            });
        },
        methods:{
            handleCityChange(val){
                //市公司变化时，店东变化
                //console.log(val);
                this.$http.post('coupon/cityshop',{area:val}).then((res)=>{
                    //console.log(res);
                    if(res.data.rs=='true'){
                      //  this.$Message.success("发送成功");
                        //   this.scope.couponType="3";
                        this.shops = res.data.datas;
                    }else{
                        this.$Message.error(res.data.msg);

                    }
                }).catch((err)=>{});

            },
            Handlesend(){
                //发送
                if(!this.scope.range){
                    this.scope.couponType="3";
                    this.$Message.error("请先选择优惠券发送范围");
                    return;
                }
                var select ="";
                if(this.scope.range=='市公司'){
                    select = this.scope.citySelect;
                    if(!this.scope.citySelect){
                        this.$Message.error("请选择要送优惠券的市公司");
                        this.scope.couponType="3";
                        return;
                    }

                }
                if(this.scope.range=='社区'){
                    select = this.scope.shopSelect;
                    if(!this.scope.shopSelect){
                        this.$Message.error("请选择要送优惠券的社区");
                        this.scope.couponType="3";
                        return;
                    }

                }
                if(this.scope.range=='个人'){
                    if(!this.scope.userSelect){
                        this.$Message.error("请输入用户手机号");
                        this.scope.couponType="3";
                        return;
                    }
                    var pattern = /^1[345789]\d{9}$/
                    if(!pattern.test(this.scope.userSelect)){
                        this.$Message.error("请输入正确的手机号");
                        this.scope.couponType="3";
                        return;
                    }
                    select = this.scope.userSelect;
                }
                if(!this.scope.couponType2){
                    this.$Message.error("请选择要发送的优惠券");
                    return
                }
                var rs ={
                    scope:this.scope.range,
                    couponId:this.scope.couponType2,
                    select:select
                };
                //console.log(rs);
                this.$http.post('coupon/send',rs).then((res)=>{
                    //console.log(res);
                   if(res.data.rs=='true'){
                       this.$Message.success("发送成功");
                       //this.$router.go(0);
                    //   this.scope.couponType="3";
                   }else{
                       this.$Message.error(res.data.msg);

                   }
                }).catch((err)=>{});


            },
            userSelect(){
                //用户输完手机号后的验证
                if(!this.scope.userSelect){
                    this.$Message.error("请输入用户手机号");
                    return;
                }
              var pattern = /^1[345789]\d{9}$/
                if(!pattern.test(this.scope.userSelect)){
                    this.$Message.error("请输入正确的手机号");
                    return;
                }

            },
            coupontypeselect(sel){
                //优惠券类别发生变化时
                //console.log(this.scope.coupon_type);
                if(sel=='3'){
                    return;
                }
                var select ="";
                 if(!this.scope.range){
                     this.scope.couponType="3";
                     this.$Message.error("请先选择优惠券发送范围");
                     return;
                 }
                 if(this.scope.range=='市公司'){
                     select = this.scope.citySelect;
                     console.log(this.scope.citySelect);
                     if(!this.scope.citySelect){
                         this.$Message.error("请选择要送优惠券的市公司");
                         this.scope.couponType="3";
                         return;
                     }

                 }
                if(this.scope.range=='社区'){
                    select = this.scope.shopSelect;
                    console.log(this.scope.shopSelect);
                    if(!this.scope.shopSelect){
                        this.$Message.error("请选择要送优惠券的社区");
                        this.scope.couponType="3";
                        return;
                    }

                }
                if(this.scope.range=='个人'){

                    if(!this.scope.userSelect){
                        this.$Message.error("请输入用户手机号");
                        this.scope.couponType="3";
                        return;
                    }
                    var pattern = /^1[345789]\d{9}$/
                    if(!pattern.test(this.scope.userSelect)){
                        this.$Message.error("请输入正确的手机号");
                        this.scope.couponType="3";
                        return;
                    }
                    select = this.scope.userSelect;
                }
                //type1现金券2满减券
                var rs ={
                     scope:this.scope.range,
                     type:sel,
                     select:select
                };
                //console.log(rs);
                 this.$http.post('coupon/typechange',rs).then((res)=>{
                     //console.log(res);
                     if(res.data.rs=='false'){
                         this.$Message.error(res.data.msg);
                     }else{
                         this.coupons = res.data;

                     }
                 }).catch((err)=>{});

            },

            handleActiveRange(data1) {
                this.scope.couponType="3";
                console.log(this.scope.citySelect);
                switch(data1) {
                    case '市公司':
                        this.scope.userSelect="";
                        break;
                    case '社区':
                        this.scope.userSelect="";
                        if(!this.isCity){
                            this.scope.citySelect = "";
                        }else{
                            this.$http.post('coupon/cityshop',{area:this.scope.citySelect}).then((res)=>{

                                if(res.data.rs=='true'){
                                    this.shops = res.data.datas;
                                }else{
                                    this.$Message.error(res.data.msg);

                                }
                            }).catch((err)=>{});
                        }
                        break;
                    case '全国':
                        this.scope.userSelect="";
                        this.scope.citySelect = "";
                        break;
                    case '个人':
                        if(!this.isCity){
                            this.scope.citySelect ="";
                        }
                        break;
                }

            },
        }
    };
</script>

<style scoped>

</style>
