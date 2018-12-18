<style lang="less">
	@import '../../../styles/common.less';
	@import '../../../styles/article-publish.less';
</style>
<template>
	<div>
		<Row>
			<Col span="24">
			<Card>
				<Form :label-width="80" :model="ad" :rules="ruleValidate" ref="ad">
					<FormItem label="广告标题" prop="title" :error="articleError">
						<Input :autofocus=true   v-model="ad.title" placeholder="请输入广告标题" icon="android-list" style="width:600px;" />
					</FormItem>
				   	<FormItem label="广告位置" prop="pos_id">
						<Select v-model="ad.pos_id" style="width:200px" placeholder="请选广告位置" >
							<Option v-for="(item,ind) in pos" :value="item.id">{{ item.title }}</Option>
						</Select>
					</FormItem>
					<FormItem label="广告类型" prop="type">
						<Select v-model="ad.type" style="width:200px" placeholder="请选择广告类型" >
							<Option v-for="(item,ind) in types" :value="item.id">{{ item.title }}</Option>
						</Select>
					</FormItem>
					<FormItem label="链接id" prop="value" v-if="ad.type != 'pic' ">
						<InputNumber    v-model="ad.value" placeholder="请输入广告链接id" icon="android-list" style="width:200px;" ></InputNumber >
						<span style="margin-left:20px;color:darkred">注：<span style="margin-left:20px;">广告类型是活动请填活动id,是分类请填二级分类id，纯图片不用填</span></span>

					</FormItem>

					<FormItem label="市公司" prop="area" v-if="!isCity" >
						<Select v-model="ad.area" style="width:200px" placeholder="请选市公司" :multiple="true" >
							<Option v-for="(item,ind) in citys" :value="item.area">{{ item.city }}</Option>
						</Select>
					</FormItem>

				    <FormItem label="广告图片" prop="content">
						 <pic-upload @uploadpic="handlePicup" :picurl="ad.content"></pic-upload>
					</FormItem>
					<FormItem label="广告排序" prop="rank" :error="articleError">
						<InputNumber      v-model="ad.rank" placeholder="请输入广告排序" icon="android-list" style="width:100px;" :min="0" />
						<span style="margin-left:20px;color:darkred">注：<span style="margin-left:20px;">数字越大越靠前</span></span>
					</FormItem>
					<FormItem>
						<Button @click="handlePublish('ad')" icon="ios-checkmark" style="width:90px; " type="primary">
								    提交
							</Button>
						<Button type="primary" @click="handleReset('ad')" style="margin-left: 8px">
							 	 重置
							 </Button>
					</FormItem>
				</Form>
			</Card>
			</Col>
		</Row>
	</div>
</template>
<script>
	import picUpload from '../components/file-upload/file-upload.vue'

	export default {
		name: 'goods-edit',
		components: {
			picUpload
		},
		data() {
			return {
			    pos:[],
				types:[],
				isCity:false,
				citys:[],
				upics:[],
				articleError: '',
				ad: {
					rank:0,
					title: '',
					pos_id: '',
					content:'',
					area:[],
					type:"",
					value:0,
				},

				ruleValidate: {
                    // url:[{
			         //    required:false,
					// 	message:"请输入广告链接地址"
					// },{
			         //    type:'url',
					// 	message:"请输入正确的链接地址",
					// }],
					title: [{
						required: true,
						message: '请输入广告标题',

					}],
					pos_id: [{
						required: true,
						message: '请选择广告位置',

					}],
                    type: [{
                        required: true,
                        message: '请选择广告类型',

                    }],
					content: [{
						required: true,
						message: '请上传广告图片',

					}]
				}
			};
		},

		beforeCreate() {
			this.$http.get('advertise/add').then((res) => {
				this.pos = res.data.location;
				this.types = res.data.types;
				this.isCity = Boolean(res.data.isCity);
				if(this.isCity){
				    this.ad.area=res.data.city[0];
				}else{
				    this.citys = res.data.city;
				}
			}).catch((err) => {
				console.log(err);
			})
		},

		methods: {
			handleReset(name) {
				this.$refs[name].resetFields();
			},

			handlePicup(e) {
				this.ad.content = e;
				console.log(e);
			},
			handlePublish(name) {


				this.$refs[name].validate((valid) => {
					if(valid) {
                        if(!this.ad.content){
                            this.$Notice.error({
                                title:'请上传广告图片',
                                desc:'请上传广告图片',
                            });
                            return;
                        }
                        if(!this.ad.pos_id){
                            this.$Notice.error({
                                title:'请选择广告位置',
                                desc:'请选择广告位置',
                            });
                            return;
                        }
                        if(this.ad.type!='pic'){
                           // console.log(this.ad);
                            if(this.ad.value<1){
                                this.$Notice.error({
                                    title:'请输入广告链接id',
                                    desc:'请输入广告链接id',
                                });
                                return;
                            }

                        }
						this.$http.post('advertise/add', {ad:this.ad}).then((res) => {
							if(res.data.rs == "true") {
								 this.$router.push('/advertisemanager/advertise');
							} else {
								this.$Message.error(res.data.msg);
							}
						}).catch((error) => {

							console.log(error);
						});

					} else {
					   // console.log(this.$refs[name].validate);
						this.$Message.error('请填入必填数据项');
					}
				})
			}
		},
		computed: {

		}
	};
</script>
