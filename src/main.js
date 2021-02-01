import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'

Vue.use(BootstrapVue)
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')

//用下面指令安裝bootstrap以及bootstrap-vue
//npm install bootstrap bootstrap-vue