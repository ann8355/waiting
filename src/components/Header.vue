<template>
  <nav class="logo" :style="{backgroundImage: img}"></nav>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    img () {
      const yakiniku = `url(${require(`@/assets/images/header/${process.env.VUE_APP_HEADER_IMG}`)})`
      return yakiniku
    }
  }
}
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: 9vh;
  background-position: center center;
  // background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
