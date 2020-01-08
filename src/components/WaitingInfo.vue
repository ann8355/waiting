<template>
  <div class="info-area">
    <h3>{{ dateInfo }}</h3>
    <p class="serial">{{ serialInfo[lang] }}</p>
    <h4>{{ formatString }}</h4>
    <slot name="numberCard"></slot>
    <button v-if="showCancel">{{ cancelBtn[lang] }}</button>
    <p class="promptWord" v-if="promptInfo">{{ promptInfo }}</p>
  </div>
</template>

<script>
export default {
  name: 'WaitingInfo',
  props: {
    lang: {
      type: String,
      default: 'ch'
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    serial: {
      type: Number
    }
  },
  data () {
    return {
      serialInfo: {
        ch: '您的排隊序號：',
        en: 'Your queue number：'
      },
      promptInfo: '',
      cancelBtn: {
        ch: '取消候位',
        en: 'Cancel'
      }
    }
  },
  computed: {
    dateInfo () {
      const currentDate = new Date()
      const year = currentDate.getFullYear()
      const month = currentDate.getMonth() + 1
      const day = currentDate.getDate()
      return `${year}-${month}-${day}`
    },
    formatString () {
      const str = this.serial.toString()
      return str.padStart(4, '0')
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/css/addon/_main';
.info-area {
  color: $primary;
  h3 {
    font-size: $h3;
  }
  .serial {
    font-size: $h5;
    margin: 2vh 0;
    opacity: 0.6;
  }
  h4 {
    font-size: $h2;
  }
  .promptWord {
    opacity: 0.6;
    padding-top: 3vh;
    line-height: 4vh;
    font-size: $h5;
  }
  button {
    width: 26vh;
    height: 7vh;
    border-radius: 1.5vh;
    border: 1px solid $red;
    color: $red;
    opacity: 0.8;
    background-color: transparent;
    font-size: $h5;
    &:hover {
      outline: none;
      opacity: 0.4;
    }
  }
}
</style>
