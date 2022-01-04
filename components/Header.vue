<template>
  <header>
    <div class="container">
      <div class="header_logo">
        <h1>
          <nuxt-link :to="{ name: 'index' }">Rese</nuxt-link>
        </h1>
      </div>
      <div class="header_search" v-show="inputSearch">
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
  data() {
    return {
      inputSearch: false
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
      ul {
        @include flex(space-between, center);
        li.header_nav-logout {
          a {
            margin: 0 10px;
          }
        }
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
      }
    }
  }
}
@keyframes open {
  0% {
    opacity: 0;
    transform: translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
.open-enter-active {
  animation: open .2s;
}
.open-leave-active {
  animation: open .2s linear reverse;
}
</style>