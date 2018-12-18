<style lang="less">
    @import '../../../styles/common.less';
    @import '../article-publish.less';
</style>

<template>
    <div >
        <Card>
            <Form :label-width="120" :model="supplier" :rules="ruleValidate" ref="supplier">
                <FormItem label="登录账户" prop="username" :error="articleError">
                    <Input  v-model="supplier.username" placeholder="请输入登录账户名" :maxlength="20"  :autofocus="true" style="width:200px;" />
                </FormItem>
                <FormItem label="用户密码" prop="password" :error="articleError">
                    <Input  v-model="supplier.password" placeholder="请输入用户密码,长度最小6位" type="password" :maxlength="20"    style="width:300px;"/>
                </FormItem>
                <FormItem label="供应商名称" prop="supplier_name" :error="articleError">
                    <Input  v-model="supplier.supplier_name" placeholder="请输入供应商名称" :maxlength="20"    style="width:400px;"/>
                </FormItem>
                <FormItem label="联系人" prop="contact" :error="articleError">
                    <Input  v-model="supplier.contact" placeholder="请输入联系人" :maxlength="20"    style="width:400px;"/>
                </FormItem>
                <FormItem label="mobile" prop="mobile" :error="articleError">
                    <Input  v-model="supplier.mobile" placeholder="请输入联系人mobile" :maxlength="20"    style="width:400px;"/>
                </FormItem>
                <FormItem label="座机" prop="tel" :error="articleError">
                    <Input  v-model="supplier.tel" placeholder="请输入座机号码" :maxlength="20"    style="width:400px;"/>
                </FormItem>
                <FormItem label="所属分公司" prop="area" v-if="!isCity">
                    <Select v-model="supplier.area" style="width:400px" placeholder="请选所属分公司"  >
                        <Option v-for="(item,ind) in newcitylist" :value="item.area" :key="item.area">{{ item.company_name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="所在城市"   :error="articleError">
                    <Area  level="2"  :defaultcity="cityCompany" @oncityselect="handleCitychange"  ></Area>
                </FormItem>
                <FormItem label="详细地址" prop="address" :error="articleError">
                    <Input  v-model="supplier.address" placeholder="请输入详细地址" :maxlength="60"    style="width:500px;"/>
                </FormItem>
                <FormItem label="供应商类型" prop="supplier_type" :error="articleError">
                    <RadioGroup v-model="supplier.supplier_type">
                        <Radio label="0">
                            <span>他营</span>
                        </Radio>
                        <Radio label="1">
                            <span>自营</span>
                        </Radio>

                    </RadioGroup>
                    <span style="margin-left:10px;">备注 <span style="margin-left:6px;">他营：第三方供应商</span> <span style="margin-left:10px;">自营：公司自己经营</span></span>
                </FormItem>
                <FormItem label="结算类型" prop="settllment_type" :error="articleError">
                    <RadioGroup v-model="supplier.settllment_type">
                        <Radio label="1">
                            <span>月结</span>
                        </Radio>
                        <Radio label="2">
                            <span>现结</span>
                        </Radio>

                    </RadioGroup>
                </FormItem>
               <FormItem>
                <Button @click="handlePublish('supplier')"   style="width:90px; " type="primary">
                 提交
                </Button>
                <Button type="primary" @click="handleReset('supplier')" style="margin-left: 8px">
                重置
                </Button>
                </FormItem>
            </Form>
        </Card>
    </div>

</template>

<script>
    import Area from "../components/area-linkage/area-linkage.vue"
    export default {
        name: 'supplieradd',
        components:{
            Area
        },
        data(){
            return {

                cityCompany:[],
                isCity:true,
                newcitylist:[],
                articleError:'',
                supplier:{
                    area:'',//所属公司的区域编码
                    username:'',
                    password:'',
                    supplier_type:'0',
                    supplier_name:'',
                    mobile:'',
                    tel:'',
                    settllment_type:'1',
                    province:'',
                    city:'',
                    county:'',
                    contact:'',
                },
                ruleValidate:{
                    username:[{required:true,message:"请输入登录名",trigger:"blur"},{min:5,max:15,message:"长度为5~15",trigger:'blur'}],
                    password:[
                        {required:true,type:'string',message:"请输入登录密码",trigger:'blur'},
                        {min:5,max:15,trigger:'blur',message:'密码长度为5到15位'}
                    ],
                    supplier_type:[
                        {required:true,message:"请选择供应商类型"}
                    ],
                    supplier_name:[
                        {required:true,message:"请输入供应商名称",trigger:"blur"},
                        {min:2,max:20,message:"长度为2到20之间",trigger:"blur"}
                        ],
                    contact:[
                        {required:true,message:"请输入联系人",trigger:'blur'}
                    ],
                    mobile:[
                        {required:true,trigger:"blur",message:"请输入手机号"},
                        {pattern: /^1[345789]\d{9}$/,
                message: '请填正确的手机号码',trigger:'blur'}
                    ],
                    address:[
                        {required:true,message:"请输入详细地址 不用填省市区",trigger:'blur'},
                        {min:2,max:60,message:"长度为2到60之间",trigger:"blur"}
                    ],
                    settllment_type:[
                        {required:true,message:"请选择结算类型"}
                    ]

                }
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            init(){
                this.$http.get('supplier/add').then((res)=>{
                    this.isCity = Boolean(res.data.isCity);
                    if(this.isCity){
                        this.supplier.area = res.data.citys[0].area
                    }else{
                        this.newcitylist = res.data.citys;
                    }
                }).catch((err)=>{
                    console.log(err);
                });
            },
            handleCitychange(v){
                this.supplier.county="";
                let len = v.length;
                if(len==3){
                    v.map((item,i)=>{
                        if(i==1){
                            this.supplier.city = item.name;
                        }else if(i==2){
                           this.supplier.county = item.name;
                        }else{
                            this.supplier.province = item.name;
                        }
                    });

                }

            },
            handlePublish(name){
                this.$refs[name].validate((valid) => {
                    if(!this.supplier.county){
                        this.$Message.error({content:"请选择供应商地址",duration:1});
                        return;
                    }
                    if (valid) {
                        this.$http.post('supplier/add',{supplier:this.supplier}).then((res)=>{
                            if(res.data.rs==='true'){
                                this.$router.push({name:'supplierlist'});

                            }else{
                                this.$Message.error(res.data.msg);
                            }
                        }).catch((error)=>{

                        })
                       // this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset(name){
                this.$refs[name].resetFields();
            }

        }
    };
</script>


