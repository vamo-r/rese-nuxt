<template>
  <main>
    <div class="container">
      <div class="login">
        <div class="login_title">
          <h2>ログイン</h2>
        </div>
        <form @submit.prevent="login()">
          <ValidationObserver ref="obs" v-slot="ObserverProps">
            <div class="login_input">
              <ValidationProvider v-slot="{ errors }" rules="required|email">
                <p class="error">{{ errors[0] }}</p>
                <input type="email" v-model="email" name="メールアドレス" placeholder="メールアドレス" >
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" rules="required">
                <div class="error">{{ errors[0] }}</div>
                <input type="password" v-model="password" name="パスワード" placeholder="パスワード">
              </ValidationProvider>
            </div>
            <div class="login_send">
              <button type="submit" :disabled="ObserverProps.invalid || !ObserverProps.validated">
                ログイン
              </button>
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
      title: 'ログイン'
    }
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('laravelJWT', {
          data: {
            email: this.email,
            password: this.password
          }
        });
        this.$router.push({ name: 'index' });
      } catch {
        alert('ご入力されたEメール又はパスワードが確認できませんでした。\n再度、Eメール及びパスワードのご確認をお願いします。');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
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
  .login_title {
    padding: 16px 0;
    background: #3560f6;
    h2 {
      margin: 0 0 0 15px;
      font-size: 20px;
      color: #fff;
    }
  }
  .login_input {
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
  .login_send {
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
