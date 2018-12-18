<style lang="less">
	@import '../../styles/common.less';
	@import './article-publish.less';
</style>
<template>
	<div>
		<Row>
			<Col span="24">
			<Card>
				<Form :label-width="80" :model="skuItem" :rules="ruleValidate" ref="skuItem">
					<FormItem label="商品标题" prop="title" :error="articleError">
						<Input :autofocus=true v-model="skuItem.title" placeholder="请输入商品标题" icon="android-list" style="width:600px;" />
					</FormItem>
					<FormItem label="商品分类" prop="cat_id" :error="articleError">
						<Cascader :data="category" v-model="skuItem.cat_id" style="width:300px;"></Cascader>
					</FormItem>
					<!--<FormItem label="箱包装数量" prop="packing_qty" :error="articleError">
						<Input v-model="skuItem.packing_qty" placeholder="请填箱包装数量" style="width: 200px" />
					</FormItem>
					<FormItem label="最小销售包装单位" prop="packing_unit" :error="articleError">
						<Input v-model="skuItem.packing_unit" placeholder="请填最小销售包装单位" style="width: 200px" />
					</FormItem>-->
					<FormItem label="规格" prop="specs" :error="articleError">
						<Input v-model="skuItem.specs" placeholder="请填规格" style="width: 200px" />
					</FormItem>
					<FormItem label="产地" prop="producing_area" :error="articleError">
						<Input v-model="skuItem.producing_area" placeholder="请填产地" style="width: 200px" />
					</FormItem>
					<!--<FormItem label="barcode" prop="barcode" :error="articleError">
						<Input v-model="skuItem.barcode" placeholder="请填barcode" style="width: 200px" />
					</FormItem>-->
					<!--<FormItem label="MOQ" prop="moq" :error="articleError">
						<Input v-model="skuItem.moq" placeholder="请填最小起订量" style="width: 200px" />
					</FormItem>-->
					<FormItem label="价格" prop="price" :error="articleError">
						<InputNumber v-model="skuItem.price" placeholder="请填售价" :max="10000" :min="0.01" :step="0.01"></InputNumber>
					</FormItem>
					<!--	<FormItem label="是否散卖" prop="is_whole" :error="articleError">
						<RadioGroup v-model="skuItem.is_whole">
							<Radio label="是"></Radio>
							<Radio label="否"></Radio>
						</RadioGroup>
					</FormItem>-->
					<FormItem label="图片上传" :error="articleError" prop="pics">
						<pic-upload @uploadpic="uploadpic"></pic-upload>
					</FormItem>

					<FormItem label="产品详情" prop="detail">
						<vue-ueditor @ready="editorReady"></vue-ueditor>
					</FormItem>
					<FormItem>
						<Button @click="handlePublish('skuItem')" icon="ios-checkmark" style="width:90px; " type="primary">
								    提交
						</Button>
						<Button type="primary" @click="handleReset('skuItem')" style="margin-left: 8px">
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
	import picUpload from './components/file-upload/file-upload.vue'

	import vueUeditor from '../components/UEditor.vue';
	export default {
		name: 'goods-edit',
		components: {
			picUpload,
			vueUeditor
		},
		data() {
			return {
			    category:[],
                editinstance:{},
				articleError: '',
				skuItem: {
					detail: "",
					title: '',
					packing_qty: '1',
					cat_id:[],
					packing_unit: '个',
					specs: '',
					barcode: '',
					moq: 1,
					price: 0,
					quantity: 0,
					is_whole: '是',
					pics: [],
				},

				ruleValidate: {
					title: [{
						required: true,
						message: '请输入商品标题'

					}],
					/*barcode: [{
						required: true,
						message: '请输入barcode'

					}],
					packing_qty: [{
						required: true,
						message: '请填箱包装数量'

					}],
					packing_unit: [{
						required: true,
						message: '请填箱包装单位'

					}],*/
					specs: [{
						required: true,
						message: '请填规格'

					}],
					producing_area: [{
						required: true,
						message: '请填产地'

					}],
					/*moq: [{
						required: true,
						message: '请输入最小起订量'

					}],*/
					price: [{
						required: true,
						type: 'number',
						message: '请输入预售价格'

					}]

				}
			};
		},
		methods: {
			//编辑器
			editorReady(editorInstance) {
				this.editinstance = editorInstance;
				//editorInstance.setContent('Hello world!<br>你可以在这里初始化编辑器的初始内容。');
				editorInstance.addListener('contentChange', () => {
					console.log('编辑器内容发生了变化：', editorInstance.getContent());
				});
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			},
			handletextarea(textarea) {
				this.skuItem.detail = textarea;
			},
			uploadpic(e) {
				this.skuItem.pics = e;
				console.log(e);
				//this.uploadList = e;
			},
			//表单提交
			handlePublish(name) {
				//this.skuItem.moq=parseInt(this.skuItem.moq);
			 	 this.skuItem.detail = this.editinstance.getContent();
				this.$refs[name].validate((valid) => {
				     if(this.skuItem.cat_id.length<3){
                         this.$Message.error("请选择三级分类");
                         return;
					}

					if(this.skuItem.price <= 0) {
						this.$Message.error("请填入正确的价格");
						return;
					}
					/*if(this.skuItem.moq<=0){
							this.$Message.error("请填入合适的最小起订量");return;
					}*/
					if(this.skuItem.pics.length < 1) {
						this.$Message.error("请上传商品图片");
						return;
					}
					if(valid) {
						//this.skuItem.pics = this.uploadList;
						this.$http.post('item/add', {
							'skuItem': this.skuItem
						}).then((res) => {
							if(res.data.rs == "true") {
								this.$router.push('/goods/goodslist');
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
			//console.log(this.$store.state.ycypurl);
			this.$http.get('item/getcategorys').then((res)=>{
				this.category = res.data;

			}).catch((err)=>{});
		}
	};
</script>
