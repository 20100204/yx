<style lang="less">
	@import '../../../styles/common.less';
	@import '../article-publish.less';
</style>
<template>
	<div>
		<Row>
			<Col span="24">
			<Card>
				<Form :label-width="120" :model="user" :rules="ruleValidate" ref="user">
					<!--<FormItem label="登录账户" prop="username" :error="articleError">
						<Input :autofocus=true v-model="user.username" placeholder="请输入登录账户名" icon="android-list" style="width:600px;" />
					</FormItem>-->

					<FormItem label="店铺或代理名称" prop="shop_name" :error="articleError">
						<Input type="email" v-model="user.shop_name" placeholder="请填店铺或代理名称" style="width: 260px" />
					    <span >注：店铺：金马小区-每天惠超市   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;代理:新海小区-张小霞</span>
					</FormItem>
					<FormItem label="联系人" prop="realname" :error="articleError">
						<Input v-model="user.realname" placeholder="请填联系人" style="width: 200px" />
					</FormItem>
					<FormItem label="mobile" prop="mobile" :error="articleError">
						<Input v-model="user.mobile" placeholder="请填mobile，作为登录账号用" style="width: 200px" />
					</FormItem>
					<FormItem label="登录密码" prop="password" :error="articleError">
						<Input v-model="user.password" type="password" placeholder="请输入登录密码" icon="android-list" style="width:200px;" />
					</FormItem>
					<!--<FormItem label="email" prop="email" :error="articleError">
						<Input type="email" v-model="user.email" placeholder="请填email" style="width: 200px" />
					</FormItem>-->

					<FormItem label="开始营业时间" prop="opening_time" :error="articleError">
						<Input   v-model="user.opening_time" placeholder="请填开始营业时间 如：07:30 或00:30" style="width: 200px" />
						<span  >注：代理：开始营业时间 08:00</span>
					</FormItem>
					<FormItem label="结束营业时间" prop="closing_time" :error="articleError">
						<Input   v-model="user.closing_time" placeholder="请填结束营业时间 如：23:30" style="width: 200px" />
							<span  >注：代理：结束营业时间 22:00</span>
					</FormItem>
					<FormItem label="提成分润" prop="profit_rate" :error="articleError">
						<InputNumber :max="20" number=true :min="0.1" v-model="user.profit_rate" placeholder="请填提成分润" style="width: 200px"></InputNumber>
					</FormItem>

					<FormItem label="所属分公司" prop="admin_id" v-if= "roleId!=2">
						<Select v-model="user.admin_id" style="width:200px" placeholder="请选所属分公司"  >
							<Option v-for="(item,ind) in newcitylist" :value="item.id">{{ item.company_name }}</Option>
						</Select>
					</FormItem>


					<FormItem label="所在城市" prop="city">
						<iview @oncityselect="handleCitychange" level="2" :defaultcity="user.city"></iview>
					</FormItem>
					<FormItem label="地址详情" prop="addrdetail">
						<Input v-model="user.addrdetail" placeholder="请填地址详情" style="width: 400px" />
					</FormItem>
					<FormItem label="合作类型" :error="articleError" >
						<RadioGroup v-model="user.shop_type"  >
							<Radio label="店铺"></Radio>
							<Radio label="代理"></Radio>
						</RadioGroup>
					</FormItem>
					<FormItem label="送货上门" :error="articleError" >
						<RadioGroup v-model="user.home_delivery"  >
							<Radio label="提供"></Radio>
							<Radio label="不提供"></Radio>
						</RadioGroup>
					</FormItem>
					<FormItem label="店铺或代理logo" prop="logo">
						 <pic-upload @uploadpic="handlePicup" :picurl="user.logo"></pic-upload>
					</FormItem>

					<FormItem>
						<Button @click="handlePublish('user')" icon="ios-checkmark" style="width:90px; " type="primary">
								    提交
						</Button>
						<Button type="primary" @click="handleReset('user')" style="margin-left: 8px">
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
	import Iview from "../components/area-linkage/area-linkage.vue"
	import picUpload from "../components/file-upload/file-upload.vue"

	export default {
		name:'shoperadd',
		components: {
			Iview,picUpload
		},
		computed: {
			newcitylist: function() {
				return this.cityList;
			},

		},
		data() {
			return {
				roleId:'',
				cityList: [],
				level: '2',
				articleError: '',
				user: {
                    home_delivery:"不提供",
					shop_type:'店铺',
					admin_id:'',
					username: '',
					password: '',
					realname: '',
					logo:'',
					email: '',
					profit_rate: 5,
					addrdetail: '',
					opening_time: '',
					closing_time: '',
					shop_name: '',
					city: [],
					mobile: ''
				},
				ruleValidate: {

					admin_id: [{
						required: true,
						message: '请选所属分公司',

					}],
					 password:[
						{
							required: true,
						    message: '请输入登录密码',

						},
						 {
						min: 5,
						max: 10,
						message: '密码为5-10个字符'
					}
					],

					realname: [{
						required: true,
						message: '请输入联系人',

					}],
					shop_name: [{
						required: true,
						message: '请输入社区名称',

					}],
					profit_rate: [{
						required: true,
						type: 'number',
						message: '请输入社区提成分润'

					}],
					mobile: [{
						required: true,
						pattern: /^1[3456789]\d{9}$/,
						message: '请填正确的手机号码',

					}],
					opening_time: [{
						required: true,

						pattern: /^([01]\d{1}\:[012345]\d{1})$|^([2][0123]\:[012345]\d{1})$/,
						message: '请填开始营业时间 如：07:30',
					}],
					closing_time: [{
						required: true,
						pattern: /^([01]\d{1}\:[012345]\d{1})$|^([2][0123]\:[012345]\d{1})$/,
						message: '请填结束营业时间 如：23:30',
					}],
					addrdetail: [{
						required: true,
						message: '请填地址详情',
						trigger: 'blur'
					}],
					city: [{
						required: true,
						message: '请选择所在的城市'
					}],
				}
			}
		},

		methods: {
			//图片上传
			handlePicup(picurl){
				console.log(picurl);
				this.user.logo=picurl;
			},
			handleCitychange(val) {
				this.user.city = val;
				console.log(val);
			},
			handlePublish(name) {
				//console.log('aa');
				//console.log(this.user.city);
				if(this.user.city.length < 3) {
					console.log('c');
					this.$Message.info({
						content: "请选择社区所在的城市"
					});
					return;
				}

				this.$refs[name].validate((valid) => {
					//console.log(valid);
					if(!this.user.logo){
						this.$Message.error("请上传社区logo");
						return;
					}

					if(valid) {
						this.$http.post('shoper/add', {
							user: this.user
						}).then((res) => {

							if(res.data.rs == "true") {
								this.$router.push({
									name: 'shopuser'
								});
							} else {
								this.$Message.error(res.data.msg);
							}
						}).catch((error) => {

							console.log(error);
						});

					} else {
						console.log(this.user);
						this.$Message.error('请填入必填数据项');
					}
				})

			},
			handleReset(name) {}
		},
		mounted() {
			this.$http.get('shoper/add').then((res) => {

				this.cityList = res.data.cityList;
				this.user.city = res.data.companyName;
				this.user.admin_id = res.data.admin_id;
				this.roleId = res.data.roleId;

			}).catch((err) => {
				console.log(err);
			});
		}
	}
</script>
