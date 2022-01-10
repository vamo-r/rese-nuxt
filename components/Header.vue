<template>
  <header>
    <div class="container">
      <div class="header_logo">
        <h1>
          <nuxt-link :to="{ name: 'index' }">Rese</nuxt-link>
        </h1>
      </div>
      <div class="header_search">
        <search-keyword v-model="inputKeyword"/>
      </div>
      <nav class="header_nav">
        <ul>
          <li class="header_nav-logout" v-if="!$auth.loggedIn">
            <nuxt-link :to="{ name: 'login' }">ログイン</nuxt-link>
          </li>
          <li class="header_nav-logout" v-if="!$auth.loggedIn">
            <nuxt-link :to="{ name: 'register' }">新規登録</nuxt-link>
          </li>
          <header-nav/>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import SearchKeyword from './SearchKeyword.vue'
import HeaderNav from './HeaderNav.vue'

export default {
  components: {
    SearchKeyword,
    HeaderNav
  },
  props: {
    keyword: {
      type: String
    }
  },
  computed: {
    inputKeyword: {
      get() {
        return this.keyword;
      },
      set(value) {
        this.$emit('update:keyword', value)
      }
    }
  }
}
</script>

<style lang="scss">
header {
  padding: 24px 0;
  background: #3560f6;
  box-shadow: 3px 3px 3px #666;
  .container {
    @include flex(space-between, center);
    .header_logo {
      h1 {
        a {
          font-size: 40px;
        }
      }
    }
    .header_search {
      @include tab {
        display: none;
      }
    }
    .header_nav {
      > ul {
        @include flex(space-between, center);
        li.header_nav-logout {
          a {
            margin: 0 10px;
          }
        }
      }
    }
  }
}
</style>