<style lang="less">

</style>

<template>
    <div style="width:2440px">
        <Row :gutter="10">
            <Col span="24">
            <Card>
                <Row :gutter="4">
                    <Col span="24">
                    <Input v-model="search.one" placeholder="请输入粉丝手机号搜搜..." style="width: 200px"/>
                    <Input v-model="search.two" placeholder="请输入社区名称搜搜..." style="width: 200px"/>
                    <Input v-model="search.three" placeholder="请输入子订单号搜搜..." style="width: 200px"/>
                    <Select v-model="search.four" style="width:200px" placeholder="请选所属分公司">
                        <Option v-for="(item,ind) in newcitylist" :value="item.company_name" :label="item.company_name">
                            {{ item.company_name }}
                        </Option>
                    </Select>
                    </Col>
                </Row>
                <Row style="margin-top:10px;">
                    <Col span="24">
                    <Input v-model="search.six" placeholder="请输入商品名称搜搜..." style="width: 200px"/>
                    <Select v-model="search.five" style="width:200px" placeholder="请选审核状态">
                        <Option v-for="(item,ind) in status" :value="item.id" :label="item.val"></Option>
                    </Select>
                    <span @click="handleSearch1" style="margin: 0 20px;">
						<Button type="primary" icon="search">搜索</Button>
					</span>
                    </Col>
                </Row>
            </Card>
            <Card>
                <Row>
                    <Col>
                    <Table :columns="columns1" :data="data1" :loading="loading">

                    </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <div style="margin: 10px;overflow: hidden" v-if="totalPage > 1">
                        <div style="float: left;">
                            <Page :total="totalPage" :current="currPage" show-total :page-size="pageSize"
                                  @on-change="changePage"></Page>
                        </div>
                    </div>
                    </Col>
                </Row>
            </Card>
            </Col>
        </Row>
        <Modal v-model="pics.show" :closable="false" title="退货" width="350">
            <div slot="header"></div>
            <Row v-for="item in pics.datas" :key="item">
                <Col>
                <img :src=" item " style="width:300px;height:300px;"/>
                </Col>
            </Row>
            <div slot="footer"></div>

        </Modal>
    </div>
</template>
<script>
    export default {
        name: 'searchable-table-goods-list',
        data () {
            return {
                auth: {
                    enableCheck: true,
                },
                pics: {
                    show: false,
                    datas: []
                },
                // check:{
                // 	status:1,//通过2拒绝
                // 	show:false
                // },

                search: {
                    one: '',
                    two: '',
                    three: '',
                    four: '全国',
                    five: 4,
                    six:""
                },
                status: [
                    {id: 4, val: '全部'},
                    {id: 0, val: '未审核'},
                    {id: 1, val: '已审核,待退款'},
                    {id: 2, val: '审核未通过'},
                    {id: 3, val: '已完成'},
                ],
                loading: true,
                pageSize: 0,
                totalPage: 0,
                currPage: 1,
                newcitylist: [],
                columns1: [],
                data1: []
            };
        },

        methods: {
            changePage (page) {
                this.currPage = page;
                this.loading = true;
                this.rs = {
                    mobile: this.search.one,
                    shop_name: this.search.two,
                    order_detail_id: this.search.three,
                    curpage: this.currPage,
                    city: this.search.four,
                    status: this.search.five,
                    title:this.search.six
                };
                this.$http.post('aftersales/applylist', this.rs).then(
                    (res) => {
                        this.loading = false;
                        this.totalPage = parseInt(res.data.totalPage);
                        this.pageSize = parseInt(res.data.pageSize);
                        this.data1 = res.data.rs;
                    }
                ).catch((err) => {
                    console.log(err);
                });

            },
            init () {
                this.$http.get('aftersales/applylist').then(
                    (res) => {
                        this.loading = false;
                        this.totalPage = parseInt(res.data.totalPage);
                        this.pageSize = parseInt(res.data.pageSize);
                        this.currPage = parseInt(res.data.currpage);

                        this.newcitylist = res.data.citys;
                        this.data1 = res.data.rs;
                        this.auth.enableCheck = Boolean(res.data.auth.enableCheck);
                    }
                ).catch((err) => {
                    console.log(err);
                });
            },
            handleSearch1 () {

                this.rs = {
                    mobile: this.search.one,
                    shop_name: this.search.two,
                    order_detail_id: this.search.three,
                    curpage: this.currPage,
                    city: this.search.four,
                    status: this.search.five,
                    title:this.search.six
                };
                this.loading = true;
                this.$http.post('aftersales/applylist', this.rs).then(
                    (res) => {
                        this.loading = false;
                        this.totalPage = parseInt(res.data.totalPage);
                        this.pageSize = parseInt(res.data.pageSize);
                        this.currPage = parseInt(res.data.currpage);


                        this.data1 = res.data.rs;
                    }
                ).catch((err) => {
                    console.log(err);
                });
                //this.data1 = this.initTable1;
            }
        },
        mounted () {

            this.init();
            //  this.handleSearch1();
            this.columns1 = [
                // {
                //         type: 'index',
                //         width: 80,
                // 		align: 'center',
                // 		title:'排名'
                // 	},
                {
                    key: 'pic',
                    title: '图片',
                    width: 80,
                    render: (h, params) => {
                        return h('a', {
                            on: {
                                click: () => {
                                    this.pics.datas = params.row.pics;
                                    this.pics.show = true;
                                }
                            }
                        }, [h('img', {
                            attrs: {
                                style: 'height:60px;width:60px',
                                src: params.row.pic
                            }
                        })]);
                    }
                },
                {
                    key: 'status',
                    width: 120,
                    sortable: true,
                    title: '审核状态',
                    render: (h, params) => {
                        return h('a', {
                            attrs: {
                                disabled: params.row.status != '待审核' || this.auth.enableCheck
                            },
                            on: {
                                click: () => {
                                    //alert("审核");

                                    this.$Modal.confirm({
                                        title: '审核',
                                        content: '审核退货',
                                        okText: '同意',
                                        closable:true,
                                        cancelText: '拒绝',
                                        onOk: function () {
                                            this.$http.post('aftersales/check', {
                                                id: params.row.id,
                                                status: 1
                                            }).then((res) => {
                                                console.log(res);
                                                if (res.data.rs == 'true') {
                                                    params.row.status = '已审核,待退款';
                                                    this.$Notice.success({
                                                        title: '审核成功',
                                                        desc: '审核成功',
                                                        duration: 1
                                                    });
                                                } else {
                                                    this.$Notice.error({
                                                        title: res.data.msg,
                                                        desc: res.data.msg,
                                                        duration: 1
                                                    });
                                                }
                                            }).catch((err) => {
                                                console.log(err);
                                            });
                                        },
                                        onCancel: function () {
                                            this.$http.post('aftersales/check', {
                                                id: params.row.id,
                                                status: 2
                                            }).then((res) => {

                                                if (res.data.rs == 'true') {
                                                    params.row.status = '审核未通过';
                                                    this.$Notice.success({
                                                        title: '审核成功',
                                                        desc: '审核成功',
                                                        duration: 1
                                                    });
                                                } else {
                                                    this.$Notice.error({
                                                        title: res.data.msg,
                                                        desc: res.data.msg,
                                                        duration: 1
                                                    });
                                                }
                                            }).catch((err) => {
                                                console.log(err);
                                            });
                                        }
                                    });
                                }
                            }
                        }, params.row.status);
                    }
                },
                {
                    key: 'reason',
                    sortable: true,
                    width: 130,
                    tooltip: true,
                    title: '申请售后原因'
                },
                {
                    key: 'mobile',
                    sortable: true,
                    width: 120,
                    title: '粉丝手机号'
                },
                {
                    key:"nickname",
                    width:110,
                    title:"粉丝昵称"
                },
                {
                    key: 'title',
                    width: 150,
                    tooltip: true,
                    sortable: true,
                    title: '商品标题'
                },
                {
                    key: 'order_id',
                    width: 166,
                    tooltip: true,
                    sortable: true,
                    title: '订单编号'
                },
                {
                    key: 'shop_name',
                    sortable: true,
                    width: 150,
                    tooltip: true,
                    title: '社区名称'
                },
                {
                    key: 'amount',
                    sortable: true,
                    width: 106,
                    title: '售后金额'
                },
                {
                    key:"share_order_gift_money",
                    title:"分享订单红包",
                    width:120
                },
                {
                    key: 'city',
                    sortable: true,
                    width: 100,
                    tooltip: true,
                    title: '市公司'
                },
                {
                    key: 'quantity',
                    sortable: true,
                    width: 106,
                    title: '售后数量'
                },



                {
                    key: 'aftersale_type',
                    width: 120,
                    sortable: true,
                    title: '售后类型'
                },

                {
                    key: 'is_signed',
                    width: 110,
                    sortable: true,
                    title: '是否收货'
                },
                {
                    key: 'is_damaged',
                    width: 110,
                    sortable: true,
                    title: '是否损失'
                },
                 {
                    key: 'order_detail_id',
                    width: 170,
                    tooltip: true,
                    sortable: true,
                    title: '子订单编号'
                },

                {
                    key: 'created_at',
                    width: 150,
                    sortable: true,
                    title: '申请时间'
                },
                {
                    key: 'username',
                    width: 150,
                    sortable: true,
                    title: '审核人'
                },
                {
                    key: 'audited_at',
                    width: 150,
                    sortable: true,
                    title: '审核时间'
                }

            ];
        }
    };
</script>
