<template>
  <div class="search">
    <input placeholder="店舗名検索"
      v-if="$auth.loggedIn"
      v-model="inputKeyword"
    />
  </div>
</template>

<script>
export default {
  props: {
    keyword: String
  },
  mounted() {
    this.showSearch();
  },
  computed: {
    inputKeyword: {
      get() {
        return this.keyword
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    showSearch() {
      if (this.$route.path === '/') {
        this.inputSearch = true;
      } else {
        this.inputSearch = false;
      }
    }
  }
}
</script>

<style lang="scss">
.search {
  @include flex(center, center);
  input {
    padding: 5px 10px;
    background: #fff;
    border-radius: 5px;
    font-size: 1.4rem;
    color: #000;
  }
}
</style>