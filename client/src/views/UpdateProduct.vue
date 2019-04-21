<template>
  <div class="container">
    <h3>Add Product</h3>
    <form v-on:submit.prevent="updateProduct">
      <div class="form-group">
        <label for="name" class="bmd-label-floating">Product's name</label>
        <input type="name" class="form-control" id="name" v-model="product.name" required>
      </div>
      <div class="form-group">
        <label for="amount" class="bmd-label-floating">Amount</label>
        <input type="number" class="form-control" id="amount" min="0" v-model="product.amount" required>
      </div>
      <div class="form-group">
        <label for="price" class="bmd-label-floating">Price</label>
        <input type="number" class="form-control" id="price" min="0" v-model="product.price" required>
      </div>
      <div class="form-group">
        <label for="file" class="bmd-label-floating">Image</label>
        <input type="file" class="form-control-file" id="file" ref="file" required>
      </div>
      <button class="btn btn-default">Cancel</button>
      <button type="submit" class="btn btn-primary btn-raised">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  margin-top: 100px;
  padding: 20px;
  border: 2px grey solid;
}
</style>


<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["product"])
};
</script>
