<template>
  <div class="container">
    <router-view v-if="product.show===true"></router-view>
    <div class="row">
      <div
        class="col-sm-6 col-md-4 col-lg-3 mt-4"
        v-for="(item, index) in product.items"
        :key="index"
      >
        <OneProduct v-bind:one-product="item"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import OneProduct from "@/components/OneProduct.vue";
import { mapState } from "vuex";
export default {
  components: {
    OneProduct
  },
  computed: mapState(["product"])
};
</script>


