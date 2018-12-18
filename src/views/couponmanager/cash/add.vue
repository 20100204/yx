<style lang="less">
    @import '../../../styles/common.less';
    @import '../../../styles/article-publish.less';

</style>
<template>
    <div style="width:1200px;">
        <Row>
            <Col span="24">
            <Card>
                <Form
                      :label-width="100"
                      :model="couponcash"
                      :rules="ruleValidate"
                      ref="coupon_cash">
                    <FormItem label="优惠券名称" :error="articleError" prop="title">
                        <Input v-model="couponcash.title"   style="width:400px;" placeholder="优惠券名称" />
                        <span style="margin-left:20px;color:darkred">如：<span style="margin-left:20px;">1元券</span></span>
                    </FormItem>
                    <FormItem label="金额" :error="articleError" prop="discount_amount">
                        <InputNumber v-model="couponcash.discount_amount" placeholder="请填优惠券金额" :max="10000" :min="0.01" :step="0.01"></InputNumber>
                    </FormItem>
                    <FormItem label="有效期" :error="articleError" prop="expired">
                        <InputNumber v-model="couponcash.expired" placeholder="请填优惠券有效期" :max="10000" :min="1" :step="1"></InputNumber>天
                    </FormItem>
                    <FormItem label="使用范围" :error="articleError" v-if="!isCity" >
                        <RadioGroup v-model="couponcash.scope" @on-change="handleActiveRange" >
                            <Radio label="全国"  ></Radio>
                            <Radio label="市公司"  ></Radio>
                        </RadioGroup>
                    </FormItem>

                    <FormItem>

                        <Button @click="handlePublish('preorder')" icon="ios-checkmark" style="width:90px; " type="primary">
                            提交
                        </Button>
                        <Button type="primary" @click="handleReset('preorder')" style="margin-left: 8px">
                            重置
                        </Button>
                    </FormItem>
                </Form>
            </Card>
            </Col>
        </Row>
        <Modal v-model="city.show" title="请选择优惠券使用范围" width="380" :closable="false">
            <Table :columns="city.cols" :data="city.datas"   :loading="city.loading" @on-selection-change="handleCityChange" ref="currentCityTable"></Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    export default {
        name: 'couponcashadd',
        data() {
            return {
                isCity:true,
                articleError:'',
                city:{
                    loading:true,
                    show:false,
                    cols:[
                        {
                            type: 'selection',
                            width: 60,
                            align: 'center'
                        },
                        {
                            key: 'city',
                            tooltip:true,
                            title: '市公司'
                        }
                    ],
                    datas:[],
                },
                couponcash: {
                   title:"",
                   discount_amount:0,
                   scope:'全国',
                   scope_info:'',
                   expired:7

                },
                ruleValidate: {
                    title: [{
                        required: true,
                        message: '请输入优惠券名称',

                    },{max:30,message:"名称最多允许30个字符"}],

                    scope: [{
                        required: true,
                        message: '请选择优惠券使用范围',
                    }],
                    expired: [{
                        required: true,
                        type: 'number',
                        min: 1,
                        message: '请输入优惠券有效期',
                    }],
                    discount_amount: [{
                        required: true,
                        type: 'number',
                        min: 0.001,
                        message: '请输入优惠券金额',
                    }],
                }

            };
        },
        mounted(){
            this.$http.get('couponcash/getcompanys').then((res) => {
                this.city.datas = res.data.city;
                this.isCity = Boolean(res.data.isCity);
                if(this.isCity){
                    this.couponcash.scope='市公司';
                    this.couponcash.scope_info =this.city.datas[0];
                }

            }).catch((err) => {
                console.log(err);
            });
        },
        methods: {

            //活动范围市公司
            handleCityChange(selection) {
                let rs=[];
                selection.forEach((item) => {
                    rs.push(item.area);
                })
                this.couponcash.scope_info = rs.join(',');
                console.log(this.couponcash.scope_info);
            },

            handleActiveRange(data1) {
                this.couponcash.scope_info="";
                this.city.show = false;
                this.city.loading = true;
                switch(data1) {
                    case '市公司':
                        this.$http.get('couponcash/getcompanys').then((res) => {
                            this.city.datas = res.data.city;
                            this.isCity = Boolean(res.data.isCity);
                            if(!this.isCity){
                                this.city.show = true;
                                this.city.loading = false;
                            }else {
                                this.couponcash.scope_info =this.city.datas[0];
                            }

                        }).catch((err) => {
                            console.log(err);
                        });
                        break;
                    case '全国':
                        this.couponcash.scope_info ="";
                        break;


                }
                console.log(data1);
                //console.log(data2);
            },

            handlePublish(name) {
                this.$refs.coupon_cash.validate((valid) => {
                    if(valid) {
                        if(this.couponcash.scope!="全国"&&!this.couponcash.scope_info) {
                            this.$Message.error("请选择优惠券使用范围");
                            return;
                        }

                        this.$http.post('couponcash/add', {
                            coupon: this.couponcash
                        }).then((res) => {
                            console.log(res);
                            if(res.data.rs == "true") {
                                  this.$router.push({
                                      name: 'couponcash'
                                  });
                            } else {
                                this.$Message.error(res.data.msg);
                            }
                        }).catch((error) => {

                            console.log(error);
                        });
                    } else {
                        this.$Message.error('请填入必填数据项');
                    }

                });
            }
        }
    }
</script>
