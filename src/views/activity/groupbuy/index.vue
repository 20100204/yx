<style lang="less" >
    @import '../../../styles/common.less';
    /*@import '../components/table.less';*/
    @import '../table.less';
    #imgs img{width: 100%}
</style>
<template>
    <div style="width:1928px;">
        <Card>
            <Row :gutter="4">
                <Col span="4">
                <Input v-model="search.description" placeholder="请输入活动描述搜搜..."/>
                </Col>
                <Col span="4">
                <Input v-model="search.sku_title" placeholder="请输入商品标题搜搜..."/>
                </Col>
                <Col span="4">
                <Input v-model="search.supplier_name" placeholder="请选择供应商名称搜搜..."/>
                </Col>
                <!--<Col span="3">-->
                <!--<Select v-model="search.curstatus" placeholder="请选择活动状态搜搜">-->
                <!--<Option v-for="item in curstatus" :value="item.value" :key="item.value">-->
                <!--{{item.label}}-->
                <!--</Option>-->
                <!--</Select>-->

                <!--</Col>-->
                <!--<Col span="3">-->
                <!--<Select v-model="search.city" placeholder="请选择市公司搜搜" v-if="!isCity">-->
                <!--<Option v-for="item in city" :value="item.label" :key="item.label">{{item.label}}</Option>-->
                <!--</Select>-->

                <!--</Col>-->

                <Col span="2">
                <span @click="handleSearch">
                            <Button type="primary" icon="ios-search" @click="handleSearch">搜索</Button>
                    </span>
                </Col>

            </Row>
        </Card>
        <Card :padding="2">
            <Row>
                <Col span="4">

							 <Button type="info" size="small"  @click="handleSendmanager"  >发货管理</Button>

                </Col>

            </Row>

        </Card>
        <Card>
            <Row class="margin-top-10 searchable-table-con1">
                <Table :columns="cols" :data="datas" :loading="loadStatus"     @on-selection-change="handleSelectChange"
                       size="small">

                </Table>
                <div style="margin: 10px;overflow: hidden" v-if="page.total>0">
                    <div style="float: left;">
                        <Page :total="page.total" :current="page.curPage" :page-size="page.pageSize"
                              @on-change="changePage"></Page>
                    </div>
                </div>
            </Row>
        </Card>
        </Col>
        </Row>
        <!--图片展示-->
        <Modal v-model="pic.picshow" :closable="false">

            <div slot="header"></div>
            <div>
                <img :src="pic.picshowurl"  style="width:100%">
            </div>
            <div slot="footer"></div>
        </Modal>
        <!--审核-->
        <Modal v-model="statusShow.show" width="680">

            <Table :columns="statusShow.cols" size="small" :data="statusShow.datas"
                   :loading="statusShow.loading"></Table>
            <div slot="footer"></div>
        </Modal>
        <!--价格详情-->
        <Modal v-model="priceInfo.show" width="782">
            <Card v-if="!isCity">
            <Row>
                <Col span="3">请选择分公司</Col>
                <Col span="7" >
                <Select  style="width:200px" v-model="priceInfo.area" @on-change="handlePricecitychange"	>
                    <Option v-for="item in citys" :value="item.area" :key="item.value">{{ item.city }}</Option>
                </Select>
                </Col>
                </Row>
            </Card>

                <Table :columns="priceInfo.cols" :data="priceInfo.datas" size="small" :load="priceInfo.loading"></Table>
            </Card>


                <Row style="margin-top:20px;">
                    <Col span="3"  >
                    设置原价</Col>
                    <Col span="2">
                    <InputNumber :max="1000000" v-model="priceInfo.lastOprice" size="small" :min="0"></InputNumber>
                    </Col>
                    <Col span="3" offset="2">
                    <Button type="primary" size="small" @click="setOprice" :disabled="disableStatus||checklist.price">设置原价</Button>
                    </Col>
                </Row>
                <Row style="margin-top:20px;">
                    <Col span="3"  >
                    店东分润</Col>
                    <Col span="2">
                    <InputNumber :max="100" :min="0" v-model="priceInfo.profit_rate" size="small"
                                 @on-change="changeProfit"></InputNumber>
                    </Col>
                    <Col span="3" offset="2">
                        <Button type="primary" :precision="2" size="small"
                                :disabled="disableStatus||priceInfo.disableProfit||checklist.price" @click="setProfit">设置店东分润
                        </Button>

                    </Col>
                    <Col offset="1"  span="13" >
                    <span style="color:#ccc">备注:</span><span style="color:indianred">10,指店东的分润金额为每笔成交订单金额的百分之十</span> </Col>
                </Row>


            </Card>
            <div slot="footer"></div>
        </Modal>
        <Modal v-model="addPrice.show">

            <Card>
                <Row>
                    <Col span="3" offset="1">
                    成团数量</Col>
                    <Col span="1" offset="1">
                    {{addPrice.groupnum}}</Col>
                </Row>
                <Row style="margin-top:10px;">
                    <Col span="4" offset="1">
                    售价为:</Col>
                    <Col span="2">
                    <InputNumber v-model="addPrice.price" size="small" :min="0"></InputNumber>
                    </Col>

                </Row>
                <Row>
                    <Col>
                    {{addPrice.info}}</Col>
                </Row>

            </Card>
            <div slot="footer">
                <Row>
                    <Col offset="10" span="3">
                    <Button type="primary" @click="setTiredPrice">添加</Button>
                    </Col>
                    </Col>
                </Row>
            </div>
        </Modal>
        <Modal v-model="citylist.show">
            <Table :columns="citylist.cols" :data="citylist.datas" :loading="citylist.loading"></Table>
            <div slot="footer">

            </div>
        </Modal>
        <Modal v-model="citycheck.show">
            <Row>
                <Col span="10" offset="9">
                <RadioGroup v-model="citycheck.val" >
                    <Radio label="通过"></Radio>
                    <Radio label="拒绝"></Radio>
                </RadioGroup>
                </Col>

            </Row>
            <Row style="margin-top:20px;" v-if="citycheck.val=='拒绝'">
                <Col>
                     <Input type="textarea" v-model="citycheck.reason"  placeholder="请输入拒绝原因" :rows="3" />
                </Col>
            </Row>

            <div slot="footer">
                <Row>
                    <Col span="2" offset="10">
                    <Button type="primary" @click="handlecitycheck" :disabled="checklist.check">确定</Button>
                    </Col>
                </Row>

            </div>
        </Modal>
        <!-- 分拣发货-->
        <Modal v-model="newsendmanager.show" title="分拣发货" width="1100" height="100%">
            <Tabs v-model="newsendmanager.tabs" @on-click="handleTabssend">
                <TabPane label="待发货" name="nosend">
                    <Card>

                        <Row>
                            <Col span="4" >
                            <Select v-model="newsendmanager.search.order_type" placeholder="请选择排序类型" >
                                <Option v-for="item in newsendmanager.order_type" :value="item.value" :key="item.value">{{ item.title }}</Option>
                            </Select>
                            </Col>
                            <Col span="4" offset="1">
                            <Input v-model="newsendmanager.search.sku_title" placeholder="请输入商品标题搜搜..."  />
                            </Col>
                            <Col span="4" offset="1">
                            <Input v-model="newsendmanager.search.shop_name" placeholder="请输入社区名称搜搜..."  />
                            </Col>
                            <Col span="3" offset="1">
                            <Input v-model="newsendmanager.search.mobile" placeholder="请输入粉丝手机号搜搜..."  />
                            </Col>

                            <Col span="2" offset="1">
                            <Select v-model="newsendmanager.search.shop_type" placeholder="请选择店铺类型搜搜..." >
                                <Option v-for="item in newsendmanager.shop_type" :value="item.value" :key="item.value">{{ item.title }}</Option>
                            </Select>
                            </Col>

                            <Col span="1" offset="1" >
                            <Button type="primary"    @click="sendSearch('n')">搜索</Button>
                            </Col>
                            </span>
                        </Row>
                        <Row style="margin-top:20px;">
                            <Col offset="5" span="4">
                            <Button type="info" @click="handleNewsendmanagerSend" :disabled="checklist.enableSend">发货</Button>
                            </Col>
                            <Col offset="2" span="4">
                            <Button type="info" @click="handleExportNewsendmanagerSend">导出</Button>
                            </Col>
                            <Col offset="2" span="4">
                            <Button type="info" @click="handleExportNewsendPrint">打印</Button>
                            </Col>
                        </Row>
                        <Row style="margin-top:20px;">
                            <Col>
                            <Table :columns="newsendmanager.nosend.keys" ref="nosend" size="large" :data="newsendmanager.nosend.datas" @on-selection-change="handleSendSelectChange" >
                            </Table>
                            </Col>
                        </Row>

                    </Card>
                </TabPane>
                <TabPane label="历史发货" name="history">
                    <Card>
                        <Row>
                            <Col span="4"  >
                            <Select v-model="newsendmanager.search.order_type" placeholder="请选择排序类型" >
                                <Option v-for="item in newsendmanager.order_type" :value="item.value" :key="item.value">{{ item.title }}</Option>
                            </Select>
                            </Col>
                            <Col span="4" offset="1">
                            <Input v-model="newsendmanager.search.sku_title" placeholder="请输入商品标题搜搜..."  />
                            </Col>
                            <Col span="4" offset="1">
                            <Input v-model="newsendmanager.search.shop_name" placeholder="请输入社区名称搜搜..."  />
                            </Col>
                            <Col span="3" offset="1">
                            <Input v-model="newsendmanager.search.mobile" placeholder="请输入粉丝手机号搜搜..."  />
                            </Col>
                            <Col span="2" offset="1">
                            <Select v-model="newsendmanager.search.shop_type" placeholder="请选择店铺类型搜搜..." >
                                <Option v-for="item in newsendmanager.shop_type" :value="item.value" :key="item.value">{{ item.title }}</Option>
                            </Select>
                            </Col>
                            <Col span="1" offset="1">
                            <Button type="primary"    @click="sendSearch('h')">搜索</Button>
                            </Col>
                            </span>
                        </Row>
                        <Row style="margin-top:20px;">
                            <Col>
                            <Table :columns="newsendmanager.history.keys" ref="sendhistory" size="large" :data="newsendmanager.history.datas" @on-selection-change="handleSendSelectChange">
                            </Table>
                            </Col>
                        </Row>
                        <Row style="margin-top:20px;">
                            <Col offset="7" span="4">
                            <Button type="info" @click="handleExportNewsendmanagerSend">导出历史发货</Button>
                            </Col>
                            <Col offset="2" span="4">
                            <Button type="info" @click="handleExportNewsendPrint">打印</Button>
                            </Col>
                        </Row>
                    </Card>
                </TabPane>

            </Tabs>
            <div slot="footer">
            </div>
        </Modal>
        <!-- 标签打印 -->
        <Modal v-model="labelsPrint" title="打印" width="100%" id="labels-print" :closable="false"
           >
            <labels-print :labelData="labelsData"></labels-print>
            <div slot="footer">
            </div>

        </Modal>
        <!--活动详情-->
        <Modal v-model="grouponinfo.show" width="760"  >
            <!--<groupinfo :activeb="grouponinfo.active" ></groupinfo>-->
            <Card >
                <Row>
                    <Col span="3">活动描述</Col>
                    <Col span="20">{{grouponinfo.active.description}}</Col>
                </Row>
                <Row style="margin-top:10px;">
                    <Col span="3">开团时间</Col>
                    <Col span="6">{{grouponinfo.active.begin_time}}</Col>
                    <Col span="3">结束时间</Col>
                    <Col span="6">{{grouponinfo.active.end_time}}</Col>
                </Row>
                <Row style="margin-top:10px;">
                    <Col span="3">预告时间</Col>
                    <Col span="6">{{grouponinfo.active.notice_time}}</Col>
                    <Col span="2">总销量</Col>
                    <Col span="2">{{grouponinfo.active.sold_out}}</Col>
                    <Col span="2">限量</Col>
                    <Col span="2">{{grouponinfo.active.limit_num}}</Col>
                </Row>
                <Row style="margin-top:10px;">
                    <Col span="3">
                    采购价格
                    </Col>
                    <Col span="20">
                    {{grouponinfo.active.purchase_price}}
                    </Col>
                </Row>

            </Card>
            <Card>
                <Table :columns="grouponinfo.cols" :data="grouponinfo.active.exclude_shops"
                       size="small" refs="t" >

                </Table>
            </Card>
            <Card>
                <Row>
                    <Col span="3">
                    活动图片
                    </Col>
                    <Col span="3">
                    <a @click="handleShowImg(grouponinfo.active.pic)">
                        <img :src="grouponinfo.active.pic" style="width:70px;height:70px;"/>
                    </a>
                    </Col>
                    <Col span="3" v-for="item in grouponinfo.active.sku_id" :key ="item">
                    <a  @click="handleShowImg(item)">
                        <img :src="item" style="width:70px;height:70px;" />

                    </a>

                    </Col>
                </Row>
            </Card>
            <Card>
                <Row>
                    <Col>活动详情</Col>
                </Row>
                <Row>
                    <Col>

                    <p v-html="grouponinfo.active.rank" id="imgs" ></p>

                    </Col>
                </Row>
            </Card>
            <div slot="footer"></div>
        </Modal>
        <Modal v-model="grouponinfo.price.show"   :closable="false" >
            <div slot="header"></div>

            <Table :columns="grouponinfo.price.cols" :data="grouponinfo.price.datas"
                   size="small" refs="b">

            </Table>
            <div slot="footer"></div>
        </Modal>
        <Modal v-model="grouponinfo.pics.show" width="600" :closable="false">
            <div slot="header"></div>

            <img :src="grouponinfo.pics.url" style="width:100%" />
            <div slot="footer"></div>
        </Modal>
        <Modal v-model="coupon.show" width="600" :closable="false" title="优惠券">
            <div slot="header">
                优惠券
            </div>
            <Row>
                <Col span="3">分享得券</Col>
                <Col span="13">
                <Select v-model="coupon.coupon_id" style="width:260px" placeholder="分享得券" :clearable="true" >
                    <Option v-for="item in coupon.coupons" :value="item.id" :key="item.id">
                        {{ item.title }}</Option>
                </Select>
                </Col>
                <Col span="2" >
                <Button type="info" @click="handelSharecoupon">设置</Button>
                </Col>
            </Row>
            <Divider />
            <Row style="margin-top:20px;">
                <Col span="3">使用优惠券</Col>
                <Col span="13">
                <Select v-model="coupon.coupon_ids" style="width:260px" placeholder="使用优惠券" :multiple="true">
                    <Option v-for="item in coupon.coupons" :value="item.id" :key="item.id">
                        {{ item.title }}</Option>
                </Select>
                </Col>
                <Col span="2" >
                <Button type="info" @click="handelUsecoupon">设置</Button>
                </Col>
            </Row>
            <Divider />

                <Row style="margin-top:20px;">
                    <Col span="3">参与得券</Col>
                        <Col span="13">
                            <Select v-model="coupon.buy_gift_coupon_id" style="width:260px" placeholder="参与得券" :clearable="true" >
                                <Option v-for="item in coupon.coupons" :value="item.id" :key="item.id">
                                    {{ item.title }}
                                </Option>
                            </Select>
                        </Col>
                </Row>
                <Row style="margin-top:10px;">
                    <Col span="3">参与得券最大张数</Col>
                    <Col span="2">
                    <InputNumber v-model="coupon.per_buy_gift_coupon_num"  placeholder="请填参与得券最大数" :min="0" :step="2"></InputNumber>

                    </Col>
                    <Col span="2"  offset="11" >
                       <Button type="info" @click="handelTakecoupon">设置</Button>
                    </Col>
                </Row>
                <Row style="margin-top:20px;">
                    <Col span="20">
                    <span style="margin-left:20px;color:crimson">注:粉丝参与活动能获得优惠券张数的最大值,0表示不限制</span>
                    </Col>

                </Row>



            <div slot="footer"></div>

        </Modal>

    </div>
</template>

<script>
    import labelsPrint from '../components/labelsPrint.vue';
    //import Groupinfo from '../components/grouponinfo.vue';

    export default {
        name: 'groupbuy',
        components:{
            labelsPrint,
           // Groupinfo
        },
        data () {
            return {
                coupon:{
                    per_buy_gift_coupon_num:0,
                    buy_gift_coupon_id:"",
                    coupon_id:"",
                    coupon_ids:[],
                    coupons:[],
                    show:false,
                    promotion_id:"",

                },
                styleObj:{
                   zIndex:'1000'
                },
                grouponinfo:{
                    pics:{
                        show:false,
                        url:'',
                    },
                    show:false,
                    active:{},//活动
                    cols:[
                        {title:"销售区域",key:'area',tooltip:true,width:100},
                        {title:"原价",key:'origin_price',sortable:true,width:100},
                        {title:"阶梯价",key:'tiered_prices',width:100,
                            render:(h,p)=>{
                                let len = p.row.tiered_prices.length;

                                return h('a',{
                                    on:{
                                        click:()=>{
                                          //  this.styleObj.styleObj=1000
                                            this.grouponinfo.price.datas = [];
                                             this.grouponinfo.price.show = true;
                                            this.grouponinfo.price.datas = p.row.tiered_prices;

                                        }
                                    }
                                },'查看')
                            }
                        },
                        {title:'当前售价',key:'reason',sortable:true,width:110
                        },
                        {title:"分润",key:'profit_rate',width:90},
                        {title:"销量",key:'deleted_at',sortable:true,width:90},
                        {title:"审核状态",key:'status',width:100}
                    ],
                    price:{
                        cols:[
                            {title:"成团数量",key:'groupon_num',sortable:true},
                            {title:"价格",key:'price',sortable:true},
                        ],
                        datas:[],
                        show:false,
                    },

                },
                citys:[],//分公司列表
                grouponId:[],//选择的活动promotion_id
                senderData:[],
                labelsPrint: false,
                labelsData: [],
                newsendmanager: { //发货管理
                    search:{
                        sku_title:'',
                        shop_name:'',
                        mobile:'',
                        shop_type:'2',
                        order_type:'2'
                    },
                    shop_type:[
                        {'value':'2','title':'全部'},
                        {'value':'0','title':'门店自取'},
                        {'value':'1','title':'送货上门'},
                    ],
                    order_type:[
                        {'value':'2','title':'社区名称、商品标题排序'},
                        {'value':'1','title':'商品标题、社区名称排序'},
                    ],
                    selectDatas: [],
                    show: false,
                    tabs: 'nosend',
                    history: {
                        keys: [{
                            type: 'selection',
                            width: 60,
                            align: 'center'
                        },
                            {
                                key: 'preorder_id',
                                sortable: true,
                                title: '活动id',
                                width: 66
                            },
                            {
                                key: 'description',
                                tooltip:true,
                                sortable: true,
                                title: '活动标题'
                            },
                            {
                                key: 'sku_title',
                                tooltip:true,
                                sortable: true,
                                title: '产品名称'
                            },
                            {
                                key: 'quantity',
                                sortable: true,
                                title: '产品数量'
                            },
                            {
                                key: 'specs',
                                sortable: true,
                                title: '产品规格'
                            },
                            {
                                key: 'shop_name',
                                title: '社区名称',
                                tooltip:true,
                                sortable: true,
                                width: 110
                            },
                            {
                                key: 'receiver_name',
                                sortable: true,
                                tooltip:true,
                                title: '收货人'
                            },
                            {
                                key: 'mobile',
                                width: 126,
                                tooltip:true,
                                sortable: true,
                                title: '手机号'
                            },
                            {
                                key: 'remark',
                                sortable: true,
                                tooltip:true,
                                title: '订单备注'
                            },
                            {
                                key: 'sender',
                                sortable: true,
                                tooltip:true,
                                title: '发货人'
                            },
                            {
                                key: 'send_time',
                                sortable: true,
                                tooltip:true,
                                title: '发货时间',
                                width: 110
                            },{
                                key:'getgoods',
                                title:"取货方式"
                            }
                        ],
                        datas: [],
                    },
                    nosend: {
                        keys: [{
                            type: 'selection',
                            width: 60,
                            align: 'center'
                        },
                            {
                                key: 'id',
                                sortable: true,
                                title: '活动id',
                                width: 66
                            },
                            {
                                key: 'description',
                                sortable: true,
                                tooltip:true,
                                title: '活动标题'
                            },
                            {
                                key: 'sku_title',
                                sortable: true,
                                tooltip:true,
                                title: '产品名称'
                            },
                            {
                                key: 'quantity',
                                sortable: true,
                                title: '产品数量'
                            },
                            {
                                key: 'specs',
                                sortable: true,
                                tooltip:true,
                                title: '产品规格'
                            },
                            {
                                key: 'shop_name',
                                title: '社区名称',
                                tooltip:true,
                                sortable: true,
                                width: 110
                            },
                            {
                                key: 'receiver_name',
                                sortable: true,
                                title: '收货人'
                            },
                            {
                                key: 'mobile',
                                width: 126,
                                sortable: true,
                                title: '手机号'
                            },
                            {
                                key: 'remark',
                                sortable: true,
                                tooltip:true,
                                title: '订单备注'
                            },{
                                key:'getgoods',
                                title:"取货方式"
                            }
                        ],
                        datas: []
                    }
                },
                citycheck: {
                    gid: '',
                    show: false,
                    val: '通过',
                    reason:'',

                },
                checklist: {
                    check: true,//审核权限
                    price:true,//修改价格权限
                    enableSend:true,//发货权限
                    enableCoupon:true,//优惠券
                },
                citylist: {
                    //销售范围
                    show: false,
                    loading: true,
                    datas: [],
                    cols: [
                        {title: '城市名称',tooltip:true, key: 'company_name'},
                    ],
                },
                addPrice: {
                    price: 0,
                    show: false,
                    groupnum: 0,
                    info: ''
                },
                disableStatus: true,
                priceInfo: {
                    id: '',
                    area:'',
                    disableOprice: true,
                    disableProfit: false,
                    disablePrice: true,
                    profit_rate: 0,
                    groupnum: 0,
                    price: 0,
                    oPrice: 0,
                    lastOprice: 0,
                    show: false,
                    cols: [
                        {title: '成团数量', sortable: true, key: 'groupon_num', width: 106},
                        {
                            title: '采购价', sortable: true, key: 'purchase_price', width: 100
                        },
                        {
                            title: '原价', sortable: true, key: 'origin_price', width: 100,
                            render: (h, p) => {
                                return h('span', this.priceInfo.oPrice);
                            }
                        },
                        {
                            title: '售价', sortable: true, key: 'price', width: 100
                        },
                        {title: '公司每份利润', sortable: true, key: 'c_profit', width: 126},
                        {title: '店东每份利润', sortable: true, key: 's_profit', width: 126}, {
                            title: '操作', key: 'operation', width: 90,
                            render: (h, p) => {
                                return h('a', {
                                    on: {
                                        click: () => {
                                            this.addPrice.groupnum = p.row.groupon_num;
                                            this.addPrice.price =p.row.price? parseFloat(p.row.price):0;
                                            this.addPrice.show = true;
                                        }
                                    },
                                    attrs: {
                                        // disabled:p.row.price>0?true:false
                                        disabled: (this.disableStatus||this.checklist.price)?true:false,
                                    }
                                }, Number(p.row.price)>0?'修改售价':'添加售价');
                            }
                        }
                    ],
                    datas: [],
                    loading: true,
                },
                statusShow: {
                    cols: [
                        {title: 'id', sortable: true, key: 'groupon_id', width: 80},
                        {
                            title: '操作', key: 'oper', width: 100, render: (h, p) => {
                                var _this = this;
                                return h('span', [
                                    h('a', {
                                        attrs: {
                                            disabled: (!_this.checklist.check && (p.row.status!='3'&&p.row.status!='1'))?false:true,
                                        },
                                        on: {
                                            click: function () {
                                                _this.$http.get('groupbuy/up&id=' + p.row.id + '&status=3').then((res) => {
                                                    if (res.data.rs == 'true') {
                                                            p.row.status = '3';
                                                        _this.$Message.success('设置成功');
                                                    } else {
                                                        _this.$Message.error(res.data.msg);
                                                    }

                                                }).catch(() => {
                                                });
                                            }
                                        },
                                    }, '通过'),
                                    h('span', {
                                        attrs: {
                                            style: 'margin-left:10px;',
                                        }
                                    }),
                                    h('a', {
                                        attrs: {
                                            disabled:  (!_this.checklist.check && (p.row.status!='4'&&p.row.status!='2'))?false:true,
                                        },
                                        on: {
                                            click: function () {
                                                _this.$http.get('groupbuy/down&id=' + p.row.id + '&status=4&reason=总部强制拒绝').then((res) => {
                                                    if (res.data.rs == 'true') {
                                                            p.row.status = '4';
                                                        _this.$Message.success('设置成功');
                                                    } else {
                                                        _this.$Message.error(res.data.msg);
                                                    }

                                                }).catch(() => {
                                                });
                                            }
                                        }

                                    }, '拒绝')

                                ]);
                            }
                        },
                        {
                            title: '分公司',tooltip:true, key: 'city', width: 120
                        },
                        {
                            title: '审核状态', key: 'status', width: 90, render: (h, p) => {
                                let status = '待审核';
                                switch (p.row.status) {
                                    case '0':
                                        status = '待审核';
                                        break;
                                    case '1':
                                        status = '已通过';
                                        break;
                                    case '2':
                                        status = '已拒绝';
                                        break;
                                    case '3':
                                        status = '总部已通过';
                                        break;
                                    case '4':
                                        status = '总部已拒绝';
                                        break;
                                }
                                return h('span', status
                                );
                            }

                        },
                        {title: '审核时间', 'key': 'oper_time', width: 150},
                        {title: '审核人', width: 100, key: 'admin_name'}

                        // {title: '分公司拒绝原因', 'key': 'reason', width: 150},
                        // {title: '总部拒绝原因', 'key': 'zb_reason', width: 150},

                    ],
                    datas: [],
                    show: false,
                    loading: true
                },
                pic: {
                    picshow: false,
                    picshowurl: '',

                },
                isCity: false,
                city: [],//市公司
                curstatus: [],//活动状态
                page: {
                    total: 0,//总记录数
                    pageSize: 100,
                    curPage: 1

                },
                loadStatus: false,
                search: {
                    description: '',
                    sku_title: '',
                    supplier_name: '',
                    curstatus: '',
                    city: '',

                },
                cols: [
                     {
                        type: 'selection',
                         width:60
                    },
                    {
                        title: '活动首图', width: 110, key: 'pic',
                        render: (h, p) => {
                            return h('a', {
                                on: {
                                    click: () => {
                                        this.pic.picshowurl = p.row.pic;
                                        this.pic.picshow = true;
                                    }
                                }
                            }, [
                                h('img', {
                                    attrs: {
                                        style: 'height:60px;width:60px;',
                                        src: p.row.pic
                                    }
                                })
                            ]);
                        }
                    },
                    // {
                    // title:"优惠券",
                    // width:100,
                    // render:(h,p)=>{
                    //     return h('a',{
                    //         attrs: {
                    //             // disabled:p.row.price>0?true:false
                    //             disabled: (p.row.groupon_status=='1'||this.checklist.enableCoupon)?true:false,
                    //         },
                    //         on:{
                    //             click:()=>{
                    //                 this.coupon.promotion_id = p.row.promotion_id;
                    //                 this.coupon.show = true;
                    //                 this.coupon.coupon_id = p.row.coupon_id;
                    //                 this.coupon.buy_gift_coupon_id = p.row.buy_gift_coupon_id;
                    //                 this.coupon.buy_gift_coupon_id = p.row.buy_gift_coupon_id;
                    //                 this.coupon.per_buy_gift_coupon_num = parseInt(p.row.per_buy_gift_coupon_num);
                    //                 this.$http.post('groupbuy/coupons',{active_type:p.row.active_type,area:p.row.area,promotion_id:p.row.promotion_id}).then((res)=>{
                    //                     this.coupon.coupons = res.data.rs;
                    //                     this.coupon.coupon_ids =  res.data.couponIds;
                    //                 }).catch((err)=>{
                    //                     console.log(err);
                    //                 })
                    //
                    //             }
                    //         }
                    //     },"设置优惠券")
                    // }
                    // },
                    {title:"活动详情",key:"detailinfo",width:90,
                        render:(h,p)=>{
                            return h('a',{
                                on:{
                                    click:()=>{

                                        this.$http.get('groupbuy/info&id='+p.row.id).then((res)=>{
                                            this.grouponinfo.show = true;
                                            // this.styleObj.zIndex='12';
                                           // this.grouponinfo.pro = res.data.pro;
                                            this.grouponinfo.active={};
                                            this.grouponinfo.active = res.data.active;

                                        }).catch((err)=>{});


                                    }
                                }
                            },"活动详情")
                        }
                    },
                    {title: 'id', sortable: true, key: 'id', width: 80},
                    {title:'成团状态',key:'groupon_status',width:100,
                        render:(h,p)=>{
                                let s='进行中';
                                if(this.isCity){
                                    if(p.row.company_sold_out>0){
                                        s="已成团";
                                    }else if (p.row.groupon_status=='2'){
                                        s="未成团";
                                    }
                                }else{
                                    if(p.row.sold_out>0){
                                        s="已成团";
                                    }else if (p.row.groupon_status=='2'){
                                        s="未成团";
                                    }
                                }


                            return h('span',s)
                        }
                    },
                    {
                        key:"fake_sold_out",
                        title:"营销销量",
                        width:86

                    },
                    {
                        title: '审核状态', width: 110, key: 'curstatus',
                        render: (h, p) => {
                            var _this = this;
                            if (this.isCity) {
                                let status = '';
                                switch (p.row.city_check_status) {
                                    case '0':
                                        p.row.status = '待审核';
                                        break;
                                    case '1':
                                        p.row.status = '已通过';
                                        break;
                                    case '2':
                                        p.row.status = '已拒绝';
                                        break;
                                    case '3':
                                        p.row.status = '总公司已通过';
                                        break;
                                    case '4':
                                        p.row.status = '总公司已拒绝';
                                        break;
                                }
                                return h('a', {
                                    attrs: {
                                        disabled: (p.row.city_check_status == '0' ||p.row.city_check_status==1||p.row.city_check_status==2) ? false : true,
                                    },
                                    on: {
                                        click () {
                                            //alert('city_check_status');
                                            //console.log(p.row.city_check_status);
                                            _this.citycheck.val = p.row.city_check_status=='2'?"拒绝":"通过",
                                            _this.citycheck.reason = p.row.reason;
                                            _this.citycheck.show = true;
                                            _this.citycheck.gid = p.row.id;

                                        },
                                    }
                                }, p.row.status);
                            } else {
                                return h('a', {
                                    on: {
                                        click: () => {
                                            // alert("查看");
                                            this.$http.get('groupbuy/status&id=' + p.row.id).then((res) => {
                                                this.statusShow.datas = res.data;
                                                this.statusShow.loading = false;
                                                this.statusShow.show = true;
                                            }).catch((err) => {
                                                console.log(err);
                                            });

                                        }
                                    }
                                }, '查看');
                            }
                        }
                    },
                    {title: '活动描述', tooltip:true,key: 'description', width: 140},

                    {
                        title: '销售价格', width: 86, key: 'saleprice', render: (h, p) => {

                            //  this.isCity = true;
                            return h('span', [
                                h('a', {
                                    on: {
                                        click: () => {
                                            //alert('price');
                                            this.$http.get('groupbuy/price&id=' + p.row.id).then((res) => {
                                                this.disableStatus = Boolean(res.data.status); //是否有已经审核通过的，审核通过的不能再设置
                                                this.checklist.price = Boolean(res.data.nopriceset);
                                               // console.log(this.disableStatus);
                                                this.priceInfo.oPrice =res.data.priceInfo.oPrice? parseFloat(res.data.priceInfo.oPrice):0;
                                                this.priceInfo.lastOprice = this.priceInfo.oPrice;
                                                this.priceInfo.profit_rate = res.data.priceInfo.profit_rate?parseFloat(res.data.priceInfo.profit_rate):0;
                                                this.priceInfo.show = true;
                                                this.priceInfo.id = p.row.id;
                                                this.priceInfo.loading = false;
                                                this.priceInfo.datas = res.data.rs;
                                                this.citys = res.data.citys;
                                                this.priceInfo.area =res.data.area;
                                            }).catch((err) => {

                                            });
                                        }
                                    }
                                }, '详情'),

                            ]);
                        }
                    },
                    {title: '开团时间', key: 'begin_time', width: 150, sortable: true},
                    {title: '结束时间', tooltip:true,key: 'end_time', width: 150, sortable: true},
                    {title: '商品标题',tooltip:true, key: 'sku_title', width: 150},
                    {
                        title: '销售范围', width: 120, key: 'saleRange',
                        render: (h, p) => {
                            // let saleRange="";
                            //   console.log(p);
                            return h('a', {
                                on: {
                                    click: () => {
                                        // alert('查看销售城市');
                                        this.$http.get('groupbuy/citylist&id=' + p.row.id).then((res) => {
                                          //  console.log(res.data);
                                            this.citylist.show = true;
                                            this.citylist.datas = res.data;
                                            this.citylist.loading = false;
                                           // console.log(this.city);
                                        }).catch((err) => {
                                        });
                                    }
                                },
                                attrs: {
                                    disabled: p.row.active_type == '1' ? true : false
                                }
                            }, p.row.active_type == '1' ? '全国' : '城市');
                        }
                    },
                    {title: '采购价格', width: 100, key: 'purchase_price'},
                    // {title: '已售数量', width: 110, key: 'sold_out', sortable: true},
                    {title: '限量', width: 90, key: 'limit_num', sortable: true},

                    {title: '供应商', tooltip:true,key: 'supplier_name', width: 120},
                    {title: '预告时间', key: 'notice_time', width: 150, sortable: true},

                ],
                datas: []
            }
        },
        mounted () {
            this.init();
        },
        methods: {
            handelTakecoupon(){
                //参与得券
                if(!this.coupon.promotion_id){
                    this.$Message.error("参数缺失");
                    return;
                }
                if(this.coupon.per_buy_gift_coupon_num>0){
                    if(!this.coupon.buy_gift_coupon_id){
                        this.$Message.error("请选择要送的优惠券");
                        return;
                    }
                }
                var rs ={
                    promotion_id:this.coupon.promotion_id,
                    buy_gift_coupon_id:this.coupon.buy_gift_coupon_id,
                    per_buy_gift_coupon_num:this.coupon.per_buy_gift_coupon_num
                };
                this.$http.post('groupbuy/takecoupon',rs).then((res)=>{
                    if(res.data.rs=='true'){
                    this.$Message.success("设置成功");
                    this.$router.go(0);
                }else{
                    this.$Message.error(res.data.msg);
                }
            }).catch((err)=>{

                });

            },
            handelSharecoupon(){
                //分享用的优惠券
                // if(!this.coupon.coupon_id){
                //     this.$Message.error("请选择分享活动得到的优惠券");
                //     return;
                // }
                if(!this.coupon.promotion_id){
                    this.$Message.error("参数缺失");
                    return;
                }
                var rs ={
                    promotion_id:this.coupon.promotion_id,
                    coupon_id:this.coupon.coupon_id
                };
                this.$http.post('groupbuy/sharecoupon',rs).then((res)=>{
                    if(res.data.rs=='true'){
                        this.$Message.success("设置成功");
                        this.$router.go(0);
                    }else{
                        this.$Message.error(res.data.msg);
                    }
                }).catch((err)=>{

                });

            },
            handelUsecoupon(){
                //使用优惠券
                // if(this.coupon.coupon_ids.length<1){
                //     this.$Message.error("请选择活动要使用的优惠券");
                //     return;
                // }
                if(!this.coupon.promotion_id){
                    this.$Message.error("参数缺失");
                    return;
                }
                var rs ={
                    promotion_id:this.coupon.promotion_id,
                    coupon_ids:this.coupon.coupon_ids
                };
                this.$http.post('groupbuy/usecoupon',rs).then((res)=>{
                    if(res.data.rs=='true'){
                       this.$Message.success("设置成功");
                    }else{
                        this.$Message.error(res.data.msg);
                    }
                }).catch((err)=>{

                });

            },
            handleShowImg(v){
                this.grouponinfo.pics.show = true;
                this.grouponinfo.pics.url = v;
            },
            handlePricecitychange(){
                //设置价格时，城市改边
                if(!this.priceInfo.id||!this.priceInfo.area){
                    this.$Message.error("参数缺失");
                    return;
                }

                this.$http.get('groupbuy/price&id=' + this.priceInfo.id+'&area='+this.priceInfo.area).then((res) => {
                     this.disableStatus = Boolean(res.data.status); //是否有已经审核通过的，审核通过的不能再设置
                    this.checklist.price = Boolean(res.data.nopriceset);
                    // console.log(this.disableStatus);
                    this.priceInfo.oPrice =res.data.priceInfo.oPrice? parseFloat(res.data.priceInfo.oPrice):0;
                    this.priceInfo.lastOprice = this.priceInfo.oPrice;
                    this.priceInfo.profit_rate = res.data.priceInfo.profit_rate?parseFloat(res.data.priceInfo.profit_rate):0;
                    this.priceInfo.show = true;
                   // this.priceInfo.id = p.row.id;
                    this.priceInfo.loading = false;
                    this.priceInfo.datas = res.data.rs;
                    //this.citys = res.data.citys;
                    this.priceInfo.area =res.data.area;
                }).catch((err) => {

                });


            },
            //打印
            handleExportNewsendPrint(){
                this.labelsData = [];
                if(this.senderData.length>0){
                    //	alert('sdsfsd');
                    this.labelsData = this.senderData;
                    this.labelsPrint = true;
                    //	console.log(this.labelsData);
                }else{
                    this.$Notice.error({
                        title: "请选择要打印的送货单",
                        desc: "请选择要打印的送货单",
                        duration: 1
                    });
                    return;
                };
            },

            handleExportNewsendmanagerSend(){
                //导出待发货
                if(!this.senderData.length) {
                    this.$Message.error("请选择要导出的发货数据");
                } else {
                    this.$refs.nosend.exportCsv({
                        fileName: "发货数据",
                        columns: [{
                            key: 'id',
                            title: '活动id'
                        },
                            {
                                key: 'description',
                                title: '活动标题'
                            },
                            {
                                key: 'sku_title',
                                title: '产品名称'
                            },
                            {
                                key:"cat_name",
                                title:"分类名称"
                            },
                            {
                                key: 'quantity',
                                title: '产品数量'
                            },
                            {
                                key: 'specs',
                                title: '产品规格'
                            },
                            {
                                key: 'shop_name',
                                title: '社区名称'
                            },
                            {
                                key: 'receiver_name',
                                title: '收货人'
                            },
                            {
                                key: 'mobile',
                                title: '手机号'
                            },
                            {
                                key: 'remark',
                                title: '订单备注'
                            },{
                            key:'getgoods',
                                title:"取货方式"
                            }
                        ],
                        data: this.senderData
                    });
                }
            },
            //发货
            handleNewsendmanagerSend(){
                 if(this.senderData.length<=0){
                     this.$Message.error("请选择要发货的数据");
                     return;
                 }
                this.$http.post('groupbuy/send', {send:this.senderData}).then((res) => {
                    if(res.data.rs == 'true') {
                        this.$Notice.success({
                            title: '发货成功',
                            desc: '发货成功',
                            duration: 1
                        });
                        this.senderData = [];
                        this.handleTabssend('nosend');
                    } else {
                        this.$Notice.error({
                            title: '发货失败',
                            desc: '发货失败',
                            duration: 1
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });


            },
            handleTabssend(name) {
                //console.log(name);
                this.newsendmanager.search.sku_title='';
                this.newsendmanager.search.shop_name='';
                this.newsendmanager.search.mobile='';
                this.newsendmanager.search.shop_type='2';
                this.newsendmanager.search.order_type='2';
               // this.newsendmanager.senderData = [];
                this.senderData = [];
                if(name == 'history') {
                    //alert('history');
                    if(!(this.grouponId.length)) {
                        this.$Notice.error({
                            title: '查询参数缺失',
                            desc: '查询参数缺失',
                            duration: 1
                        });
                        return;
                    }
                    this.newsendmanager.history.datas = [];
                    this.$http.post('groupbuy/sendhistory', {id:this.grouponId}).then((res) => {
                        //console.log(res);
                        this.newsendmanager.history.datas = res.data;
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    //	alert('nocai');
                    this.newsendmanager.nosend.datas = [];
                    this.$http.post('groupbuy/nosend', {
                        id: this.grouponId
                    }).then((res) => {
                        this.newsendmanager.nosend.datas = res.data;
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            },
            //发货搜索
            sendSearch(val){
                if(val=='n'){
                    //未发货
                    this.newsendmanager.nosend.datas = [];
                    this.$http.post('groupbuy/nosend',{
                        id: this.grouponId,
                        search:this.newsendmanager.search
                    }).then((res) => {
                        this.newsendmanager.nosend.datas = res.data;
                    }).catch((err) => {
                        console.log(err);
                    });
                }else{
                    //已发货
                    this.$http.post('groupbuy/sendhistory', {id:this.grouponId,search:this.newsendmanager.search}).then((res) => {
                        //console.log(res);
                        this.newsendmanager.history.datas = res.data;
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            },

            /* 发货选择变化时*/
            handleSendSelectChange(select){
                this.senderData = [];
                if(select.length>0){
                    select.map((item)=>{
                        this.senderData.push(item);
                    });
                }
            },
            /*选择发生变化时 promotion_id*/
             handleSelectChange(select){
                //console.log(select);
                 this.grouponId = [];
                 if(select.length>0){
                     select.map((item)=>{
                         this.grouponId.push(item.promotion_id);
                     });
                 }
                // console.log(this.grouponId);
             },
            /*发货管理*/
            handleSendmanager(){
                if(this.grouponId.length<=0){
                    this.$Message.error("请选择要发货的活动");
                    return;
                }
                this.newsendmanager.show = true;
                this.newsendmanager.tabs = 'nosend';
                this.newsendmanager.nosend.datas = [];
                this.$http.post('groupbuy/nosend',{id:this.grouponId}).then((res)=>{
                    this.newsendmanager.nosend.datas = res.data;
                }).catch();

            },
            //市公司审核
            handlecitycheck () {
                let status = 1;
                let method = 'groupbuy/up';
                if (this.citycheck.val == '拒绝') {
                    status = 2;
                    method = 'groupbuy/down';
                    if(this.citycheck.reason.length<=0){
                        this.$Message.error("请输入拒绝原因");
                        return false;
                    }
                }
                //console.log(this.citycheck);
                this.$http.get(method + '&id=' + this.citycheck.gid + '&status=' + status+'&reason='+this.citycheck.reason).then((res) => {
                    if (res.data.rs == 'true') {
                        this.$Message.success('设置成功');
                        this.citycheck.show = false;
                        this.$router.go(0);
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                }).catch((err) => {

                });
            },
            //设置阶梯价
            setTiredPrice () {
                if (!this.addPrice.groupnum) {
                    this.$Message.error('请设置成团数量');
                    return;
                }
                if (!this.addPrice.price) {
                    this.$Message.error('请设置售格');
                    return;
                }

                this.$http.post('groupbuy/addprice', {id: this.priceInfo.id, price: this.addPrice,area:this.priceInfo.area}).then((res) => {
                    if (res.data.rs == 'true') {
                        this.priceInfo.datas.map((item) => {
                            if (item.groupon_num == this.addPrice.groupnum) {
                                item.price = this.addPrice.price;
                                item.c_profit = (Number(item.price) * (100 - Number(this.priceInfo.profit_rate)) / 100 - Number(item.purchase_price)).toFixed(2);
                                item.s_profit = (Number(item.price) * Number(this.priceInfo.profit_rate) / 100).toFixed(2);
                            }
                        });
                        this.addPrice.show = false;
                        this.$Message.success('设置成功');
                    } else {
                        this.$Message.error(res.data.msg);
                    }

                }).catch((err) => {

                });
            },
            //设置分润
            changeProfit (curVal) {
                var len = this.priceInfo.datas.length;
                var price = 0;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        if (Number(this.priceInfo.datas[i].price) <= 0) {
                            this.$Message.error('设置分润前，请先设置产品售价');
                            this.priceInfo.disableProfit = true;
                            break;
                        }
                        price = (Number(this.priceInfo.datas[i].price) * (100 - Number(this.priceInfo.profit_rate)) / 100 - Number(this.priceInfo.datas[i].purchase_price)).toFixed(2);
                        this.priceInfo.datas[i].c_profit = price;
                        this.priceInfo.datas[i].s_profit = (Number(this.priceInfo.datas[i].price) * Number(this.priceInfo.profit_rate) / 100).toFixed(2);
                        // console.log(price);
                        if (price < 0) {
                            this.priceInfo.disableProfit = true;
                            this.$Message.error('请重新设置店东分润，公司现在处于非盈利状况');
                             break;
                        } else {
                            this.priceInfo.disableProfit = false;
                        }
                    }
                }

            },
            //设置原价,
            setOprice () {
                // alert("yuan");

                this.$http.post('groupbuy/oprice', {
                    id: this.priceInfo.id,
                    area:this.priceInfo.area,
                    origin_price: this.priceInfo.lastOprice
                }).then((res) => {
                    if (res.data.rs == 'true') {
                        this.$Message.success('设置成功');
                        this.priceInfo.oPrice = this.priceInfo.lastOprice;
                        // this.$router.go(0);
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                }).catch((err) => {
                });

            },
            //设置店东分润
            setProfit () {
                //console.log(this.priceInfo.profit_rate);
                //设置店东分润前先设值价格，才能看到变化
                var len = this.priceInfo.datas.length;
              //  console.log(len);

                if (100 < this.priceInfo.profit_rate || this.priceInfo.profit_rate < 0) {
                    this.$Message.error({
                        content: '店东分润百分比不能小于0，大于100',
                        duration: 1
                    });
                    return false;
                }

                this.$http.post('groupbuy/profit', {
                    id: this.priceInfo.id,
                    area:this.priceInfo.area,
                    profit_rate: this.priceInfo.profit_rate
                }).then((res) => {
                    if (res.data.rs == 'true') {
                        this.$Message.success('设置成功');
                      //  this.$router.go(0);
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                }).catch((err) => {
                });
            },
            init () {
                this.$http.get('groupbuy/lists').then((res) => {
                    this.loadStatus = false;
                    this.isCity = Boolean(res.data.isCity);
                    //this.city = res.data.city;
                    this.datas = res.data.rs;
                    this.page.total =res.data.totalPage?parseInt(res.data.totalPage):this.page.total;
                    this.page.pageSize = res.data.pageSize?parseInt(res.data.pageSize):this.page.pageSize;
                    this.page.curPage = res.data.curPage?parseInt(res.data.curPage): this.page.curPage;
                    this.checklist.check = Boolean(res.data.groupbuycheck);
                    this.checklist.enableSend = Boolean(res.data.enableSend);
                    this.checklist.enableCoupon = Boolean(res.data.enableCoupon);
                    // this.curstatus = res.data.curstatus;
                }).catch((err) => {
                    console.log(err);
                });
            },
            handleSearch () {
                this.$http.post('groupbuy/lists', this.search).then((res) => {
                    this.datas = res.data.rs;
                    //console.log(res);
                }).catch(() => {
                });
            },
            changePage (page) {
                //alert(page);
                let search = {};
                search = this.search;
                search.curPage = page;
                this.$http.post('groupbuy/lists', search).then((res) => {
                    this.datas = res.data.rs;
                    //console.log(res);
                }).catch(() => {
                });
            },

        }

    };
</script>

<style scoped>

</style>
