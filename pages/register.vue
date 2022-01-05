<template>
  <main>
    <div class="container">
      <div class="register">
        <div class="register_title">
          <h2>会員登録</h2>
        </div>
        <form @submit.prevent="register()">
          <ValidationObserver ref="obs" v-slot="ObserverProps">
            <div class="register_input">
              <ValidationProvider v-slot="{ errors }" rules="required|max:50">
                <p class="error">{{ errors[0] }}</p>
                <input type="text" v-model="name" name="名前" placeholder="名前">
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" rules="required|email|max:100">
                <p class="error">{{ errors[0] }}</p>
                <input type="email" v-model="email" name="メールアドレス" placeholder="メールアドレス">
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" rules="required|min:6|max:255" vid="password">
                <p class="error">{{ errors[0] }}</p>
                <input type="password" v-model="password" name="パスワード" placeholder="パスワード">
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" rules="confirmed:password">
                <p class="error">{{ errors[0] }}</p>
                <input type="password" v-model="password_confirmation" name="確認パスワード" placeholder="確認パスワード">
              </ValidationProvider>
            </div>
            <div class="register_send">
              <button type="submit" :disabled="ObserverProps.invalid || !ObserverProps.validated">登録</button>
            </div>
          </ValidationObserver>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  auth: false,
  head() {
    return {
      title: '新規登録'
    }
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    };
  },
  methods: {
    async register() {
      await this.$axios.post('/register', {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      });
      this.$router.push({ name: 'thanks' });
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  margin: 50px auto;
  padding: 0 0 50px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 2px 2px 2px #999;
  @include pc {
    width: 50%;
  }
  @include tab {
    width: 80%;
  }
  .register_title {
    padding: 16px 0;
    background: #3560f6;
    h2 {
      margin: 0 0 0 15px;
      font-size: 20px;
      color: #fff;
    }
  }
  .register_input {
    .error {
      padding: 25px 15px 15px;
      color: #f00;
    }
    input {
      display: block;
      width: 90%;
      margin: auto;
      padding: 5px;
      border: none;
      border-bottom: 1px solid #000;
    }
  }
  .register_send {
    @include flex(flex-end, center);
    margin: 30px 5% 0 0;
    button {
      padding: 4px 12px;
      background: #3560f6;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      color: #fff;
      &[disabled] {
        background: #8fa8ff;
      }
    }
  }
}
</style>
