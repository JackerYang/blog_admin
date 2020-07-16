import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ElementUi from "./assets/js/ElementUi"
import Markdown from "./assets/js/Markdown"

Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.use(Markdown)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")
