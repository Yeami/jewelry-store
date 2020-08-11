<template>
  <div class="products-page-wrapper">
    <h1>Products page</h1>

    <div class="content">
      <a-tabs default-active-key="1" tab-position="left" v-if="categories">
        <a-tab-pane key="0" tab="All">
          Content of All
        </a-tab-pane>
        <a-tab-pane
            v-for="item in categories"
            :key="item.id"
            :tab="item.name"
        >
          {{item.description}}
        </a-tab-pane>
      </a-tabs>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { GET_BRANDS, GET_CATEGORIES } from '@/store/actions.type';

export default {
  name: 'TheProductsPage',
  computed: {
    ...mapGetters([
      'brands',
      'categories',
    ]),
  },
  mounted() {
    this.$store.dispatch(GET_BRANDS);
    this.$store.dispatch(GET_CATEGORIES);
  },
};
</script>

<style scoped lang="scss">

</style>
