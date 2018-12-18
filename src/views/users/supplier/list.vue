<style lang="less">
    @import '../../../styles/common.less';
    @import '../components/table.less';
</style>

<template>
    <div style="width:1940px;">
        <Card>
            <Row :gutter="4">
                <Col span="2">
                <Input v-model="search.username" placeholder="请输入登录账户搜搜..."/>
                </Col>
                <Col span="4">
                <Input v-model="search.supplier_name" placeholder="请输入供应商名称搜搜..."/>
                </Col>
                <Col span="3">
                <Select v-model="search.supplier_type" placeholder="请选择供应商类型搜搜">
                    <Option v-for="item in supplier_type" :value="item.value" :key="item.value">
                        {{item.label}}
                    </Option>
                </Select>

                </Col>
                <Col span="3">
                <Select v-model="search.city" placeholder="请选择市公司搜搜" v-if="!isCity">
                    <Option v-for="item in city" :value="item.area" :key="item.label">{{item.label}}</Option>
                </Select>

                </Col>
                <Col span="2">
                <Input v-model="search.mobile" placeholder="请输入手机号搜搜..."/>
                </Col>
                <Col span="2">
                <span @click="handleSearch">
                            <Button type="primary" icon="ios-search">搜索</Button>
                    </span>
                </Col>

            </Row>
        </Card>
        <Card :padding="2">
            <Row>
                <Col span="4">
                <span @click="handleAdd" style="margin:0px margin-left:4px;">
                                 <Button type="info" size="small" icon="ios-add" :disabled="enableAdd"
                                         stripe="true">添加</Button>
                    </span>
                </Col>
            </Row>
        </Card>
        <Card>
            <Row class="margin-top-10 searchable-table-con1">
                <Table :columns="columns" :data="data" :loading="loadStatus"
                       size="small">

                </Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: left;">
                        <Page :total="totalPage" :current="curPage" :page-size="pageSize"
                              @on-change="changePage"></Page>
                    </div>
                </div>
            </Row>
        </Card>
        </Col>
        </Row>
         <Modal  v-model="repasswd.show" title="修改密码" :closable="false" >
             <repass :supplier_id="repasswd.supplier_id" @onrepasswd="handleRepass" :enableRepass="enableRepass"></repass>
             <div slot="footer" style="display:none"></div>
         </Modal>
    </div>
</template>
<script>
    import Repass from "../components/repass"
    export default {
        name: 'supplierlist',
        components:{
            Repass
        },
        data () {
            return {
                repasswd:{
                    show:false,
                    supplier_id:'',
                },
                isCity: false,//市公司
                enableAdd: true,
                enableEdit:true,
                enableRepass:true,
                loadStatus: true,
                columns: [{
                    title: 'id',
                    sortable: true,
                    key: 'id',
                    width: 80
                },
                    {
                        key:"operation",
                        width:100,
                        title: '操作',
                        render: (h, p) => {
                            var _this = this;
                            return h('span',[
                                    h('a',{
                                attrs:{
                                    disabled:this.enableEdit
                                },
                                        on:{
                                            click(){
                                               //  alert("edit");
                                                _this.$router.push({path:'/usersmanager/supplieredit/'+p.row.id});

                                            }
                                        },
                                    },'编 辑'),
                                    h('br'),
                                    h('a',{
                                        attrs:{
                                            disabled:this.enableRepass
                                        },

                                        on:{
                                            click(){
                                              //  console.log(this.repasswd);
                                               _this.repasswd.show = true;
                                               _this.repasswd.supplier_id = p.row.id;
                                            }
                                        }
                                    },'修改密码')
                            ]);
                        }
                    },
                    {title: '市公司',tooltip:true, key: 'bcity', width: 90},
                    {
                        title: '登录名',
                            tooltip:true,
                        key: 'username',
                        width: 110
                    }, {
                        title: '状态', key: 'status', width: 90
                    },
                    {
                        title: '供应商名称',
                            tooltip:true,
                        key: 'supplier_name',
                        width: 130
                    },
                    {
                        title: '联系人',
                            tooltip:true,
                        key: 'contact',
                        width: 110
                    },
                    {
                        title: '手机',
                            tooltip:true,
                        key: 'mobile',
                        width: 130
                    },
                    {
                        title: '座机',
                        key: 'tel',
                        width: 130
                    },
                    {
                        title: '类型',
                        key: 'supplier_type',
                        width: 90
                    }, {
                        title: '结算类型',
                        key: 'settllment_type',
                        width: 100
                    }, {
                        title: '省',
                        key: 'province',
                        width: 100
                    }, {
                        title: '市',
                        key: 'city',
                        width: 100
                    }, {
                        title: '区、县',
                        key: 'county',
                        width: 100
                    },
                    {
                        title: '地址',
                        key: 'address',
                        tooltip:true,
                        width: 140
                    }, {title: '创建时间', sortable: true, key: 'created_at', width: 150}, {
                        title: '更新时间',
                        sortable: true,
                        key: 'updated_at',
                        width: 150
                    },
                ],
                data: [],
                totalPage: 0,
                curPage: 1,
                pageSize: 100,
                supplier_type: [],
                city: [],
                search: {
                    username: '',
                    supplier_name: '',
                    supplier_type: '',
                    city: '',
                    mobile: '',
                    curPage: '1'

                },

            };
        },
        methods: {
            handleRepass(){
               // console.log("tesateast");
                this.repasswd.show = false;
            },
            handleAdd () {
                //添加'
                this.$router.push({name: 'supplieradd'});
            },
            handleSearch () {
                //搜素
                this.loadStatus = true;
                this.search.curPage = 1;
                this.$http.post('supplier/lists', this.search).then((res) => {
                    this.data = res.data.rs;
                    this.loadStatus = false;

                }).catch((err) => {
                    console.log(err);
                });
            },
            changePage (page) {
                this.loadStatus = true;
                this.curPage = page;
                this.search.curPage = page;
                this.$http.post('supplier/lists', this.search).then((res) => {

                    this.data = res.data.rs;
                    this.loadStatus = false;

                }).catch((err) => {
                    console.log(err);
                });
            },

            init () {
                this.$http.get('supplier/lists').then((res) => {
                    this.loadStatus = false;
                    this.isCity = Boolean(res.data.isCity);
                    this.enableAdd = Boolean(res.data.enableAdd);
                    this.enableEdit = Boolean(res.data.enableEdit);
                    this.enableRepass = Boolean(res.data.enableRepass);
                    this.data = res.data.rs;
                    this.totalPage = parseInt(res.data.totalPage);
                    this.pageSize = parseInt(res.data.pageSize);
                    this.city = res.data.city;
                    this.supplier_type = res.data.supplier_type;
                }).catch((err) => {
                    console.log(err);
                });
            }

        },
        mounted () {
            this.init();
        }

    };
</script>
