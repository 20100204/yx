<style lang="less">
	@import '../../../../styles/common.less';
	@import 'upload.less';
</style>
<template>
	<div style="height:80px;">
		<Col span="10">

		<Card>
			<div class="height-492px" style="height:100px; " v-if="">
				<Col span="5">
				<Card>
					<Upload ref="upload" name='upload' :show-upload-list="false" :default-file-list="defaultlist" :on-success="handleSuccess" :on-error="handleError" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" type="drag" :action="url" style="display:
						   inline-block;width:58px;">
						<div style="width: 58px;height:58px;line-height: 58px;">
							<Icon type="ios-camera" size="20"></Icon>
						</div>
					</Upload>
					<Modal title="查看图片" v-model="visible">
						<img :src="src" v-if="visible" style="width: 100%">
					</Modal>
				</Card>
				</Col>
				<Col span="18" class="padding-left-20" v-if="uploadpics.url">
				<Card>
					<div class="height-460px" style="height:80px;">
						<div class="admin-upload-list">
							<template>
								<img :src="uploadpics.url">
								<div class="admin-upload-list-cover">
									<Icon type="ios-eye-outline" @click.native="handleView(uploadpics.name,uploadpics.url)"></Icon>
									<Icon type="ios-trash-outline" @click.native="handleRemove(uploadpics)"></Icon>
								</div>
							</template>
						</div>
					</div>
				</Card>
				</Col>
			</div>
		</Card>

		</Col>

	</div>
</template>

<script>
	export default {
		name: 'file-upload-shopuseradd',
		props: {
			'defaultlist': {
				type: Array
			},
			'picurl': {
				type: String
			}
		},
		data() {
			return {
				url: this.$store.state.ycypurl + "?r=item/uppic",
				src: '',
				imgName: '',
				visible: false,
				uploadpics: {
					url: '',
					name: ''
				}

			};
		},
		watch: {
			defaultlist: function(val) {

				for(var k in this.defaultlist) {
					var r = this.defaultlist[k];
					this.uploadpics.push(r);
				}
			},

			picurl: function(val) {
				this.uploadpics.url = val;
			}

		},
		methods: {
			handleFormatError(file) {
				this.$Notice.warning({
					title: '文件格式不正确',
					desc: '文件 ' + file.name + ' 格式不正确，请选择图片文件。'
				});
			},

			//这里限制传的张数
			handleBeforeUpload(file) {
				/*const check = this.uploadpics.length ==1 ;
				if(!check) {
					this.$Notice.warning({
						title: '最多只能上传 1 张图片。'
					});
				}
				return check;*/

			},

			handleSuccess(evnet, file, rs) {
				var ob = file;
				ob.url = this.$store.state.ycypbaseurl + file.response;
				this.uploadpics.url = ob.url;
				this.$Notice.success({
					title: '文件上传成功',
					desc: '文件 ' + file.name + ' 上传成功。',
					duration: 2
				});
				this.$emit('uploadpic', file.response);

			},
			handleError(event, file) {
				this.$Notice.error({
					title: '文件上传成功',
					// desc: '文件 ' + file.name + ' 上传失败。'
				});
			},
			handleView(name, url) {
				this.imgName = name;
				this.visible = true;
				this.src = url;
			},
			handleRemove(file) {
				this.uploadpics = {name:'',url:''};
				this.$emit('uploadpic', "");

			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: '超出文件大小限制',
					desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
				});
			},

		},
		computed: {

		},
		created() {}
	};
</script>
