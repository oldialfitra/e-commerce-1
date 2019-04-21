<template>
  <div class="col-lg-12">
    <div class="row">
      <div class="col-lg-8">
        <div class="row">
          <div class="col-4 col-lg-3 col-xl-2">
            <div class="row">
              <a href="cateview.php" class="w-100">
                <img v-bind:src="oneCart.product.featured_image" style="max-width:100%">
              </a>
            </div>
          </div>
          <div class="col-8 col-lg-9 col-xl-10">
            <div class="d-block text-truncate mb-1">
              <a href="cateview.php" class="cartproname">{{oneCart.product.name}}</a>
            </div>
            <div class="cartviewprice d-block">
              <div>
                <span class="amt">Price:</span>
                <span class="amt">{{oneCart.product.price}}</span>
              </div>
              <div>
                <span class="amt">Total:</span>
                <span class="amt">{{oneCart.product.price * oneCart.quantity}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4 col-lg-3 col-xl-2 p-0 qty">
            <div class="input-group">
              <div class="input-group-prepend">
                <button
                  type="button"
                  class="btn btn-sm btn-qty"
                  v-on:click.prevent="changeQuantity(oneCart.product._id, 'minus')"
                >
                  <i class="fa fa-minus"></i>
                </button>
              </div>
              <input
                type="text"
                class="form-control form-control-sm text-center"
                id
                aria-describedby
                v-model="oneCart.quantity"
                disabled
              >
              <div class="input-group-append">
                <div v-if="oneCart.product.amount>0">
                  <button
                    type="button"
                    class="btn btn-sm btn-qty"
                    v-on:click.prevent="changeQuantity(oneCart.product._id, 'plus')"
                  >
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
                <div v-else>
                  <button type="button" class="btn btn-sm btn-qty" disabled>Sold Out</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 ml-lg-auto align-self-start mt-2 mt-lg-0">
        <div class="row">
          <div class="prostatus">
            <a
              href
              class="addcardrmv"
              v-on:click.prevent="removeProduct(oneCart.product._id, oneCart.product.name)"
            >Remove</a>
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
import { mapActions } from "vuex";
export default {
  props: ["oneCart"],
  methods: {
    removeProduct(id, name) {
      axios
        .put(
          "/carts/remove",
          {
            product: id
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          console.log(data);
          this.$store.dispatch("aGetAllCarts");
          this.$store.dispatch("aGetAllProducts");
          Toast.fire({
            type: "success",
            title: `Remove Product ${name} successfully`
          });
        })
        .catch(err => {
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
          console.log(err);
        });
    },
    changeQuantity(id, plusminus) {
      console.log("masuk ke change");
      axios
        .put(
          "/carts/change",
          {
            product: id,
            option: plusminus
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          console.log("masuk ke then");
          this.$store.dispatch("aGetAllCarts");
          this.$store.dispatch("aGetAllProducts");
        })
        .catch(err => {
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
          console.log(err);
        });
    }
  }
};
</script>


