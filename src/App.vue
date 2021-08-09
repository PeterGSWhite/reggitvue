

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  onIdle() {
    if(this.$store.state.accessToken) {
      this.$store.dispatch('userLogout')
        .then(() => {
          this.$router.push({ name: 'login' })
        })
    }
  }
}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    background-color: #49C6E5!important;
  }
</style>
