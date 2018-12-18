<style lang="less">
	@import '../../styles/common.less';
	@import '../../styles/article-publish.less';
</style>
<template>
	<div>
		<Row>
			<Col span="24">
			<Card>
				<Form :label-width="80" :model="role" :rules="ruleValidate" ref="role">
					<FormItem label="角色名称" prop="role_name" :error="articleError">
						<Input :autofocus=true v-model="role.role_name" placeholder="请输入角色名称" icon="android-list" style="width:600px;" />
					</FormItem>
					<FormItem label="角色描述" prop="desc" :error="articleError">
						<Input type="textarea"  :rows="5" v-model="role.desc" placeholder="请填角色描述" style="width: 600px" />
					</FormItem>

					<FormItem>
						<Button
							@click="handlePublish('role')"
							icon="ios-checkmark"
							style="width:90px; "
							type="primary">
								    提交
						</Button>
						<Button type="primary"
							 @click="handleReset('role')"
							 style="margin-left: 8px">
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
	import Axios from 'axios'
	export default{
		name:'add-role-access',
		data(){
			return {
				articleError:'',
				role:{
					role_name:'',
					desc:''
				},
				ruleValidate: {
					role_name: [{
						required: true,
						message: '请输入角色名称',
						trigger: 'blur'
					}],


				}
			}
		},
		methods:{
			handlePublish(name){
					this.$refs[name].validate((valid) => {
						console.log('a');
					if(valid) {
						console.log('b');
						this.$http.post('role/add', {role:this.role}).then((res) => {
							//console.log(add);
							if(res.data.rs == "true") {
								this.$router.push({name:'role_index'});
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
			},
			handleReset(name){
					this.$refs[name].resetFields();
			}
		}
	}
</script>
