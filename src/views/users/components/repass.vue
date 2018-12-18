<template>
    <div>
        <Row style="margin-bottom:20px;">
            <Col span="4" offset="1">
            输入密码
            </Col>
            <Col span="14">

            <Input v-model.trim="passwd" :autofocus="true" type="password" style="width:260px;" @on-blur="inputpass"/>

            </Col>
        </Row>
        <Row>
            <Col span="4" offset="1">
            确认密码
            </Col>
            <Col span="14">
            <Input v-model.trim="repasswd" type="password" style="width:260px;" @on-blur="repass"/>
            </Col>
        </Row>
        <Row style="margin-top:20px;">
            <Col span="2" offset="9">
            <Button type="info" size="small" style="margin-right:30px;" @click="handleTijiao" :disabled="enableRepass">确定</Button>
            </Col>
            <Col span="2" offset="2">
            <Button type="info" size="small" style="margin-right:20px;" @click="handleReset">重置</Button>
            </Col>
        </Row>
    </div>

</template>

<script>
    export default {
        name: 'repass',
        props: {
            supplier_id: {
                type: String,
                required: true,
            },
            enableRepass:{
                type:Boolean,
                default:true
            }
        },
        data () {
            return {
                passwd: '',
                repasswd: ''
            };
        },
        methods: {
            inputpass () {
                if (this.passwd.length < 5) {
                    this.$Message.error('密码长度最少5位');
                }
            },
            repass () {
                if (this.repasswd != this.passwd) {
                    this.$Message.error('密码不匹配');
                }
            },
            handleReset () {
                this.passwd = this.repasswd = '';
            },
            handleTijiao () {
                this.$http.post('supplier/repasswd', {
                    password: this.passwd,
                    repasswd: this.repasswd,
                    id: this.supplier_id
                }).then((res) => {
                    if (res.data.rs === 'true') {
                        this.$Message.success("设置成功");
                        this.passwd='';
                        this.repasswd='';
                        this.$emit('onrepasswd');
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    };
</script>

<style scoped>

</style>
