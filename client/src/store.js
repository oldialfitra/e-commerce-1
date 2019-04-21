/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from './api/axios';
import Toast from './api/sweetalert';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      isLoggedIn: false,
      role: '',
    },
    product: {
      show: false,
      items: [],
      name: '',
      price: 0,
      amount: 0,
      featured_image: '',
    },
    cart: {
      carts: [],
      total: 0,
    },
    transaction: {
      transactions: [],
    },
  },
  mutations: {
    mLoggedIn(state, payload) {
      state.user.isLoggedIn = true;
      state.user.role = payload;
    },
    mLoggedOut(state) {
      state.user.isLoggedIn = false;
      state.user.role = '';
      state.cart.carts = [];
      state.cart.total = 0;
      state.transaction.transactions = [];
    },
    mGetAllProducts(state, payload) {
      state.product.items = payload;
    },
    mGetOneProduct(state, payload) {
      state.product.name = payload.name;
      state.product.price = payload.price;
      state.product.amount = payload.amount;
      state.product.featured_image = payload.featured_image;
      state.product.show = true;
    },
    mGetAllCarts(state, payload) {
      state.cart.carts = payload;
    },
    mSetTotal(state, payload) {
      state.cart.total = payload;
    },
    mGetAllTransactions(state, payload) {
      state.transaction.transactions = payload;
    },
    mCheckOut(state) {
      state.cart.total = 0;
    },
    mCloseDetail(state) {
      state.product.show = false;
      state.product.name = '';
      state.product.price = 0;
      state.product.amount = 0;
      state.product.featured_image = '';
    },
  },
  actions: {
    aLoggedIn(context, role) {
      context.commit('mLoggedIn', role);
      context.dispatch('aGetAllCarts');
      if (role === 'admin') {
        context.dispatch('aGetAllTransactions');
      } else {
        context.dispatch('aGetMyTransactions');
      }
    },
    aLoggedOut(context) {
      context.commit('mLoggedOut');
    },
    aGetAllProducts(context) {
      console.log('masuk ke product');
      axios
        .get('/products', {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          context.commit('mGetAllProducts', data);
        })
        .catch((err) => {
          console.log(err);
          Toast.fire({
            type: 'error',
            title: err.response.data.message,
          });
        });
    },
    aGetAllCarts(context) {
      console.log('masuk ke cart');
      axios
        .get('/carts/my', {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          let total = 0;
          data.list.forEach((e) => {
            total += (e.product.price * e.quantity);
          });
          context.commit('mGetAllCarts', data);
          if (data.list.length > 0) {
            context.dispatch('aGetCourierCost', total);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    aGetCourierCost(context, payload) {
      axios
        .post('/carts/cost', {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          const total = payload + data;
          context.commit('mSetTotal', total);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    aGetAllTransactions(context) {
      console.log('masuk ke all transactions');
      axios
        .get('/transactions', {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          context.commit('mGetAllTransactions', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    aGetMyTransactions(context) {
      console.log('masuk ke my transactions');
      axios
        .get('/transactions/my', {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          context.commit('mGetAllTransactions', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    aCheckOut(context) {
      context.commit('mCheckOut');
    },
    getOneProduct(context, id) {
      axios
        .get(`/products/${id}`, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          context.commit('mGetOneProduct', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    acloseDetail(context) {
      context.commit('mCloseDetail');
    },
  },
});
