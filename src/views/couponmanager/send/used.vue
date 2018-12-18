<style lang="less">
    @import '../../../styles/common.less';
    @import '../../../styles/table.less';
</style>
<template>
    <div style="width:2134px;">
        <Row :gutter="10">
            <Col span="24">
            <Card>
                <Row>
                    <Col span="24">
                        <Select v-model="search.city" style="width:200px" placeholder="市公司" v-if="!isCity">
                            <Option v-for="item in city" :value="item.area" :key="item.area">{{ item.city }}</Option>
                        </Select>
                        <Input v-model="search.shop_name" placeholder="请输入社区名称搜搜..." style="width: 200px;margin-left:8px;"/>
                        <Input v-model="search.mobile" placeholder="请输入粉丝手机号搜搜..." style="width: 160px;margin-left:8px;"/>
                        <Select v-model="search.coupon_type" style="width:150px;margin-left:8px;" placeholder="优惠券类型">
                            <Option v-for="item in couponTypes" :value="item.val" :key="item.val">{{ item.name }}</Option>
                        </Select>
                        <Input v-model="search.title"  placeholder="请输入优惠券名称搜搜..." style="width: 200px;margin-left:8px;"/>
                    </Col>
                </Row>
                <Row style="margin-top:16px;">
                    <Col span="24">
                        <DatePicker v-model="search.used_at" format="yyyy-MM-dd HH:mm:ss" type="datetimerange" placeholder="请选择用券日期"
                                    style="width:300px"></DatePicker>
                        <InputNumber :min="1" v-model="search.coupon_id" placeholder="请输入优惠券id搜搜..."
                               style="width: 130px;margin-left:8px;"/>

                        <span @click="handleSearch" style="margin-left: 20px;">
                                    <Button type="primary" icon="search">搜索</Button>
                         </span>

                    <span v-if="isCity" style="margin-left:34px;color:#e13d13;padding:10px;border-radius: 20px;background:#e1e1e1">
                       粉丝使用优惠券金额:{{usedAmont}}元
                    </span>
                    <span v-else  style="margin-left:230px;color:e13d13;padding:10px;border-radius: 20px;background:#e1e1e1">
                        粉丝使用优惠券金额:{{usedAmont}}元
                    </span>

                    </Col>
                </Row>
            </Card>
            <Card :padding="2">
            </Card>
            <Card>
                <Row class="margin-top-10 searchable-table-con1">
                    <Table :columns="list.cols" :data="list.datas" :loading="list.loading">
                    </Table>
                    <Page :total="page.totalPage" :current="page.currPage" :page-size="page.pageSize" show-total
                          @on-change="changePage" v-if="page.totalPage>0"></Page>
                </Row>
            </Card>
            </Col>
        </Row>

        <Modal v-model="orderInfo.show" title="订单详情" :closable="false"  width="976">
            <Table :columns="orderInfo.cols" :data="orderInfo.datas"   :loading="orderInfo.loading" ref="couponusedorderinfo">

            </Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    export default {
        name: 'couponused',
        data () {
            return {
                //订单详情
                orderInfo:{
                    show:false,
                    loading:true,
                    cols:[
                        {key:"order_id",title:"订单编号",width:180},
                        {key:"id",title:"子订单编号",width:180},
                        {key:"title",title:"商品名称",width:160,tooltip:true},
                        {key:"specs",title:"规格",width:120,tooltip:true},
                        {key:"price",title:"价格",width:100},
                        {key:"promotion_type",title:"订单类型",width:100},
                        {key:"status",title:"订单状态",width:100},
                    ],
                    datas:[]
                },
                usedAmont:0,
                couponTypes: [
                    {val: 'discount', name: '满减券'},
                    {val: 'cash', name: '现金券'},
                    {val: 'all', name: '全部'},
                ],

                isCity: true,
                search: {
                    coupon_id: '',
                    mobile: '',
                    shop_name: '',
                    used_at: '',
                    title: '',
                    coupon_type: 'all',
                    city: '全国',
                    used:"all",
                    page: 1,
                },
                city: [],//分公司

                page: {
                    totalPage: 0,
                    pageSize: 100,
                    currPage: 1,
                },
                list: {
                    cols: [
                        {title:"订单详情",width:100,key:"op",render:(h,p)=>{
                                    return h('a',{
                                        on:{
                                            "click":()=>{
                                                this.$http.get('coupon/orderinfo&order_id='+p.row.order_id).then((res)=>{
                                                    this.orderInfo.show = true;
                                                    this.orderInfo.loading = false;
                                                    this.orderInfo.datas = res.data;
                                                }).catch((err)=>{});



                                            }
                                        }
                                    },"订单详情");
                            }},
                        {key: 'title', tooltip: true, title: '优惠券名称', width: 120},
                        {key: 'coupon_type', title: '优惠券类型', width: 100},
                        {key: 'coupon_amount', tooltip: true,title: '优惠券金额', width: 120},
                        {key: 'amount', title: '订单总金额', width: 120,sortable:true},
                        {key: 'payment', title: '订单券后金额', width: 130,sortable:true},
                        {key: 'discount', title: '优惠券金额', width: 120,sortable:true},
                        {key: 'mobile', title: '粉丝手机号', width: 160,sortable:true},
                        {key: 'shop_name',tooltip: true, title: '粉丝手所属社区', width: 160},
                        {key: 'city', title: '市公司', width: 150,sortable:true},
                        {key: 'created_at', title: '送券时间', width: 160,sortable:true},
                        {key: 'used_at', title: '用券时间', width: 160,sortable:true},
                        {key: 'expired_at', title: '优惠券过期时间', width: 160,sortable:true},
                        {key: 'source', title: '优惠券来源', width: 130},
                        {key:'id',title:"用户得券id",width:114,sortable:true},
                        {key: 'coupon_id', title: '优惠券id', width: 100,sortable:true},
                    ],
                    datas: [],
                    loading: true,
                },

            };
        },

        methods: {
            handleSearch () {
                //搜索
                this.list.loading = true;
                this.search.page = this.page.currPage;
                this.$http.post('coupon/used', this.search).then((res) => {
                    this.list.loading = false;
                    this.list.datas = res.data.rs;
                    this.page.totalPage = parseInt(res.data.totalPage);
                    this.usedAmont = parseFloat(res.data.usedAmont);
                }).catch((err) => {
                    console.log(err);
                });
            },

            changePage (page) {
                //分页
                this.list.loading = true;
                this.page.currPage = page;
                this.search.page = page;
                this.$http.post('coupon/used', this.search).then((res) => {
                    this.list.loading = false;
                    this.list.datas = res.data.rs;
                    this.page.totalPage = parseInt(res.data.totalPage);
                    this.usedAmont = parseFloat(res.data.usedAmont);

                }).catch((err) => {
                    console.log(err);
                });
            },

            init () {
                this.$http.get('coupon/used').then(
                    (res) => {
                        this.list.loading = false;
                        this.page.currPage = parseInt(res.data.currPage);
                        this.page.totalPage = parseInt(res.data.totalPage);
                        this.page.pageSize = parseInt(res.data.pageSize);
                        this.city = res.data.city;
                        this.isCity = Boolean(res.data.isCity);
                        this.list.datas = res.data.rs;
                        this.usedAmont = parseFloat(res.data.usedAmont);
                    }
                ).catch((err) => {
                    console.log(err);
                });
            }
        },
        mounted () {
               this.init();
        }
    };
</script>
