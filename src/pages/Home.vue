<template>
  <div class="content">
    <Header />
    <LangSelector @lang="select"/>
    <WaitingInfo :lang="lang" :showCancel="false" :serial="serialNum" >
      <Number :lang="lang" slot="numberCard" @serial="getNumber" />
    </WaitingInfo>
  </div>
</template>

<script>
import Header from '../components/Header'
import LangSelector from '../components/LangSelector'
import Number from '../components/includes/Number'
import WaitingInfo from '../components/WaitingInfo'

export default {
  name: 'Home',
  data () {
    return {
      lang: 'ch',
      serialNum: 0
    }
  },
  components: {
    Header,
    LangSelector,
    WaitingInfo,
    Number
  },
  methods: {
    select (lang) {
      this.lang = lang
    },
    getNumber (val) {
      this.serialNum = val
    }
  }
}
</script>

<style scoped lang="scss">
.content {
  padding: 3.6vh;
}
</style>
