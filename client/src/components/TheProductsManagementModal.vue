<template>
  <a-modal
      :visible="visible"
      title="Products management"
      @ok="toggle"
      @cancel="toggle"
      width="50rem"
  >
    <div class="modal-content">
      <div class="brand-card card">
        <h3>Brand</h3>
        <a-input v-model="brandName" placeholder="Name" style="margin-bottom: 0.5rem"/>
        <a-input v-model="brandCountry" placeholder="Country" style="margin-bottom: 0.5rem"/>
        <a-input v-model="brandYear" placeholder="Year of foundation" style="margin-bottom: 1rem"/>
        <a-button type="primary" @click="createBrand">Create new brand</a-button>
      </div>

      <div class="category-card card">
        <h3>Category</h3>
        <a-input v-model="categoryName" placeholder="Name" style="margin-bottom: 0.5rem"/>
        <a-input v-model="categoryDescription" placeholder="Description"
                 style="margin-bottom: 1rem"/>
        <a-button type="primary" @click="createCategory">Create new category</a-button>
      </div>

      <div class="product-card card" style="margin-top: 1rem">
        <h3>Product</h3>
        <a-form :form="form">
          <a-form-item>
            <a-input
                v-decorator="['name']"
                placeholder="Name"
            />
          </a-form-item>
          <a-form-item>
            <a-input
                v-decorator="['description']"
                placeholder="Description"
            />
          </a-form-item>
          <a-form-item>
            <a-input
                v-decorator="['price']"
                placeholder="Price"
            />
          </a-form-item>
          <a-form-item>
            <a-input
                v-decorator="['amount']"
                placeholder="Amount"
            />
          </a-form-item>
          <a-form-item>
            <a-input
                v-decorator="['picture']"
                placeholder="Picture link"
            />
          </a-form-item>
          <a-form-item>
            <a-checkbox
                v-decorator="['isAvailable']"
                :checked="isAvailable"
                @change="handleChange"
            >
              Is available
            </a-checkbox>
          </a-form-item>
          <a-form-item v-if="selectedBrand">
            <a-dropdown>
              <a-menu slot="overlay" @click="selectBrand">
                <a-menu-item
                    v-for="item in brands"
                    :key="item.id"
                >
                  {{item.name}}
                </a-menu-item>
              </a-menu>
              <div class="brand-dropdown">
                Brand:
                <a-button>
                  {{selectedBrand.name}}
                  <a-icon type="down"/>
                </a-button>
              </div>
            </a-dropdown>
          </a-form-item>
          <a-form-item v-if="selectedCategory">
            <a-dropdown>
              <a-menu slot="overlay" @click="selectCategory">
                <a-menu-item
                    v-for="item in categories"
                    :key="item.id"
                >
                  {{item.name}}
                </a-menu-item>
              </a-menu>
              <div class="brand-dropdown">
                Category:
                <a-button>
                  {{selectedCategory.name}}
                  <a-icon type="down"/>
                </a-button>
              </div>
            </a-dropdown>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="createProduct">
              Create new product
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>

  </a-modal>
</template>

<script>
import { mapGetters } from 'vuex';

import { CREATE_BRAND, CREATE_CATEGORY, CREATE_PRODUCT } from '@/store/actions.type';

export default {
  name: 'TheProductsManagementModal',
  computed: {
    ...mapGetters([
      'brands',
      'categories',
    ]),
  },
  props: {
    visible: Boolean,
    toggle: Function,
  },
  data() {
    return {
      brandName: '',
      brandCountry: '',
      brandYear: '',
      categoryName: '',
      categoryDescription: '',
      isAvailable: false,
      form: this.$form.createForm(this),
      selectedBrand: null,
      selectedCategory: null,
    };
  },
  methods: {
    createBrand() {
      this.$store.dispatch(CREATE_BRAND, {
        name: this.brandName,
        country: this.brandCountry,
        year: this.brandYear,
      });
    },
    createCategory() {
      this.$store.dispatch(CREATE_CATEGORY, {
        name: this.categoryName,
        description: this.categoryDescription,
      });
    },
    selectBrand(e) {
      this.selectedBrand = this.brands.find((b) => b.id === e.key);
    },
    selectCategory(e) {
      this.selectedCategory = this.categories.find((c) => c.id === e.key);
    },
    createProduct() {
      this.form.validateFields((errors, fields) => {
        if (!errors) {
          this.$store.dispatch(CREATE_PRODUCT, {
            ...fields,
            brand: this.selectedBrand.id,
            category: this.selectedCategory.id,
          });
        }
      });
    },
    handleChange(e) {
      this.isAvailable = e.target.checked;
    },
  },
  watch: {
    brands() {
      [this.selectedBrand] = this.brands;
    },
    categories() {
      [this.selectedCategory] = this.categories;
    },
  },
};
</script>

<style scoped lang="scss">
  .modal-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex: 2;

    .brand-card,
    .category-card,
    .product-card {
      width: 23rem;
      padding: 1rem;
    }
  }

  .ant-form-item {
    margin: 0;
  }
</style>
