<template>
  <div class="products-wrapper">
    <h3>{{description}} - {{getProducts.length}} items</h3>

    <div class="product-card" v-if="products">
      <a-card
          v-for="item in getProducts"
          :key="item.id"
          :title="item.name"
          style="max-width: 300px"
      >
        <img
          slot="cover"
          :alt="item.name"
          :src="item.picture ? item.picture : imageNotFound"
        />

        <a-popover slot="extra" :title="item.name">
          <template slot="content">
            <span>{{item.description}}</span>
          </template>
          <a href="#">More</a>
        </a-popover>

        <span>Price: ${{item.price}}</span>
        <span>Amount: {{item.amount}}</span>
        <span>Brand: {{getBrandById(item.brand)}}</span>
        <span>Is available:
          <span :style="`color: ${item.is_available ? 'green' : 'red'}`"> {{isAvailable(item.is_available)}}</span>
        </span>

        <a-button type="primary" style="margin-top: 0.5rem" :disabled="!item.is_available">
          <a-icon type="shopping-cart" /> Add to basket
        </a-button>

      </a-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheProductsWrapper',
  props: {
    category: Number,
    description: String,
    products: Array,
    brands: Array,
  },
  data() {
    return {
      imageNotFound: '/image-not-found.png',
    };
  },
  computed: {
    getProducts() {
      if (this.category) {
        return this.products.filter((product) => product.category === this.category);
      }
      return this.products;
    },
  },
  methods: {
    getBrandById(id) {
      return this.brands.find((brand) => brand.id === id).name;
    },
    isAvailable(availability) {
      return availability ? 'Yes' : 'No';
    },
  },
};
</script>

<style lang="scss">
  .products-wrapper {
    width: 100%;

    .product-card {
      display: flex;
      flex-wrap: wrap;
      max-width: 60rem;

      .ant-card {
        flex-grow: 1;
        margin: 0 1rem 1rem 0;

        &-body {
          display: flex;
          flex-direction: column;
        }
      }

      img {
        width: 18.625rem;
        height: 18.625rem;
      }
    }
  }

  .ant-popover {
    width: 20rem;
  }
</style>
