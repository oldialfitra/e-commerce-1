<template>
  <div class="container-fluid mt-3 mb-4">
    <div class="col-lg-12">
      <div class="row">
        <div class="col-lg-9 px-0 pr-lg-2 mb-2 mb-lg-0">
          <div class="card border-light bg-white card proviewcard shadow-sm">
            <div class="row">
              <div class="card-header col-lg-6">My Cart</div>
              <div
                class="card-header col-lg-6"
                v-if="cart.carts.list.length > 0"
              >My Total + Courier: Rp. {{cart.total}}</div>
            </div>
            <div class="card-body">
              <div
                class="col-lg-12 p-3 cardlist"
                v-for="(item, index) in cart.carts.list"
                :key="index"
              >
                <OneCart v-bind:one-cart="item"/>
              </div>
            </div>
            <div class="card-footer border-light cart-panel-foo-fix">
              <a
                href
                class="btn btn-add-con"
                v-on:click.prevent="$router.push('/product')"
              >Continue Shopping</a>
              <div>
                <a
                  href
                  class="btn btn-cust"
                  v-if="cart.carts.list.length > 0"
                  v-on:click.prevent="checkoutTransaction"
                >Check Out</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/Cart.css";
</style>

<script>
import axios from "@/api/axios.js";
import Toast from "@/api/sweetalert.js";
import OneCart from "@/components/OneCart.vue";
import { mapState } from "vuex";
export default {
  components: {
    OneCart
  },
  methods: {
    checkoutTransaction() {
      axios
        .post(
          "/transactions",
          {
            total: this.$store.state.cart.total
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.checkoutCart();
        })
        .catch(err => {
          console.log(err);
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    },
    checkoutCart() {
      axios
        .put("/carts/checkout", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          this.$store.dispatch("aGetAllCarts");
          this.$store.dispatch("aGetMyTransactions");
          this.$store.dispatch("aCheckOut");
          console.log("berhasil");
        })
        .catch(err => {
          console.log(err);
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    }
  },
  computed: mapState(["cart"])
};
</script>


