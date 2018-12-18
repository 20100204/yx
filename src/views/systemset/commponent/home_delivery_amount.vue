<template>
    <div>

        <Row>
            <Col span="24">
            <Card>
                <Table :columns="keys" :data="datas"></Table>
            </Card>
            </Col>
        </Row>
        <Modal
                v-model="set.show"
                :title="set.title"
                @on-ok="handleSet"
        >

            <Row>
                <Col span="13">
                满
                <InputNumber :min="1" v-model="set.amount"></InputNumber>
                元
                减运费
                <InputNumber :min="0" v-model="set.price"></InputNumber>
                元
                </Col>
                <Col span="8" style="postion:absolute;top:6px;">
                运费补贴店东
                <i-switch v-model="set.subsidy"/>
                </Col>
                <Col span="3">
                <Button type="info" @click="handleSet">设置</Button>
                </Col>
            </Row>


            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'home_delivery_amount',
        props: {
            alldatas: {
                type: Array,
            },
        },
        watch: {
            alldatas: function (val) {
                //console.log(val);
                this.datas = val;
            }
        },
        methods: {
            /*设置摸个城市的运费*/
            handleSet (ev) {
                // console.log(this.set);
                if (this.set.amount <= 0) {
                    this.$Message.error('金额不能小于0');
                    return;
                }
                if (this.set.amount <= this.set.price) {
                    this.$Message.error('免运费金额要小于订单金额');
                    return;
                }
                this.$http.post('systemset/sethomedeliver', this.set).then((res) => {
                    // console.log(res);
                    if (res.data.rs == 'true') {
                        this.$Message.success('设置成功');
                        //console.log(this.datas);
                        this.datas.forEach((v) => {
                            if (v.area == this.set.area) {
                                v.amount = this.set.amount;
                                v.price = this.set.price;
                                v.content = '满' + this.set.amount + '元免运费'+this.set.price+"元";
                                v.subsidy = this.set.subsidy;
                            }
                        });
                        this.set.show = false;
                        this.set.area = '';
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                }).catch((err) => {
                });
            },
        },
        data () {
            return {
                set: {
                    show: false,
                    title: '',
                    area: '',
                    amount: 1000,
                    price: 0,
                    subsidy: false,
                },
                keys: [
                    {key: 'city', title: '分公司'},
                    {key: 'content', title: '详情'},
                    {key:"subsidy",title:"运费补贴店东",align:"center",
                    render:(h,p)=>{
                        return h('span',p.row.subsidy==true?"是":"否")
                    }
                    },
                    {
                        key: 'operation', title: '操作',
                        render: (h, p) => {
                            var _this = this;
                            return h('a', {
                                on: {
                                    click: () => {

                                        _this.set.title = p.row.city + '免运费设置';
                                        _this.set.area = p.row.area;
                                        _this.set.amount = p.row.amount ? parseFloat(p.row.amount) : 1000;
                                        _this.set.price = p.row.price ? parseFloat(p.row.price) : 0;
                                        _this.set.subsidy = p.row.subsidy ? Boolean(p.row.subsidy) : false;
                                        _this.set.show = true;

                                    }
                                }
                            }, '设置');
                        }
                    },
                ],
                datas: [],
            };
        }
    };
</script>

<style scoped>

</style>
