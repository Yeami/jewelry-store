<template>
  <div class="wrapper">
    <div class="navbar card">

      <div class="brand">
        <a-icon type="sketch" class="logo"/>
        <span class="title">Jewelry Store</span>
      </div>

      <div class="navbar-items">
        <router-link
            class="navbar-item"
            v-for="routes in links"
            :key="routes.id"
            :to="`${routes.page}`"
        >
          {{routes.text}}
        </router-link>
        <router-link
            v-if="isAvailable"
            class="navbar-item"
            to="/orders"
        >
          Orders
        </router-link>
      </div>

      <div class="right-side">
        <a-icon type="user" class="user"/>
        <span>{{getFullName}}</span>
      </div>
    </div>

    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import RolesType from '@/types/roles.type';

export default {
  name: 'TheRouterView',
  computed: {
    ...mapGetters([
      'user',
    ]),
    getFullName() {
      if (this.user?.firstName && this.user?.lastName) {
        return `${this.user?.firstName} ${this.user?.lastName}`;
      }

      return this.user?.username;
    },
    isAvailable() {
      return this.user && (this.user.role === RolesType.MANAGER || this.user.role === RolesType.ADMIN);
    },
  },
  data() {
    return {
      links: [
        {
          id: 0,
          text: 'Products',
          page: '/products',
        },
        {
          id: 1,
          text: 'Basket',
          page: '/basket',
        },
        {
          id: 2,
          text: 'Profile',
          page: '/profile',
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
  .wrapper {
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 1rem 6rem;

      .brand {
        font-size: 1.5rem;

        .logo {
          margin-right: 0.5rem;
        }
      }

      &-items {
        font-size: 1.25rem;

        .navbar-item {
          padding: 0 2rem;
        }
      }

      .right-side {
        font-size: 1rem;

        .user {
          margin-right: 0.5rem;
        }
      }
    }

    .content {
      padding: 2rem 12rem 0;
    }
  }
</style>
