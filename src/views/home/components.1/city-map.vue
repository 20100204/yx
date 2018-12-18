<template>
	<div id="city-map"></div>
</template>

<script>
import mapStyle from "../data/get-style-json.js";
export default {
  name: "cityMap",
  props: {
    cityName: String,
    cityPoint: Object,
    cityData: Array,
    searchCityData: Array,
    cityMapShopDate: Array,
    cityMapZoom: Boolean
  },
  data() {
    return {
      map: Object,
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
    cityMapZoom() {
      this.map.centerAndZoom(
        new BMap.Point(this.cityPoint.lng, this.cityPoint.lat),
        11
      );
    },
    cityName() {
      this.init();
    },
    searchCityData(data) {
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
        if (item.hasOwnProperty("point")) {
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
              //改变搜索到的店东的图标
              if (
                v.shopPoint.lng == item.point.lng &&
                v.shopPoint.lat == item.point.lat
              ) {
                this.map.centerAndZoom(
                  new BMap.Point(this.cityPoint.lng, this.cityPoint.lat),
                  11
                );
                item.setTop(true, 100);
                item.setIcon(myIcon); // 设置标注图标
                this.$http.get("citycmp/getshopinfo&id=" + v.id).then(res => {
                  let rs = res.data.rs;
                  let content = "";
                  if (
                    this.cityMapShopDate[0] == "" ||
                    this.cityMapShopDate[1] == ""
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
                      this.cityMapShopDate[0].toLocaleDateString() +
                      "至" +
                      this.cityMapShopDate[1].toLocaleDateString() +
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
                    item.setTop(true, 3000); //鼠标移入label置顶
                    this.addEventListener("mouseout", function() {
                      item.setTop(true, 2000);
                    });
                  });
                  label.addEventListener("click", () => {
                    if (this.cityMapShopDate[0] !== "" || this.cityMapShopDate[1] !== "") {
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
                }
              }
            });
          } else {
            this.map.centerAndZoom(
              new BMap.Point(this.cityPoint.lng, this.cityPoint.lat),
              11
            ); // 重置地图中心点和地图级别
          }
        }
      });
    }
  },
  methods: {
    init() {
      let map = new BMap.Map("city-map", {
        enableMapClick: false
      }); // 创建地图实例
      this.map = map;
      map.centerAndZoom(
        new BMap.Point(this.cityPoint.lng, this.cityPoint.lat),
        11
      ); // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(); // 开启鼠标滚轮缩放
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
      this.getBoundary(this.cityName, this.map);
      this.creatMarker(this.cityData, this.map);
    },
    getBoundary(name, map) {
      //绘制行政区域边界
      let bdary = new BMap.Boundary();
      bdary.get(name, function(rs) {
        //获取行政区域
        let count = rs.boundaries.length; //行政区域的点有多少个
        for (let i = 0; i < count; i++) {
          let ply = new BMap.Polyline(rs.boundaries[i], {
            strokeWeight: 2,
            strokeStyle: "dashed",
            strokeColor: "#ff0000"
          }); //建立多边形覆盖物
          map.addOverlay(ply); //添加覆盖物
          /*if(name !== '深圳') {
							map.setViewport(ply.getPath()); //调整视野
						}*/
        }
      });
    },
    creatMarker(data, map) {
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
      //创建店东标注
      data.map(v => {
        let point = new BMap.Point(v.shopPoint.lng, v.shopPoint.lat);
        let marker = new BMap.Marker(point); // 创建标注
        marker.setIcon(myIcon); // 设置标注图标
        map.addOverlay(marker); // 将标注添加到地图中
        let label = new BMap.Label(v.shopName, {
          offset: new BMap.Size(25, 25)
        });
        label.setStyle(this.labelStyle);
        marker.setTop(true, 100);
        marker.setLabel(label);
        marker.addEventListener("mouseover", () => {
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
            "</td></tr><tr><td>店东地址：</td><td>xx省xx市xx区</td></tr><tr><td>订单数量：</td><td>" +
            v.shopData.orderNum +
            "</td></tr><tr><td>订单金额：</td><td>" +
            v.shopData.orderMoney +
            "</td></tr><tr><td>粉丝数量：</td><td>" +
            v.shopData.starNum +
            "</td></tr><tr><td>分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;润：</td><td>" +
            v.shopData.profit +
            "</td></tr></table>";
          let infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
          let infoWindowPoint = new BMap.Point(
            v.shopPoint.lng,
            v.shopPoint.lat
          );
          this.openInfoWindow(infoWindow, infoWindowPoint);
        });
      });
    },
    seeTrends(data) {
      //查看趋势
      this.$emit("showTrends", data);
    }
  }
};
</script>

<style lang="less">
#city-map {
  width: 100%;
  height: 100%;
  border: 1px solid #bcbcbc;
  border-radius: 4px;
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
    tr {
      td {
        color: #666666;
        vertical-align: top;
      }
      td:first-of-type {
        width: 70px;
      }
    }
  }
}

#city-map::before {
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