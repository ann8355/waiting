<template>
  <div :class="['number-card', {pages: num === 0 ? false:true}]">
    <h1 class="number-title">{{ title[lang] }}</h1>
    <h2 :class="['number', {flipCard: isFlip}, {arrive: typeof num === 'string'}]" :style="{color: num <= 3 ? 'rgb(236, 79, 79)':'#000'}">
      {{ num }}
    </h2>
    <h2 class="numberCopy"></h2>
  </div>
</template>

<script>
import Service from '@/services/index'
import { setTimeout } from 'timers'

export default {
  name: 'Number',
  props: {
    lang: {
      type: String,
      default: 'ch'
    }
  },
  data () {
    return {
      title: {
        ch: '等候組數',
        en: 'Queue' // Current groups in line
      },
      num: '',
      // newNum: 0,
      isFlip: false,
      time: null,
      interval: null,
      number: null,
      arrivedTxt: {
        ch: '已報到',
        en: 'Arrived'
      },
      cancelTxt: {
        ch: '已取消',
        en: 'Cancel'
      },
      waitingTxt: {
        ch: '等待中',
        en: 'Waiting'
      },
      status: 0
    }
  },
  watch: {
    isFlip (val) {
      if (val) {
        this.num = ''
        this.time = setTimeout(() => {
          this.isFlip = false
        }, 600)
      } else {
        this.num = this.number
      }
    },
    num (val) {
      if (val === -1) {
        this.clear()
      }
    },
    lang (val) {
      if (this.status !== 0) {
        this.transform(this.status)
      }
    }
  },
  computed: {
    formatString () {
      const str = this.num.toString()
      return str.padStart(4, '0')
    }
  },
  methods: {
    async init (type) {
      const code = this.$route.query.number
      await Service.getWaitingNum(code).then((response) => {
        if (response.data.err === -3 || (response.data.err === 0 && response.data.msg.waits === -1)) {
          Service.getWaitingInfo(code).then((response) => {
            this.$emit('serial', response.data.msg.count || 0)
            this.transform(response.data.msg.status)
            this.status = response.data.msg.status
          })
        } else {
          this.number = response.data.msg.waits
          if (type === 'first') {
            this.num = response.data.msg.waits
            this.$emit('serial', response.data.msg.count)
          } else {
            if (response.data.msg.waits !== this.num && typeof this.num !== 'string') {
              this.isFlip = true // 翻頁動畫是否啟動
            }
          }
        }
      })
    },
    clear () {
      if (this.time) {
        clearTimeout(this.time)
      }
      if (this.interval) {
        clearInterval(this.interval)
      }
    },
    transform (status) {
      switch (status) {
        case 1:
          this.num = this.waitingTxt[this.lang]
          break
        case 2:
          this.num = this.arrivedTxt[this.lang]
          break
        case 3:
          this.num = this.cancelTxt[this.lang]
          break
        default:
      }
    },
    countNum (num) {
      if (num === 1) {
        return this.arrivedTxt[this.lang]
      } else if (num > 0) {
        return num - 1
      } else {
        return 5
      }
    }
  },
  created () {
    // this.init('first')
    // 塞假資料
    this.number = 5
    this.num = 5
    this.$emit('serial', 5)
  },
  mounted () {
    this.interval = setInterval(() => {
      // this.init()
      // 塞假資料
      this.number = this.countNum(this.number)
      this.isFlip = true // 翻頁動畫是否啟動
    }, 3000)
  },
  destroyed () {
    this.clear()
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/css/addon/_main';
$radius: 4vh;
%rectangle {
  content: '';
  display: block;
  width: 1.6vh;
  height: 4.2vh;
  background-color: $white;
  position: absolute;
  top: 28.5%;
  border-radius: 10px;
  filter: contrast(0.7);
  box-shadow: 2px 6px 12px rgba(0, 0, 0, 0.2);
  z-index: 5;
}
%center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes flip {
  0% {
    top: -1px;
    z-index: 4;
  }
  70% {
    opacity: 1;
    z-index: 10;
  }
  100% {
    transform: rotate3d(1, 1, 1, 45deg);
    top: -100px;
    opacity: 0;
    background-color: transparent;
  }
}

.number-card {
  width: 28vh;
  height: 28vh;
  border-radius: $radius;
  margin: 4vh auto;
  box-shadow: 12px 11px 15px rgba(0, 0, 0, 0.15);
  position: relative;
  font-size: $h1;
  .number-title {
    background-color: $secondary;
    color: $tertiary;
    height: 35%;
    border-radius: $radius $radius 0 0;
    font-size: $h4;
    @extend %center;
  }
  .number {
    font-size: $h1;
    height: 65%;
    @extend %center;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0 0 $radius $radius;
    position: relative;
    background-color: $white;
  }
  .arrive {
    font-size: $h2;
    color: $red!important;
  }
  .flipCard {
    animation: flip 0.6s linear 1 normal backwards;
  }
  .numberCopy {
    margin-top: -50%;
    &:before {
      @extend %rectangle;
      left: 18%;
    }
    &:after {
      @extend %rectangle;
      right: 18%;
    }
  }
}
.pages {
  &:after {
    content: '';
    display: block;
    height: 94%;
    border-radius: $radius;
    width: 97.5%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    position: absolute;
    left: 0;
    top: 0;
    background-color: transparent;
    box-shadow: 0px 12px 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
