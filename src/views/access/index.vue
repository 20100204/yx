<style lang="less">
	@import '../../styles/common.less';
	@import '../../styles/table.less';
</style>

<template>
	<div>

		 

		<Card>
			<Card>
				<h4 style="margin-bottom: 4px;">产品管理</h4>
				<CheckboxGroup v-model="access">
					<Checkbox label="香蕉"></Checkbox>
					<Checkbox label="苹果"></Checkbox>
					<Checkbox label="西瓜"></Checkbox>
				</CheckboxGroup>
			</Card>
			<Card>
				<h4 style="margin-bottom: 4px;">产品管理</h4>
				<CheckboxGroup v-model="access">
					<Checkbox label="香蕉"></Checkbox>
					<Checkbox label="苹果"></Checkbox>
					<Checkbox label="西瓜"></Checkbox>
				</CheckboxGroup>
			</Card>
			<Card>
				<h4 style="margin-bottom: 4px;">产品管理</h4>
				<CheckboxGroup v-model="access">
					<Checkbox label="香蕉"></Checkbox>
					<Checkbox label="苹果"></Checkbox>
					<Checkbox label="西瓜"></Checkbox>
				</CheckboxGroup>
			</Card>
			<Card>
				<h4 style="margin-bottom: 4px;">产品管理</h4>
				<CheckboxGroup v-model="access">
					<Checkbox label="香蕉"></Checkbox>
					<Checkbox label="苹果"></Checkbox>
					<Checkbox label="西瓜"></Checkbox>
				</CheckboxGroup>
			</Card>
			<Card>
				<h4 style="margin-bottom: 4px;">产品管理</h4>
				<CheckboxGroup v-model="access">
					<Checkbox label="香蕉"></Checkbox>
					<Checkbox label="苹果"></Checkbox>
					<Checkbox label="西瓜"></Checkbox>
				</CheckboxGroup>
			</Card>
			<Row style="margin-top:18px;">

				<Col offset="11" span="1">
					<Button @click="handleSave" size="small" type="primary">
									    保存
					</Button>
				</Col>

			</Row>
		</Card>

	</div>
</template>
<script>
	import Axios from 'axios';
	export default {
		name: 'searchable-table-shoper-list',
		data() {
			return {
				access: [],
			};
		},
		computed: {

		},
		methods: {
			//保存
			handleSave() {}
		},
		mounted() {

		}
	};
</script>