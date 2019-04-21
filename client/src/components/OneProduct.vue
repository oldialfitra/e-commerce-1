<template>
  <div class="card card-inverse card-info">
    <img class="card-img-top" v-bind:src="oneProduct.featured_image">
    <div class="card-block">
      <h4 class="card-title">{{oneProduct.name}}</h4>
      <div class="card-text">Price: {{oneProduct.price}}</div>
      <div class="card-text">Amount: {{oneProduct.amount}}</div>
      <button
        class="btn btn-info float-left btn-sm"
        v-on:click.prevent="detail(oneProduct._id)"
      >Detail</button>
    </div>
    <div class="card-footer" v-if="user.role==='admin'">
      <button
        class="btn btn-info float-right btn-sm"
        v-on:click.prevent="getOneProduct(oneProduct._id)"
      >Edit</button>
      <button
        class="btn btn-info float-left btn-sm"
        v-on:click.prevent="deleteProduct(oneProduct._id)"
      >Delete</button>
    </div>
    <div class="card-footer" v-else>
      <div v-if="oneProduct.amount>0">
        <button
          class="btn btn-info float-right btn-sm"
          v-on:click.prevent="buyOneProduct(oneProduct._id, oneProduct.name)"
        >Buy</button>
      </div>
      <div v-else>
        <button class="btn btn-info float-right btn-sm" disabled>Sold Out</button>
      </div>
    </div>
    <div
      class="modal fade"
      id="updateModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Product {{oneProduct.name}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="updateProduct(oneProduct._id)">
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Name:</label>
                <input type="text" class="form-control" id="recipient-name" v-model="name" required>
              </div>
              <div class="form-group">
                <label for="amount" class="bmd-label-floating">Amount</label>
                <input
                  type="number"
                  class="form-control"
                  id="amount"
                  min="0"
                  v-model="amount"
                  required
                >
              </div>
              <div class="form-group">
                <label for="price" class="bmd-label-floating">Price</label>
                <input
                  type="number"
                  class="form-control"
                  id="price"
                  min="0"
                  v-model="price"
                  required
                >
              </div>
              <div class="form-group">
                <label for="file" class="bmd-label-floating">Image</label>
                <input type="file" class="form-control-file" id="file" ref="file">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h5 {
  font-size: 1.28571429em;
  font-weight: 700;
  line-height: 1.2857em;
  margin: 0;
}

.card {
  font-size: 1em;
  overflow: hidden;
  padding: 0;
  border: none;
  border-radius: 0.28571429rem;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
}

.card-block {
  font-size: 1em;
  position: relative;
  margin: 0;
  padding: 1em;
  border: none;
  border-top: 1px solid rgba(34, 36, 38, 0.1);
  box-shadow: none;
}

.card-img-top {
  display: block;
  width: 100%;
  height: auto;
}

.card-title {
  font-size: 1.28571429em;
  font-weight: 700;
  line-height: 1.2857em;
}

.card-text {
  clear: both;
  margin-top: 0.5em;
  color: rgba(0, 0, 0, 0.68);
}

.card-footer {
  font-size: 1em;
  position: static;
  top: 0;
  left: 0;
  max-width: 100%;
  padding: 0.75em 1em;
  color: rgba(0, 0, 0, 0.4);
  border-top: 1px solid rgba(0, 0, 0, 0.05) !important;
  background: #fff;
}

.card-inverse .btn {
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.profile {
  position: absolute;
  top: -12px;
  display: inline-block;
  overflow: hidden;
  box-sizing: border-box;
  width: 25px;
  height: 25px;
  margin: 0;
  border: 1px solid #fff;
  border-radius: 50%;
}

.profile-avatar {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.profile-inline {
  position: relative;
  top: 0;
  display: inline-block;
}

.profile-inline ~ .card-title {
  display: inline-block;
  margin-left: 4px;
  vertical-align: top;
}

.text-bold {
  font-weight: 700;
}

.meta {
  font-size: 1em;
  color: rgba(0, 0, 0, 0.4);
}

.meta a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.4);
}

.meta a:hover {
  color: rgba(0, 0, 0, 0.87);
}
</style>


<script>
import axios from "@/api/axios.js";
import Toast from "@/api/sweetalert.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      name: "",
      price: 0,
      amount: 0
    };
  },
  props: ["oneProduct"],
  methods: {
    getOneProduct(id) {
      console.log("masuk ke get one");
      axios
        .get(`/products/${id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data);
          $("#updateModal").modal("toggle");
          this.name = data.name;
          this.price = data.price;
          this.amount = data.amount;
        })
        .catch(err => {
          console.log(err);
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    },
    updateProduct(id) {
      console.log("masuk ke update");
      if (this.$refs.file) {
        let data = new FormData();
        data.append("name", this.name);
        data.append("amount", this.amount);
        data.append("price", this.price);
        data.append("image", this.$refs.file.files[0]);
        axios
          .put(`/products/${id}`, data, {
            headers: {
              token: localStorage.getItem("token")
            }
          })
          .then(({ data }) => {
            this.$store.dispatch("aGetAllProducts");
            $("#updateModal").modal("toggle");
            this.$router.push("/product");
            Toast.fire({
              type: "success",
              title: "Update successfully"
            });
            this.$store.dispatch("aGetAllTransactions");
          })
          .catch(err => {
            console.log(err);
            Toast.fire({
              type: "error",
              title: err.response.data.message
            });
          });
      } else {
        axios
          .put(
            `/products/${id}`,
            {
              name: this.name,
              price: this.price,
              amount: this.amount
            },
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(({ data }) => {
            this.$store.dispatch("aGetAllProducts");
            $("#updateModal").modal("toggle");
            this.$router.push("/product");
            Toast.fire({
              type: "success",
              title: "Update successfully"
            });
            this.$store.dispatch("aGetAllTransactions");
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
    deleteProduct(id) {
      axios
        .delete(`/products/${id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          this.$store.dispatch("aGetAllProducts");
          this.$store.dispatch("aGetAllTransactions");
          Toast.fire({
            type: "success",
            title: "Delete successfully"
          });
          this.$router.push("/product");
        })
        .catch(err => {
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    },
    buyOneProduct(id, name) {
      if (this.$store.state.user.isLoggedIn === true) {
        axios
          .put(
            "/carts/buy",
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
            console.log("berhasil");
            this.$store.dispatch("aGetAllProducts");
            this.$store.dispatch("aGetAllCarts");
            Toast.fire({
              type: "success",
              title: `Buy ${name} successfully`
            });
          })
          .catch(err => {
            console.log(err);
            Toast.fire({
              type: "error",
              title: err.response.data.message
            });
          });
      } else {
        this.$router.push("/signin");
        console.log(err);
      }
    },
    detail(id) {
      if (this.$store.state.user.isLoggedIn === true) {
        this.$store.dispatch("getOneProduct", id);
        this.$router.push(`/product/${id}`);
      } else {
        this.$router.push("/signin");
      }
    }
  },
  computed: mapState(["user"])
};
</script>
