<style lang="less">
	@import '../../../styles/common.less';
	@import '../article-publish.less';
</style>
<template>
	<div>
		<Row>
			<Col span="24">
			<Card>
				<Form :label-width="80" :model="admin" :rules="ruleValidate" ref="admin">
					<FormItem label="登录账户" prop="username" :error="articleError">
						<Input :autofocus=true v-model="admin.username" disabled="disabled" placeholder="请输入登录账户名" icon="android-list" style="width:600px;" />
					</FormItem>

					<FormItem label="联系人" prop="realname" :error="articleError">
						<Input v-model="admin.realname" placeholder="请填联系人" style="width: 200px" />
					</FormItem>

					<FormItem label="mobile" prop="mobile" :error="articleError">
						<Input v-model="admin.mobile" placeholder="请填mobile" style="width: 200px" />
					</FormItem>

					<FormItem label="email" prop="email" :error="articleError">
						<Input type="email" v-model="admin.email" placeholder="请填email" style="width: 200px" />
					</FormItem>

					<!--	<FormItem label="所在城市" prop="company_name">
						<iview @oncityselect="handleCitychange" level="1" :defaultCity="citys"></iview>
					</FormItem>-->

					<FormItem label="角色" prop="admin_role_id">
					  	<Select v-model="admin.admin_role_id" style="width:200px" placeholder="请选角色">
							<Option v-for="item in roles" :value="item.id" :key="item.id"> {{item.role_name}}</Option>
						</Select>

					</FormItem>

					<FormItem>
						<Button @click="handlePublish('admin')" icon="ios-checkmark" style="width:90px; " type="primary">
								    提交
						</Button>
						<Button type="primary" @click="handleReset('admin')" style="margin-left: 8px">
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
	//import Iview from "../components/area-linkage/area-linkage.vue"

	export default {
		name: 'cityuseredit',
		components: {
			//	Iview
		},
		data() {
			return {
				//citys:[],
				roles: [],
				articleError: '',
				admin: {
					username: "",
					admin_role_id:'',
					roleid: '',
					realname: '',
					mobile: '',
					email: '',
					company_name: ''
				},

				ruleValidate: {
					admin_role_id: [{
						required: true,
						message: '请选择角色',

					}],
					realname: [{
						required: true,
						message: '请输入联系人',
						trigger: 'blur'
					}],
					mobile: [{
						required: true,
						message: '请填手机号码',
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			handleCitychange(val) {
				console.log(val);
				this.admin.company_name = val;
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			},

			//表单提交
			handlePublish(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {

						//this.skuItem.pics = this.uploadList;
						this.$http.post('citycmp/editsave', {
							admin: this.admin
						}).then((res) => {
							//console.log(add);
							if(res.data.rs == "true") {
								this.$router.push('/usersmanager/cityuser');
							} else {
								this.$Message.error(res.data.msg);
							}
						}).catch((error) => {

							console.log(error);
						});

					} else {
						this.$Message.error('请填入必填数据项');
					}
				})
			}
		},
		computed: {

		},
		mounted() {
			var id = this.$route.params.id;
			this.$http.get('citycmp/edit&id=' + id).then((res) => {
				//console.log(res);
				//this.roles = res.data;
				this.admin = res.data.rs;
				this.roles = res.data.roles;
				this.admin.roleid = res.data.adminroleid;
				//console.log(this.admin.roleid);
			//	console.log(this.admin);
				// this.citys = res.data.city;
			}).catch((err) => {
				console.log(err);
			});
		}
	};
</script>
