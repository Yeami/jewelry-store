<template>
  <div class="products-page-wrapper">
    <h1>Products page</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { GET_BRANDS } from '@/store/actions.type';

export default {
  name: 'TheProductsPage',
  computed: {
    ...mapGetters([
      'brands',
    ]),
  },
  mounted() {
    this.$store.dispatch(GET_BRANDS);
  },
};
</script>

<style scoped lang="scss">

</style>
