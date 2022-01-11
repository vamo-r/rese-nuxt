<template>
  <div class="app">
    <Header/>
    <nuxt/>
    <Footer/>
  </div>
</template>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #ccc;
  main {
    flex: 1;
    overflow-x: hidden;
  }
}
</style>
