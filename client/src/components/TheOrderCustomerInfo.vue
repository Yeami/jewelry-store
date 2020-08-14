<template>
  <div class="customer-wrapper">
    <span>Full name: {{customer.firstName}} {{customer.lastName}}</span>
    <span>Username: {{customer.username}}</span>
    <span>Phone: {{customer.phone}}</span>
    <span>Email: {{customer.email}}</span>
    <span>Address: {{customer.address}}</span>
    <span>Date joined: {{getDateJoined}}</span>
    <br>
    <span>Order note: {{note}}</span>
    <span>Order created at: {{getCreatedDate}}</span>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'TheOrderCustomerInfo',
  props: {
    customer: Object,
    note: String,
    createdAt: String,
  },
  computed: {
    getDateJoined() {
      return moment(this.customer.dateJoined).format('DD.MM.YYYY');
    },
    getCreatedDate() {
      return moment(this.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a');
    },
  },
};
</script>

<style lang="scss">

</style>
