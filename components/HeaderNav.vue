<template>
  <li class="header_nav-login" v-if="$auth.loggedIn">
    <button @click="toggleNav()">
      <p>ログイン中：{{ $auth.user.name }}さん</p>
      <span class="icon" :class="[authNav ? 'open': '']"></span>
    </button>
    <transition name="open">
      <ul class="header_nav-auth" v-if="authNav">
        <li>
          <nuxt-link :to="{ name: 'mypage' }">マイページ</nuxt-link>
        </li>
        <li>
          <button @click="logout()">ログアウト</button>
        </li>
      </ul>
    </transition>
  </li>
</template>

<script>
export default {
  data() {
    return {
      authNav: false
    }
  },
  mounted() {
    window.addEventListener('click', this.closeAuthNav);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.closeAuthNav);
  },
  methods: {
    toggleNav() {
      this.authNav = !this.authNav;
    },
    closeAuthNav(event) {
      if (this.$auth.loggedIn) {
        if (!this.$el.querySelector('.header_nav-login').contains(event.target)) {
          this.authNav = false;
        }
      }
    },
    async logout() {
      await this.$auth.logout();
    }
  }
}
</script>

<style lang="scss">
li.header_nav-login {
  position: relative;
  width: 100%;
  button {
    @include flex(space-around, center);
    padding: 10px;
    background: #fff;
    border-radius: 5px;
    p {
      display: inline-block;
      margin: 0 5px;
    }
    span.icon::after {
      content: '▼';
      display: inline-block;
      transition: .3s;
    }
    span.icon.open::after {
      transform: rotate(180deg);
    }
  }
  ul.header_nav-auth {
    position: absolute;
    display: block;
    top: 40px;
    width: 100%;
    background: #fff;
    li {
      a {
        display: block;
        padding: 10px 0;
        background: #fff;
        &::before {
          content: "";
          display: inline-block;
          margin: 0 0 0 15px;
        }
        &:hover {
          background: #999;
        }
      }
      button {
        display: block;
        width: 100%;
        padding: 10px 0;
        border-radius: 0;
        &::before {
          content: "";
          display: inline-block;
          margin: 0 0 0 15px;
        }
        &:hover {
          background: #999;
        }
      }
    }
  }
}
</style>