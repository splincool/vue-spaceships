<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" class="mb-3 justify-content-between">
    <b-navbar-brand>
      <p @click="goHome" class="logo-link">Starships</p>
    </b-navbar-brand>
  </b-navbar>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    goHome () {
      if (this.$route.name !== 'Home') {
        this.$router.push({ name: "Home", query: false})
      }
    }
  }
}
</script>

<style scoped>
.logo-link {
  font-size: 26px;
  color: #ffe300;
  text-decoration: none;
  margin: 0;
  cursor: pointer;
}
</style>