<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <div class="clearfix"></div>
    </div>
    <div class="panel-body">
      <div class="media">
        <div class="media-left">
          <a href="#">
            <img
              class="media-object"
              v-bind:src="product.featured_image"
              style="max-width:400px;max-height:400px; box-shadow: 10px 10px 5px grey; margin:20px;"
              alt="Kurt"
            >
          </a>
        </div>
        <div class="media-body">
          <h4 class="media-heading well text-center">
            <strong>{{product.name}}</strong>
          </h4>
          <p>Price: {{product.price}}</p>
          <p>Price: {{product.amount}}</p>
          <div class="clearfix"></div>
        </div>
        <div class="card-footer">
          <div>
            <button class="btn btn-info float-right btn-sm" v-on:click="$store.dispatch('acloseDetail')"><i class="fas fa-times"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel {
  background-color: rgba(20, 162, 228, 0.24);
}
</style>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["product"])
};
</script>

