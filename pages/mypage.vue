<template>
  <main>
    <div class="container">
      <Reservations/>
      <div class="likes">
        <h2>お気に入り店舗</h2>
        <shop-card
          :shops="likes"
        />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  head() {
    return {
      title: 'マイページ'
    }
  },
  data() {
    return {
      likes: []
    }
  },
  async created() {
    await this.getLikes();
  },
  methods: {
    async getLikes() {
      const response = await this.$axios.get('/like');
      this.likes = response.data.likes_data;
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  .container {
    @include flex(center, flex-start);
    margin: 30px auto;
    @include tab {
      display: block;
    }
    .likes {
      width: 50%;
      margin: 0 10px;
      @include tab {
        width: 95%;
      }
      h2{
        font-size: 24px;
        font-weight: bold;
      }
      .shop {
        padding: 15px 0;
      }
    }
  }
}
</style>