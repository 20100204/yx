<style lang="less">
	@import './login.less';
</style>

<template>
	<div class="login" @keydown.enter="handleSubmit">
		<div class="login-con">
			<Card :bordered="false">
				<p slot="title">
					<Icon type="ios-log-in"></Icon>
					欢迎登录
				</p>
				<div class="form-con">
					<Form ref="loginForm" :model="form" :rules="rules">
						<FormItem prop="userName">
							<Input v-model="form.userName" placeholder="请输入用户名">
							<span slot="prepend">
                                    <Icon :size="16" type="md-person"></Icon>
                                </span>
							</Input>
						</FormItem>
						<FormItem prop="password">
							<Input type="password" v-model="form.password" placeholder="请输入密码">
							<span slot="prepend">
                                    <Icon :size="14" type="md-lock"></Icon>
                                </span>
							</Input>
						</FormItem>
						<FormItem>
							<Button @click="handleSubmit" type="primary" long>登录</Button>
						</FormItem>
					</Form>

				</div>
			</Card>
		</div>
	</div>
</template>

<script>
	import Cookies from 'js-cookie';
	import Axios from 'axios';
	export default {
		data() {
			return {
				form: {
					userName: '',
					password: ''
				},
				rules: {
					userName: [{
						required: true,
						message: '账号不能为空',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '密码不能为空',
						trigger: 'blur'
					}]
				}
			};
		},
		mounted(){
			this.form.userName="";
			this.form.password="";
		},
		methods: {
			handleSubmit() {
				this.$refs.loginForm.validate((valid) => {
					if(valid) {
						/*  Cookies.set('user', 'admin');
							this.$router.push({name: 'activity_index'});
					   return    */
						Cookies.remove('user');
						Cookies.remove('password');
						Cookies.remove('access');
						Cookies.remove('auth');
						localStorage.clear();
						this.$http.post('login/log', this.form).then((res) => {
							console.log(res);
							//console.log(res.data.rs);
							/*	console.log(res);
								if(res.data.url){
										this.$router.push({name: 'login'});
								}*/
							if(res.data.rs == 'true') {
								Cookies.set('user', this.form.userName);
								Cookies.set('auth', res.data.auth);
								this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
								//this.$store.commit('setAccess',res.data.auth);home_index
								//this.$router.push({name: res.data.url});
								this.$router.push({
									name: 'home_index'
								});
							} else {
								this.$Notice.error({
									title: res.data.msg,
									desc: res.data.msg
								});
							}
						}).catch((err) => {
							console.log(err);
						});
						return;
					}
				});
			}
		}
	};
</script>

<style>

</style>
