// 官方元件
import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';

// import HelloWorld from '@/components/HelloWorld';
// 自訂分頁元件
import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';
import Coupons from '@/components/pages/Coupons';
import Orders from '@/components/pages/Orders';
import Allproducts from '@/components/pages/Allproducts';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
import index from '@/components/pages/index';
import productdata from '@/components/pages/productdata';
import OrderInfo from '@/components/pages/OrderInfo';
import Payment from '@/components/pages/payment';
import Featuredproducts from '@/components/pages/Featuredproducts';
import category from '@/components/pages/category';
import aboutus from '@/components/pages/aboutus';

Vue.use(Router);
Vue.use(Vuex);


export default new Router({
  routes: [
    // {
    //   names:'首頁',  //元件呈現的名稱
    //   path:'/新路徑', //對應的虛擬路徑
    //   component:home, //對應的元件
    // }
    {
      path:'*',
      redirect:'/',
    },
    //首頁
    {
      path: '/',
      name: '',
      component: index,
      children:[
        {
          path: '/',
          name: 'Featuredproducts',
          component: Featuredproducts,

        },
        {
          path: '/category',
          name: 'category',
          component: category,
          
        },
        {
          path: '/productdata/:id',
          name: 'productdata',
          component: productdata,

        },
        {
          path: '/aboutus',
          name: 'aboutus',
          component: aboutus,

        },
        
      ]
      
    },
    //結帳頁面
    {
      path: '/customer_checkout',
      name: '',
      component: CustomerCheckout,
      children: [
        {
          path: '',
          name: 'OrderInfo',
          component: OrderInfo,
        },
        {
          path: 'payment/:orderId',
          name: 'Payment',
          component: Payment,
        },
      ]
    },
    //登入頁面
    {
      path:'/login',
      name:'Login',
      component:Login,
    },
    //管理者頁面
    //產品列表
    {
      path: '/admin',
      name: 'Dashboard_Products',
      component: Dashboard,
      children:[
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
      ]
    },
    //訂單列表
    {
      path: '/admin',
      name: 'Dashboard_Orders',
      component: Dashboard,
      children: [
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true },
        },
      ]
    },
    //優惠眷
    {
      path: '/admin',
      name: 'Dashboard_Coupons',
      component: Dashboard,
      children: [
        {
          path: 'coupons',
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true },
        },
      ]
    },


    //測試使用 模擬訂單
    {
      path: '/test',
      name: 'Dashboard_CustomerOrders',
      component: Dashboard,
      children: [
        {
          path: 'customer_orders',
          name: 'test_CustomerOrders',
          component: Allproducts,
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'test_CustomerCheckout',
          component: CustomerCheckout,
        },
      ]
    },
  ]
})
