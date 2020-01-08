<template>
  <ConfirmModal class="network-modal" :title="title" :name="name" :btnComfirm="btnComfirm"
  @confirm="onConfirm"></ConfirmModal>
</template>

<script>
import i18n from '@/plugins/i18n'
import ConfirmModal from '@/components/ConfirmModal'

export default {
  name: 'NetworkModal',
  data () {
    return {
      name: 'NetworkModal',
      title: '',
      btnComfirm: i18n.t('refresh')
    }
  },
  methods: {
    show (title) {
      this.title = title
      this.$modal.show(this.name)
      // this.$loading.hide();
    },
    close () {
      this.$modal.hide(this.name)
    },
    onConfirm () {
      location.reload()
    }
  },
  components: {
    ConfirmModal
  }
}
</script>

<style lang="scss">

</style>
