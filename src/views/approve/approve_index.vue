<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>
<template>
    <div style="width:1200px">
        <Row :gutter="10">
            <Col span="24">
            <Card>
                <Row :gutter="4">
                    <Col span="16">
                    <Input  v-model="search.title" placeholder="请输入标题搜搜..." style="width: 200px" />
                    <Select v-model="search.check" style="width:200px"  placeholder="市公司">
                        <Option v-for="item in check" :value="item.val" :key="item.val">{{ item.name }}</Option>
                    </Select>
                    <Select v-model="search.city" style="width:200px" v-if="!isCity" placeholder="市公司">
                        <Option v-for="item in city" :value="item.area" :key="item.area">{{ item.city }}</Option>
                    </Select>
                    <span @click="handleSearch" style="margin: 0 10px;">
                                <Button type="primary" icon="search">搜索</Button>
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

        <Modal v-model="active.show" width="760">
            <preorder-com :datas="active.preorder"></preorder-com>
            <div slot="footer"></div>
        </Modal>
        <!--系统送券信息-->
        <Modal v-model="active.sendcoupon.show" width="760" :closable="false">
            <sendcoupon-com :sendcoupon="active.sendcoupon.datas"></sendcoupon-com>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    import preorderCom from './components/preorder'
    import sendcouponCom from './components/sendcoupon'
    export default {
        name: 'approve_index',
        components:{
             preorderCom,
            sendcouponCom
        },
        data() {
            return {
                enableCheck:true,
                isCity:true,
                active:{
                    show:false,
                    preorder:{},
                    sendcoupon:{
                        show:false,
                        datas:{},
                    },
                },
                check:[{
                     val:'1',
                     name:'待审批'
                },{
                    val:'2',
                    name:'已审批'
                },{
                    val:'3',
                    name:'全部'
                }],
                search:{
                    title:"",
                    check:"3",
                    city:"全国",
                    page :1,
                },
                city:[],//分公司
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
                                    // attrs:{
                                    //     disabled:this.enableCheck||p.row.status!="1"
                                    // },
                                    on:{
                                        click:()=>{
                                            if(p.row.approve_type=="sendcoupon"){
                                                this.active.sendcoupon.show = true;
                                                this.$http.get('approve/sendcoupon&event_id='+p.row.event_id).then((res)=>{
                                                    res.data.event_id=p.row.event_id;
                                                    if(res.data.checkstatus=="通过"){
                                                            res.data.enableCheck=true;
                                                    }else if(res.data.checkstatus=="拒绝"){
                                                        res.data.enableCheck=true;
                                                      }//else if(res.data.checkstatus=="2"){
                                                    //     if(this.enableCheck){
                                                    //         res.data.enableCheck=true;
                                                    //     }else {
                                                    //         res.data.enableCheck=false;
                                                    //     }
                                                    // }
                                                    this.active.sendcoupon.datas = res.data;

                                                }).catch((err)=>{});

                                            }else if(p.row.approve_type=="preorder"){
                                                this.$http.get('approve/preorder&event_id='+p.row.event_id).then((res)=>{
                                                    if(res.data.rs=='false'){
                                                        this.$Message.error(res.data.msg);
                                                    }else{
                                                        this.enableCheck = Boolean(res.data.enableCheck);
                                                        this.active.show = true;
                                                        if(res.data.rs.preorder_status=='11'){
                                                            res.data.rs.preorder_status="";
                                                            if(!this.enableCheck){
                                                                res.data.rs.enableCheck = false;
                                                            }else{
                                                                res.data.rs.enableCheck = true;

                                                            }
                                                        }else if(res.data.rs.preorder_status=='1'){
                                                            res.data.rs.preorder_status="通过";
                                                            res.data.rs.enableCheck = true;
                                                        }else if(res.data.rs.preorder_status=='12'){
                                                            res.data.rs.preorder_status="拒绝";
                                                            res.data.rs.enableCheck = true;
                                                        }
                                                        console.log(res.data);
                                                        this.active.preorder = res.data.rs;
                                                    }

                                                }).catch((err)=>{

                                                });
                                            }

                                        }
                                    }
                                },p.row.status=='1'?"审批":"查看详情")
                            }
                        },
                        {key:'title',title:'标题',tooltip:true,width:260
                        },
                        {key:'status',title:'审批状态',width:120,
                            render:(h,p)=>{
                                    return h('span',p.row.status=='1'?'待审批':'已审批') ;
                                }
                        },
                        {key:'id',title:'id',width:90},
                        {key:'creater',title:'发起人',width:100},
                        {key:'approver',title:'审批人',width:100},
                        {key:'applytime',title:'审请时间',width:190},
                        {key:'approvetime',title:'审批时间',width:190}
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
                this.$http.post("couponcash/check",this.check).then((res)=>{
                    if(res.data.rs=='true'){
                        this.$router.go(0);
                    }else{
                        this.$Message.error(res.data.msg);
                    }
                }).catch((err)=>{
                    console.log(err);
                });
            },

            handleSearch(){
                //搜索
                this.search.page = this.page.currPage;
                this.$http.post('approve/lists',this.search).then((res)=>{
                    this.list.datas = res.data.rs;
                    this.page.totalPage = parseInt(res.data.totalPage);
                }).catch((err)=>{
                    console.log(err);
                });
            },
            changePage(page){
                //分页
                this.page.currPage = page
                this.search.page = page;
                this.$http.post('approve/lists',this.search).then((res)=>{
                    this.list.datas = res.data.rs;
                    this.page.totalPage = parseInt(res.data.totalPage);
                }).catch((err)=>{
                    console.log(err);
                });

            },
            init() {
                this.$http.get('approve/lists').then(
                    (res) => {
                        this.list.loading = false;
                        this.page.currPage = parseInt(res.data.currpage)
                        this.page.totalPage = parseInt(res.data.totalPage)
                        this.page.pageSize = parseInt(res.data.pageSize)
                        this.city = res.data.citys;
                        this.isCity = Boolean(res.data.isCity);
                        this.list.datas =  res.data.rs;
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
