<template>
  <div class="orders-page-wrapper">
    <h1>Orders page</h1>
  </div>
</template>

<script>
import { GET_CUSTOMER_ORDERS } from '@/store/actions.type';

export default {
  name: 'TheOrdersPage',
  mounted() {
    this.$store.dispatch(GET_CUSTOMER_ORDERS);
  },
};
</script>

<style scoped lang="scss">

</style>
