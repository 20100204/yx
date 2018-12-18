<style lang="less">
    @import '../../../styles/common.less';
    @import '../../../styles/table.less';
</style>
<template>
    <div style="width:1250px">
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <Row :gutter="4">
                        <Col span="16">
                            <Input  v-model="search.title" placeholder="请输入优惠券标题搜搜..." style="width: 200px" />
                            <Input  v-model="search.discount_amount" placeholder="请输入优惠券金额搜搜..." style="width: 100px" />
                             <Select v-model="search.city" style="width:200px" v-if="!isCity" placeholder="市公司">
                                 <Option v-for="item in city" :value="item.area" :key="item.area">{{ item.city }}</Option>
                             </Select>
                            <span @click="handleSearch" style="margin: 0 10px;">
                                <Button type="primary" icon="search">搜索</Button>
                            </span>
                        </Col>
                    </Row>
                </Card>
                <Card :padding="2">
                    <Row>
                        <Col span="1">
                        <span @click="handleAdd" >
                                 <Button type="info" size="small"  :disabled="enableAdd">添加</Button>
                            </span>
                        </Col>
                    </Row>
                </Card>
                <Card>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="list.cols" :data="list.datas" :loading="list.loading">
                        </Table>
                         <Page :total="page.totalPage" :current="page.currPage" :page-size="page.pageSize" show-total @on-change="changePage"></Page>
                    </Row>
                </Card>
            </Col>
        </Row>

        <Modal v-model="check.show">
            <Row>
                <Col span="10" offset="9">
                <RadioGroup v-model="check.val" >
                    <Radio label="通过"></Radio>
                    <Radio label="拒绝"></Radio>

                </RadioGroup>
                </Col>

            </Row>
            <Row style="margin-top:20px;" v-if="check.val=='拒绝'">
                <Col>
                <Input type="textarea" v-model="check.reason"  placeholder="请输入拒绝原因" :rows="3" />
                </Col>
            </Row>

            <div slot="footer">
                <Row>
                    <Col span="2" offset="10">
                       <Button type="primary" @click="handlecheck" :disabled="enableCheck">确定</Button>
                    </Col>
                </Row>

            </div>
        </Modal>
        <Modal v-model="scope.show" title="使用范围" :closable="false">
            <Table :columns="scope.cols" :data="scope.datas" :loading="scope.loading">
            </Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    export default {
        name: 'coupondiscount',
        data() {
            return {
                enableEdit:true,
                enableAdd:true,
                enableEnabled:true,
                enableDisabled:true,
                enableCheck:true,
                isCity:true,
                check:{
                    show:false,
                    val:"通过",
                    coupon_id:"",
                    reason:""
                },
                search:{
                    title:"",
                    discount_amount:"",
                    city:"全国",
                    page :1,
                },
                city:[],//分公司
                scope:{
                    show:false,
                    loading:true,
                    cols:[
                        {type:"index",title:"序号"},
                        {key:'city',title:"市公司",width:160},
                    ],
                    datas:[]
                },
                page:{
                    totalPage:0,
                    pageSize:100,
                    currPage:1,
                },
                list:{
                    cols:[

                        {key:'oper',title:'操作',width:90,
                            render:(h,p)=>{
                                return h('a',{
                                    attrs:{
                                        disabled:this.enableEdit||p.row.status!="待审核"
                                    },
                                    on:{

                                        click:()=>{
                                            this.$router.push({
                                                path: '/couponmanager/coupondiscountedit/' + p.row.id

                                            });
                                        }
                                    }
                                },'编辑')
                            }
                        },
                        {key:'scope',title:'使用范围',width:110,
                            render:(h,p)=>{
                                if(p.row.scope=='市公司'){
                                    return h('a',{
                                        on:{
                                            click:()=>{
                                                this.$http.get('coupondiscount/scope&id='+p.row.id).then((res)=>{
                                                    this.scope.datas = res.data;
                                                    this.scope.show = true;
                                                    this.scope.loading = false;
                                                }).catch((err)=>{
                                                    console.log(err);
                                                });
                                            }

                                        },
                                    },"市公司");
                                }else{
                                    return h("span","全国");
                                }
                            }
                        },
                        {key:'status',title:'审核',width:90,
                            render:(h,p)=>{
                                if(p.row.status=='待审核'){
                                    return h('a',{
                                        on:{
                                            click:()=>{
                                                this.check.show = true;
                                                this.check.coupon_id = p.row.coupon_id;
                                            }
                                        },
                                        attrs:{
                                            disabled:this.enableCheck
                                        },
                                    },'审核')
                                }else{
                                    return h('span',p.row.status) ;
                                }

                                //return h(),
                            }
                        },
                        {key:'id',title:'id',width:90},
                        {key:'title',tooltip:true,title:'优惠券名称',width:250},
                        {key:'discount_amount',title:'优惠券金额',width:100},
                        {key:'min_amount',title:'可用最小订单金额',width:100},

                        {key:'created_at',title:'创建时间',width:190},
                        {key:'expired',title:'有效期',width:90,
                            render:(h,p)=>{
                            return h('span',p.row.expired+"天")
                            }
                        },
                        {key:'username',title:'创建人',width:100},
                        {key:'reject_reason',tooltip:true,title:'拒绝原因',width:160},
                    ],
                    datas:[],
                    loading:true,
                },

            };
        },

        methods: {
            handlecheck(){
                //审核
              if(this.check.val=="拒绝"){
                  if(this.check.reason.length<=0){
                      this.$Message.error("请输入拒绝原因");
                      return;
                  }

              }
              this.$http.post("coupondiscount/check",this.check).then((res)=>{
                  if(res.data.rs=='true'){
                      this.$router.go(0);
                  }else{
                      this.$Message.error(res.data.msg);
                  }
              }).catch((err)=>{
                  console.log(err);
              });
            },
            handleDisabled(){
                //禁用
            },
            handleEnabled(){
                //启用
            },
            handleSearch(){
                //搜索
                this.search.page = this.page.currPage;
                this.$http.post('coupondiscount/lists',this.search).then((res)=>{
                    this.list.datas = res.data.rs;
                    this.page.totalPage = parseInt(res.data.totalPage);
                }).catch((err)=>{
                    console.log(err);
                });
            },

            handleAdd(){
                //添加
                this.$router.push({name:'coupondiscountadd'});
            },
            changePage(page){
                //分页
                this.page.currPage = page
                this.search.page = page;
                this.$http.post('coupondiscount/lists',this.search).then((res)=>{
                    this.list.datas = res.data.rs;
                    this.page.totalPage = parseInt(res.data.totalPage);
                }).catch((err)=>{
                    console.log(err);
                });

            },

            init() {
                this.$http.get('coupondiscount/lists').then(
                    (res) => {
                        this.list.loading = false;
                        this.page.currPage = parseInt(res.data.currPage)
                        this.page.totalPage = parseInt(res.data.totalPage)
                        this.page.pageSize = parseInt(res.data.pageSize)
                        this.city = res.data.city;
                        this.isCity = Boolean(res.data.isCity);
                        this.list.datas =  res.data.rs;
                        this.enableAdd = Boolean(res.data.enableAdd);
                        this.enableEdit = Boolean(res.data.enableEdit);
                        this.enableCheck = Boolean(res.data.enableCheck);
                    }
                ).catch((err) => {
                    console.log(err);
                });
            }
        },
        mounted() {
            this.init();
        }
    };
</script>
