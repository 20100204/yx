<style lang="less">
    @import '../../../styles/common.less';
    @import '../components/table.less';
</style>

<template>
    <div style="width:1240px;">
        <!--<Card>-->
            <!--<Row :gutter="4">-->
                <!--<Col span="2">-->
                <!--<Input v-model="search.username" placeholder="请输入登录账户搜搜..."/>-->
                <!--</Col>-->
                <!--<Col span="4">-->
                <!--<Input v-model="search.supplier_name" placeholder="请输入供应商名称搜搜..."/>-->
                <!--</Col>-->
                <!--<Col span="3">-->
                <!--<Select v-model="search.supplier_type" placeholder="请选择供应商类型搜搜">-->
                    <!--<Option v-for="item in supplier_type" :value="item.value" :key="item.value">-->
                        <!--{{item.label}}-->
                    <!--</Option>-->
                <!--</Select>-->

                <!--</Col>-->
                <!--<Col span="3">-->
                <!--<Select v-model="search.city" placeholder="请选择市公司搜搜" v-if="!isCity">-->
                    <!--<Option v-for="item in city" :value="item.area" :key="item.label">{{item.label}}</Option>-->
                <!--</Select>-->

                <!--</Col>-->
                <!--<Col span="2">-->
                <!--<Input v-model="search.mobile" placeholder="请输入手机号搜搜..."/>-->
                <!--</Col>-->
                <!--<Col span="2">-->
                <!--<span @click="handleSearch">-->
                            <!--<Button type="primary" icon="search">搜索</Button>-->
                    <!--</span>-->
                <!--</Col>-->

            <!--</Row>-->
        <!--</Card>-->
        <!--<Card :padding="2">-->
            <!--<Row>-->
                <!--<Col span="4">-->
                <!--<span @click="handleAdd" style="margin:0px margin-left:4px;">-->
                                 <!--<Button type="info" size="small" icon="android-add" :disabled="enableAdd"-->
                                         <!--stripe="true">添加</Button>-->
                    <!--</span>-->
                <!--</Col>-->
            <!--</Row>-->
        <!--</Card>-->
        <Card>
            <Row class="margin-top-10 searchable-table-con1">
                <Table :columns="columns" :data="data" :loading="loadStatus"
                       size="small">

                </Table>
                <!--<div style="margin: 10px;overflow: hidden">-->
                    <!--<div style="float: left;">-->
                        <!--<Page :total="totalPage" :current="curPage" :page-size="pageSize"-->
                              <!--@on-change="changePage"></Page>-->
                    <!--</div>-->
                <!--</div>-->
            </Row>
        </Card>
        </Col>
        </Row>
         <Modal  v-model="area.show" title="查看销售区域" :closable="false" >
                {{area.text}}
             <div slot="footer"></div>
         </Modal>
    </div>
</template>
<script>
    import Repass from "../components/repass"
    export default {
        name: 'supplierapplylist',
        components:{
            Repass
        },
        data () {
            return {
                area:{
                    show:false,
                    text:'',
                },
                enableCheck:true,
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
                        title: '审核 ',
                        render: (h, p) => {
                            var _this = this;
                            return h('span',[
                                    h('a',{
                                attrs:{
                                     disabled:(!this.enableCheck&&p.row.status=='0')?false:true,
                                },
                                        on:{
                                            click(){
                                              // alert("adafdsafasdf");
                                                _this.$Modal.confirm({
                                                    title:"供应商申请审核",
                                                    okText:"同意",
                                                    cancelText:"拒绝",
                                                    onOk:function(){
                                                       // alert("同意");
                                                        _this.$http.get('supplier/applycheck&id='+p.row.id+"&status=1").then((res)=>{
                                                            if(res.data.rs=='true'){
                                                                _this.$Message.success("设置成功");
                                                                p.row.status='1';
                                                            }
                                                        }).catch();
                                                    },
                                                    onCancel:function(){
                                                        _this.$http.get('supplier/applycheck&id='+p.row.id+"&status=2").then((res)=>{
                                                            if(res.data.rs=='true'){
                                                                _this.$Message.success("设置成功");
                                                                p.row.status='2';
                                                            }
                                                        }).catch();
                                                    }

                                                });
                                            }
                                        },
                                    },p.row.status=='1'?'已审核':(p.row.status=='2'?'已拒绝':'待审核'))

                            ]);
                        }
                    },
                    {title: '联系人',tooltip:true, key: 'realname', width: 110},
                    {
                        title: '电话',
                        key: 'phone',
                        width: 150
                    }, {
                        title: '公司名称',tooltip:true, key: 'company_name', width: 200
                    },
                    {
                        title: '地址',tooltip:true,
                        key: 'address',
                        width: 210
                    },
                    {
                        title: '经营范围',tooltip:true,
                        key: 'business_scope',
                        width: 210
                    },
                    {
                        title: '销售区域',tooltip:true,
                        key: 'areaname',
                        width: 130,
                        render:(h,p)=>{
                            return h('a',{
                                attrs:{
                                    disabled:!p.row.area?true:false,
                                },
                                on:{
                                    click:()=>{
                                       // alert("查看销售区域");
                                        this.$http.get('supplier/salerange&id='+p.row.id).then((res)=>{
                                              this.area.show = true;
                                              this.area.text = res.data;
                                        }).catch();
                                    }
                                },
                            },!p.row.area?'全国':'查看')
                        }

                    }


                ],
                data: [],

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


            init () {
                this.$http.get('supplier/applylist').then((res) => {
                    this.loadStatus = false;
                    this.enableCheck = Boolean(res.data.enableCheck);
                    this.data = res.data.rs;

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
