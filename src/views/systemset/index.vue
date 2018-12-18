<template>
    <div>
        <Tabs value="name1">
            <TabPane label="预售、团购免运费设置" name="name1">
                <home-deliver :alldatas="datas" ></home-deliver>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import HomeDeliver from './commponent/home_delivery_amount';

    export default {
        name: 'systemsets',
        components: {
            HomeDeliver
        },
        data(){
            return {
                datas:[],
            }
        },
        mounted(){
            this.$http.get('systemset/homedeliver').then((res)=>{
                this.datas = res.data.rs;
            }).catch((err)=>{});
        }
    };
</script>

<style scoped>

</style>
