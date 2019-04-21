<template>
  <div id="loginForm" class="container">
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <!-- Tabs Titles -->

        <!-- Icon -->
        <div class="fadeIn first">
          <span>Sign In</span>
        </div>

        <!-- Login Form -->
        <form v-on:submit.prevent="signIn">
          <input
            type="email"
            id="emailLogin"
            class="fadeIn second"
            name="email"
            placeholder="email"
            v-model="email"
            required
          >
          <input
            type="password"
            id="passwordLogin"
            class="fadeIn third"
            name="password"
            placeholder="password"
            v-model="password"
            required
          >
          <input type="submit" class="fadeIn fourth" value="Sign In">
        </form>

        <!-- Remind Passowrd -->
        <div id="formFooter">
          <div>
            <router-link to="/signup">Need New Account?</router-link>
            <!-- <a role="button" v-on:click.prevent="changeToRegister">Need New Account?</a> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/FormSign.css";
</style>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signIn() {
      this.$emit("sign-in", { email: this.email, password: this.password });
      this.email = "";
      this.password = "";
    },
    changeToRegister() {
      this.$router.push("/signup");
      this.email = "";
      this.password = "";
    }
  },
  created() {
    console.log('masuk ke created')
  },
};
</script>

