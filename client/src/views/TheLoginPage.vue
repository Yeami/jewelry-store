<template>
  <div class="login-page-wrapper">
    <a-card title="Jewelry Store">
      <a-form
          :form="form"
          class="login-form"
          @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
              v-decorator="username"
              placeholder="Username"
          >
            <a-icon slot="prefix" type="user" class="input-icon"/>
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input
              v-decorator="password"
              type="password"
              placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" class="input-icon"/>
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button">
            Login
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { LOGIN_USER } from '@/store/actions.type';

export default {
  name: 'TheLoginPage',
  data() {
    return {
      form: this.$form.createForm(this),
      username: ['username', { rules: [{ required: true, message: 'Username is required' }] }],
      password: ['password', { rules: [{ required: true, message: 'Password is required' }] }],
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((errors, fields) => {
        if (!errors) {
          this.$store.dispatch(LOGIN_USER, fields);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
  .login-page-wrapper {
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;

    .login-form {
      width: 25rem;
      margin: 0 auto;
      padding: 2rem;

      .input-icon {
        color: rgba(0, 0, 0, 0.25);
      }

      .login-form-button {
        width: 100%;
      }
    }
  }
</style>
