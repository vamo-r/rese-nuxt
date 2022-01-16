<template>
  <main>
    <div class="container">
      <div class="done">
        <div class="done_title">
          <h2>ご予約ありがとうございます</h2>
        </div>
        <div class="done_text">
          <p>下記のご予約が完了致しました。</p>
          <table>
            <tbody>
              <tr>
                <th>店舗名</th>
                <td>{{ shop.name }}</td>
              </tr>
              <tr>
                <th>日にち</th>
                <td>{{ this.$route.query.date }}</td>
              </tr>
              <tr>
                <th>時間</th>
                <td>{{ this.$route.query.time }}</td>
              </tr>
              <tr>
                <th>人数</th>
                <td>{{ this.$route.query.number }}人</td>
              </tr>
            </tbody>
          </table>
          <div class="done_btn">
            <button @click="back()">戻る</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  middleware: 'reject-direct',
  head() {
    return {
      title: '予約完了'
    }
  },
  data() {
    return {
      shop: {
        name: ''
      }
    }
  },
  created() {
    return this.getShop();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async getShop() {
      const response = await this.$axios.get(
        `shops/${this.$route.query.shop_id}`
      );
      this.shop = response.data.shop_data[0];
    }
  }
}
</script>

<style lang="scss" scoped>
.done {
  margin: 50px auto;
  padding: 0 0 50px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 2px 2px 2px #999;
  @include pc {
    width: 50%;
  }
  @include tab {
    width: 90%;
  }
  .done_title {
    padding: 16px 0;
    background: #3560f6;
    h2 {
      margin: 0 0 0 15px;
      font-size: 2rem;
      color: #fff;
    }
  }
  .done_text {
    p {
      margin: 15px;
      line-height: 20px;
    }
    table {
      margin: 0 15px;
      font-size: 2rem;
      th, td {
        padding: 20px;
      }
    }
    .done_btn {
      @include flex(flex-end, center);
      margin: 0 15px;
      button {
        padding: 10px 20px;
        background: #3560f6;
        border-radius: 3px;
        color: #fff;
      }
    }
  }
}
</style>