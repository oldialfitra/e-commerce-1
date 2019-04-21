<template>
  <section id="tabs" class="project-tab">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="tab-content" id="nav-tabContent">
            <table class="table" cellspacing="0">
              <thead>
                <tr>
                  <th>User's Name</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in transaction.transactions" :key="index">
                  <td>{{item.user.name}}</td>
                  <td>{{item.user.address}}</td>
                  <td>{{item.user.city}}</td>
                  <td>
                    <ul>
                      <li
                        v-for="(product, index) in item.list"
                        :key="index"
                      >{{product.product.name}}</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li v-for="(quantity, index) in item.list" :key="index">{{quantity.quantity}}</li>
                    </ul>
                  </td>
                  <td>Rp. {{item.total}}</td>
                  <td>{{item.createdAt.slice(0,10)}}</td>
                  <td v-if="item.status==='' && $store.state.user.role==='admin'">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      v-on:click.prevent="sendTransaction(item._id)"
                    >Send</button>
                  </td>
                  <td
                    v-else-if="item.status==='' && $store.state.user.role==='customer'"
                  >Waiting for Send</td>
                  <td v-else-if="item.status==='send' && $store.state.user.role==='customer'">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      v-on:click.prevent="confirmationTransaction(item._id)"
                    >Confirmation</button>
                  </td>
                  <td
                    v-else-if="item.status==='send' && $store.state.user.role==='admin'"
                  >Waiting for confirmation</td>
                  <td v-else-if="item.status==='confirm'">Complete</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-tab {
  padding: 10%;
  margin-top: -8%;
}
.project-tab #tabs {
  background: #007b5e;
  color: #eee;
}
.project-tab #tabs h6.section-title {
  color: #eee;
}
.project-tab #tabs .nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  color: #0062cc;
  background-color: transparent;
  border-color: transparent transparent #f3f3f3;
  border-bottom: 3px solid !important;
  font-size: 16px;
  font-weight: bold;
}
.project-tab .nav-link {
  border: 1px solid transparent;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  color: #0062cc;
  font-size: 16px;
  font-weight: 600;
}
.project-tab .nav-link:hover {
  border: none;
}
.project-tab thead {
  background: #f3f3f3;
  color: #333;
}
.project-tab a {
  text-decoration: none;
  color: #333;
  font-weight: 600;
}
</style>


<script>
import axios from "@/api/axios.js";
import Toast from "@/api/sweetalert.js";
import { mapState } from "vuex";
export default {
  methods: {
    sendTransaction(id) {
      axios
        .put(`/transactions/send/${id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          this.$store.dispatch("aGetAllTransactions");
          Toast.fire({
            type: "success",
            title: "Send successfully"
          });
        })
        .catch(err => {
          console.log(err);
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    },
    confirmationTransaction(id) {
      axios
        .put(`/transactions/confirm/${id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          this.$store.dispatch("aGetMyTransactions");
          Toast.fire({
            type: "success",
            title: "Confirm successfully"
          });
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
  computed: mapState(["transaction"])
};
</script>

