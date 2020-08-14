<template>
  <div class="orders-page-wrapper">
    <h1>Orders page</h1>

    <div class="orders-content" v-if="orders && brands">
      <a-card
          v-for="item in orders"
          :key="item.id"
          :title="`Order №${item.id}`"
          :tab-list="tabList"
          :active-tab-key="tabKey"
          @tabChange="(key) => onTabChange(key)"
      >
        <div class="customer-info" v-if="tabKey === 'customer'">
          <the-order-customer-info
              :customer="item.customer"
              :note="item.note"
              :created-at="item.created_at"
          />
        </div>

        <div class="products-info" v-if="tabKey === 'products'">
          <b>Total price: ${{calculateOrderPrice(item.products)}}</b>

          <div
              class="product-item card"
              v-for="product in item.products"
              :key="product.product.id"
          >
            <span>Name: {{product.product.name}}</span>
            <span>Brand: {{getBrandById(product.product.brand)}}</span>
            <span>Price: ${{product.product.price}}</span>
            <span>Amount: {{product.amount}}</span>
            <br>
            <span>
              Total price: ${{calculateProductsPrice(product.amount, product.product.price)}}
            </span>
          </div>
        </div>

      </a-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import TheOrderCustomerInfo from '@/components/TheOrderCustomerInfo';
import { GET_BRANDS, GET_CUSTOMER_ORDERS } from '@/store/actions.type';

export default {
  name: 'TheOrdersPage',
  components: {
    TheOrderCustomerInfo,
  },
  computed: {
    ...mapGetters([
      'orders',
      'brands',
    ]),
  },
  data() {
    return {
      tabKey: 'customer',
      tabList: [
        {
          key: 'customer',
          tab: 'Customer',
        },
        {
          key: 'products',
          tab: 'Products',
        },
      ],
    };
  },
  methods: {
    onTabChange(key) {
      this.tabKey = key;
    },
    getBrandById(id) {
      return this.brands.find((b) => b.id === id).name;
    },
    calculateProductsPrice(amount, price) {
      return amount * parseFloat(price);
    },
    calculateOrderPrice(products) {
      let price = 0;
      products.forEach((p) => {
        price += this.calculateProductsPrice(p.amount, p.product.price);
      });

      return price;
    },
  },
  mounted() {
    this.$store.dispatch(GET_CUSTOMER_ORDERS);
    this.$store.dispatch(GET_BRANDS);
  },
};
</script>

<style lang="scss">
  .orders-content {
    display: flex;
    flex-wrap: wrap;
    max-width: 60rem;

    .ant-card {
      flex-grow: 1;
      margin: 0 1rem 1rem 0;

      &-body div {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .product-item {
    padding: 0.5rem;
  }
</style>
