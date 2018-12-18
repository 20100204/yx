// noinspection JSAnnotator
import Vue from 'vue';
import iView from 'iview';
import { router } from './router/index';
import { appRouter } from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import Axios from 'axios';
import Vueaxios from 'vue-axios';
//import queryString from 'querystring';
Axios.defaults.withCredentials = true;
Axios.defaults.baseURL = 'http://yunwei.ycypsz.com/index.php?r=';
//Axios.defaults.headers = { 'ycyp': 'b157235195ea0b121c4455cdc34e7089' };
// Axios.interceptors.response.use(function(data) {
//     console.log('sss')
//     console.log(data.data);
//     console.log('sss')
//     return data;
// });
// Axios.defaults.transformResponse = [
//     function(data) {
//         // if (router.currentRoute.name != 'login') {
//         //     store.commit('authlogin');
//         // }ca
//         console.log(data);

//         return data;
//     }
// ];
/*var Axiosc = Axios.create({
	baseURL:'http://yunwei.ycypsz.com/index.php?r=',
	headers: {'ycyp': 'b157235195ea0b121c4455cdc34e7089'},
});*/
Vue.use(VueI18n);
Vue.use(iView);
Vue.use(Vueaxios, Axios);
// Axios.get('login/getadminid').then((res) => {
//     if (res.data.rs == 'false') {
//         if (router.currentRoute.name != 'login') {
//             // router.go({ name: 'login' });
//         }

//     }
// }).catch((err) => {
//     console.log(err);
// });

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted() {
        /*	this.$http.get('item/skus').then((res)=>{
        		console.log(res);
        	}).catch((err)=>{
        		console.log(err);
        	});*/
        this.currentPageName = this.$route.name;
        //console.log(this.$route);
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        //this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        //this.$store.commit('updateMenulist');
        this.$store.commit('setMenuList');
        // iview-admin检查更新
        //util.checkUpdate(this);
    },
    created() {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
