<template>
  <div id="registerForm" class="container">
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <!-- Tabs Titles -->

        <!-- Icon -->
        <div class="fadeIn first">
          <span>Sign Up</span>
        </div>

        <!-- Login Form -->
        <form v-on:submit.prevent="signUpFirst">
          <input
            type="email"
            id="emailRegister"
            class="fadeIn second"
            name="email"
            placeholder="email"
            v-model="email"
            required
          >
          <input
            type="password"
            class="fadeIn third"
            name="password"
            placeholder="password"
            v-model="password"
            required
          >
          <input
            type="password"
            class="fadeIn third"
            name="password"
            placeholder=" re-password"
            v-model="confirm"
            required
          >
          <input type="submit" class="fadeIn fourth" value="Sign Up">
        </form>

        <!-- Remind Passowrd -->
        <div id="formFooter">
          <div>
            <router-link to="/signin">Already have an account?</router-link>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Please fill the detail</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="signUpSecond">
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Name:</label>
                <input type="text" class="form-control" id="recipient-name" v-model="name" required>
                <div class="invalid-feedback">Please fill out this field.</div>
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Address:</label>
                <textarea class="form-control" id="message-text" v-model="address" required></textarea>
                <div class="invalid-feedback">Please fill out this field.</div>
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">City:</label>
                <select class="custom-select custom-select-sm" v-model="city" required>
                  <option disabled>Select your city</option>
                  <option
                    v-for="(item, index) in cities"
                    :key="index"
                  >{{item.city_id}}. {{item.city_name}}</option>
                </select>
                <div class="invalid-feedback">Please fill out this field.</div>
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
@import "../assets/FormSign.css";
</style>

<script>
import axios from "@/api/axios.js";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      email: "",
      password: "",
      confirm: "",
      name: "",
      address: "",
      city: "",
      cities: []
    };
  },
  methods: {
    signUpFirst() {
      if (this.password === this.confirm) {
        console.log("masuk ke if");
        $("#exampleModal").modal("toggle");
      } else {
        console.log("tidak sama");
        this.email = "";
        this.password = "";
        this.name = "";
        this.address = "";
        this.city = "";
      }
    },
    signUpSecond() {
      console.log("masuk ke second");
      this.$emit("sign-up", {
        email: this.email,
        password: this.password,
        name: this.name,
        address: this.address,
        city: this.city.split(". ")[1],
        cityId: this.city.split(". ")[0]
      });
    },
    changeToLogin() {
      this.$router.push("/signin");
      this.email = "";
      this.password = "";
    }
  },
  created() {
    axios
      .get("/users/city")
      .then(({ data }) => {
        this.cities = data;
        // console.log(data)
      })
      .catch(err => {
        console.log(err);
        Toast.fire({
          type: "error",
          title: err.response.data.message
        });
      });
  }
};
</script>

