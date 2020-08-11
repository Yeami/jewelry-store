<template>
  <div class="products-page-wrapper">
    <h1>Products page</h1>

    <div class="products-content">
      <a-tabs
          v-if="categories"
          default-active-key="0"
          tab-position="left"
      >
        <a-tab-pane key="0" tab="All">
          <the-products-wrapper
              :category="0"
              description="The full list of products"
              :products="products"
              :brands="brands"
          />
        </a-tab-pane>
        <a-tab-pane
            v-for="item in categories"
            :key="item.id"
            :tab="item.name"
        >
          <the-products-wrapper
              :category="item.id"
              :description="item.description"
              :products="products"
              :brands="brands"
          />
        </a-tab-pane>
      </a-tabs>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import TheProductsWrapper from '@/components/TheProductsWrapper';
import { GET_BRANDS, GET_CATEGORIES, GET_PRODUCTS } from '@/store/actions.type';

export default {
  name: 'TheProductsPage',
  components: {
    TheProductsWrapper,
  },
  computed: {
    ...mapGetters([
      'brands',
      'categories',
      'products',
    ]),
  },
  mounted() {
    this.$store.dispatch(GET_BRANDS);
    this.$store.dispatch(GET_CATEGORIES);
    this.$store.dispatch(GET_PRODUCTS);
  },
};
</script>

<style scoped lang="scss">

</style>
