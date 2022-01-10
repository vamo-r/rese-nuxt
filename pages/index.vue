<template>
  <div class="wrap">
    <Header
      :keyword.sync="inputKeyword"
    />
    <main>
      <div class="container">
        <search-keyword v-model="inputKeyword"/>
        <shop-card
          :shops="filteredShops"
        />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  layout: 'noneHeader',
  data() {
    return {
      shops: [],
      keyword: ''
    };
  },
  async created() {
    await this.getShops();
  },
  computed: {
    inputKeyword: {
      get() {
        return this.keyword
      },
      set(value) {
        this.keyword = value
      }
    },
    filteredShops() {
      if (this.keyword !== '') {
        return this.searchShopsName(this.shops, this.keyword);
      }
      return this.shops;
    },
  },
  methods: {
    async getShops() {
      const response = await this.$axios.get('/shops');
      this.shops = response.data.shops_data;
    },
    searchShopsName(shops, keyword) {
      let filteredShops = [];
      for (let i in shops) {
        let shop = shops[i];
        if (shop.name.indexOf(keyword) !== -1) {
          filteredShops.push(shop);
        }
      }
      return filteredShops;
    }
  }
}
</script>
