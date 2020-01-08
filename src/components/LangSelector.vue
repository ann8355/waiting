<template>
  <div class="lang">
    <a href="javascript:void(0)" @click="select('ch')">中文</a>
    &nbsp;/&nbsp;
    <a href="javascript:void(0)" @click="select('en')">English</a>
  </div>
</template>

<script>
export default {
  name: 'LangSelector',
  methods: {
    select (lang) {
      this.$emit('lang', lang)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/css/addon/_main';
.lang {
  margin: 4vh 0;
  font-size: $h4;
  font-weight: 700;
  a {
    color: $primary;
    opacity: 0.6;
  }
}
</style>
