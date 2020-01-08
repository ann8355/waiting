<template>
  <modal class="confirm-modal" height="auto"
    :name="name" :clickToClose="clickToClose">
    <div v-if="title" class="confirm-modal-header">{{title}}</div>
    <div class="confirm-modal-body">
      <slot></slot>
    </div>
    <div class="confirm-modal-footer">
      <wpt-button class="confirm-modal-yes btn" @click="confirm" v-if="btnComfirm">
        {{btnComfirm}}
      </wpt-button>
      <wpt-button class="confirm-modal-no btn" @click="close"
        :style="{width: !btnComfirm ? '80%':''}">{{btnCancel}}
      </wpt-button>
    </div>
  </modal>
</template>

<script>
import i18n from '@/plugins/i18n'

export default {
  name: 'ConfirmModal',
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    btnComfirm: {
      type: String,
      default: i18n.t('confirm')
    },
    btnCancel: {
      type: String,
      default: i18n.t('close')
    },
    clickToClose: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    show () {
      this.$modal.show(this.name)
    },
    close () {
      this.$modal.hide(this.name)
      this.$emit('close')
    },
    confirm () {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/css/addon/_main';

$dove: lighten( $primary, 30% );
$alto: lighten( $primary, 90% );

.confirm-modal.v--modal-overlay {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  height: auto;
  width: auto;
  background: rgba(0, 0, 0, .4);
  .v--modal {
    width: 80%!important;
    position: static;
    border-radius: 2.5vh;
  }
  .v--modal-background-click {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .v--modal-top-right {
    display: none;
  }
}
.confirm-modal-header {
  background-color: $alto;
  line-height: 10vh;
  text-align: center;
  color: $dove;
  font-size: $h4;
}
.confirm-modal-footer {
  display: flex;
  justify-content: space-around;
  height: 10vh;
  padding: 1rem;
  button {
    width: 40%;
    font-size: $h5;
  }
  .confirm-modal-yes {
    background-color: $red;
  }
  .confirm-modal-no {
    background-color: $alto;
    color: $dove;
  }
}
</style>
