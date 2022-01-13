<template>
  <main>
    <div class="container">
      <div class="thanks">
        <div class="thanks_title">
          <h2>ご登録ありがとうございます</h2>
        </div>
        <div class="thanks_text">
          <p>
            ご登録が完了致しました。<br>
            ログイン画面よりログインしてからご利用ください。
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  auth: false,
  middleware: 'reject-direct',
  head() {
    return {
      title: '登録完了',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex,follow' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.thanks {
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
  .thanks_title {
    padding: 16px 0;
    background: #3560f6;
    h2 {
      margin: 0 0 0 15px;
      font-size: 20px;
      color: #fff;
    }
  }
  .thanks_text {
    p {
      margin: 15px;
      line-height: 20px;
    }
  }
}
</style>