<template>
  <main>
    <div class="container">
      <Reservations/>
      <div class="likes">
        <h2>お気に入り店舗</h2>
        <shop-card
          :shops="likes"
          v-if="likes.length > 0"
        />
        <div v-else>
          <p class="noReservations">お気に入り店舗はありません</p>
        </div>
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
        width: 94%;
      }
      h2{
        font-size: 24px;
        font-weight: bold;
      }
      .shop {
        padding: 15px 0;
      }
    }
    p.noReservations {
      margin: 20px 0;
      padding: 50px 0;
      text-align: center;
    }
  }
}
</style>