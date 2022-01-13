<template>
  <ul class="shop">
    <li v-for="shop in shops" :key="shop.id">
      <div class="shop_image">
        <nuxt-link :to="{ name: 'detail-id', params: { id:shop.id } }">
          <img :src="shop.image_url">
        </nuxt-link>
      </div>
      <div class="shop_text">
        <h2>{{ shop.name }}</h2>
        <p>#{{ shop.area.name }}</p>
        <p>#{{ shop.genre.name }}</p>
        <div class="click">
          <nuxt-link :to="{ name: 'detail-id', params: { id:shop.id } }">
            詳しく見る
          </nuxt-link>
          <button @click="toggleLike(shop.id)">♡</button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    shops: {
      type: Array,
      require: true
    },
    likes: {
      type: Array
    }
  },
  methods: {
    async toggleLike($shop_id) {
      await this.$axios.post('/like', {
        shop_id: $shop_id
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.shop {
  @include flex(flex-start, center);
  flex-wrap: wrap;
  width: 100%;
  padding: 50px 0;
  @include tab {
    justify-content: space-between;
  }
  li {
    overflow: hidden;
    margin: 5px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.5);
    @include pc {
      min-width: 200px;
      max-width: calc(24% - 1rem);
    }
    @include tab {
      min-width: 135px;
      max-width: calc(50% - 1rem);
    }
    .shop_image {
      a {
        img {
          width: 100%;
        }
      }
    }
    .shop_text {
      margin: 10px 16px;
      h2 {
        font-size: 20px;
      }
      p {
        margin: 10px 0 0;
        @include pc {
          display: inline-block;
        }
        @include tab {
          display: block;
        }
      }
      & + p {
        display: inline-block;
        margin: 10px 0 0 8px;
      }
      .click {
        @include flex(space-between, center);
        margin: 10px 0 0;
        font-size: 18px;
        a {
          padding: 8px;
          background: #3560f6;
          border-radius: 3px;
          font-size: 14px;
          color: #fff;
        }
      }
    }
  }
}
</style>