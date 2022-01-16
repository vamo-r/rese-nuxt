<template>
  <main>
    <div class="container">
      <div class="detail">
        <div class="shop_details">
          <div class="shop_title">
            <button @click="back()">＜</button>
            <h2>{{ shop.name }}</h2>
          </div>
          <div class="shop_image">
            <img :src="shop.image_url">
          </div>
          <div class="shop_info">
            <p>#{{ shop.area.name }}</p>
            <p>#{{ shop.genre.name }}</p>
            <p>{{ shop.description }}</p>
          </div>
        </div>
        <div class="reservations">
          <ValidationObserver ref="obs" v-slot="ObserverProps">
            <h2>予約</h2>
            <div class="reserve_date">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <p class="error">{{ errors[0] }}</p>
                <input type="date" v-model="date" name="日にち">
              </ValidationProvider>
            </div>
            <div class="reserve_time">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <p class="error">{{ errors[0] }}</p>
                <select v-model="time" name="時間">
                  <option value="" disabled selected>時間を選択してください</option>
                  <option value="17:00">17:00</option>
                  <option value="17:30">17:30</option>
                  <option value="18:00">18:00</option>
                  <option value="18:30">18:30</option>
                  <option value="19:00">19:00</option>
                  <option value="19:30">19:30</option>
                  <option value="20:00">20:00</option>
                  <option value="20:30">20:30</option>
                  <option value="21:00">21:00</option>
                  <option value="21:30">21:30</option>
                  <option value="22:00">22:00</option>
                  <option value="22:30">22:30</option>
                  <option value="23:00">23:00</option>
                  <option value="23:30">23:30</option>
                  <option value="0:00">0:00</option>
                </select>
              </ValidationProvider>
            </div>
            <div class="reserve_num">
              <ValidationProvider v-slot="{ errors }" rules="required|between:1,10">
                <p class="error">{{ errors[0] }}</p>
                <select v-model="number" name="人数">
                  <option value="" disabled selected>人数を選択してください</option>
                  <option value="1">1人</option>
                  <option value="2">2人</option>
                  <option value="3">3人</option>
                  <option value="4">4人</option>
                  <option value="5">5人</option>
                  <option value="6">6人</option>
                  <option value="7">7人</option>
                  <option value="8">8人</option>
                  <option value="9">9人</option>
                  <option value="10">10人</option>
                </select>
              </ValidationProvider>
            </div>
            <div class="reserve_confirm">
              <div class="flex">
                <p>日付</p>
                <p>{{ date }}</p>
              </div>
              <div class="flex">
                <p>時間</p>
                <p>{{ time }}</p>
              </div>
              <div class="flex">
                <p>人数</p>
                <p>{{ number }}人</p>
              </div>
            </div>
            {{ error }}
            <div class="reserve_btn">
              <button type="button"
                @click="reservation()"
                :disabled="ObserverProps.invalid||!ObserverProps.validated"
              >
                予約する
              </button>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      shop: {
        name: '',
        area: {
          name: ''
        },
        genre: {
          name: ''
        },
        description: '',
        image_url: '',
      },
      date: '',
      time: '',
      number: '',
      error: ''
    };
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
        `shops/${this.$route.params.id}`
      );
      this.shop = response.data.shop_data[0];
    },
    async reservation() {
      try {
        await this.$axios.post('/reservation',
          {
            date: this.date,
            time: this.time,
            number: this.number,
            shop_id: this.$route.params.id
          }
        );
        this.$router.push({name: 'done', query: {
          date: this.date,
          time: this.time,
          number: this.number,
          shop_id: this.$route.params.id
        }});
      } catch {
        alert('予約できませんでした。')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  @include pc {
    @include flex(space-between, flex-start);
  }
  @include tab {
    margin: 0 5%;
  }
  .shop_details {
    @include pc {
      width: 50%;
      margin: 0 5%;
    }
    @include tab {
      width: 100%;
    }
    .shop_title {
      @include flex(flex-start, center);
      button {
        margin: 32px 0;
        padding: 8px 12px;
        background: #fff;
        border: none;
        border-radius: 3px;
        box-shadow: 3px 3px 3px #999;
        font-size: 16px;
      }
      h2 {
        margin: 0 0 0 2rem;
        font-size: 24px;
      }
    }
    .shop_image {
      img {
        width: 100%;
      }
    }
    .shop_info {
      p {
        display: inline-block;
        margin: 24px 0;
        font-size: 16px;
        line-height: 26px;
      }
      &p + p + p {
        margin: 0;
      }
    }
  }
  .reservations {
    height: 100%;
    margin: 32px 0;
    background: #3560f6;
    border-radius: 3px;
    box-shadow: 2px 2px 2px #999;
    color: #fff;
    @include pc {
      width: 50%;
    }
    @include tab {
      width: 100%;
    }
    h2 {
      padding: 10px 20px;
      font-size: 24px;
    }
    .error {
      margin: 0 20px;
      color: #f00;
    }
    .reserve_date {
      input {
        margin: 10px 20px;
        padding: 5px;
        background: #fff;
        border-radius: 3px;
        color: #000;
      }
    }
    .reserve_time {
      select {
        width: 89%;
        margin: 10px 20px;
        padding: 5px;
        background: #fff;
        border-radius: 3px;
        color: #000;
      }
    }
    .reserve_num {
      select {
        width: 89%;
        margin: 10px 20px;
        padding: 5px;
        background: #fff;
        border-radius: 3px;
        color: #000;
      }
    }
    .reserve_confirm {
      width: 90%;
      margin: 20px auto 100px;
      padding: 20px 0;
      background: #476fff;
      @include pc {
        margin: 20px auto 100px;
      }
      @include tab {
        margin: 20px auto;
      }
      .flex {
        @include flex(flex-start, center);
        width: 90%;
        margin: 20px;
        color: #fff;
        p + p {
          display: inline-block;
          margin: 0 0 0 50px;
        }
      }
    }
    .reserve_btn {
      overflow: hidden;
      background: #00f;
      button {
        overflow: hidden;
        @include flex(center, center);
        width: 100%;
        padding: 20px 0;
        color: #fff;
        &[disabled] {
          background: #8fa8ff;
        }
      }
    }
  }
}
</style>