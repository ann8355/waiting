import Vue from 'vue'
import VModal from 'vue-js-modal'
import WebposToolkit from 'webpos-toolkit'
import Modal from './NetworkModal'

Vue.use(WebposToolkit)
Vue.use(VModal, { dynamic: true })

const Instance = new Vue(Modal)
const component = Instance.$mount()
document.body.appendChild(component.$el)

export default Instance
