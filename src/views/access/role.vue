<style lang="less">
	@import '../../styles/common.less';
	@import '../../styles/table.less';
</style>
<template>
	<div>
		<Row :gutter="10">
			<Col span="24">
			<!--<Card :padding="4">
				<Row>
					<Col span="4">
					<span @click="handleAdd" style=" margin-left:20px;">
							 <Button type="info" size="small" icon="android-add">添加</Button>
						</span>
					</Col>

				</Row>
			</Card>-->
			<Card>
				<Row class="margin-top-10 searchable-table-con1">
					<Col span="24">
					<Table :columns="rolecols" :data="roledata" :loading="loadStatus">
					</Table>
					</Col>

				</Row>
			</Card>
			</Col>
		</Row>

		<Modal v-model="subrole.show" title="子角色" width="820" :closable="subrole.closable">
			<Card>
				<Table :columns="subrole.cols" :data="subrole.datas" :loading="subrole.load">
				</Table>

			</Card>

			<div slot="footer">

			</div>
		</Modal>

		<!--权限管理-->
		<Modal v-model="access.show" title="权限管理" width="720" :closable="access.closable">
			<Card>

				<Card v-for="item in access.all" :key="item.id">
					<h4 style="margin-bottom: 4px;">{{item.desc}}</h4>
					<CheckboxGroup v-model="item.accesss">
						<Checkbox :label="child.desc" v-for="child in item.childrens" :ken="child.id"></Checkbox>
					</CheckboxGroup>
				</Card>
			</Card>

			<div slot="footer">
				<Row>

					<Col offset="11" span="1">
					<Button @click="handleSave" size="small" type="primary">
									    保存
					</Button>
					</Col>

				</Row>

			</div>
		</Modal>
	</div>
</template>
<script>

	export default {
		name: 'access-role-list',
		data() {
			return {
				role_id: '',
				access: {
					closable: false,
					show: false,
					all: []
				},
				subrole: {
					closable: false,
					show: false,
					load: true,
					cols: [{
							key: 'id',
								sortable: true,
							title: 'role_id'
						},
						{
							key: 'role_name',
								sortable: true,
							title: '角色名称'
						},
						{
							key: 'desc',
								sortable: true,
							title: '简介'
						},
						{
							key: 'updated_at',
								sortable: true,
							title: '更新时间'
						},
						{
							key: 'operation',
							title: '操作',
							render: (h, params) => {
								return h('a', {
									props: {
										type: 'text',
										size: 'small'
									},
									on: {
										click: () => {
											this.access.show = true;
											this.access.all=[];
											this.$http.get('role/access&id=' + params.row.id).then((res) => {
												console.log(res)
												this.access.all = res.data;
												this.role_id = params.row.id;

											}).catch((err) => {
												console.log(err);
											});

										}
									}
								}, '权限管理');
							}
						}
					],
					datas: []
				},
				rolecols: [{
						key: 'id',
							sortable: true,
						title: 'role_id'
					},
					{
						key: 'role_name',
							sortable: true,
						title: '角色名称'
					},
					{
						key: 'desc',
							sortable: true,
						title: '简介'
					},
					{
						key: 'updated_at',
							sortable: true,
						title: '更新时间'
					},
					{
						key: 'operation',
						title: '操作',
						render: (h, params) => {
							return h('a', {
								props: {
									type: 'text',
									size: 'small'
								},
								on: {
									click: () => {

										this.$http.get('role/list&id=' + params.row.id).then((res) => {
											this.subrole.show = true;
											this.subrole.datas = res.data;
											this.role_id = params.row.id;
											this.subrole.load = false;
										}).catch((err) => {
											console.log(err);
										});

									}
								}
							}, '子角色');
						}
					}

				],
				roledata: [],
				loadStatus: true
			}
		},
		methods: {
			//保存权限
			handleSave() {

				this.$http.post('role/saveaccess', {
					access: this.access,
					role_id: this.role_id
				}).then((res) => {
					console.log(res);
					this.$Notice.success({
						title: '保存成功',
						desc: '保存成功',
					});
					this.access.show = false;
					this.access.all = [];
				}).catch((err) => {
					console.log(err);
				});
			},
			handleAdd() {
				this.$router.push({
					name: 'roleadd'
				});
			},
		},
		mounted() {

			this.$http.get('role/list').then((res) => {
				//console.log(res);
				this.roledata = res.data;
				this.loadStatus = false;
			}).catch((err) => {
				console.log(err);
			});
		}

	}
</script>
