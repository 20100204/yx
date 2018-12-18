<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>
<template>
    <div style="width:820px;">
        <Row :gutter="10">
            <Col span="24">

            <Card :padding="2" style="padding:6px;">
                <span >
                    <Button @click="handleAdd" type="info" size="small" :disabled="enableAdd">添加</Button>
                </span>

            </Card>
            <Card>
                <Row class="margin-top-10 searchable-table-con1">
                    <Table :columns="list.cols" :data="list.datas" :loading="list.loading">
                    </Table>
                </Row>
            </Card>
            </Col>
        </Row>

        <Modal v-model="two.show" title="二级分类" :closable="false" width="810" @on-visible-change="handleHide">
            <Button type="info" size="small" style="margin-top:-8px;margin-bottom:8px;" :disabled="enableAdd" @click="handleAdd">添加</Button>
            <Table :columns="two.cols" :data="two.datas" :loading="two.loading" ref="twocategory">
            </Table>
            <div slot="footer"></div>
        </Modal>
        <Modal v-model="three.show" title="三级分类" :closable="false" width="710" @on-visible-change="handleHide">
            <Button type="info" size="small" style="margin-top:-8px;margin-bottom:8px;" :disabled="enableAdd" @click="handleAdd">添加</Button>
            <Table :columns="three.cols" :data="three.datas" :loading="three.loading" ref="threecategory">
            </Table>
            <div slot="footer"></div>
        </Modal>

        <!-- 添加分类 -->
        <Modal v-model="addCategory.show" title="分类添加" :closable="false" width="500">

            <Row>
                <Col span="3">
                分类名称</Col>
                <Col span="9">
                <Input v-model="addCategory.cat_name" placeholder="请输入分类名称"
                       style="width: 300px;margin-left:10px;top:-8px;"/>
                </Col>
            </Row>
            <Row style="margin-top:10px;">
                <Col span="3" >
                排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序</Col>
                <Col span="9">
                <InputNumber  v-model="addCategory.rank" placeholder="请输入分类排序,数字越大，越靠前"
                              :min="1"  style="width: 100px;margin-left:10px;margin-top:8px;" ></InputNumber>
                </Col>
            </Row>
            <Row style="margin-top:10px; width:400px;margin-bottom:48px;">
                <Col span="2" >
                logo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Col>
                <Col span="22" >
                       <pic-upload @uploadpic="handlePicup" :picurl="addCategory.logo"></pic-upload>
                </Col>
            </Row>
            <div slot="footer" >
                <Row >
                    <Col offset="10" span="2">
                    <Button type="info" @click="handlecategoryadd" :disabled="enableAdd">添加</Button>
                    </Col>
                </Row>
            </div>
        </Modal>
        <!-- 编辑分类 -->
        <Modal v-model="editCategory.show" title="分类编辑" :closable="false" width="500">

            <Row>
                <Col span="3">
                分类名称</Col>
                <Col span="9">
                <Input v-model="editCategory.cat_name" placeholder="请输入分类名称"
                       style="width: 300px;margin-left:10px;top:-8px;"/>
                </Col>
            </Row>
            <Row style="margin-top:10px;">
                <Col span="3" >
                排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序</Col>
                <Col span="9">
                <InputNumber  v-model="editCategory.rank" placeholder="请输入分类排序,数字越大，越靠前"
                              :min="1"  style="width: 300px;margin-left:10px;top:-8px;"></InputNumber>
                </Col>
            </Row>
            <Row style="margin-top:10px; width:400px;margin-bottom:48px;">
                <Col span="2" >
                logo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Col>
                <Col span="22" >
                <pic-upload @uploadpic="editPic" :picurl="editCategory.logo"></pic-upload>
                </Col>
            </Row>
            <div slot="footer">
                <Row>
                    <Col offset="10" span="2">
                    <Button type="info" @click="handlecategoryeidt" :disabled="enableEdit">保存</Button>
                    </Col>
                </Row>
            </div>
        </Modal>
    </div>
</template>
<script>
    import picUpload from './components/file-upload/file-upload.vue'
    export default {
        name: 'categoryindex',
        components: {
            picUpload
        },
        data () {
            return {
                /*添加编辑启用禁用*/
                enableAdd:true,
                enableEdit:true,
                enableCheck:true,
                /*编辑分类*/
                editCategory: {
                    show: false,
                    parent_id: '0',
                    top_cat_id: '0',
                    level: '1',
                    logo:"",
                    cat_name: '',
                    id: '',
                    rank:1,

                },
                //添加分类
                addCategory: {
                    logo:"",
                    curLevel: '1',
                    parent_id: '0',
                    top_cat_id: '0',
                    level: '1',
                    cat_name: '',
                    show: false,
                    rank:1,
                },
                //二级分类
                two: {
                    cols: [
                        {
                            title: '三级分类', width: 100, key: 'op', render: (h, p) => {
                                var _this = this;
                                return h('a', {
                                    on: {
                                        click () {
                                            _this.$http.get('category/two&parent_id=' + p.row.id).then((res) => {
                                                _this.three.show = true;
                                                _this.three.loading = false;
                                                _this.three.datas = res.data.rs;
                                                _this.addCategory.level = parseInt(p.row.level) + 1;
                                                _this.addCategory.top_cat_id = p.row.top_cat_id;
                                                _this.addCategory.parent_id = p.row.id;
                                                _this.addCategory.curLevel = 3;
                                            }).catch((err) => {
                                            });
                                        }
                                    }
                                }, '查看');
                            }
                        },
                        {
                            key: 'edit', title: '编辑', width: 100, render: (h, p) => {
                                var _this = this;
                                return h('a', {
                                    attrs:{
                                        disabled:_this.enableEdit
                                    },
                                    on: {
                                        click () {
                                            _this.editCategory.parent_id = p.row.parent_id;
                                            _this.editCategory.logo = p.row.logo;
                                            _this.editCategory.top_cat_id = p.row.top_cat_id;
                                            _this.editCategory.level = p.row.level;
                                            _this.editCategory.cat_name = p.row.cat_name;
                                            _this.editCategory.id = p.row.id;
                                            _this.editCategory.rank = parseInt(p.row.rank);;
                                            _this.editCategory.show = true;
                                        }
                                    }
                                }, '编辑');
                            }
                        },
                        {
                            key: 'is_disabled', title: '状态', width: 100,
                            render: (h, p) => {
                                var _this = this;
                                return h('a', {
                                    attrs:{
                                        disabled:_this.enableCheck
                                    },
                                    on: {
                                        click () {
                                            _this.$Modal.confirm({
                                                title: p.row.is_disabled == '1' ? '启用该分类' : '禁用该分类',
                                                content: p.row.is_disabled == '1' ? '启用该分类' : '禁用用该分类',
                                                onOk: () => {
                                                    let status = p.row.is_disabled == '1' ? 0 : 1;
                                                    _this.$http.get('category/status&id=' + p.row.id + '&status=' + status).then((res) => {
                                                        if (res.data.rs == 'true') {
                                                            _this.$Message.success('操作成功!');
                                                            p.row.is_disabled = status;
                                                        } else {
                                                            _this.$Message.error(res.data.msg);
                                                        }
                                                    }).catch((e) => {
                                                    });
                                                    //alert("ok");
                                                },
                                                onCancel: () => {
                                                }
                                            });
                                        }
                                    }
                                }, p.row.is_disabled == '1' ? '禁用' : '启用');
                            }
                        },
                        {key: 'title', tooltip: true, title: '分类名称', width: 120, key: 'cat_name'},
                        {key: 'updated_at', title: '更新时间', width: 160, sortable: true},
                        {key: 'id', title: '分类id', width: 100, sortable: true},
                        {key: 'rank', title: '排序号', width: 90, sortable: true}
                    ],
                    datas: [],
                    show: false,
                    loading: true,
                },
                //三级分类
                three: {
                    cols: [
                        {
                            key: 'edit', title: '编辑', width: 100, render: (h, p) => {
                                var _this = this;
                                return h('a', {
                                    attrs:{
                                        disabled:_this.enableEdit
                                    },
                                    on: {
                                        click () {
                                            _this.editCategory.parent_id = p.row.parent_id;
                                            _this.editCategory.top_cat_id = p.row.top_cat_id;
                                            _this.editCategory.logo = p.row.logo;
                                            _this.editCategory.level = p.row.level;
                                            _this.editCategory.cat_name = p.row.cat_name;
                                            _this.editCategory.rank = parseInt(p.row.rank);;
                                            _this.editCategory.id = p.row.id;
                                            _this.editCategory.show = true;
                                        }
                                    }
                                }, '编辑');
                            }
                        },
                        {
                            key: 'is_disabled', title: '状态', width: 100,
                            render: (h, p) => {
                                var _this = this;
                                return h('a', {
                                    attrs:{
                                        disabled:_this.enableCheck
                                    },
                                    on: {
                                        click () {
                                            _this.$Modal.confirm({
                                                title: p.row.is_disabled == '1' ? '启用该分类' : '禁用该分类',
                                                content: p.row.is_disabled == '1' ? '启用该分类' : '禁用用该分类',
                                                onOk: () => {
                                                    let status = p.row.is_disabled == '1' ? 0 : 1;
                                                    _this.$http.get('category/status&id=' + p.row.id + '&status=' + status).then((res) => {
                                                        if (res.data.rs == 'true') {
                                                            _this.$Message.success('操作成功!');
                                                            p.row.is_disabled = status;
                                                        } else {
                                                            _this.$Message.error(res.data.msg);
                                                        }
                                                    }).catch((e) => {
                                                    });
                                                    //alert("ok");
                                                },
                                                onCancel: () => {
                                                }
                                            });
                                        }
                                    }
                                }, p.row.is_disabled == '1' ? '禁用' : '启用');
                            }
                        },
                        {key: 'title', tooltip: true, title: '分类名称', width: 120, key: 'cat_name'},
                        {key: 'updated_at', title: '更新时间', width: 160, sortable: true},
                        {key: 'id', title: '分类id', width: 100, sortable: true},
                        {key: 'rank', title: '排序号', width: 90, sortable: true}
                    ],
                    datas: [],
                    show: false,
                    loading: true,
                },
                list: {
                    cols: [
                        {
                            title: '二级分类', width: 100, key: 'op', render: (h, p) => {
                                var _this = this;
                                return h('a', {
                                    on: {
                                        click () {
                                            _this.$http.get('category/two&parent_id=' + p.row.id).then((res) => {
                                                _this.two.show = true;
                                                _this.two.loading = false;
                                                _this.two.datas = res.data.rs;
                                                _this.addCategory.level = parseInt(p.row.level) + 1;
                                                _this.addCategory.top_cat_id = p.row.id;
                                                _this.addCategory.parent_id = p.row.id;
                                                _this.addCategory.curLevel = 2;
                                            }).catch((err) => {
                                            });
                                        }
                                    }
                                }, '查看');
                            }
                        },
                        {
                            key: 'edit', title: '编辑', width: 100, render: (h, p) => {
                                var _this = this;
                                return h('a', {
                                    attrs:{
                                        disabled:_this.enableEdit
                                    },
                                    on: {
                                        click () {

                                            _this.editCategory.parent_id = p.row.parent_id;
                                            _this.editCategory.logo = p.row.logo;
                                            _this.editCategory.top_cat_id = p.row.top_cat_id;
                                            _this.editCategory.level = p.row.level;
                                            _this.editCategory.cat_name = p.row.cat_name;
                                            _this.editCategory.id = p.row.id;
                                            _this.editCategory.rank = parseInt(p.row.rank);
                                            _this.editCategory.show = true;
                                            console.log(  _this.editCategory);
                                        }
                                    }
                                }, '编辑');
                            }
                        },
                        {
                            key: 'is_disabled', title: '状态', width: 100,
                            render: (h, p) => {
                                var _this = this;
                                return h('a', {
                                    attrs:{
                                        disabled:_this.enableCheck
                                    },
                                    on: {
                                        click () {
                                            _this.$Modal.confirm({
                                                title: p.row.is_disabled == '1' ? '启用该分类' : '禁用该分类',
                                                content: p.row.is_disabled == '1' ? '启用该分类' : '禁用用该分类',
                                                onOk: () => {
                                                    let status = p.row.is_disabled == '1' ? 0 : 1;
                                                    _this.$http.get('category/status&id=' + p.row.id + '&status=' + status).then((res) => {
                                                        if (res.data.rs == 'true') {
                                                            _this.$Message.success('操作成功!');
                                                            p.row.is_disabled = status;
                                                        } else {
                                                            _this.$Message.error(res.data.msg);
                                                        }
                                                    }).catch((e) => {
                                                    });
                                                    //alert("ok");
                                                },
                                                onCancel: () => {
                                                }
                                            });
                                        }
                                    }
                                }, p.row.is_disabled == '1' ? '禁用' : '启用');
                            }
                        },
                        {key: 'title', tooltip: true, title: '分类名称', width: 120, key: 'cat_name'},
                        {key: 'updated_at', title: '更新时间', width: 160, sortable: true},
                        {key: 'id', title: '分类id', width: 100, sortable: true},
                        {key: 'rank', title: '排序号', width: 90, sortable: true}
                    ],
                    datas: [],
                    loading: true,
                },

            };
        },

        methods: {
            handlePicup(e) {
                this.addCategory.logo = e;
                console.log(e);
            },
            editPic(e){
              this.editCategory.logo = e;
            },
            handleHide (show) {
                if (!show) {
                    if (this.addCategory.curLevel == '3') {
                        this.addCategory.curLevel = '2'
                        this.addCategory.level = '2'
                        if (this.two.datas.length > 0) {
                            this.addCategory.parent_id = this.two.datas[0].parent_id;
                            this.addCategory.top_cat_id = this.two.datas[0].parent_id;
                        } else {
                            this.addCategory.parent_id = '0'
                            this.addCategory.top_cat_id = '0'
                        }

                    } else if (this.addCategory.curLevel == '2') {
                        this.addCategory.level = '1'
                        this.addCategory.curLevel = '1'
                        this.addCategory.parent_id = '0'
                        this.addCategory.top_cat_id = '0'
                    }
                }

            },
            handlecategoryeidt () {

                if (!this.editCategory.cat_name) {
                    this.$Message.error('请输入分类名称');
                    return;
                }
                if (!this.editCategory.level) {
                    this.$Message.error('分类级别参数缺失');
                    return;
                }
                this.$http.post('category/edit', this.editCategory).then((res) => {
                    if (res.data.rs == 'true') {
                        if (res.data.data.level == '1') {
                            this.list.datas.forEach((v, k) => {
                                if (v.id == res.data.data.id) {
                                    v.cat_name = res.data.data.cat_name;
                                    v.logo = res.data.data.logo;
                                    v.rank =  parseInt(res.data.data.rank);
                                    v.updated_at = res.data.data.updated_at;
                                }

                            });

                        }else if(res.data.data.level == '2'){
                            this.two.datas.forEach((v, k) => {
                                if (v.id == res.data.data.id) {
                                    v.logo = res.data.data.logo;
                                    v.cat_name = res.data.data.cat_name;
                                    v.rank = parseInt(res.data.data.rank);
                                    v.updated_at = res.data.data.updated_at;
                                }

                            });

                        }else if(res.data.data.level == '3'){
                            this.three.datas.forEach((v, k) => {
                                if (v.id == res.data.data.id) {
                                    v.logo = res.data.data.logo;
                                    v.cat_name = res.data.data.cat_name;
                                    v.rank =  parseInt(res.data.data.rank);
                                    v.updated_at = res.data.data.updated_at;
                                }

                            });
                        }
                        this.$Message.success('修改成功');
                        this.editCategory.show = false;
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                }).catch((err) => {
                });

            },
            handlecategoryadd () {
                if (!this.addCategory.cat_name) {
                    this.$Message.error('请输入分类名称');
                    return;
                }
                if (!this.addCategory.level) {
                    this.$Message.error('分类级别参数缺失');
                    return;
                }
                this.$http.post('category/add', this.addCategory).then((res) => {
                    if (res.data.rs == 'true') {
                        if (res.data.data.level == '1') {
                            this.list.datas.push(res.data.data);
                            this.addCategory.show = false;
                        } else if (res.data.data.level == '2') {
                            this.two.datas.push(res.data.data);
                            this.addCategory.show = false;
                        } else if (res.data.data.level == '3') {
                            this.three.datas.push(res.data.data);
                            this.addCategory.show = false;
                        }
                        this.$Message.success('添加成功');
                        this.addCategory.cat_name = '';
                        this.addCategory.rank = 1;
                        this.addCategory.logo="";
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                }).catch((err) => {
                });
            },
            //添加分类
            handleAdd () {
                this.addCategory.show = true;
                // this.$router.push({
                //     name:"addcategory"
                // });
            },

            init () {
                this.$http.get('category/lists').then(
                    (res) => {
                        this.list.loading = false;
                        this.list.datas = res.data.rs;
                        this.enableCheck = Boolean(res.data.enableCheck);
                        this.enableAdd = Boolean(res.data.enableAdd);
                        this.enableEdit = Boolean(res.data.enableEdit);

                    }
                ).catch((err) => {
                    console.log(err);
                });
            }
        },

    mounted()
    {
        this.init();
    }
    }

</script>
