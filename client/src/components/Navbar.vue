<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <a href="#" class="navbar-brand">
      E-Commerce
      <i class="fas fa-comment-dollar"></i>
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navigation"
      aria-controls="navigation"
      aria-expanded="false"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navigation">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/product">Home</router-link>
        </li>
        <li class="nav-item" v-if="user.role==='admin'">
          <router-link class="nav-link" to="/add">Add Product</router-link>
        </li>
        <li class="nav-item" v-if="user.isLoggedIn===true && user.role==='customer'">
          <router-link class="nav-link" to="/cart">Cart</router-link>
        </li>
        <li class="nav-item" v-if="user.isLoggedIn===true">
          <router-link class="nav-link" to="/transaction">Transaction</router-link>
        </li>
      </ul>
      <ul class="navbar-nav form-inline my-2 my-lg-0">
        <li class="nav-item" v-if="user.isLoggedIn===false">
          <router-link class="nav-link" to="/signin">Sign In</router-link>
        </li>
        <li class="nav-item" v-if="user.isLoggedIn===true">
          <a href="#" class="nav-link" v-on:click.prevent="signOut">Sign Out</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: #222222;
}
.nav-item::after {
  content: "";
  display: block;
  width: 0px;
  height: 2px;
  background: #fec400;
  transition: 0.2s;
}
.nav-item:hover::after {
  width: 100%;
}
.navbar-dark .navbar-nav .active > .nav-link,
.navbar-dark .navbar-nav .nav-link.active,
.navbar-dark .navbar-nav .nav-link.show,
.navbar-dark .navbar-nav .show > .nav-link,
.navbar-dark .navbar-nav .nav-link:focus,
.navbar-dark .navbar-nav .nav-link:hover {
  color: #fec400;
}
.nav-link {
  padding: 15px 5px;
  transition: 0.2s;
}
.dropdown-item.active,
.dropdown-item:active {
  color: #212529;
}
.dropdown-item:focus,
.dropdown-item:hover {
  background: #fec400;
}
</style>


<script>
import { mapState } from "vuex";
export default {
  methods: {
    signOut() {
      this.$emit("sign-out");
    }
  },
  computed: mapState(["user"])
};
</script>
