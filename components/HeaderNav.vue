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
      inputSearch: false,
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

<style>

</style>