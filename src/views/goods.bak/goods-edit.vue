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
						<Input :autofocus=true   v-model="skuItem.title" placeholder="请输入商品标题" icon="android-list" style="width:600px;" />
					</FormItem>
					<!--<FormItem label="箱包装数量" prop="packing_qty" :error="articleError">
						<Input v-model="skuItem.packing_qty" placeholder="请填箱包装数量" style="width: 200px" />
					</FormItem>
					<FormItem label="箱包装单位" prop="packing_unit" :error="articleError">
						<Input v-model="skuItem.packing_unit" placeholder="请填箱包装单位" style="width: 200px" />
					</FormItem>-->
				 <FormItem label="规格" prop="sku_specs" :error="articleError">
						<Input v-model="skuItem.sku_specs" placeholder="请填规格" style="width: 200px" />
					</FormItem>
					<!--<FormItem label="barcode" prop="barcode" :error="articleError">
						<Input v-model="skuItem.barcode" placeholder="请填barcode" style="width: 200px" />
					</FormItem>
					<FormItem label="MOQ" prop="moq" :error="articleError">
						<Input v-model="skuItem.moq" placeholder="请填最小起订量" style="width: 200px" />
					</FormItem>-->
					<FormItem label="价格" prop="price" :error="articleError">
						<InputNumber v-model="skuItem.price" placeholder="请填售价" :max="10000" :min="0.1" :step="0.1"></InputNumber>
					</FormItem>
					<!--<FormItem label="是否散卖" prop="is_whole" :error="articleError">
						<RadioGroup v-model="skuItem.is_whole">
							<Radio label="是"></Radio>
							<Radio label="否"></Radio>
						</RadioGroup>
					</FormItem>-->
					<FormItem label="图片上传" :error="articleError" prop="pics">
						<pic-upload @uploadpic="uploadpic" :defaultlist="upics" ></pic-upload>
					</FormItem>
					<FormItem label="产品详情" prop="detail">
						<txt-editor @ontextarea="handletextarea"  :content="skuItem.detail" name="detail"></txt-editor>
					</FormItem>
					<FormItem>
						<Button @click="handlePublish('skuItem')" icon="ios-checkmark" style="width:90px; " type="primary">
								    提交
							</Button>
						<Button type="ghost" @click="handleReset('skuItem')" style="margin-left: 8px">
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
	import txtEditor from './components/text-editor/text-editor.vue'
	import picUpload from './components/file-upload/file-upload.vue'
	import Axios from 'axios'
	export default {
		name: 'goods-edit',
		components: {
			txtEditor,
			picUpload
		},
		data() {
			return {

				upics:[],
				articleError: '',
				skuItem: {
					id:0,
					detail: "",
					title: '',
					packing_qty: '1',
					packing_unit: '个',
					sku_specs:'',
					barcode: '',
					moq: 1,
					price: 0,
					is_whole: '是',
					pics: []
				},

				ruleValidate: {
					title: [{
						required: true,
						message: '请输入商品标题',

					}],
					/*barcode: [{
						required: true,
						message: '请输入barcode',

					}],
					packing_qty: [{
						required: true,
						message: '请填箱包装数量',

					}],
					packing_unit: [{
						required: true,
						message: '请填箱包装单位',

					}],

					moq: [{
						required: true,
						message: '请输入最小起订量',

					}],*/
					sku_specs: [{
						required: true,
						message: '请填规格'

					}],
					price: [{
						required: true,
						type: 'number',
						message: '请输入价格',

					}],

				}
			};
		},
		beforeCreate() {
			//console.log(this.$route);
			var id =  this.$route.params.id;
			this.$http.get('item/edit&id='+id).then((res) => {
				console.log(res);
				this.skuItem = res.data;
				this.skuItem.price = parseFloat(res.data.price);
				for(var k in this.skuItem.pics) {
					var r = this.skuItem.pics[k];
					this.upics.push(r);
				}
				// this.upics=res.data.pics;

				if(res.data.rs == "true") {
					//this.$router.push('/goods/goodslist');
				} else {
					this.$Message.error(res.data.msg);
				}

			}).catch((err) => {
				console.log(err);
			})
		},

		methods: {

			handleReset(name) {
				this.$refs[name].resetFields();
			},
			handletextarea(textarea) {

				this.skuItem.detail = textarea;

			},
			uploadpic(e) {
				this.skuItem.pics = e;
				console.log(e);
			},
			handlePublish(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {

						this.$http.post('item/editsave', {sku:this.skuItem}).then((res) => {

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

		}
	};
</script>
