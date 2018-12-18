<style lang="less">
@import "../../../styles/common.less";
@import "../../../styles/table.less";
</style>

<template>
	<div style="width:1270px;">
		<Row :gutter="10">
			<Col span="24">
			<Card>
				<Row :gutter="4">
					<Col span="16">
					<Input v-model="searchConName1" placeholder="请输入订单编号搜搜..." style="width: 200px" />  
					<Select v-model="searchConName2" placeholder="请选择审核状态搜搜..." style="width: 200px">
						<Option v-for="item in orderstatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
					<span @click="handleSearch1" style="margin: 0 10px;">
						<Button type="primary" icon="search">搜索</Button>
					</span>
					</Col>
				</Row>
			</Card>

			<Card>
				<Row class="margin-top-10 searchable-table-con1">
					<Table :columns="order.keys" :data="order.datas" :loading="order.loading" >

					</Table>
					 
					<div style="margin: 10px;overflow: hidden" v-if="order.totalPage > 1">
						<div style="float: left;">
							<Page :total="order.totalPage" :current="order.currPage" :page-size="order.pageSize" show-total @on-change="changePage"></Page>
						</div>
					</div>
				</Row>
			</Card>
			</Col>
		</Row>
 
		<!--看图   -->
		<!-- <Modal v-model="suborder.picshow" :closable="suborder.closable">

			<Row>
				<Col span="24">
				<Card>
					<div slot="header"></div>
					<img :src="suborder.picshowurl">

				</Card>

				</Col>

			</Row>
			<div slot="footer"></div>
		</Modal> -->
	</div>
</template>
<script>
export default {
  name: "exceptionorder",
  data() {
    return {
      orderstatus: [
        {
          value: "0",
          label: "未审核"
        },
        {
          value: "1",
          label: "已审核"
        }
      ],
      order: {
		enableCheck:true,
        loading: true,
        keys: [
          {
			key: "operation",
			width:80,
            title: "操作",
            width: 80,
            render: (h, params) => {
              return h(
                "a",
                {
				 attrs:{
					 disabled:params.row.status==1?true:this.order.enableCheck
				 },	
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "Title",
                        content:
                          "确认该操作么？",
                        onOk: () => {
						//   this.$Message.info("Clicked ok");
						//     alert("审核");
						   
							this.$http.post('exceptionorder/check',{id:params.row.id}).then((res)=>{
								if(res.data.rs=='true'){
									this.$Message.info("审核成功");
									params.row.status='1';
								}else{
                                    this.$Message.info("审核失败");
								}
							}).catch((err)=>{
								console.log(err)
							})
                        },
                        onCancel: () => {
                            //  this.$Message.info("Clicked cancel");
                        }
                      });
                      // this.$http.get('settlement/lookprofitdetail&id=' + params.row.id).then((res) => {
                      // 	//console.log(res);
                      // 	this.suborder.datas = res.data;
                      // 	this.suborder.show = true;
                      // 	this.suborder.loading = false;
                      // }).catch((err) => {
                      // 	console.log(err);
                      // });

                    
                    }
                  }
                },
               params.row.status==1?'已审核':'待审核'
              );
            }
          },
          {
            key: "order_id",
            sortable: true,
            width: 170,
            title: "订单编号"
          },
          {
            key: "payment_sn",
            sortable: true,
            width: 168,
            title: "支付流水号"
          },

          {
            key: "order_title",
            sortable: true,
            title: "订单标题",
            width: 240,
            ellipsis: true
          },
          {
            key: "amount",
            sortable: true,
            width: 110,
            title: "付款金额"
          },
          {
            key: "reason",
            sortable: true,
            width: 260,
            title: "异常订单原因"
          },
          
          {
            key: "username",
            sortable: true,
            width: 100,
            title: "审核人"
          },
          {
            key: "audited_at",
            sortable: true,
            title: "审核时间",
            width: 150
          },
          {
            key: "created_at",
            sortable: true,
            title: "审请时间",
            width: 150
          }
        ],
        datas: [],
        totalPage: 0,
        pageSize: 50,
        currPage: 1
      },
      searchConName1: "",
      searchConName2: ""
    };
  },

  methods: {
  

    changePage(page) {
      this.order.currPage = page;
      this.rs = {
        order_id: this.searchConName1,
        status: this.searchConName2,
        curpage: this.order.currPage
      };
      this.$http.post("exceptionorder/list", this.rs)
        .then(res => {
          this.order.loading = false;
          //console.log(res.data);
          this.order.totalPage = parseInt(res.data.totalPage);
          this.order.pageSize = parseInt(res.data.pageSize);
          this.order.currPage = parseInt(res.data.currpage);
          if (res.data.search) {
            if (res.data.search.hasOwnProperty("order_id")) {
              this.searchConName1 = res.data.search.order_id;
            }
         
            if (res.data.search.hasOwnProperty("status")) {
              this.searchConName2 = res.data.search.status;
            }
          }
          this.order.datas = res.data.rs;
        })
        .catch(err => {
          console.log(err);
        });
    },
    init() {
      this.$http.get("exceptionorder/list")
        .then(res => {
          this.order.loading = false;
          //console.log(res.data);
          this.order.totalPage = parseInt(res.data.totalPage);
          //console.log(this.totalPage);
          this.order.pageSize = parseInt(res.data.pageSize);
          this.order.currPage = parseInt(res.data.currpage);
          if (res.data.search) {
            if (res.data.search.hasOwnProperty("order_id")) {
              this.searchConName1 = res.data.search.title;
            }
         
            if (res.data.search.hasOwnProperty("status")) {
              this.searchConName2 = res.data.search.bn;
            }
		  }
		  this.order.enableCheck = Boolean(res.data.enableCheck);
          this.order.datas = res.data.rs;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSearch1() {
      this.rs = {
        order_id: this.searchConName1,
        status: this.searchConName2
      };
      this.$http.post("exceptionorder/list", this.rs)
        .then(res => {
          this.order.loading = false;
          //console.log(res.data);
          this.order.totalPage = res.data.totalPage;
          this.order.pageSize = res.data.pageSize;
          this.order.currPage = res.data.currpage;
          if (res.data.search) {
            if (res.data.search.hasOwnProperty("order_id")) {
              this.searchConName1 = res.data.search.order_id;
            }

            if (res.data.search.hasOwnProperty("status")) {
              this.searchConName2 = res.data.search.status;
            }
          }
          this.order.datas = res.data.rs;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
