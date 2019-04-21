import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/product',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/AllProducts.vue'),
      children: [
        {
          path: '/product/:id',
          name: 'detail',
          component: () => import(/* webpackChunkName: "info" */ './components/OneProductDetail.vue'),
        },
      ],
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackChunkName: "info" */ './views/SignInForm.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "about" */ './views/SignUpForm.vue'),
    },
    {
      path: '/add',
      name: 'add',
      component: () => import(/* webpackChunkName: "about" */ './views/AddProduct.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import(/* webpackChunkName: "about" */ './views/AllCarts.vue'),
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: () => import(/* webpackChunkName: "about" */ './views/AllTransactions.vue'),
    },
  ],
});
