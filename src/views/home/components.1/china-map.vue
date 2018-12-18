<template>
	<div id="china-map"></div>
</template>

<script>
import mapStyle from "../data/get-style-json.js";
export default {
  name: "chinaMap",
  props: {
    chinaData: Array,
    searchChinaData: Array,
    chinaMapShopDate: Array,
    overDataIndex: Number,
    clickDataIndex: Number,
    chinaMapZoom: Boolean
  },
  data() {
    return {
      map: Object,
      point: new BMap.Point(104.5, 37.9),
      labelStyle: {
        display: "none",
        lineHeight: 1.2,
        borderColor: "#767676",
        borderRadius: "3px",
        padding: "5px 10px"
      }
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    chinaData(val) {
      this.addShopMarker(val, this.map);
    },
    chinaMapZoom() {
      this.map.centerAndZoom(this.point, 5);
    },
    searchChinaData(data) {
      //更改搜索到的店东对应的标注图标和文本标注
      let myIcon = new BMap.Icon(
        "http://7xic1p.com1.z0.glb.clouddn.com/markers.png",
        new BMap.Size(23, 25),
        {
          // 指定定位位置
          anchor: new BMap.Size(10, 25),
          // 当需要从一幅较大的图片中截取某部分作为标注图标时，需要指定大图的偏移位置
          imageOffset: new BMap.Size(0, -250) // 设置图片偏移
        }
      );
      this.map.getOverlays().map(item => {
        item.setIcon(
          new BMap.Icon(
            "http://7xic1p.com1.z0.glb.clouddn.com/markers.png",
            new BMap.Size(23, 25),
            {
              anchor: new BMap.Size(10, 25),
              imageOffset: new BMap.Size(0, -275)
            }
          )
		);
        item.getLabel().setStyle({
          display: "none"
        });
        if (data.length > 0) {
          data.map(v => {
            //改变搜索到的店东的标注图标
            if (
              v.shopPoint.lng == item.point.lng &&
              v.shopPoint.lat == item.point.lat
            ) {
              item.setTop(true, 100);
              item.setIcon(myIcon); // 设置标注图标
              this.$http.get("citycmp/getshopinfo&id=" + v.id).then(res => {
                let rs = res.data.rs;
                let content = "";
                if (
                  this.chinaMapShopDate[0] == "" ||
                  this.chinaMapShopDate[1] == ""
                ) {
                  //没有日期段label中不显示日期段
                  content =
                    '<table><h5 style="padding:5px 0px;margin-bottom:5px;border-bottom:1px solid #333;">' +
                    v.shopName +
                    "</h5><tr><td>店主姓名：</td><td>" +
                    v.shopMaster +
                    "</td></tr><tr><td>联系方式：</td><td>" +
                    v.shopTel +
                    "</td></tr><tr><td>店东地址：</td><td>xx省xx市xx区</td></tr><tr><td>订单数量：</td><td>" +
                    rs.orderNum +
                    "</td></tr><tr><td>订单金额：</td><td>" +
                    rs.orderMoney +
                    "</td></tr><tr><td>粉丝数量：</td><td>" +
                    rs.starNum +
                    "</td></tr><tr><td>分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;润：</td><td>" +
                    rs.profit +
                    "</td></tr></table>";
                } else {
                  //有日期段label中显示日期段
                  content =
                    '<table><h5 style="padding:5px 0px;margin-bottom:5px;border-bottom:1px solid #333;">' +
                    v.shopName +
                    '</h5><p style="margin:5px 0px 3px;">' +
                    this.chinaMapShopDate[0].toLocaleDateString() +
                    "至" +
                    this.chinaMapShopDate[1].toLocaleDateString() +
                    "</p><tr><td>店主姓名：</td><td>" +
                    v.shopMaster +
                    "</td></tr><tr><td>联系方式：</td><td>" +
                    v.shopTel +
                    "</td></tr><tr><td>店东地址：</td><td>xx省xx市xx区</td></tr><tr><td>订单数量：</td><td>" +
                    rs.orderNum +
                    "</td></tr><tr><td>订单金额：</td><td>" +
                    rs.orderMoney +
                    "</td></tr><tr><td>粉丝数量：</td><td>" +
                    rs.starNum +
                    "</td></tr><tr><td>分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;润：</td><td>" +
                    rs.profit +
                    '</td></tr></table><p style="color:#2D8CF0;margin:5px 0px 3px;cursor:pointer;">点击查看趋势</p>';
                }

                //创建label
                let label = new BMap.Label(content, {
                  offset: new BMap.Size(25, 0)
                });
                label.setStyle(this.labelStyle);
                label.setStyle({
                  display: "block"
                });
                item.setTop(true, 2000);
                label.addEventListener("mouseover", function() {
                  item.setTop(true, 3000); // 鼠标移入label置顶
                  this.addEventListener("mouseout", function() {
                    item.setTop(true, 2000); // 鼠标移出取消label置顶
                  });
                });
                label.addEventListener("click", () => {
                  this.map.centerAndZoom(
                    new BMap.Point(v.shopPoint.lng, v.shopPoint.lat),
                    12
                  );
                  if (
                    this.chinaMapShopDate[0] !== "" ||
                    this.chinaMapShopDate[1] !== ""
                  ) {
                    //点击label查看数据趋势
                    this.seeTrends(v);
                  }
                });
                label.addEventListener("rightclick", function() {
                  this.setStyle({
                    display: "none"
                  }); //鼠标鼠标右击隐藏label
                });
                item.setLabel(label);
              });
              if (data.length == 1) {
                this.map.centerAndZoom(
                  new BMap.Point(v.shopPoint.lng, v.shopPoint.lat),
                  12
                );
              } else {
                this.map.centerAndZoom(this.point, 5);
              }
            }
          });
        } else {
          this.map.centerAndZoom(this.point, 5); // 重置地图中心点和地图级别
        }
      });
    },
    overDataIndex(index) {
      if (index !== -1) {
        this.map.getOverlays().map(item => {
          this.searchChinaData.map(v => {
            if (
              v.shopPoint.lng == item.getLabel().point.lng &&
              v.shopPoint.lat == item.getLabel().point.lat
            ) {
              item.getLabel().setStyle(this.labelStyle);
              item.getLabel().setStyle({
                display: "block"
              });
              item.setTop(true, 2000);
            }
          });
          if (
            this.searchChinaData[index].shopPoint.lng ==
              item.getLabel().point.lng &&
            this.searchChinaData[index].shopPoint.lat ==
              item.getLabel().point.lat
          ) {
            item.getLabel().setStyle({
              borderColor: "red"
            });
            item.setTop(true, 3000);
          }
        });
      }
    },
    clickDataIndex(index) {
      if (index !== -1) {
        let point = new BMap.Point(
          this.searchChinaData[index].shopPoint.lng,
          this.searchChinaData[index].shopPoint.lat
        );
        this.map.centerAndZoom(point, 12); // 点击搜索结果中的店东自动定位到店东所在位置
      }
    }
  },
  methods: {
    init() {
      let map = new BMap.Map("china-map", {
        enableMapClick: false
      }); // 创建地图实例
      this.map = map;
      map.centerAndZoom(this.point, 5); // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
      map.enableContinuousZoom(); // 开启连续缩放效果
      map.enableInertialDragging(); // 开启惯性拖拽效果
      map.addControl(
        new BMap.NavigationControl({
          type: BMAP_NAVIGATION_CONTROL_ZOOM
        })
      );
      map.addControl(new BMap.ScaleControl());
      map.setMapStyle({
        styleJson: mapStyle
      });
    },
    seeTrends(data) {
      //查看趋势
      this.$emit("showTrends", data);
    },
    addShopMarker(data, map) {
      //添加店东标注点
      let myIcon = new BMap.Icon(
        "http://7xic1p.com1.z0.glb.clouddn.com/markers.png",
        new BMap.Size(23, 25),
        {
          // 指定定位位置
          anchor: new BMap.Size(10, 25),
          // 当需要从一幅较大的图片中截取某部分作为标注图标时，需要指定大图的偏移位置
          imageOffset: new BMap.Size(0, -275) // 设置图片偏移
        }
      );
      // 创建店东标注

      data.map(v => {
        var _this = this;
        let point = new BMap.Point(v.shopPoint.lng, v.shopPoint.lat);
        let marker = new BMap.Marker(point);
        marker.setIcon(myIcon); // 设置标注图标
        map.addOverlay(marker); // 将标注添加到地图中
        let label = new BMap.Label(v.shopName, {
          offset: new BMap.Size(25, 25)
        });
        label.setStyle(this.labelStyle);
        marker.setTop(true, 100);
        marker.setLabel(label);
        marker.addEventListener("mouseover", () => {
          // 给标注添加文本标签
          label.setStyle({
            display: "block"
          });
          marker.addEventListener("mouseout", () => {
            label.setStyle({
              display: "none"
            });
            marker.setTop(false);
          });
        });
        //点击店东标注显示对应的信息窗口
        marker.addEventListener("click", function() {
          _this.$http
            .get("citycmp/getshopinfo&id=" + v.id)
            .then(res => {
              let rs = res.data.rs;
              let opts = {
                title: v.shopName,
                width: 200,
                height: 0
              };
              let content =
                "<table><tr><td>店主姓名：</td><td>" +
                v.shopMaster +
                "</td></tr><tr><td>联系方式：</td><td>" +
                v.shopTel +
                "</td></tr><tr><td>店东地址：</td><td>" +
                v.shopAddress +
                "</td></tr><tr><td>订单数量：</td><td>" +
                rs.orderNum +
                "</td></tr><tr><td>订单金额：</td><td>" +
                rs.orderMoney +
                "</td></tr><tr><td>粉丝数量：</td><td>" +
                rs.starNum +
                "</td></tr><tr><td>分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;润：</td><td>" +
                rs.profit +
                "</td></tr></table>";
              let infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
              let infoWindowPoint = new BMap.Point(
                v.shopPoint.lng,
                v.shopPoint.lat
              );
              this.openInfoWindow(infoWindow, infoWindowPoint);
            })
            .catch(err => {});
        });
      });
    }
  }
};
</script>

<style lang="less">
#china-map {
  width: 100%;
  height: 100%;
  position: relative;
  .anchorBL {
    /*display: none;*/
    margin-bottom: -20px;
  }
  .BMap_cpyCtrl {
    display: none;
  }
  .BMap_scaleCtrl {
    margin-bottom: -15px;
  }
  .BMap_bubble_title {
    font-weight: bold;
    border-bottom: 1px solid #e9eaec;
  }
  .BMap_bubble_content {
    height: 125px;
    padding: 8px 0px;
    td {
      color: #666666;
      vertical-align: top;
    }
    td:first-of-type {
      width: 70px;
    }
  }
}

#china-map::before {
  content: "店东分布";
  background: white;
  border-top: 1px solid #bcbcbc;
  border-left: 1px solid #bcbcbc;
  border-top-left-radius: 5px;
  padding: 5px 15px;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 10;
}
</style>