
<template>
    <div>


        <div id="shoptrend" :style="style"></div>
        <Modal v-model="city.show" :title="city.title" :closable="false" width="500">

            <Row>
                <Col span="4" offset="1">社区总数</Col> <Col span="5">{{city.datas.shopCount}}</Col>
                <Col span="4" offset="1">营业社区数</Col> <Col span="5">{{city.datas.useShop}}</Col>
            </Row>
            <Row style="margin-top:10px;">
                <Col span="4" offset="1">粉丝数量</Col> <Col span="5">{{city.datas.userCount}}</Col>
                <Col span="4" offset="1">社区分润</Col> <Col span="5">{{city.datas.profitAmount}}</Col>
            </Row>
            <Row style="margin-top:10px;">

                <Col span="4" offset="1">订单成交金额</Col> <Col span="5">{{city.datas.amount}}</Col>
            </Row>
            <div slot="footer">

            </div>
        </Modal>
        <Modal v-model="shop.show" :title="shop.datas.shop_name" :closable="false" width="500">

            <Row>
                <Col span="3">店铺名称</Col><Col span="8">{{shop.datas.shop_name}}</Col>
                <Col span="3">开店时间</Col><Col span="8">{{shop.datas.created_at}}</Col>
            </Row>
            <Row style="margin-top:10px;">
                <Col span="3">联系人</Col><Col span="8">{{shop.datas.realname}}</Col>
                <Col span="3">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话</Col><Col span="8">{{shop.datas.mobile}}</Col>
            </Row>

            <Row style="margin-top:10px;">
                <Col span="4">订单成交金额</Col><Col span="7">{{shop.datas.amount}}</Col>
                <Col span="3">分润金额</Col><Col span="8">{{shop.datas.profitAmount}}</Col>
            </Row>
            <Row style="margin-top:10px;">
                <Col span="3">店铺状态</Col><Col span="3">{{shop.datas.status=='1'?"开启":"关闭"}}</Col>
                <Col span="3" offset="2">店铺类型</Col><Col span="3">{{shop.datas.shop_type=='1'?"代理":"店铺"}}</Col>
                <Col span="3" offset="2">粉丝数量</Col><Col span="4">{{shop.datas.usercount}}</Col>

            </Row>
            <div slot="footer">

            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'shoptrend',
        data () {
            return {
                city: {
                    title:"",
                    show: false,
                    sz:{},
                    wx:{},
                    ws:{},
                    qd:{},
                    szmarker:{},
                    wsmarker:{},
                    qdmarker:{},
                    wxmarker:{},
                    sztextmarker:{},
                    wstextmarker:{},
                    qdtextmarker:{},
                    wxtextmarker:{},
                    datas:{},


                },
                shop: {
                    show: false,
                    datas:{},
                },
                map: {},
                sz: '',
                style: {
                    height: '',
                    width: '',
                }
            };
        },

        methods: {
            viewHeight () {
                return window.innerHeight || document.documentElement.clientHeight;
            },
            viewWidth () {
                return window.innerWidth || document.documentElement.clientHeight;
            },
            init(){
                this.style.height = this.viewHeight() + 'px';
                this.style.width = this.viewWidth() + 'px;';
                this.map = new qq.maps.Map(document.getElementById('shoptrend'), {
                    center: new qq.maps.LatLng(30.65984, 104.10194),      // 地图的中心地理坐标。
                    mapTypeId: qq.maps.MapTypeId.ROADMAP,
                    zoom: 4,
                    minZoom: 4,
                    maxZoom: 16,
                    scaleControl: false,// 地图的中心地理坐标。
                });
                var map = this.map;
                //深圳、乌市、青岛、无锡加标注 43.82531 87.61676

                //添加标注 qq.maps.Label文本标注
                 this.city.sz = new qq.maps.LatLng(22.61667, 114.06667);
                  this.city.szmarker = new qq.maps.Marker({
                    position: this.city.sz,
                    map: this.map,
                      zIndex:1000
                });
                this.city.ws = new qq.maps.LatLng(43.82531, 87.61676);
                this.city.wsmarker = new qq.maps.Marker({
                    position: this.city.ws,
                    map: this.map,
                    zIndex:1000
                });
                this.city.qd = new qq.maps.LatLng(36.06712, 120.382668);
                this.city.qdmarker = new qq.maps.Marker({
                    position: this.city.qd,
                    map: this.map,
                    zIndex:1000
                });
                this.city.wx = new qq.maps.LatLng(31.491301, 120.31234);
                this.city.wxmarker = new qq.maps.Marker({
                    position: this.city.wx,
                    map: this.map,
                    zIndex:1000
                });

                //添加文本标注
                this.city.sztextmarker = new qq.maps.Label({
                    position: this.city.sz,
                    map: this.map,
                    content: '深圳总部',
                    style:{background:"#e13d13",border:"none",color:"white"}
                });
                this.city.wstextmarker = new qq.maps.Label({
                    position: this.city.ws,
                    map: this.map,
                    content: '乌市',
                    style:{background:"#e13d13",border:"none",color:"white"}
                });
                this.city.qdtextmarker = new qq.maps.Label({
                    position: this.city.qd,
                    map: this.map,
                    content: '青岛',
                    style:{background:"#e13d13",border:"none",color:"white"}
                });
                this.city.wxtextmarker = new qq.maps.Label({
                    position: this.city.wx,
                    map: this.map,
                    content: '无锡',
                    style:{background:"#e13d13",border:"none",color:"white"}
                });
                var _this = this;
                //标注增加事件
                //sz
                qq.maps.event.addListener(
                    _this.city.szmarker,
                    'click',
                    function (event) {

                        _this.$http.get('report/cityinfo&city=sz').then((res)=>{
                            _this.city.show = true;
                            _this.city.title="深圳总部";
                            _this.city.datas = res.data;
                        }).catch((err)=>{

                        });


                    }
                );
                //ws
                qq.maps.event.addListener(
                    _this.city.wsmarker,
                    'click',
                    function (event) {

                        _this.$http.get('report/cityinfo&city=ws').then((res)=>{
                            _this.city.show = true;
                            _this.city.title="乌市";
                            _this.city.datas = res.data;
                        }).catch((err)=>{

                        });


                    }
                );

                //qd
                qq.maps.event.addListener(
                    _this.city.qdmarker,
                    'click',
                    function (event) {

                        _this.$http.get('report/cityinfo&city=qd').then((res)=>{
                            _this.city.show = true;
                            _this.city.title="青岛";
                            _this.city.datas = res.data;
                        }).catch((err)=>{

                        });
                    }
                );
                //wx
                qq.maps.event.addListener(
                    _this.city.wxmarker,
                    'click',
                    function (event) {

                       _this.$http.get('report/cityinfo&city=wx').then((res)=>{
                           _this.city.show = true;
                           _this.city.title="无锡";
                           _this.city.datas = res.data;
                       }).catch((err)=>{

                       });
                    }
                );
                //文本标注增加事件
                //ws
                qq.maps.event.addListener(
                    _this.city.wstextmarker,
                    'click',
                    function (event) {
                        var zoom = _this.map.getZoom();
                        if(zoom!=4){
                           // _this.map.setZoom(4);
                           // _this.map.setCenter(_this.city.ws);
                            _this.init();
                        }else{
                            _this.map.setCenter(_this.city.ws);
                            _this.map.setZoom(15);
                            _this.$http.get('report/shopbyarea&city=ws').then((res) => {
                                //console.log(res);
                                if (res.data.length > 0) {
                                    //添加标注和文字
                                    var id;
                                    var shopmark;
                                    res.data.forEach((v) => {
                                        //id = 'p' + v.id;
                                        id = new qq.maps.LatLng(v.latitude, v.longitude);
                                        new qq.maps.Marker({
                                            position: id,
                                            map: _this.map
                                        });

                                        shopmark =new qq.maps.Label({
                                            position: id,
                                            map: _this.map,
                                            content: v.shop_name,
                                            offset: new qq.maps.Size(10,-30)
                                        });
                                        qq.maps.event.addListener(
                                            shopmark,
                                            'click',
                                            function (event) {
                                                //alert(v.shop_name);
                                                _this.$http.get('report/shopinfo&id='+v.id+'&created='+v.created_at).then((res)=>{
                                                    _this.shop.show = true;
                                                    v.created_at = res.data.created;
                                                    _this.shop.datas = v;
                                                    _this.shop.datas.amount = res.data.amount;
                                                    _this.shop.datas.profitAmount = res.data.profitAmount;
                                                    _this.shop.datas.usercount = res.data.usercount;

                                                }).catch();

                                            }
                                        );

                                    });

                                }
                            }).catch((err) => {

                            });
                        }

                    }
                );


                //qd
                qq.maps.event.addListener(
                    _this.city.qdtextmarker,
                    'click',
                    function (event) {
                        var zoom = _this.map.getZoom();
                        if(zoom!=4){
                           // _this.map.setZoom(4);
                           // _this.map.setCenter(_this.city.qd);
                            _this.init();
                        }else{
                            _this.map.setCenter(_this.city.qd);
                            _this.map.setZoom(15);
                            _this.$http.get('report/shopbyarea&city=qd').then((res) => {
                                //console.log(res);
                                if (res.data.length > 0) {
                                    //添加标注和文字
                                    var id;
                                    var shopmark;
                                    res.data.forEach((v) => {
                                        //id = 'p' + v.id;
                                        id = new qq.maps.LatLng(v.latitude, v.longitude);
                                        new qq.maps.Marker({
                                            position: id,
                                            map: _this.map
                                        });

                                        shopmark =new qq.maps.Label({
                                            position: id,
                                            map: _this.map,
                                            content: v.shop_name,
                                            offset: new qq.maps.Size(10,-30)
                                        });
                                        qq.maps.event.addListener(
                                            shopmark,
                                            'click',
                                            function (event) {
                                                //alert(v.shop_name);
                                                _this.$http.get('report/shopinfo&id='+v.id+'&created='+v.created_at).then((res)=>{
                                                    _this.shop.show = true;
                                                    v.created_at = res.data.created;
                                                    _this.shop.datas = v;
                                                    _this.shop.datas.amount = res.data.amount;
                                                    _this.shop.datas.profitAmount = res.data.profitAmount;
                                                    _this.shop.datas.usercount = res.data.usercount;

                                                }).catch();

                                            }
                                        );

                                    });

                                }
                            }).catch((err) => {

                            });
                        }

                    }
                );

                //wx
                 qq.maps.event.addListener(
                    _this.city.wxtextmarker,
                    'click',
                    function (event) {
                        var zoom = _this.map.getZoom();
                        if(zoom!=4){
                            //_this.map.setZoom(4);
                            //_this.map.setCenter(_this.city.wx);
                            _this.init();
                        }else{
                            _this.map.setCenter(_this.city.wx);
                            _this.map.setZoom(15);
                            _this.$http.get('report/shopbyarea&city=wx').then((res) => {
                                //console.log(res);
                                if (res.data.length > 0) {
                                    //添加标注和文字
                                    var id;
                                    var shopmark;
                                    res.data.forEach((v) => {
                                        //id = 'p' + v.id;
                                        id = new qq.maps.LatLng(v.latitude, v.longitude);
                                        new qq.maps.Marker({
                                            position: id,
                                            map: _this.map
                                        });

                                        shopmark =new qq.maps.Label({
                                            position: id,
                                            map: _this.map,
                                            content: v.shop_name,
                                            offset: new qq.maps.Size(10,-30)
                                        });
                                        qq.maps.event.addListener(
                                            shopmark,
                                            'click',
                                            function (event) {
                                                //alert(v.shop_name);
                                                _this.$http.get('report/shopinfo&id='+v.id+'&created='+v.created_at).then((res)=>{
                                                    _this.shop.show = true;
                                                    v.created_at = res.data.created;
                                                    _this.shop.datas = v;
                                                    _this.shop.datas.amount = res.data.amount;
                                                    _this.shop.datas.profitAmount = res.data.profitAmount;
                                                    _this.shop.datas.usercount = res.data.usercount;

                                                }).catch();

                                            }
                                        );

                                    });

                                }
                            }).catch((err) => {

                            });
                        }

                    }
                );
                //sz
                 qq.maps.event.addListener(
                    _this.city.sztextmarker,
                    'click',
                    function (event) {
                        var zoom = _this.map.getZoom();
                        if(zoom!=4){

                            _this.init();
                        }else{
                            _this.map.setCenter(_this.city.qd);
                            _this.map.setZoom(6);
                           // _this.map.setZoom(15);
                            _this.$http.get('report/shopbyarea&city=sz').then((res) => {
                                //console.log(res);
                                if (res.data.length > 0) {
                                    //添加标注和文字
                                    var id;
                                    var shopmark;
                                    res.data.forEach((v) => {
                                        //id = 'p' + v.id;
                                        id = new qq.maps.LatLng(v.latitude, v.longitude);
                                        new qq.maps.Marker({
                                            position: id,
                                            map: _this.map
                                        });

                                        shopmark =new qq.maps.Label({
                                            position: id,
                                            map: _this.map,
                                            content: v.shop_name,
                                            offset: new qq.maps.Size(10,-30)
                                        });
                                        qq.maps.event.addListener(
                                            shopmark,
                                            'click',
                                            function (event) {
                                                //alert(v.shop_name);
                                                _this.$http.get('report/shopinfo&id='+v.id+'&created='+v.created_at).then((res)=>{
                                                    _this.shop.show = true;
                                                    v.created_at = res.data.created;
                                                    _this.shop.datas = v;
                                                    _this.shop.datas.amount = res.data.amount;
                                                    _this.shop.datas.profitAmount = res.data.profitAmount;
                                                    _this.shop.datas.usercount = res.data.usercount;

                                                }).catch();

                                            }
                                        );

                                    });

                                }
                            }).catch((err) => {

                            });
                        }

                    }
                );

                /* 级别改变时触发*/
                qq.maps.event.addListener(
                    this.map,
                    'zoom_changed',
                    function (event) {
                        var level = _this.map.getZoom();
                       // console.log(level);
                        if(level==4||level==5){
                            _this.init();
                        }
                    }
                );
                //鼠标右击时出示话
                qq.maps.event.addListener(
                    this.map,
                    'rightclick',
                    function (event) {
                      _this.init();
                    }
                );
            }
        },

        mounted () {
            this.init();



            //信息窗口
            // var info = new qq.maps.InfoWindow({
            //     map: this.map
            // });

            //增加折线表示趋势
            // var polyline = new qq.maps.Polyline({
            //     path: [
            //         new qq.maps.LatLng(39.910, 116.399),
            //         new qq.maps.LatLng(39.920, 116.399),
            //         new qq.maps.LatLng(39.930, 116.399)
            //     ],
            //     strokeColor: 'red',
            //     strokeWeight: 10,
            //     map
            // });
            // map.zoomBy(13);
        }
    };
</script>

<style scoped>

</style>
