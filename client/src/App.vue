<template>
  <div id="app">
    <Navbar @sign-out="signOut"></Navbar>
    <div class="container">
      <router-view @sign-up="signUp" @sign-in="signIn" @add-product="addProduct"/>
    </div>
  </div>
</template>

<style>
</style>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "@/api/axios.js";
import Toast from "@/api/sweetalert.js";
import { mapActions } from "vuex";
export default {
  components: {
    Navbar
  },
  methods: {
    signIn(payload) {
      console.log(payload);
      axios
        .post("/users/signin", payload)
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);
          this.$router.push("/product");
          this.$store.dispatch("aLoggedIn", localStorage.getItem("role"));
          Toast.fire({
            type: "success",
            title: "Signed in successfully"
          });
          this.allTransactions();
        })
        .catch(err => {
          console.log(err);
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    },
    allTransactions() {
      if (localStorage.getItem("role") === "admin") {
        this.$store.dispatch("aGetAllTransactions");
      } else {
        this.$store.dispatch("aGetMyTransactions");
      }
    },
    signUp(payload) {
      console.log("masuk ke sign up");
      console.log(payload, "ini payload");
      payload.role = 'customer'
      axios
        .post("/users/signup", payload)
        .then(({ data }) => {
          this.$router.push("/signin");
          console.log("berhasil");
          console.log(data);
          $("#exampleModal").modal("toggle");

          Toast.fire({
            type: "success",
            title: "Signed up successfully"
          });
        })
        .catch(err => {
          $("#exampleModal").modal("toggle");
          console.log(err);
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    },
    signOut() {
      console.log("keluar aplikasi");
      localStorage.clear();
      this.isLoggedIn = false;
      this.$store.dispatch("aLoggedOut");
      this.$router.push("/product");
      Toast.fire({
        type: "success",
        title: "Signed out successfully"
      });
    },
    addProduct(payload) {
      console.log("app add");
      console.log(payload, "ini payload");
      let data = new FormData();
      data.append("name", payload.name);
      data.append("amount", payload.amount);
      data.append("price", payload.price);
      data.append("image", payload.image);
      axios
        .post("/products", data, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data);
          Toast.fire({
            type: "success",
            title: `Add ${data.name} successfully`
          });
          this.$store.dispatch("aGetAllProducts");
          this.$router.push("/product");
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
  mounted() {
    if (localStorage.getItem("token")) {
      this.isLoggedIn = true;
      this.role = localStorage.getItem("role");
      this.$store.dispatch("aLoggedIn", this.role);
      this.$store.dispatch("aGetAllCarts");
      this.$store.dispatch("aGetAllProducts");
      if (localStorage.getItem("role") === "admin") {
        this.$store.dispatch("aGetAllTransactions");
      } else {
        this.$store.dispatch("aGetMyTransactions");
      }
    } else {
      this.isLoggedIn = false;
      this.role = "";
      this.$store.dispatch("aLoggedOut");
      this.$store.dispatch("aGetAllProducts");
    }
  }
};
</script>
