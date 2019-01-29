// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// 引用 AJAX 套件
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
// 引用 Loading 套件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// 引用 BS4
import 'bootstrap';

// 引用 VueAwesomeSwiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

// 引用驗證套件 + 在地化語系
// import VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';
import VeeValidate, { Validator } from 'vee-validate';

// 引用自定義
import App from './App';
import router from './router';
import './bus';
import currencyFilter from'./filters/currency';
import dateFilter from './filters/date';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.use(VueAwesomeSwiper);

Validator.localize('zh_TW',zhTWValidate);
Vue.use(VeeValidate, {
  locale:'zh_TW',
});

Vue.component('Loading',Loading);
Vue.filter('currency', currencyFilter)
Vue.filter('date', dateFilter);

axios.defaults.withCredentials = true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});



router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next);
  // ...
  if(to.meta.requiresAuth){
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
        console.log(response.data);
        if(response.data.success){
          next();
        }else{
          next({
            path:'/login',
          })
        }
    });
  }else{
    next();
  }
  
});
