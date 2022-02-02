<template>
  <div class="reservations">
    <h2>予約状況</h2>
    <ul>
      <li v-for="(reservation, index) in reservations" :key="reservation.id">
        <div class="reservation_title">
          <h3>予約{{ index + 1 }}</h3>
          <button @click="reserveDelete(reservation.id)">キャンセル/削除</button>
        </div>
        <div class="reservation_text">
          <p>店舗名</p>
          <p>{{ reservation.shop.name }}</p>
        </div>
        <div class="reservation_text">
          <p>日にち</p>
          <p>{{ reservation.date }}</p>
        </div>
        <div class="reservation_text">
          <p>時間</p>
          <p>{{ reservation.time }}</p>
        </div>
        <div class="reservation_text">
          <p>人数</p>
          <p>{{ reservation.number }}人</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reservations: []
    }
  },
  async created() {
    await this.getReservations();
  },
  methods: {
    async getReservations() {
      const response = await this.$axios.get('/reservation');
      this.reservations = response.data.reservations_data;
    },
    async reserveDelete($shop_id) {
      await this.$axios.delete('/reservation', {
        data: {
          shop_id: $shop_id
        }
      });
    }
  }
}
</script>

<style lang="scss">
.reservations {
  width: 50%;
  margin: 0 10px;
  @include tab {
    width: 95%;
  }
  h2{
    font-size: 24px;
    font-weight: bold;
  }
  ul {
    li {
      margin: 20px 0;
      padding: 10px;
      background: #3560f6;
      border-radius: 5px;
      color: #fff;
      .reservation_title {
        @include flex(space-between, center);
        h3 {
          font-size: 20px;
        }
        button {
          @include flex(center, center);
          padding: 5px;
          border: 2px solid #fff;
          border-radius: 5px;
          font-size: 14px;
        }
      }
      .reservation_text {
        @include flex(flex-start, center);
        width: 100%;
        p {
          margin: 10px 0;
          @include pc {
            width: 20%;
          }
          @include tab {
            width: 35%;
          }
          & + p {
            display: inline-block;
            @include pc {
              width: 80%;
              margin: 0 0 0 50px;
            }
            @include tab {
              width: 65%;
              margin: 0 0 0 10px;
            }
          }
        }
      }
    }
  }
}
</style>