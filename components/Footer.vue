<template>
  <footer>
    <div class="container">
      <p class="copyright">&copy; {{ year }} vamo-r.</p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      year: ''
    }
  },
  created() {
    this.getYear();
  },
  methods: {
    getYear() {
      const d = new Date()
      this.year = d.getFullYear()
    }
  }
}
</script>

<style lang="scss">
footer {
  height: 60px;
}
</style>