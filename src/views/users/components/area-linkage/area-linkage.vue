<style lang="less">
    @import './area-linkage.less';
    @import '../../../../styles/common.less';
</style>

<template>
    <div>
        <Row class="margin-top-10" :gutter="10">
            <Col span="10">

                    <al-selector v-model="resDefault"  :level="level"  @on-change="changeVal"   />

            </Col>
        </Row>
    </div>
</template>

<script>
// import alSelector from './components/al-selector.vue';
// import alCascader from './components/al-cascader.vue';

import Vue from 'vue';
import iviewArea from 'iview-area';
Vue.use(iviewArea);

export default {
	name:'addcityuser',
    // components: {
    //     alSelector,
    //     alCascader
    // },
   /* props:['level','defaultcity','sss'],*/
  props:{
  		'level':{
  			type:String
  		},
  		'defaultcity':{
  			type:Array
  		},


  },
    data () {
        return {
            resDefault: [],
            showRes: [],
            disableCity:[0,1]
        };
    },
    mounted(){
    	//console.log('ttt');
    },

    methods: {
        renderFormat (label) {
            return label.join(' => ');
        },
        changeVal(){

        	this.$emit('oncityselect',this.resDefault);
        }
    },
    watch: {

       defaultcity:function(val){

     		return this.resDefault= val;
    	},
        resDefault (val) {
            this.showRes = val;
        }
    }
};
</script>
