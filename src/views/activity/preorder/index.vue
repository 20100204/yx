<style lang="less">
    @import '../../../styles/common.less';
    @import '../table.less';
</style>
<template>
    <div style="width:2080px;">

        <Row :gutter="10">
            <Col span="24">
            <Card>
                <Row :gutter="4">
                    <Col span="16">
                    <Input v-model="searchConName1" placeholder="请输入活动标题搜搜..." style="width: 200px"/>
                    <Input v-model="searchConName2" placeholder="请输入商品标题搜搜..." style="width: 200px"/>

                    <Select v-model="searchConName3" style="width:200px"  placeholder="待发货或待采购活动">
                        <Option v-for="item in sendcaigou" :value="item.value" :key="item.value">{{ item.title }}</Option>
                    </Select>

                    <span @click="handleSearch1" style="margin: 0 10px;">
						<Button type="primary" size="small" icon="ios-search">搜索</Button>
					</span>
                    </Col>
                </Row>
            </Card>
            <Card :padding="2">
                <Row>
                    <Col span="4">
                    <span @click="handleAdd" style="margin:0px margin-left:4px;">
							 <Button type="info" size="small" :disabled="auth.enableAdd">添加活动</Button>
						</span>
                    </Col>
                    <Col span="4">
                    <span @click="handleDown" pull="2" style="margin:0 -180px ">
							 <Button type="info" size="small" icon="setting" :disabled="auth.enableDown">活动下架</Button>
						</span>
                    </Col>
                    <!--<Col span="4">
					<span @click="handleUp" pull="2" style="margin:0 -350px ">
							 <Button type="info" size="small" icon="setting"   disabled="disabled">活动上架</Button>
						</span>
					</Col>-->
                    <Col span="4">
                    <span pull="2" style="margin:0 -350px ">
							 <Button type="info" size="small" @click="handlePreorderrepeat"
                                     :disabled="auth.enableRepeat">活动复用</Button>
						</span>
                    </Col>
                    <Col span="4">
                    <span pull="2" style="margin:0 -520px ">
							 <Button type="info" size="small" @click="handleCaigoumanager">采购管理</Button>
						</span>
                    </Col>

                    <Col span="4">
                    <span pull="2" style="margin:0 -700px ">
							 <Button type="info" size="small" @click="handleSendmanager">发货管理</Button>
						</span>
                    </Col>

                </Row>

            </Card>
            <Card>
             <Row>
                 <Page :total="totalPage" :current="currPage" :page-size="pageSize"
                       @on-change="changePage"  ></Page>
             </Row>
                <Row class="margin-top-10 searchable-table-con1">

                    <Table :columns="columns1" size="small" ref="preorderdata" :data="data1" :loading="loadStatus"
                           @on-selection-change="handleSelectChange">

                    </Table>

                </Row>
            </Card>
            </Col>
        </Row>

        <!--活动对象 市公司-->
        <Modal v-model="activeRangeCity" title="活动范围" width="620">
            <Row>
                <Col span="24">
                <Table :columns="activeCityKey" :data="activeCityData">
                </Table>
                </Col>
            </Row>

        </Modal>
        <!--指定店东或代理-->
        <Modal v-model="newshopRange.show" title="销售范围" width="630">
            <Table :columns="newshopRange.keys" :data="newshopRange.datas" :loading="newshopRange.loading"
                   ref="currentShopTable"></Table>
            <div slot="footer"></div>
        </Modal>

        <!--查看活动-->
        <Modal v-model="lookactive" title="查看活动" width="820">
            <Row>
                <Card>
                    <h3 style="margin-left:350px;">活动内容</h3>
                    <Card :bordered="false">
                        <Row style="margin-bottom:6px;">
                            <Col span="6" offset="1">
                            活动标题
                            </Col>
                            <Col span="17">
                            {{lookactivedata.active_title}}
                            </Col>
                        </Row>
                        <Row>
                            <Col span="6" offset="1">
                            发 起 人
                            </Col>
                            <Col span="4">
                            {{lookactivedata.active_sender}}
                            </Col>
                            <Col span="6" offset="2">
                            发起时间
                            </Col>
                            <Col span="5">
                            {{lookactivedata.active_created_time}}
                            </Col>
                        </Row>
                    </Card>
                    <Card>
                        <Row style="margin-bottom:8px;">
                            <Col span="4" offset="1">
                            预售价
                            </Col>
                            <Col span="2" offset="1">
                            {{lookactivedata.price}}
                            </Col>
                            <Col span="2" offset="1">
                            采购价
                            </Col>
                            <Col span="2" offset="1">
                            {{lookactivedata.caigou_price}}
                            </Col>
                            <Col span="2" offset="1">
                            规格
                            </Col>
                            <Col span="3" offset="1">
                            {{lookactivedata.spec}}
                            </Col>
                        </Row>
                        <Row>
                            <Col span="2" offset="1">
                            详情图
                            </Col>
                            <Col span="4">
                            <img :src="lookactivedata.pic" v-on:click.stop="handlelookactivepic(lookactivedata.pic)"
                                 style="height:70px;width:70px "/>
                            </Col>
                            <Col span="2" offset="1">
                            限售</Col>
                            <Col span="1" offset="1">
                            {{lookactivedata.limit_num}}</Col>
                            <Col span="2" offset="1">
                            每人限量</Col>
                            <Col span="1" offset="1">
                            {{lookactivedata.per_limit_num}}</Col>
                            <Col span="3" offset="1">
                            每人限购次数</Col>
                            <Col span="2" offset="1">
                            {{lookactivedata.per_limit_count}}</Col>
                        </Row>

                    </Card>
                    <Card :bordered="false">
                        <Row style="margin-bottom:6px;">
                            <Col span="4" offset="1">
                            预告开始时间
                            </Col>
                            <Col span="6" offset="1">
                            {{lookactivedata.notice_time}}
                            </Col>
                            <Col span="4" offset="1">
                            预售结束时间
                            </Col>
                            <Col span="6" offset="1">
                            {{lookactivedata.end_time}}
                            </Col>
                        </Row>
                        <Row style="margin-bottom:6px;">
                            <Col span="4" offset="1">
                            预售开始时间
                            </Col>
                            <Col span="6" offset="1">
                            {{lookactivedata.begin_time}}
                            </Col>
                            <Col span="4" offset="1">
                            自提开始时间
                            </Col>
                            <Col span="6" offset="1">
                            {{lookactivedata.pickup_time}}
                            </Col>
                        </Row>
                        <Row style="margin-bottom:6px;">
                            <Col span="4" offset="1">
                            分润比
                            </Col>
                            <Col span="6" offset="1">
                            {{lookactivedata.profit_rate}}
                            </Col>
                            <Col span="4" offset="1">
                            自提结束时间
                            </Col>
                            <Col span="6" offset="1">
                            {{lookactivedata.pickup_end_time}}
                            </Col>
                        </Row>
                        <Row>
                            <Col span="10" offset="1">
                            用户注册时间必须大于该时间才能购买(选填)
                            </Col>
                            <Col span="6" offset="1">
                            {{lookactivedata.user_created_at}}
                            </Col>
                            <Col span="2" offset="6">
                           营销销量
                            </Col>
                            <Col span="1" offset="1">
                            {{lookactivedata.fake_sold_out}}
                            </Col>
                        </Row>
                    </Card>
                    <Card v-if="lookactivedata.sharecoupon.id||lookactivedata.takecoupon.id||lookactivedata.coupons.length>0">
                        <h3 style="margin-left:340px;margin-bottom:10px;">优 惠 券</h3>
                        <Row style="margin-bottom:18px;maring-top:10px;" v-if="lookactivedata.sharecoupon.id">
                            <Col span="4" offset="1">
                            分享得券
                            </Col>
                            <Col span="18">
                            {{lookactivedata.sharecoupon.coupon_type=='cash'?'现金券':'满减券'}} -----
                            {{lookactivedata.sharecoupon.title}}
                            </Col>


                        </Row>
                        <Row style="maring-top:10px;" v-if="lookactivedata.takecoupon.id">
                            <Col span="4" offset="1">
                            参与得券
                            </Col>
                        </Row>
                        <Row style="margin-bottom:18px;" v-if="lookactivedata.takecoupon.id">
                            <Col offset="2">
                            {{lookactivedata.takecoupon.coupon_type=='cash'?'现金券':'满减券'}} -----
                            {{lookactivedata.takecoupon.title}}--{{lookactivedata.takecoupon.msg}}

                            </Col>
                        </Row>
                        <Row style="margin-bottom:6px;" v-if="lookactivedata.coupons.length>0">
                            <Col span="4" offset="1">
                            活动可用券
                            </Col>
                        </Row>
                        <Row v-for="item in lookactivedata.coupons" :key="item.id"
                             v-if="lookactivedata.coupons.length>0">
                            <Col offset="2">
                            {{item.coupon_type=='cash'?'现金券':'满减券'}}-----{{item.title}} <span
                                style="margin-left:20px;color:palevioletred">{{item.msg}}</span>
                            </Col>
                        </Row>

                        <Row v-if="lookactivedata.coupons.length>0" style="margin-top:16px;">
                            <Col offset="1" style="color:darksalmon">
                            注:毛利率未减店东分润</Col>
                        </Row>

                    </Card>

                    <Card>
                        <h3 style="margin-left:340px;margin-bottom:10px;">活 动 审 批</h3>
                        <Row style="margin-bottom:6px;">
                            <Col span="4" offset="1">
                            审批时间
                            </Col>
                            <Col span="6" offset="1">
                            {{lookactivedata.check_time}}
                            </Col>
                            <Col span="4" offset="1">
                            审批人
                            </Col>
                            <Col span="6">
                            {{lookactivedata.checker}}
                            </Col>
                        </Row>
                        <Row style="margin-bottom:6px;">
                            <Col span="4" offset="1">
                            审批状态
                            </Col>
                            <Col span="16" offset="1">
                            <RadioGroup v-model="lookactivedata.preorder_status" @on-change="handleEnableradio">
                                <Radio label="通过" :disabled="lookactivedata.enableRadio"></Radio>
                                <Radio label="退回" :disabled="lookactivedata.enableRadio"></Radio>
                                <Radio label="关闭" :disabled="lookactivedata.enableRadio"></Radio>
                            </RadioGroup>
                            </Col>

                        </Row>

                        <Row v-if="lookactivedata.enableTextarea">
                            <Col span="23" offset="1">
                            <Input type="textarea" placeholder="请填退回原因" v-model="lookactivedata.reason"/>
                            </Col>

                        </Row>
                        <Row v-if="!lookactivedata.enableRadio" style="margin-top:18px;">
                            <Col>
                            <Button type="info" size="small" style="margin-left:350px;margin-bottom:10px;"
                                    @click="handlerCheck" :disabled="auth.enableCheck">审核
                            </Button>
                            </Col>
                        </Row>
                        <Row style="margin-top:20px;" v-if="lookactivedata.flow_show">
                            <Col>
                            <Steps :current="lookactivedata.flow_status">
                                <Step title="待审核" content="发起活动，待审核"></Step>
                                <Step title="待分公司审核" content="分公司经理审核"></Step>
                                <Step title="待总部审批" content="总部审批"></Step>
                                <Step title="已审批" content="审批完成"></Step>
                            </Steps>
                            </Col>
                        </Row>
                    </Card>
                    <Card>
                        <h3 style="margin-left:350px;margin-bottom: 6px;">状态信息</h3>
                        <Card v-if="lookactivedata.sold_out>0">
                            <h3 style="margin-left:350px;margin-bottom: 10px;">商品状态</h3>
                            <Row>
                                <Col span="3" offset="1">
                                销量
                                </Col>
                                <Col span="2">
                                {{lookactivedata.sold_out}}
                                </Col>
                                <Col span="3" offset="1">
                                金额
                                </Col>
                                <Col span="2">
                                {{lookactivedata.amount}}
                                </Col>
                                <Col span="3" offset="1">
                                订单状态
                                </Col>
                                <Col span="3">
                                {{lookactivedata.orderstatus}}
                                </Col>
                            </Row>
                        </Card>
                        <Card>
                            <h3 style="margin-left:330px; margin-bottom: 20px;margin-top:10px;">活动日志</h3>
                            <Row style="margin-bottom:4px;" v-for="item in lookactivedata.logs">
                                <Col span="23" offset="1">
                                {{item.username}}于{{item.created_at}}{{item.desc}}</Col>
                            </Row>
                        </Card>
                    </Card>
                </Card>
            </Row>
            <div slot="footer"></div>
        </Modal>
        <Modal v-model="picshow" :closable="closable">

            <Row>
                <Col span="24">
                <Card>
                    <div slot="header"></div>
                    <img :src="picshowurl" style="width:100%">

                </Card>

                </Col>

            </Row>
            <div slot="footer"></div>
        </Modal>

        <!-- 采购-->
        <Modal v-model="buy.show" title="采购" width="820" @on-visible-change="handlecaigoushow" :loading="buy.load">

            <Card>
                <Row>
                    <Col span="1">
                    历史采购</Col>
                    <Col span="9">
                    <Select v-model="buy.selecttime" @on-change="handlehistorycai" placeholder="请选择历史采购时间查看">
                        <Option v-for="item in buy.historytimes" :value="item" :key="item">{{ item}}</Option>
                    </Select>
                    </Col>
                    <Col span="1" offset="1">
                    开始时间</Col>
                    <Col span="5">
                    <DatePicker v-model="buy.startcaigoutime" disabled format="yyyy-MM-dd HH:mm:ss" type="datetime"
                                placeholder="请选择截止时间"></DatePicker>
                    </Col>

                    <Col span="1" offset="1">
                    截止时间</Col>
                    <Col span="5">
                    <DatePicker v-model="buy.endcaigoutime" @on-change="handlePreorderstartend"
                                format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="请选择截止时间"></DatePicker>
                    </Col>
                </Row>
            </Card>
            <Card>
                <Table :columns="buy.keys" ref="buy" size="large" :data="buy.datas">
                </Table>
            </Card>
            <div slot="footer">
                <Row>
                    <Col span="3" offset="9">
                    <Button type="info" size="small" style="margin-right:30px;" @click="makecaigou"
                            :disabled="buy.disablecaigou||buy.datas.length<1">生成采购计划
                    </Button>
                    </Col>
                    <Col span="2" offset="2">
                    <Button type="info" size="small" style="margin-right:30px;" @click="makecaigouexport"
                            :disabled="buy.datas.length>=1?false:true">导出
                    </Button>
                    </Col>
                </Row>

            </div>
        </Modal>

        <!--采购管理-->
        <Modal v-model="caigoumanager.show" title="采购管理" width="1220">

            <Tabs v-model="caigoumanager.tabs" @on-click="handleTabs">
                <TabPane label="待采购" name="nocai">
                    <Card>
                        <Row>
                            <!--<Col span="6">
							<Input v-model="searchConName1" placeholder="请输入活动标题搜搜..." />
							</Col>
							<Col span="6">
							<Input v-model="searchConName1" placeholder="请输入商品标题搜搜..." />
							</Col>-->
                            <Col span="2" offset="1">
                            订单截止时间:</Col>
                            <Col span="5">
                            <DatePicker v-model="caigoumanager.nocai.endtime" format="yyyy-MM-dd HH:mm:ss"
                                        type="datetime" placeholder="请选择订单截止时间"></DatePicker>
                            </Col>
                            <Col span="3">
                            <Button type="primary" icon="search" @click="handelCaigoumanagerSearch">搜索</Button>
                            </Col>
                            <Col offset="5" span="3">
                            <Button type="info" @click="handleCaigouMakePlan" :disabled="auth.enableCaigou">生成采购计划
                            </Button>
                            </Col>
                            <Col  span="3">
                            <Button type="info" @click="handleExportcaigou">导出采购计划</Button>
                            </Col>
                        </Row>
                    </Card>
                    <Card>
                        <Row>
                            <Col>
                            <Table :columns="caigoumanager.nocai.keys" ref="nocai" size="large"
                                   :data="caigoumanager.nocai.datas" @on-selection-change="handleCaigouSelectChange" :loading="caigoumanager.nocai.load">
                            </Table>
                            </Col>
                        </Row>


                    </Card>

                </TabPane>
                <TabPane label="历史采购" name="history">
                    <!--<Card>
						<Row>
							<Col span="6">
							<Input v-model="searchConName1" placeholder="请输入活动标题搜搜..." />
							</Col>
							<Col span="6">
							<Input v-model="searchConName1" placeholder="请输入商品标题搜搜..." />
							</Col>

							<Col span="3">
							<Button type="primary" icon="search">搜索</Button>
							</Col>
						</Row>
					</Card>-->
                    <Card>
                        <Row>
                            <Col>
                            <Table :columns="caigoumanager.history.keys" ref="history" size="large"
                                   :data="caigoumanager.history.datas" @on-selection-change="handleCaigouSelectChange" :loading="caigoumanager.history.load">
                            </Table>
                            </Col>
                        </Row>
                        <Row style="margin-top:20px;">
                            <Col offset="11" span="4">
                            <Button type="info" @click="handleExporthistorycaigou">导出历史采购</Button>
                            </Col>
                        </Row>
                    </Card>
                </TabPane>


            </Tabs>
            <div slot="footer">

            </div>
        </Modal>
        <!-- 分拣发货-->
        <Modal v-model="newsendmanager.show" title="分拣发货" width="1330" height="100%">
            <Tabs v-model="newsendmanager.tabs" @on-click="handleTabssend">
                <TabPane label="待发货" name="nosend">
                    <Card>
                        <Row>
                            <Col span="4">
                            <Select v-model="newsendmanager.search.order_type" placeholder="请选择排序类型">
                                <Option v-for="item in newsendmanager.order_type" :value="item.value" :key="item.value">
                                    {{ item.title }}
                                </Option>
                            </Select>
                            </Col>
                            <Col span="4" offset="1">
                            <Input v-model="newsendmanager.search.sku_title" placeholder="请输入商品标题搜搜..."/>
                            </Col>
                            <Col span="4" offset="1">
                            <Input v-model="newsendmanager.search.shop_name" placeholder="请输入社区名称搜搜..."/>
                            </Col>
                            <Col span="3" offset="1">
                            <Input v-model="newsendmanager.search.mobile" placeholder="请输入粉丝手机号搜搜..."/>
                            </Col>

                            <Col span="2" offset="1">
                            <Select v-model="newsendmanager.search.shop_type" placeholder="请选择取货方式搜搜...">
                                <Option v-for="item in newsendmanager.shop_type" :value="item.value" :key="item.value">
                                    {{ item.title }}
                                </Option>
                            </Select>
                            </Col>

                            <Col span="1" offset="1">
                            <Button type="primary" @click="sendSearch('n')">搜索</Button>
                            </Col>
                            </span>
                        </Row>

                        <Row style="margin-top:20px;">
                            <Col span="18">
                            <Page :total="newsendmanager.nosend.totalPage" :current="newsendmanager.nosend.currPage"
                                  :page-size="newsendmanager.nosend.pageSize" @on-change="nosendchangePage"
                                  :show-total="true"></Page>
                            </Col>
                            <Col span="2" >
                            <Button type="info" @click="handleNewsendmanagerSend" :disabled="auth.enableSend">发货
                            </Button>
                            </Col>
                            <Col span="2">
                            <Button type="info" @click="handleExportNewsendmanagerSend">导出</Button>
                            </Col>
                            <Col span="2">
                            <Button type="info" @click="handleExportNewsendPrint">打印</Button>
                            </Col>
                        </Row>
                        <Row style="margin-top:20px;">
                            <Col>
                            <Table :columns="newsendmanager.nosend.keys" ref="nosend" size="large"
                                   :data="newsendmanager.nosend.datas" @on-selection-change="handleSendSelectChange"
                                   :loading="newsendmanager.nosend.loading">
                            </Table>
                            </Col>
                        </Row>

                    </Card>
                </TabPane>
                <TabPane label="历史发货" name="history">
                    <Card>
                        <Row>
                            <Col span="4">
                            <Select v-model="newsendmanager.search.order_type" placeholder="请选择排序类型">
                                <Option v-for="item in newsendmanager.order_type" :value="item.value" :key="item.value">
                                    {{ item.title }}
                                </Option>
                            </Select>
                            </Col>
                            <Col span="4" offset="1">
                            <Input v-model="newsendmanager.search.sku_title" placeholder="请输入商品标题搜搜..."/>
                            </Col>
                            <Col span="4" offset="1">
                            <Input v-model="newsendmanager.search.shop_name" placeholder="请输入社区名称搜搜..."/>
                            </Col>
                            <Col span="3" offset="1">
                            <Input v-model="newsendmanager.search.mobile" placeholder="请输入粉丝手机号搜搜..."/>
                            </Col>
                            <Col span="2" offset="1">
                            <Select v-model="newsendmanager.search.shop_type" placeholder="请选择取货方式搜搜...">
                                <Option v-for="item in newsendmanager.shop_type" :value="item.value" :key="item.value">
                                    {{ item.title }}
                                </Option>
                            </Select>
                            </Col>
                            <Col span="1" offset="1">
                            <Button type="primary" @click="sendSearch('h')">搜索</Button>
                            </Col>
                            </span>
                        </Row>
                        <Row style="margin-top:20px;">
                            <Col span="18">
                            <Page :total="newsendmanager.history.totalPage" :current="newsendmanager.history.currPage"
                                  :page-size="newsendmanager.history.pageSize" @on-change="historychangePage"
                                  :show-total="true"></Page>
                            </Col>
                            <Col offset="1" span="2">
                            <Button type="info" @click="handleExporthistorysend">导出历史发货</Button>
                            </Col>
                            <Col offset="1" span="2">
                                <Button type="info" @click="handleExportNewsendPrint">打印</Button>
                            </Col>
                        </Row>
                        <Row style="margin-top:20px;">
                            <Col>
                            <Table :columns="newsendmanager.history.keys" ref="sendhistory" size="large"
                                   :data="newsendmanager.history.datas" @on-selection-change="handleSendSelectChange"
                                   :loading="newsendmanager.history.loading">
                            </Table>
                            </Col>
                        </Row>

                    </Card>
                </TabPane>

            </Tabs>
            <div slot="footer">
            </div>
        </Modal>
        <!-- 标签打印 -->
        <Modal v-model="labelsPrint" title="打印" width="100%" id="labels-print">
            <labels-print :labelData="labelsData"></labels-print>
        </Modal>

        <!-- 实际采购记录 -->
        <Modal v-model="purchase.show" :closable="false" width="780">
            <Tabs v-model="purchase.tabs">
                <TabPane label="实采记录" name="purchase" width="780">
                    <Table :columns="purchase.keys" :loading="purchase.loading" ref="purchase" size="small"
                           :data="purchase.datas">
                    </Table>
                </TabPane>
                <TabPane label="添加记录" name="addpurchase">
                    <Row>
                        <Col span="3" offset="1">
                        实际采购份数</Col>
                        <Col span="2">
                        <InputNumber :max="1000000" size="small" :min="1" v-model="purchase.add.quantity"></InputNumber>
                        </Col>
                        <Col span="3" offset="2">
                        实际采购金额</Col>
                        <Col span="2">
                        <InputNumber :max="1000000" size="small" :min="0.001"
                                     v-model="purchase.add.amount"></InputNumber>
                        </Col>
                        <Col span="2" offset="2">
                        单价</Col>
                        <Col span="2">
                        <InputNumber :max="1000000" size="small" disabled="disabled" :precision="3" :min="0.001"
                                     v-model="purchaseprice"></InputNumber>
                        </Col>
                    </Row>
                    <Row style="margin-top:18px;">
                        <Col span="3" offset="1">
                        交易或转账单号</Col>
                        <Col span="6">
                        <Input v-model="purchase.add.trade_no" size="small" placeholder="请填写交易或转账单号的后六位"></Input>

                        </Col>
                        <Col span="2" offset="3">
                        采购人</Col>
                        <Col span="4">
                        <Input v-model="purchase.add.buyer" size="small" placeholder="采购人"></Input>

                        </Col>
                    </Row>
                    <Row style="margin-top:14px;">
                        <Col span="3" offset="1">
                        备 注</Col>
                        <Col span="18">
                        <Input type="textarea" v-model="purchase.add.remark" placeholder="备注"></Input>
                        </Col>
                    </Row>
                    <Row style="margin-top:18px;">
                        <Col span="2" offset="9">
                        <Button type="info" style="margin-right:30px;" @click="handleTijiao"
                                :disabled="auth.enableAddpurchase">添加
                        </Button>
                        </Col>
                        <!-- <Col span="2" offset="2">
								<Button type="info" size="small" style="margin-right:20px;" @click="handleReset">重置</Button>
								</Col> -->
                    </Row>
                </TabPane>
            </Tabs>

            <div slot="footer"></div>
        </Modal>
        <!--排除社区-->
        <Modal v-model="excludeShops.show" title="排除社区" width="700">
            <Row>
                <Col>
                <Table :columns="excludeShops.keys" :data="excludeShops.datas" :loading="excludeShops.loading"
                       ref="sexcludeShops"></Table>
                </Col>
            </Row>
            <div slot="footer"></div>

        </Modal>

    </div>
</template>
<script>
    import labelsPrint from '../components/labelsPrint.vue';

    export default {
        name: 'activity_index',
        components: {
            labelsPrint
        },
        data () {
            return {
                caisend: [
                    {val: 'all', title: '全部'},
                    {val: 'cai', title: '待采购'},
                    {val: 'send', title: '待发货'},
                ],
                excludeShops: {
                    show: false,
                    keys: [

                        {key: 'id', title: '社区id', sortable: true, width: 90},
                        {key: 'city', tooltip: true, title: '市公司', sortable: true, width: 90},
                        {key: 'shop_name', tooltip: true, title: '社区名称', sortable: true, width: 160},
                        {
                            key: 'shop_type', title: '社区类型', sortable: true, width: 110,
                            render: (h, p) => {

                                return h('span', p.row.shop_type == 1 ? '代理' : '超市');
                            }
                        },
                        {key: 'realname', title: ' 联系人', sortable: true, width: 90},
                        {key: 'mobile', title: 'mobile', sortable: true, width: 110}

                    ],
                    datas: [],
                    loading: false
                },
                purchase: {
                    //实际采购记录
                    price: 0,
                    loading: true,
                    show: false,
                    datas: [],
                    tabs: 'purchase',
                    add: {
                        preorder_id: 0,
                        amount: 1,
                        quantity: 1,
                        remark: '',
                        buyer: '',
                        trade_no: '',
                        price: 0.0
                    },//添加记录
                    keys: [
                        {key: 'created_at', title: '采购时间', sortable: true, width: 150},
                        {key: 'buyer', title: ' 采购人', sortable: true, width: 100},
                        {key: 'amount', title: '采购金额', sortable: true, width: 110},
                        {key: 'quantity', title: '采购数量', sortable: true, width: 120},
                        {key: 'price', title: '采购单价', sortable: true, width: 120},
                        {key: 'trade_no', tooltip: true, title: '交易或账单号', sortable: true, width: 180},
                        {key: 'remark', tooltip: true, title: '备注', sortable: true, width: 180}
                    ],
                },
                shop_typ: 1,
                newshopRange: {
                    show: false,
                    keys: [

                        {key: 'id', title: '社区id', sortable: true},
                        {key: 'shop_name', tooltip: true, title: '社区名称', sortable: true, width: 120},
                        {key: 'shop_type', title: '社区类型', sortable: true},
                        {key: 'realname', tooltip: true, title: ' 联系人', sortable: true},
                        {key: 'mobile', title: 'mobile', sortable: true, width: 110}

                    ],
                    datas: [],
                    loading: false
                },
                newsendmanager: { //发货管理
                    search: {
                        sku_title: '',
                        shop_name: '',
                        mobile: '',
                        shop_type: '2',
                        order_type: '2',
                        page: 1
                    },
                    shop_type: [
                        {'value': '2', 'title': '全部'},
                        {'value': '0', 'title': '门店自取'},
                        {'value': '1', 'title': '送货上门'},
                    ],
                    order_type: [
                        {'value': '2', 'title': '社区名称、商品标题排序'},
                        {'value': '1', 'title': '商品标题、社区名称排序'},
                    ],
                    selectDatas: [],
                    show: false,
                    tabs: 'nosend',
                    history: {
                        keys: [
                            {
                                type: 'selection',
                                width: 60,
                                align: 'center'
                            },

                            {
                                key: 'preorder_id',
                                sortable: true,
                                title: '活动id',
                                width: 76
                            },
                            {
                                key: 'description',
                                sortable: true,
                                tooltip: true,
                                title: '活动标题',
                                width: 110
                            },
                            {
                                key: 'sku_title',
                                sortable: true,
                                tooltip: true,
                                title: '产品名称',
                                width: 110
                            },
                            {
                                key: 'cat_name',
                                width: 90,
                                tooltip:true,
                                sortable:true,
                                title: '分类'
                            },
                            {
                                key: 'quantity',
                                sortable: true,
                                title: '数量',
                                width: 90
                            },
                            {
                                key: 'specs',
                                sortable: true,
                                title: '规格',
                                width: 90
                            },
                            {
                                key: 'shop_name',
                                title: '社区名称',
                                tooltip: true,
                                sortable: true,
                                width: 100
                            },
                            {
                                key: 'receiver_name',
                                tooltip: true,
                                sortable: true,
                                title: '收货人',
                                width: 100
                            },
                            {
                                key: 'mobile',
                                width: 126,
                                sortable: true,
                                title: '手机号'
                            },
                            {
                                key:"getgoods",
                                title:"取货方式",
                                width:100,
                            },
                            {
                                key: 'remark',
                                sortable: true,
                                tooltip: true,
                                title: '备注',
                                width: 80
                            },
                            {
                                key: 'send_time',
                                sortable: true,
                                title: '发货时间',
                                width: 108
                            },
                            {
                                key: 'sender',
                                sortable: true,
                                title: '发货人',
                                width: 80,
                            }

                        ],
                        datas: [],
                        print: [],
                        pageSize: 0,
                        totalPage: 0,
                        currPage: 1,
                        loading: true
                    },
                    nosend: {
                        pageSize: 0,
                        totalPage: 0,
                        currPage: 1,
                        print: [],
                        loading: true,
                          keys: [
                              {
                            type: 'selection',
                            width: 60,
                            align: 'center'
                        },
                            {
                                key: 'sn',
                                width: 80,
                                title: '序号'
                            },
                            {
                                key: 'preorder_id',
                                sortable: true,
                                title: '活动id',
                                width: 100
                            },
                            {
                                key: 'description',
                                sortable: true,
                                tooltip: true,
                                title: '活动标题',
                                width: 120,
                            },
                            {
                                key: 'sku_title',
                                sortable: true,
                                tooltip: true,
                                title: '产品名称',
                                width: 120
                            },
                            {
                                key:"cat_name",
                                title:"分类",
                                tooltip:true,
                                sortable:true,
                                width:100,
                            },
                            {
                                key: 'quantity',
                                sortable: true,
                                title: '数量',
                                width: 90
                            },
                            {
                                key: 'specs',
                                sortable: true,
                                title: '规格',
                                width: 90
                            },
                            {
                                key: 'shop_name',
                                title: '社区名称',
                                tooltip: true,
                                sortable: true,
                                width: 120
                            },
                            {
                                key: 'receiver_name',
                                tooltip:true,
                                title: '收货人',
                                width: 90
                            },
                            {
                                key: 'mobile',
                                width: 126,
                                sortable: true,
                                title: '手机号'
                            },

                            {
                                key: 'remark',
                                tooltip: true,
                                title: '备注',
                                width: 80
                            },
                            {
                                key:"getgoods",
                                title:"取货方式",
                                width:100,

                            }
                        ],
                        datas: []
                    }
                },
                caigoumanager: {
                    selectDatas: [], //选择导出的或者生成计划的
                    tabs: 'history',
                    preorderlists: [],
                    nocai: {
                        load:false,
                        endtime: '',
                        keys: [{
                            type: 'selection',
                            width: 60,
                            align: 'center'
                        },
                            {
                                key: 'id',
                                sortable: true,
                                title: '活动id',
                                width: 100,
                            },
                            {
                                key: 'description',
                                sortable: true,
                                tooltip: true,
                                width: 130,
                                title: '活动标题'
                            },
                            {
                                key: 'sku_title',
                                sortable: true,
                                tooltip: true,
                                width: 130,
                                title: '产品名称'
                            },
                            {
                                key:"cat_name",
                                tooltip:true,
                                sortable:true,
                                title:"分类名称",
                                width:110
                            },
                            {
                                key: 'specs',
                                sortable: true,
                                tooltip: true,
                                width: 110,
                                title: '产品规格'
                            },
                            {
                                key: 'caigou_price',
                                sortable: true,
                                title: '采购价',
                                width: 96,
                            },
                            {
                                key: 'price',
                                sortable: true,
                                width: 96,
                                title: '预售价'
                            },
                            {
                                key: 'ordertimerange',
                                width: 136,
                                tooltip: true,
                                title: '订单时间范围'
                            },
                            {
                                key: 'nocai',
                                sortable: true,
                                width: 110,
                                title: '待采数量'
                            },
                            {
                                key: 'sold_out',
                                sortable: true,
                                width: 80,
                                title: '累计销量'
                            }
                        ],
                        datas: [],
                    },
                    show: false,
                    history: {
                        load:false,
                        keys: [{
                            type: 'selection',
                            width: 60,
                            align: 'center'
                        },

                            {
                                key: 'preorder_id',
                                width: 100,
                                sortable: true,
                                title: '活动id'
                            },
                            {
                                key: 'description',
                                width: 130,
                                tooltip: true,
                                sortable: true,
                                title: '活动标题'
                            },
                            {
                                key: 'sku_title',
                                tooltip: true,
                                width: 130,
                                sortable: true,
                                title: '产品名称'
                            },
                            {
                                key:"cat_name",
                                tooltip:true,
                                sortable:true,
                                title:"分类名称",
                                width:110,
                            },
                            {
                                key: 'specs',
                                width: 90,
                                sortable: true,
                                title: '产品规格'
                            },
                            {
                                key: 'caigou_price',
                                width: 80,
                                sortable: true,
                                title: '采购价格'
                            },
                            {
                                key: 'price',
                                width: 80,
                                sortable: true,
                                title: '预售价格'
                            },
                            {
                                key: 'ordertimerange',
                                width: 100,
                                tooltip: true,
                                sortable: true,
                                title: '订单时间范围'
                            },
                            {
                                key: 'nocai',
                                sortable: true,
                                width: 80,
                                title: '待采数量'
                            },
                            {
                                key: 'sold_out',
                                sortable: true,
                                width: 80,
                                title: '累计销量'
                            },
                            {
                                key: 'created_at',
                                sortable: true,
                                tooltip: true,
                                width: 100,
                                title: '生成采购计划时间'
                            },
                            {
                                key: 'buyer',
                                tooltip: true,
                                width: 100,
                                sortable: true,
                                title: '采购人'
                            }
                        ],
                        datas: []
                    }

                },
                labelsPrint: false,
                labelsData: [],
                sendmanager: {},
                enablesendbutton: true,
                preorder_id: '',
                disabledate: {
                    //不能选择的日期 :options="disabledate"
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
                buy: {

                    load: true,
                    disablecaigou: false,
                    proder_id: '',
                    promotion_id: '',
                    sku_id: '',
                    startcaigoutime: '', //开始时间
                    endcaigoutime: '', //截止时间时间
                    historytimes: [], //曾经的历史查询计划
                    selecttime: '', //选中的查询时间
                    show: false,
                    keys: [{
                        key: 'sku_title',
                        tooltip: true,
                        title: '产品名称'
                    },
                        {
                            key: 'specs',
                            title: '规格'
                        },
                        {
                            key: 'caigou_price',
                            title: '采购价'
                        },
                        {
                            key: 'price',
                            title: '预售价'
                        },
                        {
                            key: 'timerange',
                            tooltip: true,
                            title: '时间范围'
                        },
                        {
                            key: 'buy_count',
                            title: '待采数量'
                        },

                        {
                            key: 'sold_out',
                            title: '累计数量'
                        },
                        {
                            key: 'buyer',
                            title: '采购人'
                        }
                    ],
                    datas: []
                },
                auth: {
                    enableCheck: false,
                    enableAdd: false,
                    enableDown: false,
                    enableUp: false,
                    enableEdit: false,
                    enableCaigou: false,
                    enableSend: false,
                    enableRepeat: false,
                    enableAddpurchase: true,
                }, //权限
                masterselectdata: [], //主页选中的数据
                picshow: false,
                picshowurl: '',
                closable: false,
                lookactivedata: {
                    takecoupon: [],//参与得券，
                    sharecoupon: [],//分享得券
                    coupons: [],//优惠券
                    enableTextarea: false,
                    id: 0,
                    per_limit_num: '', //每人限量
                    per_limit_count: '', //限购次数
                    caigou_price: 0, //采购价格
                    enableRadio: false,
                    active_title: '',
                    active_sender: '',
                    active_created_time: '',
                    user_created_at: '',
                    price: 0,
                    spec: '',
                    pic: '',
                    limit_num: 0,
                    notice_time: '',
                    end_time: '',
                    begin_time: '',
                    pickup_time: '',
                    profit_rate: '',
                    pickup_end_time: '',
                    check_time: '',
                    checker: 'admin',
                    preorder_status: '',
                    flow_status: 1, //当前进度状态
                    flow_show: false,//是否显示进度信息
                    reason: '',
                    sold_out: 40,
                    amount: 126,
                    orderstatus: '已发货',
                    logs: []
                },
                lookactive: false,
                sendgoodsexports: [],
                sendgoodsids: [],
                sendgoodskey: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                    {
                        key: 'sku_title',
                        sortable: true,
                        tooltip: true,
                        title: '产品名称'
                    },
                    {
                        key: 'sku_count',
                        sortable: true,
                        tooltip: true,
                        title: '产品数量'
                    },
                    {
                        key: 'specs',
                        sortable: true,
                        title: '产品规格'
                    },

                    {
                        key: 'shopername',
                        tooltip: true,
                        title: '社区名称',
                        sortable: true
                    },
                    {
                        key: 'receiver_name',
                        tooltip: true,
                        sortable: true,
                        title: '收货人'
                    },

                    {
                        key: 'mobile',
                        width: 140,
                        sortable: true,
                        title: '手机号'
                    },
                    {
                        key: 'remark',
                        tooltip: true,
                        sortable: true,
                        title: '备注'
                    }

                ],
                sendgoodsdata: [],
                downids: [],
                sendgoodsshow: false,
                sendgoodsskuid: 0,
                curtime: 0,
                caigoupromotionids: [],
                checkActionId: '',
                checkstatusshow: false,
                preorder_status: '同意',
                rejectreason: '',
                loading: true,
                pageSize: 0,
                totalPage: 0,
                currPage: 1,
                searchConName1: '',
                searchConName2: '',
                searchConName3: '全部',
                sendcaigou:[
                    {"value":"all","title":"全部"},
                    {"value":"cai","title":"待采购"},
                    {"value":"send","title":"待发货"},
                ],
                rs: {},
                columns1: [],
                data1: [],
                initTable1: [],
                ids: [],
                tipDia: false,
                activeRangeCity: false,
                activeRangeShop: false,
                activeCityKey: [{
                    key: 'id',
                    title: 'id'
                },
                    {
                        key: 'company_name',
                        tooltip: true,
                        title: '市公司'
                    },
                    {
                        key: 'realname',
                        title: '联系人'
                    },
                    {
                        key: 'mobile',
                        title: 'mobile'
                    }
                ],
                activeCityData: [],
                activeShopKey: [{
                    key: 'shoperid',
                    title: '店东id'
                },
                    {
                        key: 'shopername',
                        tooltip: true,
                        title: '社区名称'
                    },
                    {
                        key: 'shoper',
                        title: '联系人'
                    },
                    {
                        key: 'shoperaddr',
                        tooltip: true,
                        title: '店东地址'
                    },
                    {
                        key: 'mobile',
                        title: 'mobile'
                    },
                    {
                        key: 'company',
                        tooltip: true,
                        title: 'company'
                    },
                ],
                activeShopData: [],

            };
        },
        computed: {
            loadStatus () {
                return this.loading;
            },
            purchaseprice: function () {
                return parseFloat(this.purchase.add.amount / this.purchase.add.quantity);
            }
        },
        methods: {
            historychangePage (page) {
                //历史发货分页
                this.newsendmanager.history.loading = true;
                this.newsendmanager.history.currPage = page;
                this.newsendmanager.selectDatas = [];
                this.newsendmanager.search.page = page;
                this.$http.post('preorder/sendhistory', {
                    id: this.ids,
                    search: this.newsendmanager.search
                }).then((res) => {
                    //console.log(res);
                    this.newsendmanager.history.loading = false;

                    this.newsendmanager.history.datas = res.data.rs;
                    this.newsendmanager.history.print = res.data.print;
                    this.newsendmanager.history.pageSize = parseInt(res.data.pageSize);
                    this.newsendmanager.history.totalPage = parseInt(res.data.count);
                }).catch((err) => {
                    console.log(err);
                });

            },
            nosendchangePage (page) {
                //待发货分页
                this.newsendmanager.nosend.loading = true;
                this.newsendmanager.selectDatas = [];
                this.newsendmanager.nosend.currPage = page;
                this.newsendmanager.search.page = this.newsendmanager.nosend.currPage;
                this.$http.post('preorder/nosend', {
                    id: this.ids,
                    search: this.newsendmanager.search
                }).then((res) => {
                    this.newsendmanager.nosend.datas = res.data.rs;
                    this.newsendmanager.nosend.loading = false;
                    this.newsendmanager.nosend.pageSize = parseInt(res.data.pageSize);
                    this.newsendmanager.nosend.totalPage = parseInt(res.data.count);

                }).catch((err) => {
                    console.log(err);
                });
            },
            sendSearch (val) {
                this.newsendmanager.selectDatas = [];
                //发货搜索
                if (val == 'n') {
                    //未发货
                    this.newsendmanager.nosend.datas = [];
                    this.newsendmanager.nosend.print = [];
                    this.newsendmanager.nosend.loading = true;
                    this.newsendmanager.nosend.currPage = 1;
                    this.newsendmanager.search.page = this.newsendmanager.nosend.currPage;
                    this.$http.post('preorder/nosend', {
                        id: this.ids,
                        search: this.newsendmanager.search

                    }).then((res) => {
                        this.newsendmanager.nosend.loading = false;
                        this.newsendmanager.nosend.datas = res.data.rs;
                        this.newsendmanager.nosend.print = res.data.print;
                        this.newsendmanager.nosend.pageSize = parseInt(res.data.pageSize);
                        this.newsendmanager.nosend.totalPage = parseInt(res.data.count);

                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    //已发货
                    this.newsendmanager.history.print = [];
                    this.newsendmanager.history.loading = true;
                    this.newsendmanager.history.currPage = 1;
                    this.newsendmanager.search.page = this.newsendmanager.history.currPage;
                    this.$http.post('preorder/sendhistory', {
                        id: this.ids,
                        search: this.newsendmanager.search
                    }).then((res) => {
                        //console.log(res);
                        this.newsendmanager.history.loading = false;

                        this.newsendmanager.history.datas = res.data.rs;
                        this.newsendmanager.history.print = res.data.print;
                        this.newsendmanager.history.pageSize = parseInt(res.data.pageSize);
                        this.newsendmanager.history.totalPage = parseInt(res.data.count);
                    }).catch((err) => {
                        console.log(err);
                    });
                }

            },
            handleTijiao () {
                //添加采购记录
                if (!this.purchase.add.amount) {

                    this.$Notice.error({
                        title: '请输入采购金额',
                        desc: '请输入采购金额',
                        duration: 1
                    });
                    return;
                }
                if (!this.purchase.add.quantity) {

                    this.$Notice.error({
                        title: '请输入采购份数',
                        desc: '请输入采购份数',
                        duration: 1
                    });
                    return;
                }
                if (!this.purchase.add.buyer) {

                    this.$Notice.error({
                        title: '请输入采购人',
                        desc: '请输入采购人',
                        duration: 1
                    });
                    return;
                }
                if (!this.purchase.add.trade_no) {

                    this.$Notice.error({
                        title: '请输入交易或转账单号',
                        desc: '请输入交易或转账单号',
                        duration: 1
                    });
                    return;
                }
                this.purchase.add.price = this.purchaseprice;
                this.$http.post('preorder/purchase', this.purchase.add).then((res) => {
                    if (res.data.rs == 'true') {
                        //	this.purchase.add.created_at =res.data.created_at;
                        this.purchase.datas.push(res.data.datas);
                        this.purchase.tabs = 'purchase';
                        this.$Notice.success({
                            title: '添加成功',
                            desc: '添加成功',
                            duration: 1
                        });
                        this.purchase.add.trade_no = '';
                        this.purchase.add.buyer = '';
                        this.purchase.add.remark = '';
                        this.purchase.add.quantity = 1;
                        this.purchase.add.amount = 1;

                    } else {
                        this.$Notice.error({
                            title: '添加失败',
                            desc: '添加失败',
                            duration: 1
                        });
                        return;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },

            //打印
            handleExportNewsendPrint () {
                console.log(this.newsendmanager.selectDatas);
                // console.log(this.newsendmanager.selectDatas);
                if (this.newsendmanager.selectDatas.length > 0) {
                    //	alert('sdsfsd');
                    this.labelsData = this.newsendmanager.selectDatas;
                    this.labelsPrint = true;
                    //	console.log(this.labelsData);
                } else {
                    this.$Notice.error({
                        title: '请选择要打印的送货单',
                        desc: '请选择要打印的送货单',
                        duration: 1
                    });
                    return;
                }
            },
            handlePreorderrepeat () {
                //活动复用
                if (!(this.ids.length)) {
                    this.$Notice.error({
                        title: '请选择要复用的活动',
                        desc: '请选择要复用的活动',
                        duration: 1
                    });
                    return;
                }
                this.$http.post('preorder/repeat', this.ids).then((res) => {
                    console.log(res);
                    if (res.data.rs == 'true') {
                        this.$Notice.success({
                            title: '活动复用成功',
                            desc: '活动复用成功',
                            duration: 1
                        });
                        this.$router.go(0);
                    } else {
                        this.$Notice.error({
                            title: res.data.msg,
                            desc: res.data.msg,
                            duration: 1
                        });
                        return;
                    }
                }).catch((err) => {

                });
            },
            handleNewsendmanagerSend () {
                //发货
                if (!this.newsendmanager.selectDatas.length) {
                    this.$Message.error('请选择要发货数据');
                } else {
                    this.$http.post('preorder/newsends', this.newsendmanager.selectDatas).then((res) => {
                        if (res.data.rs == 'true') {
                            this.$Notice.success({
                                title: '发货成功',
                                desc: '发货成功',
                                duration: 1
                            });
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

                }
            },
            handleExportNewsendmanagerSend () {
                //导出待发货
                if (!this.newsendmanager.nosend.print.length) {
                    this.$Message.error('请选择要导出的发货数据');
                } else {
                    this.$refs.nosend.exportCsv({
                        fileName: '发货数据',
                        columns: [{
                            key: 'preorder_id',
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
                                title:"分类名称",
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
                            }, {
                                key: 'men_address',
                                title: '收货人门牌号'
                            }, {
                                key: 'mask_mobile',
                                title: '收货人手机号中间4位屏蔽'
                            },{
                            key:'getgoods',
                                title:"取货方式"
                            }
                        ],
                        data: this.newsendmanager.nosend.print
                    });
                }
            },
            handleExporthistorysend () {
                //导出历史发货
                if (!this.newsendmanager.history.print.length) {
                    this.$Message.error('请选择要导出的发货数据');
                } else {
                    this.$refs.sendhistory.exportCsv({
                        fileName: '发货数据',
                        columns: [{
                            key: 'preorder_id',
                            sortable: true,
                            title: '活动id',
                            width: 66
                        },
                            {
                                key: 'description',
                                sortable: true,
                                title: '活动标题'
                            },
                            {
                                key: 'sku_title',
                                sortable: true,
                                title: '产品名称'
                            },
                            {
                                key:"cat_name",
                                title:"分类名称",
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
                                title: '订单备注'
                            },
                            {
                                key: 'sender',
                                sortable: true,
                                title: '发货人'
                            },
                            {
                                key: 'send_time',
                                sortable: true,
                                title: '发货时间',
                                width: 110
                            },
                            {
                                key: 'men_address',
                                title: '收货人门牌号'
                            }
                            , {
                                key: 'mask_mobile',
                                title: '收货人手机号中间4位屏蔽'
                            },{
                            key:'getgoods',
                                title:"取货方式"
                            }
                        ],
                        data: this.newsendmanager.history.print
                    });
                }
            },

            handleTabssend (name) {
                //console.log(name);
                this.newsendmanager.search.sku_title = '';
                this.newsendmanager.search.shop_name = '';
                this.newsendmanager.search.mobile = '';
                this.newsendmanager.search.shop_type = '2';
                this.newsendmanager.search.order_type = '2';
                this.newsendmanager.selectDatas = [];
                if (name == 'history') {
                    //alert('history');
                    if (!(this.ids.length)) {
                        this.$Notice.error({
                            title: '查询参数缺失',
                            desc: '查询参数缺失',
                            duration: 1
                        });
                        return;
                    }
                    this.newsendmanager.history.currPage = 1;
                    this.newsendmanager.history.loading = true;
                    this.newsendmanager.history.datas = [];
                    this.$http.post('preorder/sendhistory', {id: this.ids}).then((res) => {
                        //console.log(res);
                        this.newsendmanager.history.datas = res.data.rs;
                        this.newsendmanager.history.loading = false;
                        this.newsendmanager.history.print = res.data.print;
                        this.newsendmanager.history.pageSize = parseInt(res.data.pageSize);
                        this.newsendmanager.history.totalPage = parseInt(res.data.count);
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    this.newsendmanager.nosend.currPage = 1;
                    this.newsendmanager.nosend.loading = true;
                    //	alert('nocai');
                    this.newsendmanager.nosend.datas = [];
                    this.$http.post('preorder/nosend', {
                        id: this.ids
                    }).then((res) => {
                        this.newsendmanager.nosend.loading = false;
                        this.newsendmanager.nosend.datas = res.data.rs;
                        this.newsendmanager.nosend.print = res.data.print;
                        this.newsendmanager.nosend.pageSize = parseInt(res.data.pageSize);
                        this.newsendmanager.nosend.totalPage = parseInt(res.data.count);
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            },
            handleSendmanager () {
                //发货管理
                if (this.ids.length) {
                    this.newsendmanager.nosend.currPage = 1;
                    this.newsendmanager.nosend.loading = true;
                    this.newsendmanager.show = true;
                    this.newsendmanager.tabs = 'nosend';
                    this.newsendmanager.nosend.datas = [];
                    this.$http.post('preorder/nosend', {
                        id: this.ids
                    }).then((res) => {
                        //console.log(res);
                        this.newsendmanager.nosend.loading = false;
                        this.newsendmanager.nosend.datas = res.data.rs;
                        this.newsendmanager.nosend.print = res.data.print;
                        this.newsendmanager.nosend.pageSize = parseInt(res.data.pageSize);
                        this.newsendmanager.nosend.totalPage = parseInt(res.data.count);
                    }).catch((err) => {
                        console.log(err);
                    });

                } else {
                    this.$Message.error('请选择要采购管理的预售活动');
                }
            },
            handleSendSelectChange (sel) {
                //发货管理数据发生变化时；
                this.newsendmanager.selectDatas = sel;
            },
            handelCaigoumanagerSearch () {
                //带菜订单搜索
                if (!(this.caigoumanager.nocai.endtime) || !(this.ids.length)) {
                    this.$Notice.error({
                        title: '查询参数缺失',
                        desc: '查询参数缺失',
                        duration: 1
                    });
                    return;
                }
                var rs = {
                    id: this.ids,
                    endtime: this.caigoumanager.nocai.endtime
                };
                this.$http.post('preorder/buynocai', rs).then((res) => {
                    this.caigoumanager.nocai.datas = res.data.rs;
                    this.caigoumanager.nocai.endtime = res.data.endtime;
                }).catch((err) => {
                    console.log(err);
                });
            },
            handleCaigouMakePlan () {
                //生成采购计划；
                if (!this.caigoumanager.selectDatas.length) {
                    this.$Message.error('请选择要生成采购计划的数据');
                } else {
                    this.$http.post('preorder/newmakecaigou', this.caigoumanager.selectDatas).then((res) => {
                        if (res.data.rs == 'true') {
                            this.$Notice.success({
                                title: '生成采购计划',
                                desc: '生成采购计划成功',
                                duration: 1
                            });
                            this.handleTabs('nocai');
                            //this.caigoumanager.nocai.datas = [];
                        } else {
                            this.$Notice.error({
                                title: '生成采购计划',
                                desc: '生成采购计划失败',
                                duration: 1
                            });
                        }

                        this.caigoumanager.selectDatas = [];
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            },

            handleCaigouSelectChange (sel) {
                this.caigoumanager.selectDatas = sel;
            },
            handleExporthistorycaigou () {
                //导出历史采购
                //alert('导出采购计划');

                if (!this.caigoumanager.selectDatas.length) {
                    this.$Message.error('请选择要导出的采购数据');
                } else {
                    /*	this.caigoumanager.nocai.datas.forEach((item) => {
							item._checked = false;
						});*/
                    this.$refs.history.exportCsv({
                        fileName: '采购数据',
                        columns: [{
                            key: 'preorder_id',
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
                                title:"分类名称",
                            },
                            {
                                key: 'specs',
                                title: '产品规格'
                            },
                            {
                                key: 'caigou_price',
                                title: '采购价格'
                            },
                            {
                                key: 'price',
                                title: '预售价格'
                            },
                            {
                                key: 'ordertimerange',
                                title: '订单时间范围'
                            },
                            {
                                key: 'nocai',

                                title: '待采数量'
                            },
                            {
                                key: 'sold_out',
                                title: '累计销量'
                            },
                            {
                                key: 'created_at',
                                sortable: true,
                                title: '生成采购计划时间'
                            },
                            {
                                key: 'buyer',
                                sortable: true,
                                title: '采购人'
                            }

                        ],
                        data: this.caigoumanager.selectDatas
                    });

                    //	this.caigoumanager.selectDatas = [];

                    //_this.$router.go(0);
                }
            },
            handleExportcaigou () {
                //导出采购计划
                //alert('导出采购计划');

                if (!this.caigoumanager.selectDatas.length) {
                    this.$Message.error('请选择要导出的采购数据');
                } else {
                    this.caigoumanager.nocai.datas.forEach((item) => {
                        item._checked = false;
                    });
                    this.$refs.nocai.exportCsv({
                        fileName: '采购数据',
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
                                title:"分类名称",
                            },
                            {
                                key: 'specs',
                                title: '产品规格'
                            },
                            {
                                key: 'caigou_price',
                                title: '采购价格'
                            },
                            {
                                key: 'price',
                                title: '预售价格'
                            },
                            {
                                key: 'ordertimerange',
                                title: '订单时间范围'
                            },
                            {
                                key: 'nocai',

                                title: '待采数量'
                            },
                            {
                                key: 'sold_out',
                                title: '累计销量'
                            }
                        ],
                        data: this.caigoumanager.selectDatas
                    });

                    //	this.caigoumanager.selectDatas = [];

                    //_this.$router.go(0);
                }
            },
            handleTabs (name) {
                //console.log(name);
                this.caigoumanager.selectDatas = [];
                if (name == 'history') {
                    //alert('history');
                    if (!(this.ids.length)) {
                        this.$Notice.error({
                            title: '查询参数缺失',
                            desc: '查询参数缺失',
                            duration: 1
                        });
                        return;
                    }
                    this.caigoumanager.history.load = true;
                    this.caigoumanager.history.datas = [];
                    this.$http.post('preorder/buyhistory', this.ids).then((res) => {
                        //console.log(res);
                        this.caigoumanager.history.datas = res.data;
                        this.caigoumanager.history.load = false;
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    //	alert('nocai');
                    this.caigoumanager.nocai.load = true;
                    this.caigoumanager.nocai.datas = [];
                    this.$http.post('preorder/buynocai', {
                        id: this.ids
                    }).then((res) => {
                        this.caigoumanager.nocai.datas = res.data.rs;
                        this.caigoumanager.nocai.endtime = res.data.endtime;
                        this.caigoumanager.nocai.load = false;
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            },
            handleCaigoumanager () {
                //采购管理
                //this.caigoumanager.show = true;
                if (this.ids.length) {
                    this.caigoumanager.tabs = 'nocai';
                    this.caigoumanager.show = true;
                    this.caigoumanager.nocai.load = true;
                    this.caigoumanager.nocai.datas = [];
                    this.$http.post('preorder/buynocai', {id:this.ids}).then((res) => {
                        //console.log(res);
                        this.caigoumanager.nocai.datas = res.data.rs;
                        this.caigoumanager.nocai.load = false;
                    }).catch((err) => {
                        console.log(err);
                    });

                } else {
                    this.$Message.error('请选择要采购管理的预售活动');
                }
            },

            /*采购弹窗显示状况发生 变化时出发*/
            handlecaigoushow (val) {
                if (!val) {
                    //this.buy={};
                    this.buy.selecttime = '';
                    this.buy.disablecaigou = false;
                }

            },
            /* 历史采购*/
            handlehistorycai () {

                var query = {
                    selecttime: this.buy.selecttime,
                    promotion_id: this.buy.promotion_id,
                    sku_id: this.buy.sku_id,
                    preorder_id: this.buy.proder_id
                };
                if (this.buy.selecttime) {
                    this.buy.disablecaigou = true;
                    this.$http.post('preorder/querycaitiao', query).then((res) => {
                        this.buy.datas = res.data.datas;
                        this.buy.show = true;
                        this.buy.load = false;
                        this.buy.endcaigoutime = '';

                    }).catch((err) => {

                    });
                }
                /*else {
					this.$Message.error("请选择要查询的时间范围");
				}*/
            },
            /*makecaigouexport*/
            makecaigouexport () {
                if (!this.buy.datas.length) {
                    this.$Message.error('请选择要导出待采购数据');
                } else {
                    this.$refs.buy.exportCsv({
                        fileName: '采购数据',
                        columns: this.buy.keys,
                        data: this.buy.datas
                    });
                    //_this.$router.go(0);
                }
            },
            /*生成采购计划*/
            makecaigou () {
                if (!this.buy.datas.length) {
                    this.$Message.error('请选择待采购数据');
                } else {
                    this.$http.post('preorder/makecaigou', this.buy).then((res) => {
                        console.log(res);
                        if (res.data.rs == 'true') {
                            this.$Notice.success({
                                title: '生成采购计划',
                                desc: '生成采购计划成功',
                                duration: 1
                            });
                            this.buy.show = false;
                            this.buy.datas = [];

                        } else {
                            this.$Notice.success({
                                title: '生成采购计划',
                                desc: '生成采购计划失败',
                                duration: 1
                            });
                        }
                    }).catch((err) => {

                    });
                    /*this.$refs.buy.exportCsv({
						fileName: "采购数据",
						columns: this.buy.keys,
						data: this.buy.datas
					});*/
                    //_this.$router.go(0);
                }
            },
            //采购当前查询
            handlePreorderstartend (val) {
                console.log(val);
                this.buy.endcaigoutime = val;
                this.buy.selecttime = '';
                this.buy.disablecaigou = false;
                //查询是当前是否有订单
                var query = {
                    starttime: this.buy.startcaigoutime,
                    endtime: this.buy.endcaigoutime,
                    promotion_id: this.buy.promotion_id,
                    sku_id: this.buy.sku_id,
                    preorder_id: this.buy.proder_id
                };
                this.$http.post('preorder/nowcaiquery', query).then((res) => {
                    this.buy.datas = res.data.datas;
                    this.buy.show = true;
                    this.buy.load = false;
                    //	this.buy.startcaigoutime = res.data.startcaigoutime;

                }).catch((err) => {

                });

            },
            //审核按钮事件
            handleEnableradio () {
                console.log(this.lookactivedata.enableRadio);
                console.log(this.lookactivedata.preorder_status);
                if (this.lookactivedata.preorder_status == '通过') {
                    this.lookactivedata.enableTextarea = false;
                } else {
                    this.lookactivedata.enableTextarea = true;
                }

            },
            //查看活动图片
            handlelookactivepic (pic) {
                this.picshowurl = pic;
                this.picshow = true;
            },

            //历史发货查询
            handleSendgoodshistoryaction () {
                //alert('history');
                //alert(this.preorder_id);
                this.$http.get('preorder/sendhistory&preorderid=' + this.preorder_id).then((res) => {
                    this.sendgoodsdata = res.data;
                    this.sendgoodsshow = true;
                    this.enablesendbutton = true;
                }).catch((err) => {
                    console.log(err);
                });
            },

            //发货
            handleSendgoodsaction () {
                if (!this.sendgoodsexports.length) {
                    this.$Message.error('请选择要导出待发货数据');
                } else {
                    this.$http.post('preorder/sends', this.sendgoodsexports).then((res) => {
                        //console.log(res);
                        if (res.data.rs == 'true') {
                            this.sendgoodsexports = [];
                            this.$Notice.success({
                                title: '发货',
                                desc: '发货成功',
                                duration: 1
                            });
                            this.sendgoodsshow = false;
                        } else {
                            this.sendgoodsexports = [];
                            this.$Notice.error({
                                title: res.data.msg,
                                desc: res.data.msg,
                                duration: 1
                            });
                            this.sendgoodsshow = false;
                        }

                        //	this.$router.go(0);
                        /*	this.sendgoodsdata.forEach((item)=>{
								this.sendgoodsexports.forEach((v)=>{
									if(v==item){
										this.sendgoodsdata.pop(item);
									}
								});
							})*/

                    }).catch((err) => {
                        console.log(err);
                    });
                }

            },
            //导出发货数据
            handleExportsendsgoods () {
                if (!this.sendgoodsexports.length) {
                    this.$Message.error('请选择要导出待发货数据');
                } else {
                    this.$refs.presendgoods.exportCsv({
                        fileName: '待发货',
                        columns: this.sendgoodskey,
                        data: this.sendgoodsexports
                    });
                    //_this.$router.go(0);
                }
            },
            //发货数据变化
            handleSendgoods (selection) {
                this.sendgoodsexports = [];
                selection.forEach((item) => {
                    this.sendgoodsexports.push(item);
                });
            },
            //导出采购数据
            handleCaigou () {
                var mydate = new Date();
                if (!this.caigoupromotionids.length) {
                    this.$Message.error('请选择要导出采购预售');
                } else {
                    console.log('caigou');
                    var cols = [{
                        key: 'id',

                        title: '活动id'
                    },
                        {
                            key: 'sku_title',
                            title: '商品标题'
                        },
                        {
                            key: 'price',
                            title: '预售价格'
                        },
                        {
                            key: 'sold_out',
                            title: '下单数量'
                        },
                        {
                            key: 'specs',
                            title: '规格'
                        },
                        {
                            key: 'end_time',
                            title: '预售结束时间'
                        },
                        {
                            key: 'pickup_time',
                            title: '预计可自提时间'
                        },
                        {
                            key: 'pickup_end_time',
                            title: '自提结束时间'
                        }
                    ];

                    //ajax请求导出数据
                    this.$http.post('=preorder/caigouexport', {
                        preorder: this.caigoupromotionids
                    }).then((res) => {
                        console.log(res);

                        this.$refs.preorderdata.exportCsv({
                            fileName: '采购',
                            columns: cols,
                            data: res.data
                        });
                        this.$router.go(0);
                    }).catch((err) => {
                        console.log(err);
                    });
                    // console.log(this.caigoupromotionids);

                    /*Axios.post(this.$store.state.ycypurl + '?r=preorder/caigouexport').then((res) => {
						console.log(res);
						var fileName = "采购";
						columns:this.columns1
						data:this.ids
						//var cols=
					}).catch((err) => {
						console.log(err);
					});*/
                }
            },
            handlerCheck () {
                //单页审核
                if ((this.lookactivedata.preorder_status == '退回' || this.lookactivedata.preorder_status == '关闭') && !this.lookactivedata.reason) {
                    this.$Message.error({
                        content: '请输入原因',
                        duration: 2
                    });
                    return;
                }
                switch (this.lookactivedata.preorder_status) {
                    case '退回':
                        this.preorder_status = '10';
                        break;
                    case '通过':
                        this.preorder_status = '1'; //预售中
                        break;
                    case '关闭':
                        this.preorder_status = '9';
                        break;

                }
                this.$http.get('preorder/check&id=' + this.lookactivedata.id + '&preorder_status=' + this.preorder_status +
                    '&rejectreason=' + this.lookactivedata.reason).then((res) => {
                    //console.log(res);
                    if (res.data.rs == 'true') {
                        this.$Message.info({
                            content: '审批成功!'
                        });
                        this.$router.go(0);
                    } else {
                        this.$Message.info({
                            content: '审批失败，请联系客服人员!'
                        });
                    }

                    //this.$router.push('activity_index');
                }).catch((err) => {
                    console.log(err);
                });

            },

            ok () {

            },
            handleSelectChange (selection) {

                this.masterselectdata = selection;

                this.ids = [];
                //采购数据导出
                this.caigoupromotionids = [];
                selection.forEach((item) => {
                    this.ids.push(item.id);
                    //采购数据导出
                    this.caigoupromotionids.push(item);

                });
                //console.log(this.caigoupromotionids);
            },
            handleDown () {
                this.downids = [];
                this.data1.forEach((item) => {
                    this.masterselectdata.forEach((b) => {
                        if (b.id == item.id) {
                            if (b.preorder_status == '1' || b.preorder_status == '8' || b.preorder_status == '10') {
                                this.downids.push(b.id);
                            } else {
                                this.masterselectdata.pop(b);
                                this.$set(item, '_disabled', true);
                            }
                        }
                    });

                });

                if (this.downids.length) {
                    var _this = this;
                    this.$Modal.confirm({
                        title: '下架操作确认',
                        content: '真得要下架么？',
                        onOk: function () {
                            _this.$http.post('preorder/down', _this.downids).then((res) => {
                                if (res.data.rs == 'true') {
                                    _this.$Notice.success({
                                        title: 'delete',
                                        desc: '下架成功',
                                        duration: 1
                                    });

                                    _this.data1.forEach((item) => {
                                        _this.downids.forEach((b) => {
                                            if (b == item.id) {
                                                _this.$set(item, 'preorder_status', '5');
                                            }

                                        });

                                    });
                                } else {
                                    _this.$Notice.success({
                                        title: 'delete',
                                        desc: res.data.msg,
                                        duration: 1
                                    });

                                }

                                //	_this.$router.go(0);
                            }).catch((err) => {
                                console.log(err);
                            });
                        }
                    });

                } else {
                    this.$Message.error('请选择要下架的活动');
                    this.data1.forEach((item) => {
                        this.$set(item, '_disabled', false);
                    });
                }
            },

            handleUp () {
                //5,上架
                this.downids = [];
                this.data1.forEach((item) => {
                    this.masterselectdata.forEach((b) => {
                        if (b.id == item.id) {
                            if (b.preorder_status == '5') {
                                this.downids.push(b.id);
                            } else {
                                this.masterselectdata.pop(b);
                                this.$set(item, '_disabled', true);
                            }
                        }
                    });

                });
                if (this.downids.length) {
                    this.$http.post('preorder/up', this.downids).then((res) => {
                        if (res.data.rs == 'true') {
                            this.$Notice.success({
                                title: 'delete',
                                desc: '上架成功',
                                duration: 1
                            });

                            this.data1.forEach((item) => {
                                this.downids.forEach((b) => {
                                    if (b == item.id) {
                                        this.$set(item, 'preorder_status', '8');
                                    }

                                });

                            });
                        } else {
                            this.$Notice.success({
                                title: 'up',
                                desc: res.data.msg,
                                duration: 1
                            });

                        }

                        //_this.$router.go(0);
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    this.$Message.error('请选择要上架的活动');
                    this.data1.forEach((item) => {
                        this.$set(item, '_disabled', false);
                    });
                }

            },
            handleSend () {
                //分拣发货
                this.sendgoodsids = [];
                this.data1.forEach((item) => {
                    this.masterselectdata.forEach((b) => {
                        if (b.id == item.id) {
                            if (b.preorder_status == '3' || b.preorder_status == '6') {
                                this.sendgoodsids.push(b);
                            } else {
                                this.masterselectdata.pop(b);
                                this.$set(item, '_disabled', true);
                            }
                        }
                    });

                });

                if (this.sendgoodsids.length) {
                    this.$http.post('preorder/sendgoods', this.sendgoodsids).then((res) => {
                        this.sendgoodsdata = res.data;
                        this.sendgoodsshow = true;

                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    this.$Message.error('请选择要分拣发货的数据');
                    this.data1.forEach((item) => {
                        this.$set(item, '_disabled', false);
                    });
                }
            },
            handleDel () {
                //	console.log(this.ids.length);
                if (this.ids.length) {
                    var _this = this;
                    console.log('tip');
                    this.$Modal.confirm({
                        title: '删除操作确认',
                        content: '真得要删除么？',
                        onOk: function () {
                            _this.$http.post('item/del', _this.ids).then((res) => {
                                console.log(res);

                                _this.$Notice.success({
                                    title: 'delete',
                                    desc: '删除成功',
                                    duration: 1
                                });
                                _this.$router.go('goodslist');

                            }).catch((err) => {
                                console.log(err);
                            });
                        }
                    });

                } else {
                    this.$Message.error('请选择要删除的数据');
                }
                /*this.$router.push({
					name: 'goodsadd'
				});*/
            },

            handleAdd () {
                this.$router.push({
                    name: 'preorderadd'
                });
            },
            changePage (page) {
                this.currPage = page;
                this.rs = {
                    description: this.searchConName1,
                    sku_title: this.searchConName2,
                     caisend:this.searchConName3,
                    curpage: page
                };
                this.loading = true;
                this.$http.post('preorder/list', this.rs).then(
                    (res) => {
                        this.loading = false;
                        //console.log(res.data);
                        this.totalPage = parseInt(res.data.totalPage);
                        this.pageSize = parseInt(res.data.pageSize);
                        this.currPage = parseInt(res.data.currpage);
                        this.data1 = this.initTable1 = res.data.rs;
                        this.auth = res.data.auth;
                    }
                ).catch((err) => {
                    console.log(err);
                });
                //console.log(page);

                // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
                //this.tableData1 = this.mockTableData1();
            },
            init () {
                this.loading = true;
                this.$http.get('preorder/list').then(
                    (res) => {
                        //console.log(res);
                        this.loading = false;
                        //console.log(res.data);
                        this.totalPage = parseInt(res.data.totalPage);
                        //console.log(this.totalPage);
                        this.pageSize = parseInt(res.data.pageSize);
                        this.currPage = parseInt(res.data.currpage);
                        this.data1 = this.initTable1 = res.data.rs;
                        this.auth = res.data.auth;
                        this.auth.enableEdit = Boolean(this.auth.enableEdit);
                        this.auth.enableAdd = Boolean(this.auth.enableAdd);
                        this.auth.enableDown = Boolean(this.auth.enableDown);
                        this.auth.enableUp = Boolean(this.auth.enableUp);
                        this.auth.enableCaigou = Boolean(this.auth.enableCaigou);
                        this.auth.enableSend = Boolean(this.auth.enableSend);
                        this.auth.enableRepeat = Boolean(this.auth.enableRepeat);
                        this.auth.enableAddpurchase = Boolean(this.auth.enableAddpurchase);

                    }
                ).catch((err) => {
                    console.log(err);
                });
            },
            handleSearch1 () {
                this.ids=[];
                this.loading = true;
                this.rs = {
                    description: this.searchConName1,
                    sku_title: this.searchConName2,
                    caisend:this.searchConName3,

                };
                this.$http.post('preorder/list', this.rs).then(
                    (res) => {
                        this.loading = false;
                        //console.log(res.data);
                        this.totalPage = parseInt(res.data.totalPage);
                        this.pageSize = parseInt(res.data.pageSize);
                        this.currPage = parseInt(res.data.currpage);
                        this.data1 = this.initTable1 = res.data.rs;
                        this.auth = res.data.auth;
                    }).catch((err) => {
                    console.log(err);
                });

            }
        },
        mounted () {
            this.curtime = new Date().getTime();
            this.init();
            //  this.handleSearch1();
            this.columns1 = [{
                type: 'selection',
                width: 56,
                align: 'center'
            },
                {
                    key: 'operation',
                    title: '操作',
                    width: 128,
                    render: (h, params) => {
                        var endtime = Date.parse(params.row.end_time);

                        return h('span', [

                            h('a', {
                                attrs: {
                                    style: 'margin-right:14px;'
                                },
                                on: {
                                    click: () => {
                                        var curtime = new Date().getTime();
                                        var begintime = Date.parse(params.row.begin_time);
                                        var endtime = Date.parse(params.row.end_time);
                                        var noticetime = Date.parse(params.row.notice_time);
                                        switch (params.row.preorder_status) {
                                            case '10':
                                                this.lookactivedata.preorder_status = '退回';
                                                this.lookactivedata.enableTextarea = true;
                                                this.lookactivedata.enableRadio = false;
                                                this.lookactivedata.orderstatus = '被退回';
                                                break;
                                            case '8':
                                                this.lookactivedata.preorder_status = '';
                                                this.lookactivedata.orderstatus = '待审核';
                                                this.lookactivedata.enableRadio = false;
                                                this.lookactivedata.enableTextarea = false;
                                                break;
                                            case '9':
                                                this.lookactivedata.preorder_status = '关闭';
                                                this.lookactivedata.orderstatus = '已关闭';
                                                this.lookactivedata.enableRadio = true;
                                                this.lookactivedata.enableTextarea = false;
                                                break;
                                            case '1':
                                                if (curtime < begintime) {
                                                    this.lookactivedata.orderstatus = '预告中';
                                                } else if (endtime > curtime && curtime >= begintime) {
                                                    this.lookactivedata.orderstatus = '预售中';
                                                } else if (curtime >= endtime) {
                                                    this.lookactivedata.orderstatus = '预售结束';
                                                }
                                                this.lookactivedata.preorder_status = '通过';
                                                this.lookactivedata.enableRadio = true;
                                                break;
                                            case '11':
                                                this.lookactivedata.preorder_status = '通过';
                                                this.lookactivedata.enableRadio = true;
                                                break;
                                            case '12'://表示总部已拒绝
                                                this.lookactivedata.preorder_status = '通过';
                                                this.lookactivedata.enableRadio = true;
                                                break;
                                            case '5':
                                                this.lookactivedata.orderstatus = '被下架';
                                                this.lookactivedata.preorder_status = '通过';
                                                this.lookactivedata.enableRadio = true;
                                                break;
                                            case '7':
                                                this.lookactivedata.preorder_status = '通过';
                                                this.lookactivedata.enableRadio = true;
                                                this.lookactivedata.orderstatus = '已售完';
                                                break;

                                        }
                                        ;

                                        var rs = {
                                            admin_id: params.row.checker,
                                            promotion_id: params.row.promotion_id,
                                            sku_id: params.row.sku_id,
                                            preorder_id: params.row.id

                                        };

                                        this.$http.post('preorder/lookactive', rs).then((res) => {
                                            console.log(res);
                                            console.log(res.data.rs);
                                            console.log(params.row);
                                            if (res.data.rs == 'true') {
                                                this.lookactivedata.flow_show = Boolean(res.data.zbCheck);

                                                if (this.lookactivedata.flow_show) {
                                                    switch (params.row.preorder_status) {
                                                        case '8':
                                                            this.lookactivedata.flow_status = 1;
                                                            break;
                                                        case '1':
                                                            this.lookactivedata.flow_status = 3;
                                                            break;
                                                        case '11':
                                                            this.lookactivedata.flow_status = 2;
                                                            break;
                                                        case '12':
                                                            this.lookactivedata.flow_status = 3;
                                                            break;

                                                    }
                                                }

                                                this.lookactivedata.id = params.row.id;
                                                this.lookactivedata.per_limit_count = params.row.per_limit_count;
                                                this.lookactivedata.per_limit_num = params.row.per_limit_num;
                                                this.lookactivedata.caigou_price = params.row.caigou_price;
                                                this.lookactivedata.active_title = params.row.description;
                                                this.lookactivedata.active_sender = params.row.active_sender;
                                                this.lookactivedata.active_created_time = params.row.created_at;
                                                this.lookactivedata.price = params.row.price;
                                                this.lookactivedata.spec = res.data.datas.specs; //规格
                                                this.lookactivedata.pic = params.row.preorder_pic; //
                                                this.lookactivedata.limit_num = params.row.limit_num;
                                                this.lookactivedata.fake_sold_out = params.row.fake_sold_out;
                                                this.lookactivedata.notice_time = params.row.notice_time;
                                                this.lookactivedata.end_time = params.row.end_time;
                                                this.lookactivedata.begin_time = params.row.begin_time;
                                                this.lookactivedata.pickup_time = params.row.pickup_time;
                                                this.lookactivedata.profit_rate = params.row.profit_rate;
                                                this.lookactivedata.pickup_end_time = params.row.pickup_end_time;
                                                this.lookactivedata.user_created_at = params.row.user_created_at;
                                                this.lookactivedata.check_time = params.row.check_time; //审核时间
                                                this.lookactivedata.checker = res.data.datas.username; //谁审核的
                                                this.lookactivedata.reason = params.row.reject_reason;
                                                this.lookactivedata.sold_out = params.row.sold_out;
                                                this.lookactivedata.amount = res.data.datas.amount; //订单金额
                                                this.lookactivedata.orderstatus = this.lookactivedata.orderstatus;
                                                this.lookactivedata.sharecoupon = res.data.sharecoupon;
                                                this.lookactivedata.takecoupon = res.data.takecoupon;
                                                this.lookactivedata.coupons = res.data.coupons;

                                                this.lookactivedata.logs = res.data.datas.logs; //
                                                this.lookactive = true;

                                                // this.$router.push({
                                                // 	name: 'activity_index'
                                                // });
                                            } else {
                                                this.$Message.error(res.data.msg);
                                            }
                                        }).catch((err) => {
                                            console.log(err);
                                        });

                                    }
                                }
                            }, '查看审核'),

                            h('a', {

                                attrs: {
                                    disabled: (!this.auth.enableEdit && (params.row.preorder_status == '8' || params.row.preorder_status == '10' || params.row.preorder_status == '5')) ? false : true
                                },
                                on: {
                                    click: () => {

                                        //alert('编辑');
                                        console.log(params);
                                        let query = {
                                            id: params.row.id
                                        };
                                        this.$router.push({
                                            path: '/activity/preorderedit/' + params.row.id,
                                            //query: query
                                        });
                                    }
                                }
                            }, '编辑'),
                            /*h('br', ''),
							h('a', {
								attrs: {
									style: "margin-right:14px;",

									disabled: this.auth.enableCaigou

								},
								on: {
									click: () => {
										this.buy.show = true;
										this.buy.load = false;
										this.buy.proder_id = params.row.id;
										this.buy.promotion_id = params.row.promotion_id;
										this.buy.sku_id = params.row.sku_id;
										this.$http.post('preorder/querycaigou', params.row).then((res) => {
											this.buy.datas = res.data.datas;
											this.buy.startcaigoutime = res.data.startcaigoutime;
											this.buy.endcaigoutime = res.data.endcaigoutime;
											this.buy.historytimes = [];
											this.buy.selecttime = '';
											if(res.data.historytimes.length) {
												res.data.historytimes.forEach((item) => {
													this.buy.historytimes.push(item);
												});
											}
											console.log(this.buy.historytimes);
										}).catch((err) => {
											console.log(err);
										});

									}
								}
							}, '采购'),
							h('span', ' '),
							h('span', ' '),
							h('a', {
								attrs: {
									//!this.auth.enableSend &&
									disabled: this.auth.enableSend
								},
								on: {
									click: () => {
										this.preorder_id = params.row.id;
										this.$http.post('preorder/sendgoods', params.row).then((res) => {
											this.sendgoodsdata = res.data;
											this.sendgoodsshow = true;
											this.enablesendbutton = false;
										}).catch((err) => {
											console.log(err);
										});
									}
								}
							}, '发货'),*/
                        ]);

                    }
                },
                {
                    key: 'purchase',
                    title: '实采记录',
                    width: 100,
                    render: (h, params) => {
                        return h('a', {
                            attrs: {
                                disabled: false
                            },
                            on: {
                                click: () => {
                                    //alert("实际采购记录");
                                    this.purchase.loading = false;
                                    this.purchase.show = true;
                                    this.purchase.add.preorder_id = params.row.id;
                                    this.$http.get('preorder/purchase&id=' + params.row.id).then((res) => {
                                        this.purchase.datas = res.data;
                                    }).catch((err) => {

                                    });
                                }
                            }
                        }, '实采记录');
                    }
                },

                {
                    key: 'preorder_status',
                    title: '活动状态',
                    width: 100,
                    align: 'center',
                    filters: [
                        {label: '待审核', value: 1},
                        {label: '预告中', value: 2},
                        {label: '预售中', value: 3},
                        {label: '已结束', value: 9},
                        {label: '待总部审核', value: 4},
                        {label: '被下架', value: 5},
                        {label: '已售完', value: 6},
                        {label: '已关闭', value: 7},
                        {label: '总部已拒绝', value: 8}
                    ],
                    filterMultiple: false,
                    filterMethod (value, row) {
                        var endtime = Date.parse(row.end_time);
                        var begintime = Date.parse(row.begin_time);
                        var ctime = new Date().getTime();
                        if (value === 1) {
                            return row.preorder_status == '8';

                        } else if (value === 2) {
                            return row.preorder_status == '1' && (ctime < begintime);
                        } else if (value === 3) {
                            return row.preorder_status == '1' && (ctime >= begintime && ctime <= endtime);
                        } else if (value === 4) {
                            return row.preorder_status == '11';
                        } else if (value === 5) {
                            return row.preorder_status == '5';
                        } else if (value === 6) {
                            return row.sold_out == row.limit_num;
                        } else if (value === 7) {
                            return row.preorder_status == '9';
                        } else if (value === 8) {
                            return row.preorder_status == '12';
                        } else if (value === 9) {
                            return row.preorder_status == '1' && (ctime > endtime && ctime > begintime);
                        }
                    },

                    render: (h, params) => {
                        var endtime = Date.parse(params.row.end_time);
                        var begintime = Date.parse(params.row.begin_time);
                        let rs = '';
                        params.row.preorder_status = params.row.sold_out == params.row.limit_num ? '7' : params.row.preorder_status;
                        //console.log(params.row);
                        switch (params.row.preorder_status) {

                            case '1':
                                //预告或预售中
                                if (this.curtime >= endtime) {
                                    rs = '已结束';
                                } else if (this.curtime < begintime) {
                                    rs = '预告中';
                                } else {
                                    rs = '预售中';
                                }
                                break;
                            case '5':
                                rs = '被下架';
                                break;
                            case '7':
                                rs = '已售完';
                                break;
                            case '8':
                                rs = '待审核';
                                break;
                            case '9':
                                rs = '已关闭';
                                break;
                            case '10':
                                rs = '已退回';
                                break;
                            case '11':
                                rs = '待总部审核';
                                break;
                            case '12':
                                rs = '总部已拒绝';
                                break;
                        }
                        return h('span', rs);
                    }

                },
                {
                    key: 'city',
                    title: '市公司',
                    tooltip: true,
                    sortable: true,
                    width: 130,
                    tooltip: true,
                    align: 'center'
                },
                {
                    key: 'active_id',
                    title: '销售对象',
                    tooltip: true,
                    width: 110,
                    align: 'center',
                    render: (h, params) => {
                        return h('a', {
                            on: {
                                click: () => {
                                    switch (params.row.active_type) {
                                        case '2':
                                            this.activeRangeCity = true;
                                            this.activeCityData = [];
                                            this.$http.post('preorder/activerange', {
                                                'active_type': params.row.active_type,
                                                'active_id': params.row.active_id
                                            }).then((res) => {
                                                this.activeCityData = res.data;

                                            }).catch((err) => {
                                                console.log(err);
                                            });
                                            break;
                                        case '3':
                                            this.newshopRange.show = true;
                                            this.newshopRange.datas = [];
                                            this.$http.post('preorder/activerange', {
                                                'active_type': params.row.active_type,
                                                'active_id': params.row.active_id
                                            }).then((res) => {
                                                this.newshopRange.datas = res.data;
                                                this.newshopRange.loading = false;
                                            }).catch((err) => {
                                                console.log(err);
                                            });

                                            break;

                                    }

                                }
                            }
                        }, params.row.active_type == '2' ? '市级' : (params.row.active_type == '3' ? '店东或代理' : '全国'));
                    }

                },
                {
                    key: 'id',
                    width: 90,
                    title: '活动id',
                    align: 'center',
                    sortable: true
                },
                {
                    key: 'exclude_shops',
                    title: '排除社区',
                    width: 100,
                    render: (h, p) => {
                        if (p.row.exclude_shops) {
                            var _this = this;
                            return h('a', {
                                on: {
                                    click () {
                                        _this.excludeShops.show = true;
                                        _this.excludeShops.loading = true;

                                        // alert(p.row.exclude_shops);
                                        _this.$http.post('preorder/excludeshops', {shopIds: p.row.exclude_shops}).then((rs) => {
                                            _this.excludeShops.loading = false;
                                            _this.excludeShops.datas = rs.data;

                                        }).catch((err) => {

                                        });
                                    }
                                }
                            }, '查看');
                        } else {

                            return h('span', '无');

                        }

                    }
                },
                {
                    key: 'is_recommend',
                    title: '是否推荐',
                    width: 110,
                    sortable: true,
                    render: function (h, p) {
                        return h('span', p.row.is_recommend == '1' ? '是' : '否');
                    }

                },

                {
                    key: 'description',
                    title: '活动名称',
                    tooltip: true,
                    width: 200,
                    tooltip: true,
                    align: 'center',
                    ellipsis: true,
                    sortable: true
                },
                {
                    key: 'from_active_type',
                    title: '活动来源',
                    width: 110,
                    sortable: true
                },
                {
                    key: 'sku_title',
                    title: '商品标题',
                    tooltip: true,
                    tooltip: true,
                    ellipsis: true,
                    width: 200,
                    align: 'center',
                    sortable: true
                },
                {
                    key: 'price',
                    title: '预售价格',
                    width: 110,
                    sortable: true
                },

                /*{
					key: 'limit_num',
					title: '活动限量',
					sortable: true
				},*/
                {
                    key: 'sold_out',
                    width: 110,
                    title: '已售数量',
                    align: 'center',
                    sortable: true
                },

                /*{
					key: 'profit_rate',
					title: '店东分润',
					sortable: true

				},*/
                /*{
					key: 'parentcompany_profit_rate',
					title: '总公司分润'
				},
				{
					key: 'notice_time',
					title: '预告时间'
				},*/
                {
                    key: 'begin_time',
                    width: 190,
                    title: '开售时间',
                    align: 'center',
                    sortable: true
                },
                /*{
					key: 'end_time',
					title: '预售结束时间'
				},*/
                {
                    key: 'pickup_time',
                    title: '自提时间',
                    align: 'center',
                    width: 200,
                    sortable: true
                },

                /*{
					key: 'pickup_end_time',
					title: '自提结束时间',
					sortable: true
				},
				{
					key: 'active_type',
					title: '活动范围',
					sortable: true,
					render: (h, params) => {
						return h('span', {
							props: {
								type: 'text',
								size: 'small'
							},

						}, params.row.active_type == "1" ? "市公司" : '店东');
					}
				},*/

            ];
        }
    };
</script>
